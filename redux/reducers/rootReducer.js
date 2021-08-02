import store from "../store"

const USER_STATE_CHANGE = 'USER_STATE_CHANGE'
const GAMEDATA_STATE_CHANGE = 'GAMEDATA_STATE_CHANGE'
const PAYCALC_STATE_CHANGE = 'PAYCALC_STATE_CHANGE'

const initialState = []

// Action Creators
export const getGameData = data => ({
  type: GAMEDATA_STATE_CHANGE ,
  payload: data
})
export const getUser = user => ({
  type: USER_STATE_CHANGE ,
  payload: user
})
export const getPayCalc = state => ({
  type: PAYCALC_STATE_CHANGE,
  payload: state
})

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GAMEDATA_STATE_CHANGE:
      return (
        {
          ...state,
          gameData: action.payload
        }
      );
    case USER_STATE_CHANGE:
      return (
        {
          ...state,
          currentUser: action.payload
        }
      );
    case PAYCALC_STATE_CHANGE:
      return (
        {
          ...state,
          payCalcState: action.payload
        }
      )
    default:
      return state
  }
}