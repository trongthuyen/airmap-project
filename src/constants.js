// API
export const API = 'http://localhost:8000'

// TPHCM
export const center = {
    name: 'Tp Hồ Chí Minh',
    latitude: 10.823099,
    longitude: 106.629662
}

// HOANG SA
export const gadm36_XPI_0 = {
    name: 'Qđ Hoàng Sa',
    latitude: 16.500000,
    longitude: 112.250000
}

// TRUONG SA
export const gadm36_XSP_0 = {
    name: 'Qđ Trường Sa',
    latitude: 8.894880,
    longitude: 114.193771
}

// MAX DISTANCE x10000
export const MAX_DISTANCE = 18564.08991
// MAPBOX

export const ACCESS_TOKEN   = "pk.eyJ1IjoidHJvbmd0aHV5ZW4iLCJhIjoiY2wwc2VueDF5MGNpcDNsbjVyZ205OXc2NSJ9.-b6MQAr7S6OsqGsxyZvxQw"
export const API_MAP        = 'https://api.mapbox.com/styles/v1/trongthuyen/cl0sdljwb000l15tlue5dhzkt.html?title=false'
export const BASIC_MAP      = 'mapbox://styles/trongthuyen/ckyoifadq34e114pe35lnlyy6'
export const GALAXY_MAP     = 'mapbox://styles/trongthuyen/cl0sdljwb000l15tlue5dhzkt'

// SINGLE MAP
const vietnamGeoUrl =
  "https://gist.githubusercontent.com/trongthuyen/0b795bed637fa90572091631e3cc3c85/raw/72e9cd9e6941b9945511a12f511e3c6f54b8f503/gadm36_VNM.json";

const paracelIslandGeoUrl =
  "https://gist.githubusercontent.com/trongthuyen/0b795bed637fa90572091631e3cc3c85/raw/72e9cd9e6941b9945511a12f511e3c6f54b8f503/gadm36_XPI_0.json";

const spralyIslandGeoUrl =
  "https://gist.githubusercontent.com/trongthuyen/0b795bed637fa90572091631e3cc3c85/raw/72e9cd9e6941b9945511a12f511e3c6f54b8f503/gadm36_XSP_0.json";

export const VIETNAM = [vietnamGeoUrl, paracelIslandGeoUrl, spralyIslandGeoUrl];

// ACTION
export const SET_AREA = 'SET_DATA'
export const SET_AREAS = 'SET_AREAS'
export const SET_LAST_AREA = 'SET_LAST_AREA'
export const SET_RANK = 'SET_RANK'