import {SET_USER, SET_CHANGING_PASSWORD, USER_REQUIRED, USER_LOADED } from '../actions/auth';

const initialState = {
    user: null,
    changingPassword: false,
    userLoaded: false
}

export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER:
            return {
                user: action.user
            }
        case SET_CHANGING_PASSWORD: 
            return {
                ...state,
                changingPassword: !state.changingPassword
            }
        case USER_REQUIRED:
            return {
                ...state,
                userLoaded: false
            }
        case USER_LOADED:
            return {
                ...state,
                userLoaded: true
            }
        default:
            return state;
    }
}