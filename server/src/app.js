import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import dotenv from 'dotenv'
import { initPassport } from './config/passport.js'
import authRoutes from './routes/authRoutes.js'
import chatRoutes from './routes/chatRoutes.js' // your existing routes
import notFound from './middleware/notFound.js'
import errorHandler from './middleware/errorHandler.js'

<<<<<<< HEAD
dotenv.config()
initPassport()
=======
const chatRoutes = require('./routes/chatRoutes');
const blogRoutes = require('./routes/blogRoutes');
const classRoutes = require('./routes/classRoutes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
>>>>>>> auth-backend

const app = express()

app.use(cors({
  origin: process.env.CLIENT_URL, // e.g. http://localhost:5173
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

<<<<<<< HEAD
// Routes
app.use('/api/auth', authRoutes)
app.use('/api/chat', chatRoutes) // your existing chat routes
=======
app.use('/api/chat', chatRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/classes', classRoutes);
>>>>>>> auth-backend

app.use(notFound)
app.use(errorHandler)

export default app