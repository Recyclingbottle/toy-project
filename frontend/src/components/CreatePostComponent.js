import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Navbar from './NavbarComponent';
import HeaderComponent from './HeaderComponent';

function CreatePostComponent() {
    const navigate = useNavigate();
    // Redux 스토어로부터 토큰 값 가져오기
    const token = useSelector(state => state.auth.token);

    // 상태 변수 설정
    const [formData, setFormData] = useState({
        project_title: '',
        post_content: '',
        required_skills: '',
        project_location: '',
        project_field: '',
        project_status: '모집중', // 디폴트값으로 모집중
        project_start_date: new Date().toISOString().split('T')[0], // 현재 날짜를 디폴트로 설정
        project_end_date: '',
        project_image: '', // 파일 업로드 기능이 추가되면 여기에 이미지 데이터를 넣을 수 있습니다.
        team_size: 1, // 디폴트값으로 1
        post_datetime: new Date().toISOString(), // 현재 시각을 ISO 문자열로 설정
    });

    // 폼 입력값 변경 처리 함수
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCreatePost = async () => {
        try {
            //console.log('토큰:', token);
            const url = 'http://localhost:5000/pboard/';

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json', // JSON 형태의 데이터를 전송
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                navigate('/');
            } else {
                console.error('게시글 생성에 실패했습니다.');
            }

        } catch (error) {
            console.error('게시글 생성에 실패하였습니다.', error);
        }
    };
    return (
        <div>
            <Navbar />
            <HeaderComponent />
            <h1>프로젝트 게시물 생성</h1>
            <form>
                <div>
                    <label htmlFor="project_title">프로젝트 제목:</label>
                    <input
                        type="text"
                        id="project_title"
                        name="project_title"
                        value={formData.project_title}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="post_content">프로젝트 설명:</label>
                    <textarea
                        id="post_content"
                        name="post_content"
                        value={formData.post_content}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="required_skills">필요 기술:</label>
                    <input
                        type="text"
                        id="required_skills"
                        name="required_skills"
                        value={formData.required_skills}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="project_location">프로젝트 위치:</label>
                    <input
                        type="text"
                        id="project_location"
                        name="project_location"
                        value={formData.project_location}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="project_field">프로젝트 분야:</label>
                    <input
                        type="text"
                        id="project_field"
                        name="project_field"
                        value={formData.project_field}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="project_start_date">시작 날짜:</label>
                    <input
                        type="date"
                        id="project_start_date"
                        name="project_start_date"
                        value={formData.project_start_date}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="project_end_date">종료 날짜:</label>
                    <input
                        type="date"
                        id="project_end_date"
                        name="project_end_date"
                        value={formData.project_end_date}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="team_size">팀 크기:</label>
                    <input
                        type="number"
                        id="team_size"
                        name="team_size"
                        value={formData.team_size}
                        onChange={handleChange}
                    />
                </div>
                {/* 다른 폼 필드들을 추가하세요 */}
                <button type="button" onClick={handleCreatePost}>
                    게시물 생성
                </button>
            </form>
        </div>
    );
}

export default CreatePostComponent;
