import React, { useEffect, useState } from 'react'
import { database } from '../../supabase/supabase'
import { useNavigate } from 'react-router'
import './register.css'

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        //get session
        getSession()
        return () => {}
    }, [])

    //get session
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
        if (email === '') {
            setError('Email is required')
            return
        }

        if (password === '') {
            setError('Password is required')
            return
        }

        if (password !== confirmPassword) {
            setError('Password not match')
            return
        }

        setLoading(true)

        async function signUpWithEmail() {
            const { data, error } = await database.auth.signUp({
                email: email,
                password: password,
            })

            if (error) {
                setError(error.message)
                setLoading(false)
                return
            }

            setLoading(false)
        }

        signUpWithEmail()
    }

    return (
        <div className="register-wrapper">
            <div>Register</div>
            <div>{error}</div>
            <div>Email : </div>
            <input onChange={(e) => setEmail(e.target.value)} type="text" />
            <div>Password : </div>
            <input onChange={(e) => setPassword(e.target.value)} type="text" />
            <div>Confirm Password : </div>
            <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="text"
            />
            <button onClick={SubmitHandle}>Submit</button>
            <div>{loading && <div>Loading!</div>}</div>
            <div>
                <div>Already have account?</div>
                <button onClick={() => navigate('/teacher/login')}>
                    Login
                </button>
            </div>
        </div>
    )
}

export default Register
