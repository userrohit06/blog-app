import express from 'express'
import { getAllUsers, signIn, signUp } from '../controllers/User.controller.js'

const router = express.Router()

router.post("/signup", signUp)
router.post("/signin", signIn)
router.get("/all-users", getAllUsers)

export default router