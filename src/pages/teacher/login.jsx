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
    }

    return (
        <div className="register-wrapper">
            <div>Login</div>
            <div>{error}</div>
            <div>Email : </div>
            <input type="text" onChange={(e) => setEmail(e.target.value)} />
            <div>Password : </div>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={SubmitHandle}>Submit</button>
            <div>{loading && <div>Loading!</div>}</div>
            <div>don't have account?</div>
            <button onClick={() => navigate('/teacher/register')}>
                register
            </button>
        </div>
    )
}

export default Login
