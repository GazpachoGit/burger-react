import {    SET_USER,
            SET_CHANGING_PASSWORD,
            USER_REQUIRED,
            USER_LOADED,
            SHOW_MESSAGE,
            SET_MESSAGE,
            SET_ROUTE } from '../actions/auth';

const initialState = {
    user: null,
    changingPassword: false,
    userLoaded: false,
    showMessage: false,
    authMessage: "",
    currentRoute: ""
}

export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER:
            return {
                ...state,
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
        case SHOW_MESSAGE:
            return {
                ...state,
                showMessage: !state.showMessage
            }
        case SET_MESSAGE:
            return {
                ...state,
                authMessage: action.message
            }
        case SET_ROUTE:{
            return {
                ...state,
                currentRoute: action.route
            }
        }
        default:
            return state;
    }
}