const initialState = false;

export const themeReducer = (state=intialState, action)=> {
    if (action.type == 'change_theme') {
        return action.payload
    }
    return state;
}