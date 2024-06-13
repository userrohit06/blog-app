import { Box, Button, TextField, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../store/store'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [isSignup, setIsSignup] = useState(false)

    useEffect(() => {
        const userId = localStorage.getItem('userId')
        if (userId) {
            dispatch(login())
        }
    }, [])

    const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const sendRequest = async (type = "login") => {
        try {
            const URI = import.meta.env.VITE_BACKEND_URI
            const res = await axios.post(`${URI}/users/${type}`, {
                name: inputs.name,
                email: inputs.email,
                password: inputs.password
            })

            const data = await res.data
            return data
        } catch (error) {
            console.log({ err: err.message, stack: err.stack })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (isSignup) {
            sendRequest('signup')
                .then(data => localStorage.setItem('userId', data.user._id))
                .then(() => dispatch(login()))
                .then(() => navigate('/blogs'))
        } else {
            sendRequest()
                .then(data => localStorage.setItem('userId', data.user._id))
                .then(() => dispatch(login()))
                .then(() => navigate('/blogs'))
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box
                    maxWidth={400}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    boxShadow="10px 10px 20px #ccc"
                    padding={3}
                    marginTop={5}
                    borderRadius={5}
                >
                    <Typography variant='h2' padding={3} textAlign='center'>
                        {isSignup ? 'Signup' : 'Login'}
                    </Typography>

                    {isSignup && (
                        <TextField
                            name='name'
                            onChange={handleChange}
                            value={inputs.name}
                            placeholder='Name'
                            margin='normal'
                        />
                    )}{" "}

                    <TextField
                        name='email'
                        onChange={handleChange}
                        value={inputs.email}
                        placeholder='Email'
                        margin='normal'
                    />

                    <TextField
                        name='password'
                        onChange={handleChange}
                        value={inputs.password}
                        placeholder='Password'
                        margin='normal'
                    />

                    <Button
                        type='submit'
                        variant='contained'
                        sx={{ borderRadius: 3, marginTop: 3 }}
                        color='warning'
                    >
                        Submit
                    </Button>
                    <Button
                        onClick={() => setIsSignup(!isSignup)}
                        sx={{ borderRadius: 3, marginTop: 3 }}
                    >
                        Change To {isSignup ? 'Login' : 'Signup'}
                    </Button>
                </Box>
            </form>
        </div>
    )
}

export default Login