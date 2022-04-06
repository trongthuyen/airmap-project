import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../contexts/DataContext'

function Sidebar() {
    const {
        dataState: {areas, rank, isLoadingAreas, isLoadingRank},
        setAreasAll,
        setArea,
        setRank
    } = useContext(DataContext)

    const [sensors, setSensors] = useState(Object.keys(areas[0]?.averageData || []))
    const [typeRank, setTypeRank] = useState({
        type: sensors[0] || 'pm2_5',
        isDescending: true,
    })

    const loadAreasList = async () => {
        await setAreasAll()
    }

    const handleClickArea = async (areaId) => {
        await setArea(areaId)
    }

    const handleClickTypeRank = (newTypeRank) => {
        setTypeRank(prev => ({
            ...prev,
            [Object.keys(newTypeRank)[0]]: Object.values(newTypeRank)[0]
        }))
    }

    useEffect(async () => loadAreasList(), [])
    useEffect(async () => await setRank(typeRank.type, typeRank.isDescending), [typeRank])
    useEffect(() => setSensors(Object.keys(areas[0]?.averageData || {})), [typeRank, areas])

    return (
        <div className='flex-item sidebar'>
            <div className='box sidebar__box rank__box bg-component'>
                <h4>Top 4</h4>
                <div className='rank__box--option'>
                    <div>
                        {sensors.map(sensor => (
                        <span key={sensor} className={sensor === typeRank.type ? 'active' : ''} onClick={() => handleClickTypeRank({type: sensor})}>
                            {sensor}
                        </span>
                        ))}
                    </div>
                    <i
                        className={`bx bx-chevrons-${typeRank.isDescending ? 'up' : 'down'}`}
                        onClick={() => handleClickTypeRank({isDescending: !typeRank.isDescending})}
                    ></i>
                </div>
                <ul className='rank__box--list'>
                    {!isLoadingRank && rank?.map((r, index) => {
                        let widthBar
                        if(typeRank.isDescending) {
                            widthBar = r?.averageData[typeRank.type] / rank[0]?.averageData[typeRank.type] * 260.0
                        } else {
                            widthBar = r?.averageData[typeRank.type] / rank[rank.length - 1]?.averageData[typeRank.type] * 260.0
                        }
                        return index < 4 ? (
                            <li key={r?.id} onClick={() => handleClickArea(r?.id)}>
                                <span>{r?.name}</span>
                                <div className='rank-bar' style={{width: widthBar}}></div>
                                <div className='rank-value'>{r?.averageData[typeRank.type]}</div>
                            </li>
                        ) : null}
                    )}
                </ul>
            </div>

            <div className='box sidebar__box bg-component'>
                <h4>Danh sách vùng</h4>
                <ul>
                    {!isLoadingAreas && areas.map(area => (
                        <li key={area.id} onClick={() => handleClickArea(area.id)}>{area.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
