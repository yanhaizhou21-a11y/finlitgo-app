import { generateReply } from '../services/aiService.js'

export async function postChat(req, res, next) {
  try {
    const { message } = req.body ?? {}
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'message is required' })
    }

    const reply = await generateReply(message)
    return res.json({ reply })
  } catch (err) {
    return next(err)
  }
}

