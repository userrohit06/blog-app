import User from '../models/User.model.js'
import bcrypt from 'bcryptjs'
import expressAsyncHandler from 'express-async-handler'

export const signUp = expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        throw new Error("All fields are necessary")
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        throw new Error("User already exists")
    }

    const salt = bcrypt.genSaltSync(10)
    const hashedPsd = bcrypt.hashSync(password, salt)

    const user = new User({
        name,
        email,
        password: hashedPsd,
        blogs: []
    })
    user.save()

    res.status(200).json({ user })
})

export const login = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new Error("All fields are necessary")
    }

    const existingUser = await User.findOne({ email })
    if (!existingUser) {
        throw new Error("User does not exist")
    }

    const isPsdMatch = bcrypt.compareSync(password, existingUser.password)
    if (!isPsdMatch) {
        throw new Error("Wrong email or password")
    }

    res.status(200).json({ user: existingUser })
})

export const getAllUsers = expressAsyncHandler(async (req, res) => {
    const users = await User.find()
    if (!users) {
        throw new Error("No user available")
    }

    res.status(200).json({ users })
})