import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import HeaderComponent from './HeaderComponent';
import Navbar from './NavbarComponent';

function PostDetailComponent() {
    const [post, setPost] = useState(null);
    const token = useSelector(state => state.auth.token);
    const { postId } = useParams();

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
            <button>수정하기</button>
            <button>삭제하기</button>
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
                <li>
                    <strong>참고 이미지(나중에 이미지 올 예정):</strong> {post.project_image}
                </li>
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
            <h2>Q&A</h2>
            <h3>질문과 답변이 있을 공간입니다.</h3>
        </div>
    );

}

export default PostDetailComponent;
