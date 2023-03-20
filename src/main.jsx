import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Works from './pages/works/index'
import Teacher from './pages/teacher'
import Register from './pages/teacher/register'
import Post from './pages/teacher/post'
import Login from './pages/teacher/login'
import './index.css'
import { RecoilRoot } from 'recoil'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RecoilRoot>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Works />} />
                    <Route path="/works" element={<Works />} />
                    <Route path="/teacher" element={<Teacher />} />
                    <Route path="/teacher/register" element={<Register />} />
                    <Route path="/teacher/post" element={<Post />} />
                    <Route path="/teacher/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </RecoilRoot>
    </React.StrictMode>
)
