const express = require('express')
const ticketrouter = express.Router()
const {
    getTickets,
    createTicket,
    getTicket,
    deleteTicket,
    updateTicket,
} = require('../controllers/ticketController')

const { protect } = require('../middleware/authMiddleware')

// Re-route into note router
const noteRouter = require('./noteRoutes')
ticketrouter.use('/:ticketId/notes', noteRouter)

// Routes
ticketrouter.get('/', protect, getTickets)
ticketrouter.get('/:id', protect, getTicket)
ticketrouter.post('/', protect, createTicket)
ticketrouter.delete('/:id', protect, deleteTicket)
ticketrouter.put('/:id', protect, updateTicket)

module.exports = ticketrouter
