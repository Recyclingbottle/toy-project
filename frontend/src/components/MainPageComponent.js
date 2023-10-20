import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from './NavbarComponent';
import HeaderComponent from './HeaderComponent';

function MainPageComponent() {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);

    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token);

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

    useEffect(() => {
        const results = posts.filter(post => 
            post.project_title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPosts(results);
    }, [searchTerm, posts]);

    const handleCreatePost = () => {
        navigate('/create-post');
    }

    const handleViewPost = (postId) => {
        navigate(`/post/${postId}`);
    }

    return (
        <div>
            <Navbar />
            <HeaderComponent />
            <div className="main-content">
                <input 
                    type="text" 
                    placeholder="검색어를 입력하세요" 
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <button onClick={handleCreatePost}>게시글 등록하기</button>
                <div className="cards">
                    {filteredPosts.map(post => (
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
