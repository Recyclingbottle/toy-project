import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function QnAComponent({ postId }) {
    const [questions, setQuestions] = useState([]);
    const [questionContent, setQuestionContent] = useState('');
    const [answerContent, setAnswerContent] = useState({});
    const [editingAnswerId, setEditingAnswerId] = useState(null);

    const token = useSelector(state => state.auth.token);

    // 질문 등록
    const askQuestion = async () => {
        try {
            console.log(token);
            console.log(questionContent);
            const questionData = {
                post_id: postId, // 게시물의 고유 식별자
                question_content: questionContent, // 질문 내용
            };

            const response = await fetch('http://localhost:5000/qna/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(questionData)
            });

            const result = await response.json();
            console.log(result);

            // 질문을 등록한 후, 다시 질문 목록을 가져오기
            getQuestionsByPost(postId);
        } catch (error) {
            console.error('질문 등록 중 오류 발생:', error);
        }
    };

    // 특정 게시물에 대한 모든 질문 조회
    const getQuestionsByPost = async (postId) => {
        try {
            const response = await fetch(`http://localhost:5000/qna/${postId}`);
            const data = await response.json();
            setQuestions(data);
        } catch (error) {
            console.error('질문 조회 중 오류 발생:', error);
        }
    };

    // 답변 입력
    const handleAnswerChange = (questionId, answer) => {
        setAnswerContent({
            ...answerContent,
            [questionId]: answer,
        });
    };
    // 답변 등록
    const postAnswer = async (questionId, answer) => {
        try {
            const response = await fetch(`http://localhost:5000/qna/${questionId}/answer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ answer_content: answer })
            });

            const result = await response.json();
            console.log(result);

            // 답변을 등록한 후, 다시 질문 목록을 가져오기
            getQuestionsByPost(postId);
        } catch (error) {
            console.error('답변 등록 중 오류 발생:', error);
        }
    };
    // 수정한 답변을 서버로 전송하는 함수
    const editAnswer = async (questionId, answer) => {
        try {
            const response = await fetch(`http://localhost:5000/qna/${questionId}/answer`, {
                method: 'POST', // 수정은 PUT 메서드를 사용
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ answer_content: answer })
            });

            const result = await response.json();
            console.log(result);

            // 수정을 완료한 후, 해당 답변을 다시 보기 모드로 변경
            setEditingAnswerId(null);

            // 수정된 내용을 화면에 반영하기 위해 질문 목록을 다시 가져오기
            getQuestionsByPost(postId);
        } catch (error) {
            console.error('답변 수정 중 오류 발생:', error);
        }
    };

    useEffect(() => {
        // 페이지 로드 시 특정 게시물의 질문들을 불러오기 
        getQuestionsByPost(postId);
    }, [postId, token]);

    return (
        <div>
            <h2>QnA Section</h2>

            {/* 질문 등록 폼 */}
            <div>
                <h3>질문 등록</h3>
                <textarea
                    value={questionContent}
                    onChange={e => setQuestionContent(e.target.value)}
                    placeholder="질문을 입력하세요..."
                />
                <button onClick={askQuestion}>
                    질문 등록
                </button>
            </div>
            {/* 질문 및 답변 리스트 */}
            <div>
                {questions.length === 0 ? (
                    <p>질문이 없습니다.</p>
                ) : (
                    questions.map((question) => (
                        <div key={question.question_id} style={{ margin: '20px 0', border: '1px solid #ccc', padding: '10px' }}>
                            <p><strong>{question.question_content}</strong></p>
                            <p>{new Date(question.question_datetime).toLocaleString()}</p>

                            {/* 답변이 있는 경우 답변을 보여줍니다. */}
                            {question.answer_content ? (
                                <div>
                                    <p>{new Date(question.answer_datetime).toLocaleString()}</p>
                                    {/* 수정 버튼 */}
                                    <button onClick={() => setEditingAnswerId(question.question_id)}>
                                        수정
                                    </button>
                                    <p><em>답변:</em> {question.answer_content}</p>
                                </div>
                            ) : (
                                // 답변이 없는 경우 답변을 작성할 수 있게 합니다.
                                <div>
                                    <textarea
                                        value={answerContent[question.question_id] || ''}
                                        onChange={e => handleAnswerChange(question.question_id, e.target.value)}
                                        placeholder="답변을 입력하세요..."
                                    />
                                    {/* 답변 등록 버튼 */}
                                    <button onClick={() => postAnswer(question.question_id, answerContent[question.question_id])}>
                                        답변 등록
                                    </button>
                                </div>
                            )}

                            {/* 수정 상태일 때 수정 폼 표시 */}
                            {editingAnswerId === question.question_id && (
                                <div>
                                    <textarea
                                        value={answerContent[question.question_id] || ''}
                                        onChange={e => handleAnswerChange(question.question_id, e.target.value)}
                                        placeholder="답변을 수정하세요..."
                                    />
                                    {/* 수정 완료 버튼 */}
                                    <button onClick={() => editAnswer(question.question_id, answerContent[question.question_id])}>
                                        수정 완료
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}


export default QnAComponent;
