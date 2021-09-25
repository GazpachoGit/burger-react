import {
    SET_USER,
    SET_CHANGING_PASSWORD,
    USER_REQUIRED,
    USER_LOADED,
    SHOW_MESSAGE,
    SET_MESSAGE,
    TAuthActions
} from '../actions/auth';
import { TUser } from '../types/data';

type TAuthState = {
    user?: TUser,
    changingPassword: boolean,
    userLoaded: boolean,
    showMessage: boolean,
    authMessage: string
}

export const initialState: TAuthState = {
    user: undefined,
    changingPassword: false,
    userLoaded: false,
    showMessage: false,
    authMessage: ""
}

export const authReducer = (state = initialState, action: TAuthActions) => {
    switch (action.type) {
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
        default:
            return state;
    }
}