import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './NavbarComponent';
import HeaderComponent from './HeaderComponent';

import '../styles/SignUp.css'

function SignUpComponent() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        nickname: '',
        phoneNumber1: '',
        phoneNumber2: '',
        phoneNumber3: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        const { password, confirmPassword, phoneNumber1, phoneNumber2, phoneNumber3 } = formData;

        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        const phoneNumber = `${phoneNumber1}-${phoneNumber2}-${phoneNumber3}`;
        const userData = {
            email: formData.email,
            password,
            full_name: formData.fullName,
            nickname: formData.nickname,
            phone_number: phoneNumber
        };

        const response = await fetch('http://localhost:5000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            alert('회원가입 성공');
            navigate('/login'); //로그인 페이지로 이동시켜줍니다
        } else {
            alert('회원가입 실패');
        }
    };

    return (
        <div className="signup-container">
            <Navbar />
            <HeaderComponent />
            <h2 className="signup-title">회원가입</h2>
            <form className="signup-form" onSubmit={handleSignUp}>
                {[
                    { label: '이메일', type: 'text', name: 'email' },
                    { label: '비밀번호', type: 'password', name: 'password' },
                    { label: '비밀번호 확인', type: 'password', name: 'confirmPassword' },
                    { label: '성명', type: 'text', name: 'fullName' },
                    { label: '닉네임', type: 'text', name: 'nickname' },
                ].map((field, idx) => (
                    <div key={idx}>
                        <label>{field.label}:</label>
                        <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                        />
                    </div>
                ))}
                <div className="signup-phone">
                <label>전화번호:</label>
                <input type="text" maxLength="3" name="phoneNumber1" value={formData.phoneNumber1} onChange={handleChange} />
                -
                <input type="text" maxLength="4" name="phoneNumber2" value={formData.phoneNumber2} onChange={handleChange} />
                -
                <input type="text" maxLength="4" name="phoneNumber3" value={formData.phoneNumber3} onChange={handleChange} />
            </div>
            <div className="signup-button">
                <button type="submit">가입하기</button>
            </div>
        </form>
    </div>
    );
}

export default SignUpComponent;
