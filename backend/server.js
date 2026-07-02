const dns = require('dns')
dns.setServers(['8.8.8.8', '8.8.4.4'])
const express = require('express')
const app = express()
const PORT = 8000

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes

// Server Start
app.listen(PORT, () => {
    console.log(`Server Started On Port : ${PORT}`)
})
