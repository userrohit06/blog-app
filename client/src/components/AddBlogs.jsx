import { useState } from "react"
import { Box, Button, InputLabel, TextField, Typography, TextareaAutosize } from "@mui/material"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const labelStyles = { mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' }

const AddBlogs = () => {

    const navigate = useNavigate()
    const URI = import.meta.env.VITE_BACKEND_URI

    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        imageURL: ''
    })

    const handleChange = (event) => {
        setInputs(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const sendRequest = async () => {
        const res = await axios.post(`${URI}/blogs/add-blog`, {
            title: inputs.title,
            desc: inputs.description,
            img: inputs.imageURL,
            user: localStorage.getItem("userId")
        })
            .catch(err => console.log(err))
        const data = await res.data
        return data
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        sendRequest()
            .then(data => console.log(data))
            .then(() => navigate("/blogs"))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box
                    borderRadius={10}
                    boxShadow="10px 10px 20px #ccc"
                    padding={3}
                    margin={"auto"}
                    marginTop={3}
                    display={"flex"}
                    flexDirection={"column"}
                    width={"80%"}
                >
                    <Typography
                        padding={3}
                        color={"gray"}
                        variant="h2"
                        textAlign={"center"}
                    >
                        Post Your Blog
                    </Typography>

                    <InputLabel
                        sx={labelStyles}
                    >
                        Title
                    </InputLabel>

                    <TextField
                        name="title"
                        onChange={handleChange}
                        value={inputs.title}
                        variant="outlined"
                    />

                    <InputLabel
                        sx={labelStyles}
                    >
                        Description
                    </InputLabel>

                    <TextareaAutosize
                        name="description"
                        onChange={handleChange}
                        minRows={10}
                        margin="auto"
                        variant="outlined"
                        value={inputs.description}
                    />

                    <InputLabel
                        sx={labelStyles}
                    >
                        ImageURL
                    </InputLabel>

                    <TextField
                        name="imageURL"
                        onChange={handleChange}
                        value={inputs.imageURL}
                        variant="outlined"
                    />

                    <Button
                        sx={{ mt: 2, borderRadius: 4 }}
                        variant="contained"
                        type="submit"
                    >
                        Submit
                    </Button>
                </Box>
            </form>
        </div>
    )
}

export default AddBlogs