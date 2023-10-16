const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const ProjectParticipation = require('../models/project_participation');
const Notification = require('../models/notification');
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

// 신청하기 로직
router.post('/apply/:postId', authenticateToken, async (req, res) => {
    try {
        // 해당 게시글 조회
        const post = await Post.findByPk(req.params.postId);
        if (!post) return res.status(404).json({ error: '해당 게시글을 찾을 수 없습니다.' });

        const participationData = {
            post_id: req.params.postId,
            user_id: req.user.id,
            application_datetime: new Date(),
            application_status: '신청중'
        };

        const application = await ProjectParticipation.create(participationData);

        // 알림 생성
        await Notification.create({
            user_id: post.user_id,   // 게시글 작성자의 ID
            notification_type: '프로젝트참가요청',
            related_item_type: '프로젝트',
            related_item_id: application.application_id,
            notification_message: '새로운 프로젝트 참가 요청이 있습니다.',
            creation_datetime: new Date()
        });

        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ error: '신청 과정에서 오류가 발생했습니다.' });
    }
});


// 반응하는 로직: 승인/거절 + 메세지
router.put('/response/:applicationId', authenticateToken, async (req, res) => {
    try {
        const { response_message, application_status } = req.body;

        if (!['수락', '거절'].includes(application_status)) {
            return res.status(400).json({ error: '잘못된 응답 상태입니다.' });
        }

        const application = await ProjectParticipation.findByPk(req.params.applicationId);

        if (!application) {
            return res.status(404).json({ error: '신청 내역을 찾을 수 없습니다.' });
        }

        application.response_message = response_message;
        application.application_status = application_status;
        application.organizer_reaction_datetime = new Date();

        await application.save();

        // 알림 생성
        const notificationMessage = application_status === '수락' ? '프로젝트 참가가 승인되었습니다.' : '프로젝트 참가가 거절되었습니다.';
        await Notification.create({
            user_id: application.user_id, // 참가를 신청한 사용자에게 알림
            notification_type: application_status === '수락' ? '참가수락' : '참가거절',
            related_item_type: '프로젝트',
            related_item_id: application.application_id,
            notification_message: notificationMessage,
            creation_datetime: new Date()
        });

        res.status(200).json({ message: '성공적으로 반응하였습니다.' });
    } catch (error) {
        res.status(500).json({ error: '반응 과정에서 오류가 발생했습니다.' });
    }
});


module.exports = router;
