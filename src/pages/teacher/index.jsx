import React, { useEffect } from 'react'
import { database } from '../../supabase/supabase'

import { useNavigate } from 'react-router'

const Teacher = () => {
    const navigate = useNavigate()
    useEffect(() => {
        session()
    }, [])

    async function session() {
        const { data, error } = await database.auth.getSession()
        if (data.session != null) {
            navigate('/teacher/post')
        } else {
            return navigate('/teacher/register')
        }
    }

    return (
        <div>
            <div>Hello</div>
        </div>
    )
}
export default Teacher
