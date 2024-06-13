import { Fragment, useState } from "react"
import { Link } from "react-router-dom"
import { logout, setDarkMode } from '../store/store'
import {
    AppBar,
    Typography,
    Toolbar,
    Box,
    Button,
    Tabs,
    Tab
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { DarkMode, LightMode } from '@mui/icons-material'
import { lightTheme, darkTheme } from '../utils/theme'

const Header = () => {

    const dispatch = useDispatch()
    const isDark = useSelector(state => state.theme.isDarkMode)
    const theme = isDark ? darkTheme : lightTheme
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const [value, setValue] = useState(0)

    return (
        <AppBar position="sticky" sx={{ background: `${theme.bg}` }}>
            <Toolbar>
                <Typography variant="h4">BlogsApp</Typography>
                {isLoggedIn && (
                    <Box display={"flex"} marginLeft="auto" marginRight="auto">
                        <Tabs
                            textColor="inherit"
                            value={value}
                            onChange={(e, val) => setValue(val)}
                        >
                            <Tab
                                LinkComponent={Link}
                                to="/blogs"
                                label="All Blogs"
                            />

                            <Tab
                                LinkComponent={Link}
                                to="/myBlogs"
                                label="My Blogs"
                            />

                            <Tab
                                LinkComponent={Link}
                                to="/blogs/add"
                                label="Add Blog"
                            />
                        </Tabs>
                    </Box>
                )}

                <Box display={'flex'} marginLeft="auto">
                    {!isLoggedIn && (
                        <Fragment>
                            {" "}
                            <Button
                                LinkComponent={Link}
                                to="login/"
                                sx={{
                                    margin: 1,
                                    fontWeight: 'bold',
                                    color: 'white',
                                    borderRadius: 10
                                }}
                            >
                                Login
                            </Button>

                            <Button
                                LinkComponent={Link}
                                to="login/"
                                sx={{
                                    margin: 1,
                                    fontWeight: 'bold',
                                    color: 'white',
                                    borderRadius: 10
                                }}
                            >
                                Signup
                            </Button>
                        </Fragment>
                    )}

                    {isLoggedIn && (
                        <Button
                            onClick={() => dispatch(logout())}
                            LinkComponent={Link}
                            to="/login"
                            variant="contained"
                            sx={{ margin: 1, borderRadius: 10 }}
                            color="warning"
                        >
                            Logout
                        </Button>
                    )}

                    <div
                        onClick={e => {
                            e.preventDefault()
                            dispatch(setDarkMode(!isDark))
                        }}
                        style={{
                            alignContent: 'center',
                            padding: "10px 0",
                            cursor: 'pointer'
                        }}
                    >
                        {isDark ? <LightMode /> : <DarkMode />}
                    </div>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header