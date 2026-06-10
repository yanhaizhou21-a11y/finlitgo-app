import { generateReply, streamReply } from '../services/aiService.js'

const MAX_MESSAGE_LENGTH = 4000

export async function postChat(req, res, next) {
  try {
    const { message } = req.body ?? {}
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'message is required' })
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({ error: `Message too long. Max ${MAX_MESSAGE_LENGTH} characters.` })
    }

    const reply = await generateReply(message)
    return res.json({ reply })
  } catch (err) {
    return next(err)
  }
}

// Streaming chat endpoint — proxies to Groq with SSE
export async function streamChat(req, res, next) {
  try {
    const { messages } = req.body ?? {}
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array is required' })
    }

    // Validate and sanitize messages
    const sanitized = messages
      .filter(m => m && typeof m.role === 'string' && typeof m.content === 'string')
      .map(m => ({
        role: m.role,
        content: m.content.slice(0, MAX_MESSAGE_LENGTH),
      }))

    if (sanitized.length === 0) {
      return res.status(400).json({ error: 'No valid messages provided' })
    }

    // Set SSE headers
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    res.setHeader('X-Accel-Buffering', 'no') // Disable nginx buffering

    await streamReply(sanitized, res)
  } catch (err) {
    // If headers already sent, log the error; otherwise send JSON error
    if (res.headersSent) {
      console.error('Stream chat error:', err)
      res.end()
    } else {
      return next(err)
    }
  }
}
