import { combineReducers } from 'redux'
import { user } from './user'
import { data } from './data'
import { gameData } from './gameData'

const Reducers = combineReducers({
    userState: user,
    dataState: data,
    gameDataState: gameData
})


export default Reducers