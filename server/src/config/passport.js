import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { findOrCreateGoogleUser } from '../models/userModel.js'

export const initPassport = () => {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    // Allow booting the server without OAuth configured (dev).
    return
  }

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback',
    proxy: true
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await findOrCreateGoogleUser(profile)
      return done(null, user)
    } catch (err) {
      return done(err, null)
    }
  }))
}