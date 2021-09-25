import { loginRequest, registerRequest, forgotPasswordRequest, getUserRequest, logoutRequest, refreshTockenRequest, resetPasswordRequest, updateUserRequest } from '../auth-api';
import { setCookie, deleteCookie } from '../../utils/cookie-utils';
import { TUser } from '../types/data';
//import {authUrl} from '../../utils/constants';

export const SET_USER: 'SET_USER' = 'SET_USER';
export const SET_CHANGING_PASSWORD: 'SET_CHANGING_PASSWORD' = 'SET_CHANGING_PASSWORD';
export const USER_REQUIRED: 'USER_REQUIRED' = 'USER_REQUIRED';
export const USER_LOADED: 'USER_LOADED' = 'USER_LOADED';
export const SHOW_MESSAGE: 'SHOW_MESSAGE' = 'SHOW_MESSAGE';
export const SET_MESSAGE: 'SET_MESSAGE' = 'SET_MESSAGE';

export interface ISetUser {
    readonly type: typeof SET_USER;
    readonly user: TUser
}
export interface ISetChangePassword {
    readonly type: typeof SET_CHANGING_PASSWORD;
}
export interface IUserRequired {
    readonly type: typeof USER_REQUIRED;
}
export interface IUserLoaded {
    readonly type: typeof USER_LOADED;
}
export interface IShowMessage {
    readonly type: typeof SHOW_MESSAGE;
}
export interface ISetMessage {
    readonly type: typeof SET_MESSAGE;
    readonly message: string;
}

export type TAuthActions = ISetUser | ISetChangePassword | IUserRequired | IUserRequired | IUserLoaded | IShowMessage | ISetMessage

export function singIn(form, type) {
    return function (dispatch) {
        const request = type === 'login' ? loginRequest : registerRequest;
        return request(form)
            .then(res => {
                return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
            })
            .then(data => {
                if (data.success) {
                    const authToken = data.accessToken.split("Bearer ")[1];

                    setCookie('token', authToken);

                    localStorage.setItem('token', data.refreshToken);

                    return dispatch({
                        type: SET_USER,
                        user: data.user,
                    });
                }
            })
            .catch(res => {
                dispatch(showMessage("Ошибка: " + res.message));
            })
    }
}

export function forgotPassword(form) {
    return function (dispatch) {
        forgotPasswordRequest(form)
            .then(res => {
                return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
            })
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: SET_CHANGING_PASSWORD
                    });;
                }
            })
            .catch(res => {
                dispatch(showMessage("Ошибка: " + res.message));
            })
    }
}

export function resetPassword(form) {
    return function (dispatch) {
        resetPasswordRequest(form)
            .then(res => {
                return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
            })
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: SET_CHANGING_PASSWORD
                    });;
                }
            })
            .catch(res => {
                dispatch(showMessage("Ошибка: " + res.message));
            })
    }
}

export function getUser() {
    return function (dispatch) {
        dispatch({
            type: USER_REQUIRED
        })
        return getUserRequest()
            .then(res => {
                return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
            })
            .then(data => {

                if (data.success) {
                    dispatch({
                        type: SET_USER,
                        user: data.user,
                    });
                    dispatch({
                        type: USER_LOADED
                    })
                } else Promise.reject(data);
            })
            .catch(res => {
                if (res.message === 'jwt expired') {
                    return dispatch(updateTocken(getUser()))
                } else {
                    dispatch({
                        type: USER_LOADED
                    })
                    //console.error(res.message);
                }

            })
    }
};

function updateTocken(callback) {
    return function (dispatch) {
        return refreshTockenRequest()
            .then(res => {

                return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
            })
            .then(data => {
                console.log(data)
                if (data.success) {
                    const authToken = data.accessToken.split("Bearer ")[1];
                    setCookie('token', authToken);
                    localStorage.setItem('token', data.refreshToken);
                    return dispatch(callback);
                } else Promise.reject(data)
            })
            .catch((res) => {
                dispatch({
                    type: SET_USER,
                    user: null,
                });
                return dispatch({
                    type: USER_LOADED
                });
                //dispatch(showMessage("Ошибка: " + res.message));
            })
    }
}

export function updateUser(form) {
    return function (dispatch) {
        updateUserRequest(form)
            .then(res => {
                return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
            })
            .then(data => {
                dispatch({
                    type: SET_USER,
                    user: data.user,
                });
                dispatch(showMessage("Данные пользователя изменены"));
            })
            .catch((res) => {
                dispatch(showMessage("Ошибка: " + res.message));
            })
    }
}

function showMessage(message) {
    return function (dispatch) {
        dispatch({
            type: SET_MESSAGE,
            message
        });
        dispatch({
            type: SHOW_MESSAGE
        })
    }
}

export function singOut() {
    return function (dispatch) {
        logoutRequest()
            .then(res => {
                return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
            })
            .catch((res) => {
                dispatch(showMessage("Ошибка: " + res.message));
            })
            .finally(() => {
                dispatch({
                    type: SET_USER,
                    user: null,
                });
                deleteCookie('token');
                localStorage.removeItem('token');
            })
    }
}