import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    Typography
} from '@mui/material'
import { ModeEditOutline, DeleteForever } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Blog = ({ title, desc, img, user, isUser, id }) => {

    const navigate = useNavigate()
    const URI = import.meta.env.VITE_BACKEND_URI

    const handleEdit = () => {
        navigate(`/myBlogs/${id}`)
    }

    const deleteRequest = async () => {
        const res = await axios.delete(`${URI}/blogs/blog/${id}`)
            .catch(err => console.log(err))

        const data = res.data
        return data
    }

    const handleDelete = () => {
        deleteRequest()
            .then(() => navigate('/'))
            .then(() => navigate('/blogs'))
    }
    return (
        <div>
            {" "}
            <Card
                sx={{
                    width: '40%',
                    margin: 'auto',
                    mt: 2,
                    padding: 2,
                    boxShadow: "5px 5px 10px #ccc",
                    ":hover": {
                        boxShadow: "10px 10px 20px #ccc"
                    }
                }}
            >
                {isUser && (
                    <Box display={'flex'}>
                        <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
                            <ModeEditOutline color='warning' />
                        </IconButton>
                        <IconButton onClick={handleDelete}>
                            <DeleteForever color='error' />
                        </IconButton>
                    </Box>
                )}

                <CardHeader
                    avatar={
                        <Avatar
                            sx={{ bgcolor: 'red' }}
                            aria-label='recipe'
                        >
                            {user ? user.charAt(0) : ""}
                        </Avatar>
                    }
                    title={title}
                />
                <CardMedia component='img' height={'194'} image={img} alt='Paella dish' />

                <CardContent>
                    <hr />
                    <br />
                    <Typography
                        variant={"body2"}
                        color={"text.secondary"}
                    >
                        <b>{user}</b>{": "}{desc}
                    </Typography>
                </CardContent>

            </Card>
        </div>
    )
}

export default Blog