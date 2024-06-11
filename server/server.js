import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { errorHandler } from './middlewares/errorMiddleware.js'
import { connectDB } from './config/db.js'

const app = express()

dotenv.config()

const PORT = process.env.PORT

const corsOptions = {
    origin: '',
    credentials: true
}

app.use(cors(corsOptions))
app.use(express.json())

// error handler middleware
app.use(errorHandler)

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is up and ruuning on PORT. ${PORT}`);
        })
    })
    .catch(err => {
        console.error(`Error connecting to server: ${err.message}`);
    })