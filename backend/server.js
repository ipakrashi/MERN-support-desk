const dns = require('dns')
dns.setServers(['8.8.8.8', '8.8.4.4'])
const express = require('express')
const colors = require('colors')
const router = require('./routes/userRoutes')
const ticketrouter = require('./routes/ticketRoutes')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 8000
const path = require('path')

// Connect To The Database
connectDB()

// Middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
// Routes
app.use('/api/users', router)
app.use('/api/tickets', ticketrouter)
if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/dist')))

  app.get('/{*splat}', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'dist', 'index.html')
    )
  })
} else {
  app.get('/', (req, res) => res.status(200).json({ message: 'Welcome to Support Desk API' }))
}
app.use(errorHandler)

// Server Start
app.listen(PORT, () => {
    console.log(`Server Started On Port : ${PORT}`.green.underline.bold)
})
