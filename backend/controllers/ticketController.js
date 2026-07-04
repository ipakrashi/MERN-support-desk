const asyncHandler = require('express-async-handler')
const ticketModel = require('../models/ticketModel')
const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// GET TICKETS

const getTickets = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'getTickets' })
})

// CREATE TICKETS

const createTicket = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'createTicket' })
})

module.exports = { getTickets, createTicket }
