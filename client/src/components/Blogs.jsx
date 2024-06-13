import { useEffect, useState } from "react"
import axios from "axios"
import Blog from './Blog'

const Blogs = () => {

    const [blogs, setBlogs] = useState()
    const URI = import.meta.env.VITE_BACKEND_URI

    const sendRequest = async () => {
        const res = await axios.get(`${URI}/blogs/all-blogs`)
            .catch(err => console.log(err))

        const data = res.data
        return data
    }

    useEffect(() => {
        sendRequest().then(data => setBlogs(data.blogs))
    }, [])

    return (
        <div>
            {blogs &&
                blogs.map((blog, index) => (
                    <Blog
                        id={blog._id}
                        key={index}
                        isUser={localStorage.getItem("userId") === blog.user._id}
                        title={blog.title}
                        desc={blog.desc}
                        img={blog.img}
                        user={blog.user.name}
                        date={new Date(blog.date).toLocaleDateString()}
                    />
                ))
            }
        </div>
    )
}

export default Blogs