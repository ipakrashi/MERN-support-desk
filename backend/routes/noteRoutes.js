const express = require('express')
const noteRouter = express.Router({ mergeParams: true })
const { getNotes, addNote } = require('../controllers/notecontroller')

const { protect } = require('../middleware/authMiddleware')

// Routes
noteRouter.get('/', protect, getNotes)
noteRouter.post('/', protect, addNote)

module.exports = noteRouter
