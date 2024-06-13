import express from 'express'
import { getAllUsers, login, signUp } from '../controllers/User.controller.js'

const router = express.Router()

router.post("/signup", signUp)
router.post("/login", login)
router.get("/all-users", getAllUsers)

export default router