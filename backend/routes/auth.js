const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();


//토근 생성을 위한 key, 외부 파일에 따로 설정하는 것이 권장됨 
//따라서 외부 파일의 key 로 가져옴
const { SECRET_KEY } = require('./jwt_config');
// 사용자 정보를 다루는 Sequelize 모델 가져오기
const UserInfo = require('../models/user_info');

//회원가입
router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await UserInfo.create({ ...req.body, password: hashedPassword });
        res.status(201).json(newUser);
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            return res.status(400).json({
                code: 'DUPLICATE_EMAIL',
                message: '이미 등록된 이메일입니다.'
            });
        }
        res.status(500).json({
            code: 'INTERNAL_SERVER_ERROR',
            message: '서버 오류가 발생하였습니다.'
        });
    }
});

// 로그인
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserInfo.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({
                code: 'USER_NOT_FOUND',
                message: '사용자를 찾을 수 없습니다.'
            });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({
                code: 'INVALID_PASSWORD',
                message: '인증에 실패했습니다.'
            });
        }

        const token = jwt.sign({
            id: user.user_id,
            email: user.email,
            nickname: user.nickname
        }, SECRET_KEY, {
            expiresIn: '1h'
        });

        res.json({ token });
    } catch (error) {
        res.status(500).json({
            code: 'INTERNAL_SERVER_ERROR',
            message: '서버 오류가 발생하였습니다.'
        });
    }
});

module.exports = router;
