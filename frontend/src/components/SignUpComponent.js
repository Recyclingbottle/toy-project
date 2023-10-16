// SignUpComponent.js

import React, { useState } from 'react';

function SignUpComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [nickname, setNickname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();

        // 회원가입 요청을 보낼 데이터 객체 생성
        const userData = {
            email,
            password,
            full_name: fullName,
            nickname,
            phone_number: phoneNumber,
        };

        // 서버에 회원가입 요청
        const response = await fetch('http://localhost:5000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            // 회원가입 성공 처리
            console.log('회원가입 성공');
        } else {
            // 회원가입 실패 처리
            console.error('회원가입 실패');
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
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
                    <label>성명:</label>
                    <input
                        type="text"
                        name="full_name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <div>
                    <label>닉네임:</label>
                    <input
                        type="text"
                        name="nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        name="phone_number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    );
}

export default SignUpComponent;
