import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../actions/authActions';


import Navbar from './Navbar';
import HeaderComponent from './HeaderComponent';

function LoginComponent() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        // 서버에 요청을 보내고 토큰을 받아온다 (axios 또는 fetch를 사용하여 구현)
        const response = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();

            // 토큰을 Redux 스토어에 저장
            dispatch(loginSuccess(data.userData, data.token));
            navigate('/');
        } else if (response.status === 401) {
            // 401 상태 코드일 때 로그인 실패 메시지 표시
            setLoginError('로그인에 실패하였습니다. 이메일과 비밀번호를 확인해주세요.');
        } else {
            // 기타 오류 처리
            console.error('로그인 실패');
        }
    };

    return (
        <div>
            <Navbar />
            <HeaderComponent />
            <h2>로그인</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>이메일:</label>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>비밀번호:</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">로그인</button>
                </div>
                {loginError && <div style={{ color: 'red' }}>{loginError}</div>}
                <div>
                    <Link to="/signup">회원가입</Link>
                </div>
            </form>
        </div>
    );
}

export default LoginComponent;
