import express from 'express'
import passport from 'passport'
import { googleCallback, getMe, logout } from '../controllers/authController.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

// Fallback if CLIENT_URL is not set
const getClientUrl = () => process.env.CLIENT_URL?.split(',')[0]?.trim() || process.env.FRONTEND_URL?.split(',')[0]?.trim() || '';

// Redirect user to Google
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false
}))

// Google redirects back here
router.get('/google/callback',
  (req, res, next) => {
    const clientUrl = getClientUrl()
    const failureRedirect = clientUrl ? `${clientUrl}/login` : '/login'
    passport.authenticate('google', { session: false, failureRedirect })(req, res, next);
  },
  googleCallback
)

// Get current logged-in user
router.get('/me', requireAuth, getMe)

// Logout
router.post('/logout', logout)

export default router