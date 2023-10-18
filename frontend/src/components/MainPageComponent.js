import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import HeaderComponent from './HeaderComponent';
import Navbar from './NavbarComponent';


function MainPageComponent() {
    const [posts, setPosts] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const navigate = useNavigate();

    // Redux 스토어에서 토큰 및 프로필 데이터 가져오기
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:5000/pboard', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error("게시글 로딩에 실패했습니다", error);
            }
        };

        fetchPosts();
    }, [token]);

    // 게시글 등록 시 실행되는 함수
    const handleCreatePost = () => {
        navigate('/create-post');
    }

    // 개별 게시물 보기 처리
    const handleViewPost = (postId) => {
        navigate(`/post/${postId}`);
    }

    return (
        <div>
            <Navbar />
            <HeaderComponent />
            <div className="main-content">
                <input type="text" placeholder="검색어를 입력하세요" />

                <button onClick={handleCreatePost}>게시글 등록하기</button>

                <div className="cards">
                    {posts.map(post => (
                        <div key={post.post_id} className="card" onClick={() => handleViewPost(post.post_id)}>
                            <h3>{post.project_title}</h3>
                            <p>{post.post_content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MainPageComponent;
