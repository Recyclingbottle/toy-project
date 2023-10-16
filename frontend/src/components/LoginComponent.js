import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { loginSuccess } from '../actions/authActions';

function LoginComponent() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        } else {
            // 로그인 실패 처리
            console.error('로그인 실패');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>E-mail:</label>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
                <div>
                    <Link to="/signup">회원가입</Link>
                </div>
            </form>
        </div>
    );
}

export default LoginComponent;
