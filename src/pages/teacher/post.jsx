import React, { useEffect, useState } from 'react'
import { database } from '../../supabase/supabase'
import { useNavigate } from 'react-router'
import './post.css'

const Post = () => {
    //usestate for subject, work_titles, work_details, date, dateline, teacher
    const [subject, setSubject] = useState('')
    const [work_titles, setWork_titles] = useState('')
    const [work_details, setWork_details] = useState('')
    const [date, setDate] = useState('')
    const [dateline, setDateline] = useState('')
    const [teacher, setTeacher] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [year, setYear] = useState()
    const [classs, setClasss] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        getSession()
        setTodayDate()
    }, [])

    const setTodayDate = () => {
        let today = new Date()
        let dd = String(today.getDate()).padStart(2, '0')
        let mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
        let yyyy = today.getFullYear()

        today = yyyy + '-' + mm + '-' + dd
        setDate(today)
    }

    const getSession = async () => {
        const { data, error } = await database.auth.getSession()
        if (error) {
            return
        }

        if (data.session == null) {
            navigate('/teacher/login')
            return
        }

        if (data.session != null) {
            setTeacher(data.session.user.email)
        }
    }

    const Logout = async () => {
        const { data, error } = await database.auth.signOut()
        if (error) {
            return
        }

        navigate('/teacher/login')
        setError('ออกจากระบบสำเร็จ')
    }

    const assignHandle = async () => {
        if (subject === '') {
            setError('โปรดระบุวิชา')
            return
        }

        if (work_titles === '') {
            setError('โปรดระบุหัวข้อของงาน')
            return
        }

        if (work_details === '') {
            setError('โปรดระบุเนื้อหาของงาน')
            return
        }

        if (dateline === '') {
            setError('โปรดระบุวันส่งงาน')
            return
        }

        if (year > 6 || classs > 12 || year < 1 || classs < 1) {
            setError('โปรดระบุชั้นและห้องให้ถูกต้อง')
            return
        }

        setLoading(true)

        const { data, error } = await database.from('works').insert([
            {
                subject: subject,
                work_titles: work_titles,
                work_details: work_details,
                date: date,
                dateline: dateline,
                year: year,
                class: classs,
                teacher: teacher,
            },
        ])

        if (error) {
            setError(error.message)
            setLoading(false)
            return
        }

        setError('สั่งงานสำเร็จ')
        setLoading(false)
        //delay 5 sec after that reload page
        setTimeout(() => {
            window.location.reload()
        }, 1000)
    }

    return (
        <>
            <div className="post-wrapper">
                <div className="post-container">
                    <div>
                        <button onClick={Logout} className="logout">
                            ออกจากระบบ
                        </button>
                        <button
                            onClick={() => {
                                navigate('/works')
                            }}
                        >
                            กลับไปหน้าหลัก
                        </button>
                    </div>
                    <div>ระบบสั่งงาน</div>
                    <div className="error">{error}</div>
                    <div className="form-container">
                        <div>ชั้นมัธยมศึกษาปีที่</div>
                        <input
                            type="number"
                            onChange={(e) => setYear(e.target.value)}
                            pattern="[1-6]"
                        />
                        <div>ห้อง</div>
                        <input
                            type="number"
                            onChange={(e) => setClasss(e.target.value)}
                            pattern="[1-12]"
                        />
                        <div>วิชา</div>
                        <input
                            type="text"
                            onChange={(e) => setSubject(e.target.value)}
                        />
                        <div>หัวข้อ</div>
                        <input
                            type="text"
                            onChange={(e) => setWork_titles(e.target.value)}
                        />
                        <div>เนื้อหา</div>
                        <textarea
                            type="textarea"
                            onChange={(e) => setWork_details(e.target.value)}
                            className="bigfield"
                        />
                        <div>กำหนดส่งงาน</div>
                        <input
                            type="date"
                            onChange={(e) => setDateline(e.target.value)}
                        />
                    </div>
                    <button className="assign" onClick={assignHandle}>
                        Assign Work
                    </button>
                </div>
            </div>
            <div className="post-background"></div>
        </>
    )
}

export default Post
