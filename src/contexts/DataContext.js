import React, { createContext, useReducer } from 'react'
import { API, SET_AREA, SET_AREAS, SET_LAST_AREA, SET_RANK } from '../constants'
import {DataReducer} from '../reducers/DataReducer'

export const DataContext = createContext()

const DataContextProvider = ({children}) => {
    // initial dataState
    const [dataState, dispatch] = useReducer(DataReducer, {
        lastArea: null,
        area: [],
        areas: [],
        rank: [],
        isLoadingLastArea: true,
        isLoadingArea: true,
        isLoadingAreas: true,
        isLoadingRank: true,
    })

    // get areas list
    const setAreasAll = async (isClearn = true) => {
        if(!isClearn) {
            dispatch({
                type: SET_AREAS,
                payload: {
                    areas: [],
                    isLoadingAreas: true
                }
            })
            return
        }
        try {
            const areasList = await fetch(`${API}/areas`)
            .then(res => res.json())
            .then(areas => areas)

            if(areasList.length) {
                const areasListSorted = areasList.sort((a, b) => {
                    if(a.name.length > b.name.length) return 1
                    else if(a.name.length < b.name.length) return -1
                    else return 0
                })
                dispatch({
                    type: SET_AREAS,
                    payload: {
                        areas: areasListSorted,
                        isLoadingAreas: false
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    // get area data
    const setArea = async (areaId) => {
        try {
            if(!areaId) {
                dispatch({
                    type: SET_LAST_AREA,
                    payload: {
                        area: [],
                        isLoadingArea: true
                    }
                })
                return
            }
            const dataset = await fetch(`${API}/dataset`)
            .then(res => res.json())
            .then(data => data)
            
            const data = dataset.filter(d => d.areaId === areaId)
            if(data.length) {
                dispatch({
                    type: SET_AREA,
                    payload: {
                        area: data,
                        isLoadingArea: false
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    // set last area
    const setLastArea = async (areaId) => {
        try {
            if(!areaId) {
                dispatch({
                    type: SET_LAST_AREA,
                    payload: {
                        lastArea: null,
                        isLoadingLastArea: true
                    }
                })
                return
            }
            const dataset = await fetch(`${API}/areas`)
            .then(res => res.json())
            .then(data => data)

            const data = dataset.find(d => d.id === areaId)
            if(data) {
                dispatch({
                    type: SET_LAST_AREA,
                    payload: {
                        lastArea: data,
                        isLoadingLastArea: false
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const setRank = async (type, isdescending = true) => {
        try {
            const areasList = await fetch(`${API}/areas`)
            .then(res => res.json())
            .then(areas => areas)
            
            if(areasList.length) {
                const rankSorted = areasList.sort((a, b) => {
                    if(!isdescending) {
                        if(a.averageData[type] > b.averageData[type]) return 1
                        else if(a.averageData[type] < b.averageData[type]) return -1
                        else return 0
                    } else {
                        if(a.averageData[type] > b.averageData[type]) return -1
                        else if(a.averageData[type] < b.averageData[type]) return 1
                        else return 0
                    }
                })
                dispatch({
                    type: SET_RANK,
                    payload: {
                        rank: rankSorted,
                        isLoadingRank: false
                    }
                })
            } else {
                dispatch({
                    type: SET_RANK,
                    payload: {
                        rank: [],
                        isLoadingRank: true
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const data = {
        dataState,
        setAreasAll,
        setArea,
        setLastArea,
        setRank
    }
    
    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContextProvider
