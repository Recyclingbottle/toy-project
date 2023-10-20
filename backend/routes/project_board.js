const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

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

// 전체 게시물 조회 (조회수 오르지 않음)
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: '게시물을 불러오는 중 오류가 발생했습니다.' });
    }
});

// 개별 게시물 조회 (조회수 1 증가)
router.get('/:postId', async (req, res) => {
    const postId = req.params.postId;
    try {
        const post = await Post.findByPk(postId);
        if (!post) return res.status(404).json({ error: '게시물을 찾을 수 없습니다.' });

        // 조회수 1 증가
        post.view_count++;
        await post.save();

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: '게시물을 불러오는 중 오류가 발생했습니다.' });
    }
});

// 게시물 등록
router.post('/', authenticateToken, async (req, res) => {
    try {
        const postData = {
            ...req.body,
            user_id: req.user.id
        };
        const post = await Post.create(postData);
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: '게시물 등록에 실패했습니다.' });
    }
});

// 게시물 권한 및 데이터 확인
router.get('/:postId/permission', authenticateToken, async (req, res) => {
    const postId = req.params.postId;
    try {
        const post = await Post.findOne({ where: { post_id: postId } });

        if (!post) return res.status(404).json({ error: '게시물을 찾을 수 없습니다.' });

        if (post.user_id !== req.user.id) return res.status(403).json({ error: '수정 권한이 없습니다.' });

        res.status(200).json(post);

    } catch (error) {
        res.status(500).json({ error: '권한 및 데이터 확인 중 오류가 발생했습니다.' });
    }
});


// 게시물 수정
router.put('/:postId', authenticateToken, async (req, res) => {
    const postId = req.params.postId;
    try {
        const result = await Post.update(req.body, { where: { post_id: postId, user_id: req.user.id } });
        if (result[0] === 0) return res.status(404).json({ error: '수정할 게시물을 찾을 수 없습니다.' });
        res.status(200).json({ message: '게시물이 성공적으로 수정되었습니다.' });
    } catch (error) {
        res.status(500).json({ error: '게시물 수정에 실패했습니다.' });
    }
});

// 게시물 삭제
router.delete('/:postId', authenticateToken, async (req, res) => {
    const postId = parseInt(req.params.postId, 10); // 문자열 postId를 숫자로 변환

    // 1. postId가 유효하지 않은 경우
    if (isNaN(postId)) {  // isNaN() 함수를 사용하여 숫자가 아닌 경우를 체크
        return res.status(400).json({ error: '유효하지 않은 게시물 아이디입니다.' });
    }

    try {
        const result = await Post.destroy({ where: { post_id: postId, user_id: req.user.id } });

        // 4. 게시물이 존재하지 않는 경우
        if (result === 0) return res.status(404).json({ error: '삭제할 게시물을 찾을 수 없습니다.' });

        // 성공 메시지
        res.status(200).json({ message: '게시물이 성공적으로 삭제되었습니다.' });
    } catch (error) {
        // 3. DB 연결 오류 또는 5. 기타 예외 오류
        console.error(error); // 실제 에러 로그를 콘솔에 출력 (추적을 위함)
        res.status(500).json({ error: '게시물 삭제에 실패했습니다.' });
    }
});


// 좋아요 기능
router.post('/:postId/like', authenticateToken, async (req, res) => {
    const postId = req.params.postId;
    try {
        const post = await Post.findByPk(postId);
        if (!post) return res.status(404).json({ error: '게시물을 찾을 수 없습니다.' });

        // 좋아요 1 증가
        post.likes++;
        await post.save();

        res.status(200).json({ message: '게시물에 좋아요를 성공적으로 눌렀습니다.' });
    } catch (error) {
        res.status(500).json({ error: '좋아요 기능에 오류가 발생했습니다.' });
    }
});

module.exports = router;
