import React, { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Login from './components/Login'
import Blogs from './components/Blogs'
import UserBlogs from './components/UserBlogs'
import AddBlogs from './components/AddBlogs'
import BlogDetail from './components/BlogDetail'

const App = () => {
  return (
    <Fragment>
      <Router>
        <header>
          <Header />
        </header>
        <main>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/myBlogs' element={<UserBlogs />} />
            <Route path='/myBlogs/:id' element={<BlogDetail />} />
            <Route path='/blogs/add' element={<AddBlogs />} />
          </Routes>
        </main>
      </Router>
    </Fragment>
  )
}

export default App