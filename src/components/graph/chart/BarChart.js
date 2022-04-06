import React, { useRef, useEffect, useContext, useState } from 'react'
import Chart from 'chart.js/auto'
import { DataContext } from '../../../contexts/DataContext'

let barChart

function BarChart({ dataState, typeData, timingChain }) {
    // Ref chart
    const chartRef = useRef()

    const {area, isLoadingArea} = dataState

    // Config chart
    const [cfChart, setCfChart] = useState({
        type: 'bar',
        data: {
            labels: [],
            datasets: [],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    })

    const buildChart = () => {
        const ctx = chartRef.current.getContext('2d')
        barChart = new Chart(ctx, cfChart)
    }

    useEffect(() => {
        if(!isLoadingArea) {
            const labels = area.map(a => a.createdAt.slice(a.createdAt.indexOf(' ') + 1))
            const label = typeData === 'pm2_5' ?
                        'Độ bụi' :
                        typeData === 'temperature' ?
                        'Nhiệt độ' : 'Độ ẩm'
            const data = area.map(a => a.data[typeData])
            const backgroundColor = area.map(() =>
                typeData === 'pm2_5' ? '#f3a360' :
                typeData === 'temperature' ? '#ff4500' :
                '#00fa9a')
            const datasets = [{
                label: label,
                data: data,
                backgroundColor: backgroundColor
            }]

            setCfChart(prev => ({
                ...prev,
                data: {
                    labels: labels,
                    datasets: datasets,
                },
            }))
        }
    }, [isLoadingArea, area, typeData])
    
    
    useEffect(() => {
            barChart?.destroy()
            buildChart()
    }, [cfChart])

    return (
        <canvas ref={chartRef}></canvas>
    )
}

export default BarChart
