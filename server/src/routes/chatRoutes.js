import express from 'express'
import { postChat } from '../controllers/chatController.js'

const router = express.Router()

router.post('/', postChat)

export default router

