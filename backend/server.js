const dns = require('dns')
dns.setServers(['8.8.8.8', '8.8.4.4'])
const express = require('express')
const colors = require('colors')
const router = require('./routes/userRoutes')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 8000

// Connect To The Database
connectDB()

// Middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Routes
app.use('/api/users', router)

app.use(errorHandler)

// Server Start
app.listen(PORT, () => {
    console.log(`Server Started On Port : ${PORT}`.green.underline.bold)
})
