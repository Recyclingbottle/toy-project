import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import HeaderComponent from './HeaderComponent';
import Navbar from './NavbarComponent';
import QnAComponent from './QnAComponent'; 

function PostDetailComponent() {
    const [post, setPost] = useState(null);
    const token = useSelector(state => state.auth.token);
    const { postId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:5000/pboard/${postId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setPost(data);
                } else {
                    console.error('게시물 조회에 실패했습니다.');
                }
            } catch (error) {
                console.error('게시물 조회에 실패했습니다.', error);
            }
        };

        fetchPost();
    }, [postId, token]);


    const handleEditClick = () => {
        navigate(`/edit-post/${postId}`);
    };
    const handleDeleteClick = async () => {
        const userConfirmation = window.confirm('삭제하시겠습니까?');

        if (userConfirmation) {
            try {
                const response = await fetch(`http://localhost:5000/pboard/${postId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (response.status === 200) {
                    alert(data.message);
                    navigate('/');
                } else if (response.status === 500) {
                    alert(data.error);
                }
            } catch (error) {
                console.error('게시물 삭제 중 오류가 발생했습니다.', error);
                alert('게시물 삭제 중 오류가 발생했습니다.');
            }
        }
    };

    const handleApplyClick = async () => {
        const userConfirmation = window.confirm('참가 신청을 하시겠습니까?');

        if (userConfirmation) {
            try {
                const response = await fetch(`http://localhost:5000/part/apply/${postId}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (response.status === 200) {
                    alert('참가 신청이 완료되었습니다.');
                } else if (response.status === 500) {
                    alert(data.error);
                }
            } catch (error) {
                console.error('참가 신청 중 오류가 발생했습니다.', error);
                alert('참가 신청 중 오류가 발생했습니다.');
            }
        }
    };

    if (!post) {
        return (
            <div>
                <Navbar />
                <HeaderComponent />
                <div>로딩중입니다...</div>
            </div>
        );
    }


    // post 객체의 모든 속성을 매핑하여 출력
    return (
        <div>
            <Navbar />
            <HeaderComponent />
            <h2>{post.project_title}</h2>
            <button onClick={handleEditClick}>수정하기</button>
            <button onClick={handleDeleteClick}>삭제하기</button>
            <p>{post.post_content}</p>
            <ul>
                <li>
                    <strong>게시글 번호:</strong> {post.post_id}
                </li>
                <li>
                    <strong>작성자:</strong> {post.user_id}
                </li>
                <li>
                    <strong>프로젝트 제목:</strong> {post.project_title}
                </li>
                <li>
                    <strong>프로젝트 상세 설명:</strong> {post.post_content}
                </li>
                <li>
                    <strong>필요한 기술 스택:</strong> {post.required_skills}
                </li>
                <li>
                    <strong>프로젝트 위치:</strong> {post.project_location}
                </li>
                <li>
                    <strong>프로젝트 분야:</strong> {post.project_field}
                </li>
                <li>
                    <strong>프로젝트 상태:</strong> {post.project_status}
                </li>
                <li>
                    <strong>프로젝트 시작일:</strong> {post.project_start_date}
                </li>
                <li>
                    <strong>프로젝트 종료일:</strong> {post.project_end_date}
                </li>
                {/* <li>
                    <strong>참고 이미지(나중에 이미지 올 예정):</strong> {post.project_image}
                </li> */}
                <li>
                    <strong>조회수:</strong> {post.view_count}
                </li>
                <li>
                    <strong>좋아요 수:</strong> {post.likes}
                </li>
                <li>
                    <strong>작성일:</strong> {post.post_datetime}
                </li>
            </ul>
            <div>
                <button onClick={handleApplyClick}>참가 신청 하기</button>
            </div>
            <div>
                <h2>Q&A</h2>
                <QnAComponent postId={postId} />
            </div>
        </div>
    );
}

export default PostDetailComponent;
