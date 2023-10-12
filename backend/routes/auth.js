const express = require('express');
const router = express.Router();

// 사용자 정보를 다루는 Sequelize 모델 가져오기
const UserInfo = require('../models/UserInfo');

router.post('/register', async (req, res) => {
    try {
        const newUser = await UserInfo.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/login', async (req, res) => {
    // 로그인 로직 (예: 비밀번호 확인, 토큰 생성 등)
    // ...
});

module.exports = router;
