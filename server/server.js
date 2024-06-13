import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { errorHandler } from './middlewares/errorMiddleware.js'
import { connectDB } from './config/db.js'

// import routes
import userRouter from './routes/User.route.js'
import blogRouter from './routes/Blog.route.js'

const app = express()

dotenv.config()

const PORT = process.env.PORT

const corsOptions = {
    origin: 'http://localhost:5173'
}

app.use(cors(corsOptions))
app.use(express.json())

// routes
app.use("/api/v1/users", userRouter)
app.use("/api/v1/blogs", blogRouter)

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