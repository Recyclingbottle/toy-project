const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');
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

// 내 알림 조회
router.get('/', authenticateToken, async (req, res) => {
    try {
        const notifications = await Notification.findAll({
            where: { user_id: req.user.id },
            order: [['creation_datetime', 'DESC']]
        });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: '알림을 불러오는 중 오류가 발생했습니다.' });
    }
});

// 알림 읽기
router.put('/read/:notificationId', authenticateToken, async (req, res) => {
    try {
        const notification = await Notification.findByPk(req.params.notificationId);
        if (!notification) return res.status(404).json({ error: '알림을 찾을 수 없습니다.' });

        notification.is_read = true;
        await notification.save();

        res.status(200).json({ message: '알림을 읽었습니다.' });
    } catch (error) {
        res.status(500).json({ error: '알림 읽기 중 오류가 발생했습니다.' });
    }
});

// 알림 삭제
router.delete('/:notificationId', authenticateToken, async (req, res) => {
    try {
        const result = await Notification.destroy({ where: { notification_id: req.params.notificationId, user_id: req.user.id } });
        if (result === 0) return res.status(404).json({ error: '삭제할 알림을 찾을 수 없습니다.' });
        res.status(200).json({ message: '알림이 성공적으로 삭제되었습니다.' });
    } catch (error) {
        res.status(500).json({ error: '알림 삭제 중 오류가 발생했습니다.' });
    }
});

module.exports = router;
