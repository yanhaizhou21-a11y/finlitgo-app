import jwt from 'jsonwebtoken'
import { findUserById } from '../models/userModel.js'

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
}

// Called after Google OAuth success
export const googleCallback = (req, res) => {
  const token = jwt.sign(
    { id: req.user.id, email: req.user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
  res.cookie('token', token, COOKIE_OPTIONS)
  res.redirect(`${process.env.CLIENT_URL}/dashboard`)
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
  res.clearCookie('token')
  res.json({ success: true })
}