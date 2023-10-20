import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from './NavbarComponent';
import HeaderComponent from './HeaderComponent';
import '../styles/EditProfile.css'
function EditProfile() {
    const [profile, setProfile] = useState({});
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://localhost:5000/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setProfile(data);
                } else {
                    const errorData = await response.json();
                    console.error(errorData.message);
                }
            } catch (error) {
                console.error('프로필 정보를 가져오는데 실패하였습니다.', error);
            }
        };

        fetchProfile(); // useEffect 내부에서 호출
    }, [token]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    }

    const handleUpdate = async () => {
        try {
            const response = await fetch('http://localhost:5000/profile/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(profile),
            });

            if (response.ok) {
                navigate('/profile');
            } else {
                const errorData = await response.json();
                console.error(errorData.message);
            }
        } catch (error) {
            console.error('프로필 수정에 실패하였습니다.', error);
        }
    };

    function renderSNSLinks() {
        if (!profile.social_media_links) {
            return null;
        }

        try {
            const snsLinks = JSON.parse(profile.social_media_links);
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

    return (
        <div id="edit-profile-container">
            <Navbar />
            <HeaderComponent />
            <h2 id="profile-title">프로필 수정</h2>
            <form id="profile-form" onSubmit={e => e.preventDefault()}>
                <div className="input-container">
                    <label htmlFor="age">나이:</label>
                    <input
                        id="age"
                        type="number"
                        name="age"
                        value={profile.age || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input-container">
                <label>
                    성별:
                    <select name="gender" value={profile.gender || '남성'} onChange={handleInputChange}>
                        <option value="남성">남성</option>
                        <option value="여성">여성</option>
                        <option value="기타">기타</option>
                    </select>
                </label>
                </div>
                <div className="input-container">

                <label>
                    직업:
                    <input
                        type="text"
                        name="occupation"
                        value={profile.occupation || ''}
                        onChange={handleInputChange}
                    />
                </label>
                </div>     
                <div className="input-container">
  
                <label>
                    기술 스택:
                    <input
                        type="text"
                        name="skill_set"
                        value={profile.skill_set || ''}
                        onChange={handleInputChange}
                    />
                </label>
                </div>     
                <div className="input-container">

                <label>
                    경력:
                    <input
                        type="text"
                        name="experience"
                        value={profile.experience || ''}
                        onChange={handleInputChange}
                    />
                </label>
                </div>     
                <div className="input-container">

                <label>
                    포트폴리오 링크:
                    <input
                        type="text"
                        name="portfolio_link"
                        value={profile.portfolio_link || ''}
                        onChange={handleInputChange}
                    />
                </label>
                </div>     
                <div className="input-container">

                <label>
                    주소:
                    <input
                        type="text"
                        name="address"
                        value={profile.address || ''}
                        onChange={handleInputChange}
                    />
                </label>
                </div>
                <div className="input-container">

                <label>
                    PHONE:
                    <input
                        type="text"
                        name="phone_number"
                        value={profile.phone_number || ''}
                        onChange={handleInputChange}
                    />
                </label>
                </div>


                {renderSNSLinks()}
                <div className="input-container">

                <label>
                    자기소개:
                    <textarea
                        name="about_me"
                        value={profile.about_me || ''}
                        onChange={handleInputChange}
                    />
                </label>
                </div>

                <button id="submit-btn" type="submit" onClick={handleUpdate}>수정하기</button>
            </form>
        </div>
    );
}
export default EditProfile;
