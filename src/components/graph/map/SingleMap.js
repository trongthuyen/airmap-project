import React, { useContext, useEffect, useState } from 'react'
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import { VIETNAM, center, gadm36_XPI_0, gadm36_XSP_0 } from '../../../constants';
import { DataContext } from '../../../contexts/DataContext';


function SingleMap() {
  const {
    dataState: { lastArea, area, areas, isLoadingLastArea, isLoadingAreas },
    setAreasAll,
    setArea,
    setLastArea
  } = useContext(DataContext)

  const [mapState, setMapState] = useState({
    center: [center.longitude, center.latitude],
    zoom: 1
  })
  const [showPreviewBox, setShowPreviewBox] = useState(false)
  const [pos, setPos] = useState({
    left: 0,
    top: 0
  })

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
  useEffect(() => setMapState({
    center: [area[0]?.coordinate.longitude || center.longitude, area[0]?.coordinate.latitude || center.latitude],
    zoom: area[0] ? 2 : 1
  }), [area[0]?.coordinate])

  return (
    <div className='box map border-component' style={{ background: "#300000" }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 1500,
          center: mapState.center // coordinate of VietNam [long, lat]
        }}
        style={{
          width: "100%",
          height: "auto"
        }}
      >
        <ZoomableGroup zoom={mapState.zoom} center={mapState.center}>
          {VIETNAM.map((geoUrl) => (
            <Geographies key={geoUrl} geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill='#003333'
                    stroke='#D6D6DA'
                  />
                ))
              }
            </Geographies>
          ))}
          {!isLoadingAreas && areas.map(a => (
            <Marker
              key={a.name}
              coordinates={[a.coordinate.longitude, a.coordinate.latitude]}
              onMouseOver={(e) => handleMouseOverArea(e, a.id)}
              onMouseLeave={(e) => handleMouseOverArea(e, null)}
              onMouseOut={(e) => handleMouseOverArea(e, null)}
              onClick={() => handleClickArea(a?.id)}
              cursor='pointer'
            >
              <g
                fill="none"
                stroke="#FF5533"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(-12, -24)"
              >
                <circle cx="12" cy="10" r="3" />
                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
              </g>
              <text
                textAnchor='middle'
                y={8}
                style={{ fontFamily: "system-ui", fill: "#fff", fontSize: 12 }}
              >
                {a.name}
              </text>
            </Marker>
          ))}
          <Marker
            coordinates={[gadm36_XPI_0.longitude, gadm36_XPI_0.latitude]}
          >
            <text
              textAnchor='middle'
              style={{ fontFamily: "system-ui", fill: "#fff", fontSize: 12 }}
            >
              {gadm36_XPI_0.name}
            </text>
          </Marker>
          <Marker
            coordinates={[gadm36_XSP_0.longitude, gadm36_XSP_0.latitude]}
          >
            <text
              textAnchor='middle'
              y={-30}
              style={{ fontFamily: "system-ui", fill: "#fff", fontSize: 12 }}
            >
              {gadm36_XSP_0.name}
            </text>
          </Marker>
        </ZoomableGroup>
      </ComposableMap>
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

export default SingleMap
