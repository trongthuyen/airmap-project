import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../contexts/DataContext'
import BarChart from '../graph/chart/BarChart'

function Detail() {
    const [mode, setMode] = useState({
        typeData: 'pm2_5',
        timingChain: true
    })

    const {
        dataState: {area, isLoadingArea},
    } = useContext(DataContext)
    
    const [keys, setKeys] = useState([])
    const [optionStyled, setOptionStyled] = useState({
        display: 'none',
    })

    const handleClickOption = option => {
        setMode(prev => ({
            ...prev,
            [Object.keys(option)[0]]: Object.values(option)[0]
        }))
        setOptionStyled({display: 'none'})
    }

    
    useEffect(() => {
        if(!isLoadingArea) {
            setKeys(Object.keys(area[0]?.data || {}))
        }
    }, [isLoadingArea, area])
    
    return (
        <div className='flex-item detail'>
            <div className='box detail-1 bg-component'>
                {isLoadingArea && (
                    <h2>Choose a area to view its detail</h2>
                )}

                {!isLoadingArea && <>
                    <BarChart dataState={{area, isLoadingArea}} typeData={mode.typeData} timingChain={mode.timingChain}/>
                    <div className='chart__option'>
                        <div className='chart__option--typeData'>
                            <span
                                className={mode.typeData}
                                onClick={() => setOptionStyled(optionStyled.display === 'none' ? {display: 'block'} : {display: 'none'})}
                            >
                                {mode.typeData}
                            </span>
                            <ul style={optionStyled}>
                                {keys.map(key => (
                                    <li
                                        key={key}
                                        onClick={() => handleClickOption({typeData: key})}
                                    >
                                        {key !== mode.typeData && key !== 'isRain' ? key : ''}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='chart__option--timingChain'>
                            <span
                                className={mode.timingChain ? 'timingChain-month' : 'timingChain-date'}
                                onClick={() => handleClickOption({timingChain: !mode.timingChain})}
                            >{mode.timingChain ? 'Xem theo tháng' : 'Xem theo ngày'}</span>
                        </div>
                    </div>
                </>}
            </div>
            <div className='box detail-2 bg-component'>
                <h4>Chi tiết</h4>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
        </div>
    )
}
 
export default Detail
