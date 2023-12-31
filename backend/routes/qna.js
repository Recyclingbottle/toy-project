const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const QnA = require('../models/qna');
const Notification = require('../models/notification');  // 알림 모델 임포트
const Post = require('../models/post');

const { SECRET_KEY } = require('./jwt_config');

// JWT 토큰 인증 미들웨어
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(403).json({ error: '토큰이 필요합니다.' });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ error: '토큰이 유효하지 않습니다.' });

        req.user = decoded;
        next();
    });
};

// 게시물 정보를 가져오는 함수
const getPostById = async (postId) => {
    try {
        const post = await Post.findByPk(postId);
        return post;
    } catch (error) {
        console.error('게시물 정보를 가져오는 중 오류 발생:', error);
        throw error;
    }
};


// QnA에 질문 등록
router.post('/ask', authenticateToken, async (req, res) => {
    try {
        const { post_id, question_content } = req.body;
        const user_id = req.user.id;
        const question_datetime = new Date();

        // 게시물 정보 가져오기
        const post = await getPostById(post_id);

        if (!post) {
            // 게시물을 찾을 수 없을 경우에 대한 처리
            return res.status(404).json({ error: '게시물을 찾을 수 없습니다.' });
        }

        const questionData = {
            post_id,
            user_id,
            question_content,
            question_datetime
        };
        const question = await QnA.create(questionData);

        // 알림 생성 (게시글 작성자에게)
        await Notification.create({
            user_id: post.user_id, // 게시물 작성자의 user_id 사용
            notification_type: '질문요청',
            related_item_type: 'QnA',
            related_item_id: post_id,
            notification_message: '새로운 질문이 등록되었습니다.',
            creation_datetime: new Date()
        });


        res.status(201).json(question);
    } catch (error) {
        // 추가: 오류 로그 출력
        console.error('질문 등록 중 오류가 발생했습니다.', error);

        res.status(500).json({ error: '질문 등록 중 오류가 발생했습니다.' });
    }
});


// 특정 게시물에 대한 모든 질문 조회
router.get('/:postId', async (req, res) => {
    try {
        const questions = await QnA.findAll({
            where: { post_id: req.params.postId }
        });
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ error: '질문을 불러오는 중 오류가 발생했습니다.' });
    }
});

// 답변 등록 및 수정
router.post('/:questionId/answer', authenticateToken, async (req, res) => {
    try {
        const question = await QnA.findByPk(req.params.questionId);
        if (!question) return res.status(404).json({ error: '질문을 찾을 수 없습니다.' });

        // 게시글 작성자와 현재 사용자가 동일한지 확인하는 로직 추가 
        const relatedPost = await Post.findByPk(question.post_id);
        if (relatedPost.user_id !== req.user.id) {
            return res.status(403).json({ error: '이 질문에 답변할 권한이 없습니다.' });
        }

        question.answer_content = req.body.answer_content;
        question.answer_datetime = new Date();
        question.answerer_id = req.user.id;
        await question.save();

        // 알림 생성 (질문 등록자에게)
        await Notification.create({
            user_id: question.user_id,
            notification_type: '답변알림',
            related_item_type: 'QnA',
            related_item_id: question.question_id,
            notification_message: '당신의 질문에 답변이 등록되었습니다.',
            creation_datetime: new Date()
        });

        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ error: '답변 등록/수정 중 오류가 발생했습니다.' });
    }
});


module.exports = router;

