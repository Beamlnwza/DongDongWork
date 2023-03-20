import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import tableState from '../../atom/Table'

import './checkbox.css'

const Checkbox = () => {
    const [checkbox, setCheckbox] = useState(Array(6).fill(false))

    const [checkbox2, setCheckbox2] = useState(Array(10).fill(false))

    const [stateFliterData, setStateFilterData] = useRecoilState(tableState)

    const onChangeHandle = (e) => {
        const newCheckbox = [...checkbox]
        //make newCheckbox all false
        newCheckbox.forEach((item, index) => {
            newCheckbox[index] = false
        })

        newCheckbox[e.target.value] = !newCheckbox[e.target.value]
        setCheckbox(newCheckbox)

        setYearFilter(e.target.value)
    }

    const setYearFilter = (year) => {
        setStateFilterData({
            year: parseInt(year) + 1,
            class: stateFliterData.class,
        })
    }

    const onChangeHandle2 = (e) => {
        const newCheckbox2 = [...checkbox2]
        //make newCheckbox all false
        newCheckbox2.forEach((item, index) => {
            newCheckbox2[index] = false
        })

        newCheckbox2[e.target.value] = !newCheckbox2[e.target.value]
        setCheckbox2(newCheckbox2)

        setStateFilterData({
            year: stateFliterData.year,
            class: parseInt(e.target.value) + 1,
        })
    }

    const Checkbox = ({ item, index, onChangeHandle }) => {
        return (
            <div key={index} className="ch-con">
                <div>{index + 1}</div>
                <input
                    type="checkbox"
                    checked={item}
                    onChange={onChangeHandle}
                    value={index}
                />
            </div>
        )
    }

    return (
        <div className="checkbox-wrapper">
            <div className="checkbox-row">
                {checkbox.map((item, index) => {
                    return (
                        <Checkbox
                            item={item}
                            index={index}
                            onChangeHandle={onChangeHandle}
                        />
                    )
                })}
            </div>
            <div className="checkbox-row">
                {checkbox2.map((item, index) => {
                    return (
                        <div key={index} className="ch-con">
                            <div>{index + 1}</div>
                            <input
                                type="checkbox"
                                checked={item}
                                onChange={onChangeHandle2}
                                value={index}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Checkbox
