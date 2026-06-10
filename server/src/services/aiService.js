import dotenv from 'dotenv'
dotenv.config()

const GROQ_API_KEY = process.env.GROQ_API_KEY
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const DEFAULT_MODEL = 'llama-3.3-70b-versatile'

// Non-streaming reply (legacy / simple endpoint)
export async function generateReply(message) {
  if (!GROQ_API_KEY) {
    console.warn('GROQ_API_KEY not set, returning echo fallback')
    return `You said: ${message}`
  }

  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: DEFAULT_MODEL,
      messages: [{ role: 'user', content: message }],
      temperature: 0.65,
      max_tokens: 1024,
    }),
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`Groq API error ${res.status}: ${errText}`)
  }

  const data = await res.json()
  return data.choices?.[0]?.message?.content || 'No response generated.'
}

// Streaming reply — pipes Groq SSE stream directly to the client
export async function streamReply(messages, res) {
  if (!GROQ_API_KEY) {
    res.write('data: ' + JSON.stringify({ content: 'Groq API key not configured on server.' }) + '\n\n')
    res.write('data: [DONE]\n\n')
    res.end()
    return
  }

  const groqRes = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: DEFAULT_MODEL,
      messages,
      stream: true,
      temperature: 0.65,
      max_tokens: 1024,
    }),
  })

  if (!groqRes.ok) {
    const errText = await groqRes.text()
    throw new Error(`Groq API error ${groqRes.status}: ${errText}`)
  }

  // Pipe the SSE stream from Groq to the client
  const reader = groqRes.body.getReader()
  const decoder = new TextDecoder()

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      const chunk = decoder.decode(value, { stream: true })
      res.write(chunk)
    }
  } finally {
    res.write('data: [DONE]\n\n')
    res.end()
  }
}
