import { useState } from "react"
import LineChart from "./LineChart"

function MyChart() {
    const [mode, setMode] = useState(true)

    const handleClickMode = () => {
        setMode(prev => !prev)
    }
    return (
        <div className='box chart bg-component'>
            <LineChart mode={mode}/>
            
            <span className="chart-mode" onClick={() => handleClickMode()}>
                {mode ? 'Xem chỉ số hiện tại' : 'Xem chỉ số trung bình'}
            </span>
        </div>
    )
}

export default MyChart
