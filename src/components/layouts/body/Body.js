import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Dashboard from '../../Dashboard'

function Body() {
    return (
        <Routes>
            <Route path='/' element={<Dashboard/>}/>
        </Routes>
    )
}

export default Body
