import React from 'react'
import Table from './table'
import Checkbox from './checkbox'
import './index.css'
import { useNavigate } from 'react-router'

const Works = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="Works-wrapper">
                <div className="center">
                    <div>
                        <div className="title">Dong Dong Work</div>
                    </div>
                    <div className="subtitle">Select Grade Level</div>
                    <Checkbox />
                    <Table />
                    <button
                        className="assignwork"
                        onClick={() => {
                            navigate('/teacher')
                        }}
                    >
                        สั่งงาน
                    </button>
                </div>
            </div>
            <div className="Works-background"></div>
        </>
    )
}

export default Works
