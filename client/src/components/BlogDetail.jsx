import {
    Button,
    InputLabel,
    TextField,
    Typography,
    Box
} from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const labelStyles = { mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' }

const BlogDetail = () => {

    const navigate = useNavigate()
    const [blog, setBlog] = useState()
    const [inputs, setInputs] = useState({
        title: '',
        description: ''
    })
    const { id } = useParams()
    const URI = import.meta.env.VITE_BACKEND_URI

    const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const fetchDetails = async () => {
        const res = await axios.get(`${URI}/blogs/blog/${id}`)
            .catch(err => console.log(err))

        const data = res.data
        return data
    }

    useEffect(() => {
        fetchDetails()
            .then(data => {
                setBlog(data.blog)
                setInputs({
                    title: data.blog.title,
                    description: data.blog.description
                })
            })
    }, [id])

    const sendRequest = async () => {
        const res = await axios.put(`${URI}/blogs/update-blog/${id}`, {
            title: inputs.title,
            description: inputs.description
        })
            .catch(err => console.log(err))

        const data = res.data
        return data
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        sendRequest()
            .then(data => console.log(data))
            .then(() => navigate('/myBlogs'))
    }

    return (
        <div>
            {inputs && (
                <form onSubmit={handleSubmit}>
                    <Box
                        border={3}
                        borderColor={"linear-gradient(90deg, rbga(58, 75, 100, 1) 2%, rbga(116, 49, 110, 1) 36%, rgba(2, 0, 161, 1) 73%, rgba(69, 92, 252, 1) 100%)"}
                        borderRadius={10}
                        boxShadow="10px 10px 20px #ccc"
                        padding={3}
                        marginTop={3}
                        display={'flex'}
                        flexDirection={'column'}
                        width={'80%'}
                    >
                        <Typography
                            fontWeight={"bold"}
                            padding={3}
                            color="grey"
                            variant="h2"
                            textAlign={"center"}
                        >
                            Post Your Blog
                        </Typography>

                        <InputLabel sx={labelStyles}>Title</InputLabel>
                        <TextField
                            name="title"
                            onChange={handleChange}
                            value={inputs.title}
                            variant="outlined"
                        />

                        <InputLabel sx={labelStyles}>Description</InputLabel>
                        <TextField
                            name="description"
                            onChange={handleChange}
                            value={inputs.description}
                            variant="outlined"
                        />

                        <Button
                            sx={{ mt: 2, borderRadius: 4 }}
                            variant="contained"
                            color="warning"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Box>
                </form>
            )
            }
        </div >
    )
}

export default BlogDetail