import { combineReducers } from 'redux'
import { user } from './user'
import { data } from './data'

const Reducers = combineReducers({
    userState: user,
    dataState: data
})

export default Reducers