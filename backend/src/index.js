import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB, isConnected } from './db.js'
import reportsRouter from './routes/reports.js'

const app = express()
const PORT = process.env.PORT || 3001
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173'

app.use(cors({ origin: CORS_ORIGIN, credentials: true }))
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'Carbon Footprint API', db: isConnected() })
})

app.use('/api/reports', reportsRouter)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})

connectDB().catch((err) => {
  console.error('MongoDB connection failed:', err.message)
  console.error('Make sure MongoDB is running (e.g. mongod) or set MONGODB_URI in .env')
})
