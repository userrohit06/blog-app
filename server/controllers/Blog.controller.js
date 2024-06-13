import mongoose from 'mongoose'
import Blog from '../models/Blog.model.js'
import User from '../models/User.model.js'
import expressAsyncHandler from 'express-async-handler'


export const getAllBlogs = expressAsyncHandler(async (req, res) => {
    const blogs = await Blog.find()
    if (!blogs) {
        throw new Error("No blog available")
    }

    res.status(200).json({ blogs })
})

export const addBlog = expressAsyncHandler(async (req, res) => {
    const { title, desc, img, user } = req.body
    const currentDate = new Date()

    const existingUser = await User.findById(user)
    if (!existingUser) {
        throw new Error("Unauthorized")
    }

    const newBlog = new Blog({
        title,
        desc,
        img,
        user,
        date: currentDate
    })
    await newBlog.save()

    try {
        const session = await mongoose.startSession()
        session.startTransaction()
        await newBlog.save(session)
        existingUser.blogs.push(newBlog)
        await existingUser.save(session)
        session.commitTransaction()
    } catch (err) {
        throw new Error(err.message)
    }

    res.status(200).json({ newBlog })
})

export const updateBlog = expressAsyncHandler(async (req, res) => {
    const blogId = req.params.id
    const { title, desc } = req.body

    const blog = await Blog.findByIdAndUpdate(blogId, {
        title, desc
    })

    if (!blog) {
        throw new Error("Unable to update the blog")
    }

    return res.status(200).json({ blog })
})

export const singleBlog = expressAsyncHandler(async (req, res) => {
    const id = req.params.id
    const blog = await Blog.findById(id)
    if (!blog) {
        throw new Error("Blog not available")
    }

    return res.status(200).json({ blog })
})

export const deleteBlog = expressAsyncHandler(async (req, res) => {
    const id = req.params.id

    const blog = await Blog.findByIdAndDelete(id).populate('user')
    if (!blog) {
        throw new Error('Blog not found')
    }

    // remove blog from user;s blogs array
    const user = blog.user
    user.blogs.pull(blog)
    await user.save()

    return res.status(200).json({ message: 'Deleted successfully!' })
})

export const getByUserId = expressAsyncHandler(async (req, res) => {
    const userId = req.params.id

    const userBlogs = await User.findById(userId).populate("blogs")
    if (!userBlogs) {
        throw new Error("No blog found")
    }

    return res.status(200).json({ user: userBlogs })
})