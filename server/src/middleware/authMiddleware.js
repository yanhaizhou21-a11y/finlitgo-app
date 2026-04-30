import jwt from 'jsonwebtoken'

function extractToken(req) {
  const cookieToken = req.cookies?.token
  if (cookieToken) return cookieToken

  const header = req.headers?.authorization
  if (!header || typeof header !== 'string') return null

  const [type, value] = header.split(' ')
  if (type?.toLowerCase() !== 'bearer') return null
  return value ?? null
}

export function requireAuth(req, res, next) {
  const token = extractToken(req)
  if (!token) return res.status(401).json({ error: 'Unauthorized' })

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = payload
    return next()
  } catch {
    return res.status(401).json({ error: 'Invalid token' })
  }
}