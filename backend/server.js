const dns = require('dns')
dns.setServers(['8.8.8.8', '8.8.4.4'])
const express = require('express')
const router = require('./routes/userRoutes')
const dotenv = require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 8000

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes
app.use('/api/users', router)

// Server Start
app.listen(PORT, () => {
    console.log(`Server Started On Port : ${PORT}`)
})
