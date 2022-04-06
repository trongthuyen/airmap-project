import { SET_AREA, SET_AREAS, SET_LAST_AREA, SET_RANK } from "../constants"

export const DataReducer = (state, action) => {
    const {type, payload: {lastArea, area, areas, rank, isLoadingArea, isLoadingLastArea, isLoadingAreas, isLoadingRank}} = action
    switch (type) {
        case SET_AREA: {
            return {
                ...state,
                area,
                isLoadingArea
            }
        }
        case SET_AREAS: {
            return {
                ...state,
                areas,
                isLoadingAreas
            }
        }
        case SET_LAST_AREA: {
            return {
                ...state,
                lastArea,
                isLoadingLastArea
            }
        }
        case SET_RANK: {
            return {
                ...state,
                rank,
                isLoadingRank
            }
        }
        default: return state
    }
}