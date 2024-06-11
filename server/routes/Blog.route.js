import express from 'express'
import { addBlog, deleteBlog, getAllBlogs, getByUserId, singleBlog, updateBlog } from '../controllers/Blog.controller.js'

const router = express.Router()

router.get("/all-blogs", getAllBlogs)
router.post("/add-blog", addBlog)
router.put("/update-blog/:id", updateBlog)
router.get("/blog/:id", singleBlog)
router.delete("/blog/:id", deleteBlog)
router.get("/user/:id", getByUserId)

export default router