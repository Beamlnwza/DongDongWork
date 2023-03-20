import React, { useEffect, useState } from 'react'
import { database } from '../../supabase/supabase'
import { useRecoilState } from 'recoil'
import tableState from '../../atom/Table'
import './table.css'

const Table = () => {
    const [works, setWorks] = useState([])
    const [stateFliterData, setStateFilterData] = useRecoilState(tableState)
    const [isload, setIsLoad] = useState(false)

    const Header = ['วันที่', 'วิชา', 'งาน', 'รายละเอียดของงาน', 'กำหนดส่ง']

    useEffect(() => {
        const fetchWorks = async () => {
            setIsLoad(true)
            if (!stateFliterData.year || !stateFliterData.class) {
                return
            }

            const { data, error } = await database
                .from('works')
                .select('*')
                .eq('year', parseInt(stateFliterData.year))
                .eq('class', parseInt(stateFliterData.class))

            if (data) {
                setWorks([...data])
                setIsLoad(false)
            }
        }

        fetchWorks()
    }, [stateFliterData])

    //make function to check if the data is not more than dateline
    const checkDate = (work) => {
        const date1 = new Date(work.date)
        const date2 = new Date(work.dateline)

        if (date1 > date2) {
            return true
        } else {
            return false
        }
    }

    const headerItems = Header.map((item, index) => {
        const columnIndex = index + 1
        return (
            <div key={index} className={`t${columnIndex} t t-head`}>
                {item}
            </div>
        )
    })

    const workItems = works.map((work, index) => {
        let workArray = Object.values(work)
        workArray.shift()
        workArray = workArray.slice(0, 5)
        return (
            <>
                {workArray.map((item, index) => {
                    const columnIndex = index + 1
                    return (
                        <div key={index} className={`t${columnIndex} t`}>
                            {item}
                        </div>
                    )
                })}
            </>
        )
    })

    return (
        <div className="table">
            {!isload && ( // if isload is false, show the content
                <div className="table-wrapper">
                    {headerItems}
                    {workItems}
                    {/* {works.map((work) => {
                        // map through the works array and return the content
                        return (
                            <>
                                <div className="t1 t">{work.date}</div>
                                <div className="t2 t">{work.subject}</div>
                                <div className="t3 t">{work.work_titles}</div>
                                <div className="t4 t">{work.work_details}</div>
                                <div className="t5 t">{work.dateline}</div>
                            </>
                        )
                    })} */}
                </div>
            )}
        </div>
    )
}

export default Table
