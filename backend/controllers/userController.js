const asyncHandler = require('express-async-handler')
const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')

// REGISTER AN USER

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please include all fields')
    }

    // Find if the User exists
    const userExists = await userModel.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create User
    const user = await userModel.create({
        name,
        email,
        password: hashedPassword,
    })

    if (user) {
        return res
            .status(201)
            .json({ _id: user._id, name: user.name, email: user.email })
    } else {
        res.status(400)
        throw new Error('User already exists')
    }
})

// LOGIN AN USER
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400)
        throw new Error('Please include all fields')
    }
    return res.status(200).json({ message: 'Login Route' })
})

module.exports = { registerUser, loginUser }
