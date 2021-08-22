import {SET_USER, SET_CHANGING_PASSWORD} from '../actions/auth';

const initialState = {
    user: {
        email: "",
        name: ""
    },
    changingPassword: false
}

export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER:
            return {
                user: {
                    email: action.email,
                    name: action.name
                }
            }
        case SET_CHANGING_PASSWORD: 
            return {
                ...state,
                changingPassword: !state.changingPassword
            }
        default:
            return state;
    }
}