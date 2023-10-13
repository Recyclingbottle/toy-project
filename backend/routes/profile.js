const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const ProfileInfo = require('../models/profile_info');
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

router.get('/', authenticateToken, async (req, res) => {
    try {
        const profile = await ProfileInfo.findOne({ where: { user_id: req.user.id } });
        if (!profile) return res.status(404).json({ error: '프로필을 찾을 수 없습니다.' });
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ error: '프로필 정보를 가져오는 중 오류가 발생하였습니다.' });
    }
});

router.post('/register', authenticateToken, async (req, res) => {
    try {
        const profileData = {
            ...req.body,
            user_id: req.user.id
        };
        const profile = await ProfileInfo.create(profileData);
        res.status(201).json(profile);
    } catch (error) {
        res.status(500).json({ message: '프로필 등록에 실패하였습니다.' });
    }
});

router.put('/update', authenticateToken, async (req, res) => {
    try {
        const updatedProfile = await ProfileInfo.update(req.body, { where: { user_id: req.user.id } });
        if (updatedProfile[0] === 0) return res.status(404).json({ error: '프로필을 찾을 수 없습니다.' });
        res.status(200).json({ message: '프로필이 성공적으로 수정되었습니다.' });
    } catch (error) {
        res.status(500).json({ message: '프로필 수정에 실패하였습니다.' });
    }
});

//그냥 전체 수정하는 로직으로 사용하고 
//스킬셋, 경험, 포트폴리오 각각 하나만 수정하는 로직을 삭제해도 좋을 거 같다
// router.put('/skills', authenticateToken, async (req, res) => {
//     try {
//         const updatedProfile = await ProfileInfo.update({ skill_set: req.body.skills }, { where: { user_id: req.user.id } });

//         if (updatedProfile[0] === 0) {
//             return res.status(404).json({ error: '프로필을 찾을 수 없습니다.' });
//         }

//         res.status(200).json({ message: '스킬셋이 성공적으로 등록되었습니다.' });
//     } catch (error) {
//         res.status(500).json({ message: '스킬셋 등록에 실패하였습니다.' });
//     }
// });

// router.put('/experience', authenticateToken, async (req, res) => {
//     try {
//         const updatedProfile = await ProfileInfo.update({ experience: req.body.experience }, { where: { user_id: req.user.id } });

//         if (updatedProfile[0] === 0) {
//             return res.status(404).json({ error: '프로필을 찾을 수 없습니다.' });
//         }

//         res.status(200).json({ message: '경력이 성공적으로 등록되었습니다.' });
//     } catch (error) {
//         res.status(500).json({ message: '경력 등록에 실패하였습니다.' });
//     }
// });

// router.put('/portfolio', authenticateToken, async (req, res) => {
//     try {
//         const updatedProfile = await ProfileInfo.update({ portfolio_link: req.body.link }, { where: { user_id: req.user.id } });

//         if (updatedProfile[0] === 0) {
//             return res.status(404).json({ error: '프로필을 찾을 수 없습니다.' });
//         }

//         res.status(200).json({ message: '포트폴리오 링크가 성공적으로 수정되었습니다.' });
//     } catch (error) {
//         res.status(500).json({ error: '포트폴리오 링크 수정에 실패하였습니다.' });
//     }
// });

module.exports = router;
