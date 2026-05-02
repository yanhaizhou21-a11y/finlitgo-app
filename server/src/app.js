import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import dotenv from 'dotenv'
import { initPassport } from './config/passport.js'
import authRoutes from './routes/authRoutes.js'
import chatRoutes from './routes/chatRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import classRoutes from './routes/classRoutes.js'
import notFound from './middleware/notFound.js'
import errorHandler from './middleware/errorHandler.js'

dotenv.config()
initPassport()

const app = express()

// Allow multiple origins in production (e.g., the vercel domain)
const allowedOrigins = process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : [];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1 && process.env.NODE_ENV === 'production' && !origin.includes('vercel.app')) {
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true               // allow cookies
}))
app.use(cookieParser())
app.use(express.json())
app.use(passport.initialize())

app.get('/', (req, res) => {
  res.send('Server is running perfectly!')
})

app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from your Express API!' })
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/classes', classRoutes)

app.use(notFound)
app.use(errorHandler)

export default app