const asyncHandler = require('express-async-handler')
const ticketModel = require('../models/ticketModel')
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

// GET TICKETS

const getTickets = asyncHandler(async (req, res) => {
    // GET USER USING THE ID IN JWT
    const user = await userModel.findById(req.user.id)
    // CHECK IF USER IS LOGGED IN
    if (!user) {
        res.status(401)
        throw new Error('User Not Found')
    }
    // GET TICKET DETAILS OF THE USER
    const tickets = await ticketModel.find({ user: req.user.id })
    res.status(200).json(tickets)
})

// CREATE TICKETS

const createTicket = asyncHandler(async (req, res) => {
    const { product, description } = req.body
    // CHECK IF THE PRODUCT AND THE DESCRIPTONS ARE ENTERED
    if (!product || !description) {
        res.status(400)
        throw new Error('Incomplete Data')
    }
    // GET THE USER DETAILS
    const user = await userModel.findById(req.user.id)

    // CHECK IF USER IS LOGGED IN
    if (!user) {
        res.status(401)
        throw new Error('User Not Found')
    }

    // CREATE THE TICKET
    const ticket = await ticketModel.create({
        product,
        description,
        user: req.user.id,
        status: 'new',
    })
    res.status(200).json(ticket)
})

module.exports = { getTickets, createTicket }
