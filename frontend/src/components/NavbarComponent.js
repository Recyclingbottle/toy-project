import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/authActions';
import '../styles/NavbarStyle.css'; // NavbarStyle.css 파일을 가져옴

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="navbar">
            <Link to="/">홈</Link>
            <Link to="/profile">프로필</Link>
            <Link to="/notification">알림</Link>
            {isAuthenticated ? (
                <button onClick={handleLogout}>로그아웃</button>
            ) : (
                <Link to="/login">로그인</Link>
            )}
        </div>
    );
}

export default Navbar;
