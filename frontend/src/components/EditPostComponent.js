import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function PostEditComponent() {
    const [post, setPost] = useState(null);
    const { postId } = useParams();
    const navigate = useNavigate();
    //redux 스토어에 있는 토큰 가져오기
    const token = useSelector(state => state.auth.token);
    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/pboard/${postId}/permission`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                console.log(data);
                if (response.status === 200) {
                    setPost(data);
                } else if (response.status === 403) {
                    alert(data.error);
                    navigate(-1); // 이전 페이지로 이동
                } else if (response.status === 404) {
                    alert(data.error);
                    navigate(-1); // 이전 페이지로 이동
                } else {
                    alert('게시물 데이터를 가져오는 중 오류가 발생했습니다.');
                    navigate(-1); // 이전 페이지로 이동
                }
            } catch (error) {
                alert('게시물 데이터를 가져오는 중 오류가 발생했습니다.');
                navigate(-1); // 이전 페이지로 이동
            }
        };

        fetchPostData();
    }, [postId, token, navigate]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPost(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();  // 폼 제출을 방지

        try {
            const response = await fetch(`http://localhost:5000/pboard/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(post)
            });

            const data = await response.json();

            if (response.status === 200) {
                alert(data.message);
                navigate(`/post/${postId}`);
            } else {
                alert(data.error);
                navigate(`/post/${postId}`);
            }
        } catch (error) {
            alert('게시물 수정 중 오류가 발생했습니다.');
            navigate(`/post/${postId}`);
        }
    };

    if (!post) {
        return <div>로딩중...</div>;
    }

    return (
        <div>
            <h2>게시물 수정</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>프로젝트 제목:</label>
                    <input
                        type="text"
                        name="project_title"
                        value={post.project_title}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>프로젝트 상세 설명:</label>
                    <textarea
                        name="post_content"
                        value={post.post_content}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div>
                    <label>프로젝트 필드:</label>
                    <input
                        type="text"
                        name="project_field"
                        value={post.project_field}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>프로젝트 진행 지역:</label>
                    <input
                        type="text"
                        name="project_location"
                        value={post.project_location}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>프로젝트 시작 날짜:</label>
                    <input
                        type="date"
                        name="project_start_date"
                        value={post.project_start_date}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>프로젝트 종료 날짜:</label>
                    <input
                        type="date"
                        name="project_end_date"
                        value={post.project_end_date}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>프로젝트 상태:</label>
                    <select
                        name="project_status"
                        value={post.project_status}
                        onChange={handleInputChange}
                    >
                        <option value="모집중">모집중</option>
                        <option value="모집완료">모집완료</option>
                    </select>
                </div>
                <div>
                    <label>필요한 스킬:</label>
                    <input
                        type="text"
                        name="required_skills"
                        value={post.required_skills}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>모집 인원:</label>
                    <input
                        type="number"
                        name="team_size"
                        value={post.team_size}
                        onChange={handleInputChange}
                        min="1" // 최소 1명
                    />
                </div>
                <button type="submit">게시물 수정 완료</button>
            </form>
        </div>
    );
}

export default PostEditComponent;
