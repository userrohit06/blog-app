import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: { isLoggedIn: false },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true
        },
        logout: (state, action) => {
            localStorage.removeItem("userId")
            state.isLoggedIn = false
        }
    }
})

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        isDarkMode: false
    },
    reducers: {
        setDarkMode: (state, action) => {
            state.isDarkMode = action.payload
        }
    }
})

export const { login, logout } = authSlice.actions
export const { setDarkMode } = themeSlice.actions

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    theme: themeSlice.reducer
})

export const store = configureStore({
    reducer: rootReducer
})