import React, { useState } from 'react'
import MyChart from './chart/MyChart'
import BoxMap from './map/BoxMap'
import SingleMap from './map/SingleMap'
import mapbox from './map/resources/mapbox.jpg'
import singlemap from './map/resources/singlemap.png'

function Graph() {
    const [mode, setMode] = useState({
        isSingleMap: false,
        imgUrl: singlemap
    })

    const handleClickMode = (m) => {
        setMode({
            isSingleMap: m,
            imgUrl: m ? mapbox : singlemap
        })
    }

    return (
        <div className='flex-item graph'>
            <MyChart/>

            {mode.isSingleMap && <SingleMap/>}
            {!mode.isSingleMap && <BoxMap/>}

            <img
                src={mode.imgUrl}
                alt={mode.isSingleMap ? 'mapbox' : 'singlemap'}
                className='map-mode'
                onClick={() => handleClickMode(!mode.isSingleMap)}
                title={mode.isSingleMap ? 'chi tiết' : 'đơn giản'}
            />
        </div>
    )
}

export default Graph
