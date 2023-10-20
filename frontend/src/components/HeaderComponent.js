import React from 'react';
import '../styles/HeaderStyle.css';
import cloudIcon from '../img/cloud-icon.png';

function HeaderComponent() {
    return (
        <div className="header-container">
            <div className="header-icon-title">
                <img src={cloudIcon} alt="Cloud Icon" className="header-cloud-icon" id="cloud-image" width="10%" />
                <div className="header-title">
                    <h1 id="main-title">옅구름</h1>
                    <p id="sub-title">토이 프로젝트 팀원 모집 사이트</p>
                </div>
            </div>
        </div>
    );
}

export default HeaderComponent;
