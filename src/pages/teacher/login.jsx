import React, { useState, useEffect } from 'react'
import { database } from '../../supabase/supabase'
import { useNavigate } from 'react-router'

import './register.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        getSession()
        return () => {}
    })

    const getSession = async () => {
        const { data, error } = await database.auth.getSession()
        if (error) {
            return
        }

        if (data.session != null) {
            navigate('/teacher/post')
        }
    }

    const SubmitHandle = () => {
        LoginWithEmail()
    }

    const LoginWithEmail = async () => {
        //check if form is correct
        if (email === '') {
            setError('Email is required')
            return
        }

        if (password === '') {
            setError('Password is required')
            return
        }

        setLoading(true)

        const { data, error } = await database.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) {
            setError(error.message)
            setLoading(false)
            return
        }

        if (data.session != null) {
            navigate('/teacher/post')
        }

        setLoading(false)
        setError('เข้าสู่ระบบสำเร็จ')
        navigate('/teacher/post')
    }

    return (
        <div className="register-wrapper">
            <div>เข้าสู่ระบบ</div>
            <div className="error">{error}</div>
            <div>Email : </div>
            <input type="text" onChange={(e) => setEmail(e.target.value)} />
            <div>รหัสผ่าน : </div>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={SubmitHandle}>เข้าสู่ระบบ</button>
            <div>{loading && <div>Loading!</div>}</div>
            <div>ไม่มีบัญชี?</div>
            <button onClick={() => navigate('/teacher/register')}>
                สมัครสมาชิก
            </button>
        </div>
    )
}

export default Login
