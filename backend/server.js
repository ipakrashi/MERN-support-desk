const dns = require('dns')
dns.setServers(['8.8.8.8', '8.8.4.4'])
const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 8000

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes
app.get('/api/users', (req, res) => {
    res.status(200).json({ message: 'Welcome to Support Desk API' })
})

// Server Start
app.listen(PORT, () => {
    console.log(`Server Started On Port : ${PORT}`)
})
