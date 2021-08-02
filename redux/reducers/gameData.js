const initialState = {
    currentGameData: null
}

export const gameData = (state = initialState, action) => {
    return {
        ...state,
        currentGameData: action.currentGameData
    }
}
