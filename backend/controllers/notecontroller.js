const asyncHandler = require('express-async-handler')
const notesModel = require('../models/noteModel')
const ticketModel = require('../models/ticketModel')
const userModel = require('../models/userModel')
// const jwt = require('jsonwebtoken')

// GET NOTES FOR A TICKET

const getNotes = asyncHandler(async (req, res) => {
    // GET USER USING THE ID IN JWT
    const user = await userModel.findById(req.user.id)
    // CHECK IF USER IS LOGGED IN
    if (!user) {
        res.status(401)
        throw new Error('User Not Found')
    }
    // GET TICKET DETAILS OF THE USER
    const ticket = await ticketModel.findById(req.params.ticketId)

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User Not Authorized')
    }
    const notes = await notesModel.find({ ticket: req.params.ticketId })

    res.status(200).json(notes)
})

// ADD NOTE FOR A TICKET

const addNote = asyncHandler(async (req, res) => {
    // GET USER USING THE ID IN JWT
    const user = await userModel.findById(req.user.id)
    // CHECK IF USER IS LOGGED IN
    if (!user) {
        res.status(401)
        throw new Error('User Not Found')
    }
    // GET TICKET DETAILS OF THE USER
    const ticket = await ticketModel.findById(req.params.ticketId)

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User Not Authorized')
    }
    const note = await notesModel.create({
        ticket: req.params.ticketId,
        text: req.body.text,
        user: req.user.id,
    })

    res.status(200).json(note)
})

module.exports = { getNotes, addNote }
