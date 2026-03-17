const express = require('express');
const { postChat } = require('../controllers/chatController');

const router = express.Router();

router.post('/', postChat);

module.exports = router;

