import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function ProjectModal({ projectId, onClose }) {
    const token = useSelector(state => state.auth.token);
    const [responseMessage, setResponseMessage] = useState('');
    const [applicationStatus, setApplicationStatus] = useState('수락');
    const [postData, setPostData] = useState({ project_title: '', post_content: '' });
    const [applicantProfile, setApplicantProfile] = useState(null);

    useEffect(() => {
        const fetchWithAuthorization = async (url) => {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            return response.ok ? await response.json() : null;
        };

        const fetchProjectData = async () => {
            const projectData = await fetchWithAuthorization(`http://localhost:5000/part/${projectId}`);
            if (!projectData) {
                console.error('프로젝트 데이터 조회에 실패했습니다.');
                return;
            }

            const postData = await fetchWithAuthorization(`http://localhost:5000/pboard/${projectData.post_id}`);
            if (postData) {
                setPostData({
                    project_title: postData.project_title,
                    post_content: postData.post_content
                });
            } else {
                console.error('게시물 조회에 실패했습니다.');
            }

            const profileData = await fetchWithAuthorization(`http://localhost:5000/profile/${projectData.user_id}`);
            if (profileData) {
                setApplicantProfile(profileData);
            } else {
                console.error('프로필 조회에 실패했습니다.');
            }
        };

        fetchProjectData();
    }, [projectId, token]);
    

    const handleResponse = async (applicationId) => {
        try {
            const response = await fetch(`http://localhost:5000/part/response/${applicationId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    response_message: responseMessage,
                    application_status: applicationStatus // 선택된 응답 상태를 보냄
                })
            });

            if (response.status === 200) {
                const data = await response.json();
                alert(data.message);
            } else {
                alert('참가 수락/거절에서 오류가 발생했습니다.');
            }
        } catch (error) {
            alert('참가 수락/거절에서 오류가 발생했습니다.');
        }
    };

    return (
        <div className="project-modal">
            <h2>프로젝트 정보</h2>
            <p>제목: {postData.project_title}</p>
            <p>내용: {postData.post_content}</p>
            <h3>신청자 프로필 보기</h3>
            {applicantProfile ? (
            <div>
                <p>나이: {applicantProfile.age}</p>
                <p>성별: {applicantProfile.gender}</p>
                <p>직업: {applicantProfile.occupation}</p>
                <p>전화번호: {applicantProfile.phone_number}</p>
                <p>포트폴리오 링크: {applicantProfile.portfolio_link}</p>
                <p>기술 스택: {applicantProfile.skill_set}</p>
                <p>자기소개: {applicantProfile.about_me}</p>
                <p>주소: {applicantProfile.address}</p>
                <p>경력: {applicantProfile.experience}</p>
            </div>
        ) : (
            <p>프로필이 없는 사용자입니다.</p>
        )}
            <label>
                응답 메시지:
                <input
                    type="text"
                    value={responseMessage}
                    onChange={(e) => setResponseMessage(e.target.value)}
                />
            </label>
            <label>
                응답 상태:
                <select
                    value={applicationStatus}
                    onChange={(e) => setApplicationStatus(e.target.value)}
                >
                    <option value="수락">수락</option>
                    <option value="거절">거절</option>
                </select>
            </label>
            <button onClick={() => handleResponse(projectId)}>응답 보내기</button>
            <button onClick={onClose}>닫기</button>
        </div>
    );
}

export default ProjectModal;
