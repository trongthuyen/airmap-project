import React, { useRef, useEffect, useContext, useState } from 'react'
import Chart from 'chart.js/auto'
import { DataContext } from '../../../contexts/DataContext'

let lineChart

function LineChart({ mode }) {
    // Ref chart
    const chartRef = useRef()
    
    // Data context
    const {
        dataState: { areas, isLoadingAreas },
        setAreasAll
    } = useContext(DataContext)
    
    // Config line chart
    const [cfChart, setCfChart] = useState({
        type: 'line',
        data: {
            labels: !isLoadingAreas? areas.map(area => area.name) : [],
            datasets: [
                {
                    label: mode? 'Độ bụi trung bình' : 'Độ bụi hiện tại',
                    data: !isLoadingAreas? areas.map(area => mode? area?.averageData.pm2_5 : area?.currentData.pm2_5) : [],
                    fill: true,
                    borderColor: '#F4A460',
                    tension: 0.1
                },{
                    label: mode? 'Nhiệt độ trung bình' : 'Nhiệt độ hiện tại',
                    data: !isLoadingAreas? areas.map(area => mode? area?.averageData.temperature : area?.currentData.temperature) : [],
                    fill: true,
                    borderColor: '#FF4500',
                    tension: 0.1
                }, {
                    label: mode? 'Độ ẩm trung bình' : 'Độ ẩm hiện tại',
                    data: !isLoadingAreas? areas.map(area => mode? area?.averageData.humidity : area?.currentData.humidity) : [],
                    fill: true,
                    borderColor: '#00FA9A',
                    tension: 0.1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    })

    const buildChart = () => {
        const ctx = chartRef.current.getContext('2d')
        lineChart = new Chart(ctx, cfChart)
    }

    useEffect(async () => await setAreasAll(), [])

    useEffect(() => {
        if(!isLoadingAreas) {
            setCfChart(prev => ({
                ...prev,
                data: {
                    labels: areas.map(area => area.name),
                    datasets: [
                        {
                            label: mode? 'Độ bụi trung bình' : 'Độ bụi hiện tại',
                            data: areas.map(area => mode? area?.averageData.pm2_5 : area?.currentData.pm2_5),
                            fill: true,
                            borderColor: '#F4A460',
                            tension: 0.1,
                            color: '#fff'
                        },{
                            label: mode? 'Nhiệt độ trung bình' : 'Nhiệt độ hiện tại',
                            data: areas.map(area => mode? area?.averageData.temperature : area?.currentData.temperature),
                            fill: true,
                            borderColor: '#FF4500',
                            tension: 0.1
                        }, {
                            label: mode? 'Độ ẩm trung bình' : 'Độ ẩm hiện tại',
                            data: areas.map(area => mode? area?.averageData.humidity : area?.currentData.humidity),
                            fill: true,
                            borderColor: '#00FA9A',
                            tension: 0.1
                        }
                    ]
                },
            }))
        }
    }, [isLoadingAreas, mode])
    useEffect(() => {
        lineChart?.destroy()
        buildChart()
    }, [mode, areas, isLoadingAreas])

    return (
        <>
            <canvas ref={chartRef}></canvas>
        </>
    )
}

export default LineChart
