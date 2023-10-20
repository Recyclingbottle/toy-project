import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Redux 스토어에서 토큰 및 프로필 데이터 가져오기
import ProfileIcon from '../img/default-profile-img.png';

import Navbar from './NavbarComponent';
import HeaderComponent from './HeaderComponent';
import '../styles/Profile.css'

function Profile() {
    // Redux 스토어에서 토큰 및 프로필 데이터 가져오기
    const token = useSelector(state => state.auth.token);
    const profileData = useSelector(state => state.auth.userData);

    // 프로필 상태와 네비게이션 객체를 설정합니다.
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // 프로필 정보를 서버에서 가져오는 함수를 정의합니다.
        async function fetchProfile() {
            try {
                const response = await fetch('http://localhost:5000/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Redux 스토어에서 가져온 토큰 사용
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProfile(data);
                } else if (response.status === 404) {
                    setProfile(null);
                } else {
                    console.error('프로필 정보를 불러오는 데 실패하였습니다.');
                }
            } catch (error) {
                console.error('프로필 정보를 불러오는 중 오류가 발생하였습니다.', error);
            }
        }

        fetchProfile();
    }, [token]);

    // SNS 데이터 파싱 및 시각화
    function renderSNSLinks(snsData) {
        if (!snsData) {
            return null;
        }

        try {
            const snsLinks = JSON.parse(snsData.social_media_links);
            const snsElements = Object.entries(snsLinks).map(([platform, link]) => (
                <div key={platform}>
                    <strong>{platform}:</strong> <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                </div>
            ));

            return (
                <div>
                    <strong>SNS:</strong>
                    {snsElements}
                </div>
            );
        } catch (error) {
            console.error('SNS 데이터 파싱 중 오류가 발생하였습니다.', error);
            return null;
        }
    }

    // 로그인 여부 체크 및 UI 조건부 렌더링
    if (!token) {
        // 토큰이 없는 경우 (로그인하지 않은 경우)
        return (
            <div>
                <p>프로필을 확인하려면 로그인이 필요합니다.</p>
                <button onClick={() => navigate('/login')}>로그인</button>
                <button onClick={() => navigate(-1)}>취소</button>
            </div>
        );
    }

    if (!profile || profile.message) {
        // 프로필이 없거나 메시지가 있는 경우에 대한 UI를 반환합니다.
        return (
            <div>
                <p>{profile ? profile.message : '프로필이 존재하지 않습니다. 등록하시겠습니까?'}</p>
                <button onClick={() => navigate('/register-profile')}>예</button>
                <button onClick={() => navigate(-1)}>아니요</button>
            </div>
        );
    }

    // 프로필 정보를 표시하는 UI를 반환합니다.
    // 프로필 이미지 현재는 react 의 src 내 사진을 가져오지만
    // 서버의 디폴트 프로필 이미지 추가 후 불러오기 
    // 등록하기 추가 
    return (
        <div id="profile-container">
            <Navbar />
            <HeaderComponent />
            <div className="profile-info">
                <img src={ProfileIcon} alt="profile_photo" className="profile_photo" width='10%' />
                <div className="profile-detail" id="profile-age"><strong>나이:</strong> {profile.age}</div>
                <div className="profile-detail" id="profile-gender"><strong>성별:</strong> {profile.gender}</div>
                <div className="profile-detail" id="profile-occupation"><strong>직업:</strong> {profile.occupation}</div>
                <div className="profile-detail" id="profile-skillset"><strong>기술 스택:</strong> {profile.skill_set}</div>
                <div className="profile-detail" id="profile-experience"><strong>경력:</strong> {profile.experience}</div>
                <div className="profile-detail" id="profile-portfolio"><strong>포트폴리오 링크:</strong> <a href={profile.portfolio_link} target="_blank" rel="noopener noreferrer">{profile.portfolio_link}</a></div>
                <div className="profile-detail" id="profile-address"><strong>주소:</strong> {profile.address}</div>
                <div className="profile-detail" id="profile-phone"><strong>PHONE:</strong> {profile.phone_number}</div>
                <div className="profile-detail" id="profile-sns">{renderSNSLinks(profileData)}</div>
                <div className="profile-detail" id="profile-aboutme"><strong>자기소개:</strong> {profile.about_me}</div>
                </div>
        <button className="profile-button" onClick={() => navigate('/edit-profile')}>프로필 수정하기</button>
        </div>
    );
}

export default Profile;
