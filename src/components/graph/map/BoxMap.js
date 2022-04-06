import React, {useContext, useState, useEffect} from 'react'
import ReactMapGL, { Marker } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import { ACCESS_TOKEN, center, GALAXY_MAP, MAX_DISTANCE } from '../../../constants';
import { DataContext } from '../../../contexts/DataContext';

function BoxMap() {
    const [fontSizeIcon, setFontSizeIcon] = useState(30)
    const [showPreviewBox, setShowPreviewBox] = useState(false) 
    const [pos, setPos] = useState({
        left: 0,
        top: 0
    })
    const {
        dataState: {lastArea, area, areas, isLoadingLastArea, isLoadingAreas},
        setAreasAll,
        setArea,
        setLastArea
    } = useContext(DataContext)
    
    const [viewport, setViewport] = useState({
        latitude: center.latitude,
        longitude: center.longitude,
        width: "100%",
        height: "100%",
        zoom: 10
    });

    const distance = point => Math.sqrt(Math.pow(center.latitude - point.latitude, 2) + Math.pow(center.longitude - point.longitude, 2))
    
    const handleZoom = (vp) => {
        let c = 0
        const d = distance(vp)*10000
        if(viewport.zoom > vp.zoom) {
            c = -1
        } else if(viewport.zoom < vp.zoom) {
            c = 1
        }
        if(d <= MAX_DISTANCE) {
            setViewport(vp)
        }
        setFontSizeIcon(prev => prev + (c * viewport.zoom * 0))
    }

    const loadAreasList = async () => {
        await setAreasAll()
    }

    const handleMouseOverArea = async (e, areaId) => {
        await setLastArea(areaId)
        setPos(prev => ({
            ...prev,
            left: e.pageX + 25,
            top: e.pageY - 120
        }))
    }
    
    const handleClickArea = async (areaId) => {
        await setArea(areaId)
    }

    useEffect(async () => loadAreasList(), [])
    useEffect(() => setShowPreviewBox(!isLoadingLastArea), [isLoadingLastArea])
    useEffect(() => setViewport(v => ({
        ...v,
        latitude: area[0]?.coordinate.latitude || center.latitude,
        longitude: area[0]?.coordinate.longitude || center.longitude,
        zoom: area[0] ? 14 : 12
    })), [area[0]?.coordinate])

    return (
        <div className='box map border-component'>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={ACCESS_TOKEN}
                mapStyle={GALAXY_MAP}
                onViewportChange={viewport => handleZoom(viewport)}
                minZoom={10}
            >
                {!isLoadingAreas && areas.map(a => (
                    <Marker
                        key={a.id}
                        latitude={a.coordinate.latitude}
                        longitude={a.coordinate.longitude}
                        offsetLeft={-10}
                        offsetTop={-20}
                        style={{PointerEvent: 'none'}}
                    >
                        <i
                            className="bx bxs-map marker-icon"
                            style={{fontSize: fontSizeIcon}}
                            onMouseOver={(e) => handleMouseOverArea(e, a.id)}
                            onMouseLeave={(e) => handleMouseOverArea(e, null)}
                            onClick={() => handleClickArea(a.id)}
                        ></i>
                    </Marker>
                ))}
            </ReactMapGL>
            {showPreviewBox && (
                <div className='preview__box' style={pos}>
                    <h4>{lastArea?.name}</h4>
                    <ul>
                        <li>Độ bụi: {lastArea?.currentData.pm2_5}</li>
                        <li>Nhiệt độ: {lastArea?.currentData.temperature} độ C</li>
                        <li>Mưa: {lastArea?.currentData.isRain? 'Có' : 'Không'}</li>
                        <li>Độ ẩm: {lastArea?.currentData.humidity}%</li>
                    </ul>
                    <em>Click into the icon to view more</em>
                </div>
            )}
        </div>
    )
}

export default BoxMap
