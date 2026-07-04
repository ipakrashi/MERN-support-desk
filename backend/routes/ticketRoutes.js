const express = require('express')
const ticketrouter = express.Router()
const { getTickets, createTicket } = require('../controllers/ticketController')

const { protect } = require('../middleware/authMiddleware')

// Routes
ticketrouter.get('/', protect, getTickets)
ticketrouter.post('/', protect, createTicket)

module.exports = ticketrouter
