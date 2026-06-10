import express from 'express';
import { postChat, streamChat } from '../controllers/chatController.js';

const router = express.Router();

router.post('/', postChat);
router.post('/stream', streamChat);

export default router;
