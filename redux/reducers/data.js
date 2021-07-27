const initialState = {
    currentData: null
}

export const data = (state = initialState, action) => {
    return {
        ...state,
        currentData: action.currentData
    }
}