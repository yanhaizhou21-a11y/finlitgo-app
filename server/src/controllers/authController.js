import jwt from 'jsonwebtoken'
import { findUserById } from '../models/userModel.js'

const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Required for cross-site cookies in production
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});

// Called after Google OAuth success
export const googleCallback = (req, res) => {
  const token = jwt.sign(
    { id: req.user.id, email: req.user.email },
    process.env.JWT_SECRET || 'fallback_secret_for_dev',
    { expiresIn: '7d' }
  )
  res.cookie('token', token, getCookieOptions())
  const clientUrl = process.env.CLIENT_URL || '';
  res.redirect(`${clientUrl}/dashboard`)
}

// GET /api/auth/me — verify session
export const getMe = async (req, res) => {
  try {
    const user = await findUserById(req.user.id)
    if (!user) return res.status(404).json({ error: 'User not found' })
    return res.json(user)
  } catch {
    return res.status(500).json({ error: 'Failed to fetch user' })
  }
}

// POST /api/auth/logout
export const logout = (req, res) => {
  res.clearCookie('token', getCookieOptions())
  res.json({ success: true })
}