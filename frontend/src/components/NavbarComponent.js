import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/authActions';
import '../styles/NavbarStyle.css';

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="navbar-container">
            <Link id="home-link" className="navbar-link" to="/">홈</Link>
            <Link id="profile-link" className="navbar-link" to="/profile">프로필</Link>
            <Link id="notification-link" className="navbar-link" to="/notification">알림</Link>
            {isAuthenticated ? (
                <button id="logout-button" className="navbar-button" onClick={handleLogout}>로그아웃</button>
            ) : (
                <Link id="login-link" className="navbar-link" to="/login">로그인</Link>
            )}
        </div>
    );
}

export default Navbar;
