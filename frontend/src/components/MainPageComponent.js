import React, { useState, useEffect } from 'react';
import HeaderComponent from './HeaderComponent';
import Navbar from './Navbar';
function MainPageComponent() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:5000/pboard');
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error("게시글 로딩에 실패했습니다", error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <Navbar />
            <HeaderComponent />
            <div className="main-content">
                <h2>옅구름</h2>
                <p>토이프로젝트 팀원 찾기 사이트</p>
                <input type="text" placeholder="검색어를 입력하세요" />

                <div className="cards">
                    {posts.map(post => (
                        <div key={post.post_id} className="card">
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
