import express from 'express'
import passport from 'passport'
import { googleCallback, getMe, logout } from '../controllers/authController.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

// Fallback if CLIENT_URL is not set
const getClientUrl = () => process.env.CLIENT_URL || '';

// Redirect user to Google
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false
}))

// Google redirects back here
router.get('/google/callback',
  (req, res, next) => {
    passport.authenticate('google', { session: false, failureRedirect: `${getClientUrl()}/login` })(req, res, next);
  },
  googleCallback
)

// Get current logged-in user
router.get('/me', requireAuth, getMe)

// Logout
router.post('/logout', logout)

export default router