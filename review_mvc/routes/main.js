const express = require('express');
const router = express.Router();
const controller = require('../controller/Cmain');

// index
router.get('/', controller.main);
// 전체 댓글보기
router.get('/comments',controller.getComments);
// 상세보기
router.get('/comment/:id', controller.getComment);

module.exports = router;
