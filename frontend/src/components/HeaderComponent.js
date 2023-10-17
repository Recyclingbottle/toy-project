import React from 'react';
import '../styles/HeaderStyle.css';
import cloudIcon from '../img/cloud-icon.png';

function HeaderComponent() {
    return (
        <div className="header">
            <div className="icon-title">
                <img src={cloudIcon} alt="Cloud Icon" className="cloud-icon" width="10%" />
                <div className="title">
                    <h1>옅구름</h1>
                    <p>토이 프로젝트 팀원 모집 사이트</p>
                </div>
            </div>
        </div>
    );
}

export default HeaderComponent;
