import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from './NavbarComponent';
import HeaderComponent from './HeaderComponent';
import '../styles/RegisterProfile.css';

function RegisterProfile() {
    const [profile, setProfile] = useState({});
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token);

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:5000/profile/register', {
                method: 'POST',
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
            console.error('프로필 등록에 실패하였습니다.', error);
        }
    }


    function handleInputChange(event) {
        const { name, value } = event.target;
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value
        }));
    }
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
        <div id="register-profile-container">
            <Navbar />
            <HeaderComponent />
            <h2>프로필 {profile.user_id ? '수정' : '등록'}</h2>
            <form id="register-profile-form" onSubmit={e => e.preventDefault()}>
                
                <div className="label-container">
                    <label>나이:</label>
                    <input
                        className="text-input"
                        type="number"
                        name="age"
                        value={profile.age || ''}
                        onChange={handleInputChange}
                    />
                </div>
    
                <div className="label-container">
                    <label>성별:</label>
                    <select className="text-input" name="gender" value={profile.gender || '남성'} onChange={handleInputChange}>
                        <option value="남성">남성</option>
                        <option value="여성">여성</option>
                        <option value="기타">기타</option>
                    </select>
                </div>
    
                <div className="label-container">
                    <label>직업:</label>
                    <input
                        className="text-input"
                        type="text"
                        name="occupation"
                        value={profile.occupation || ''}
                        onChange={handleInputChange}
                    />
                </div>
    
                <div className="label-container">
                    <label>기술 스택:</label>
                    <input
                        className="text-input"
                        type="text"
                        name="skill_set"
                        value={profile.skill_set || ''}
                        onChange={handleInputChange}
                    />
                </div>
    
                <div className="label-container">
                    <label>경력:</label>
                    <input
                        className="text-input"
                        type="text"
                        name="experience"
                        value={profile.experience || ''}
                        onChange={handleInputChange}
                    />
                </div>
    
                <div className="label-container">
                    <label>포트폴리오 링크:</label>
                    <input
                        className="text-input"
                        type="text"
                        name="portfolio_link"
                        value={profile.portfolio_link || ''}
                        onChange={handleInputChange}
                    />
                </div>
    
                <div className="label-container">
                    <label>주소:</label>
                    <input
                        className="text-input"
                        type="text"
                        name="address"
                        value={profile.address || ''}
                        onChange={handleInputChange}
                    />
                </div>
    
                <div className="label-container">
                    <label>연락처:</label>
                    <input
                        className="text-input"
                        type="text"
                        name="phone_number"
                        value={profile.phone_number || ''}
                        onChange={handleInputChange}
                    />
                </div>
    
                {renderSNSLinks()}
    
                <div className="label-container">
                    <label>자기소개:</label>
                    <textarea
                        className="textarea-input"
                        name="about_me"
                        value={profile.about_me || ''}
                        onChange={handleInputChange}
                    />
                </div>
    
                <button type="submit" onClick={handleSubmit}>제출</button>
            </form>
        </div>
    );
}

export default RegisterProfile;
