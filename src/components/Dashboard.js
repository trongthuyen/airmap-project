import React from 'react'
import Sidebar from './sidebar/Sidebar'
import Detail from './details/Detail'
import Graph from './graph/Graph'
import Subside from './subside/Subside'

function Dashboard() {
    return (
        <div className='dashboard'>
            <Sidebar/>
            <Graph/>
            <Detail/>
            <Subside/>
        </div>
    )
}

export default Dashboard
