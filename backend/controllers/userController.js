const asyncHandler = require('express-async-handler')

// REGISTER AN USER

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please include all fields')
    }
    return res.status(200).json({ message: 'Register Route' })
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
