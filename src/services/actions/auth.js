import { loginRequest, registerRequest, forgotPasswordRequest, getUserRequest, logoutRequest, refreshTockenRequest, resetPasswordRequest } from '../auth-api';
import { setCookie, deleteCookie } from '../../utils/cookie-utils';
//import {authUrl} from '../../utils/constants';

export const SET_USER = 'SET_USER';
export const SET_CHANGING_PASSWORD = 'SET_CHANGING_PASSWORD';
export const USER_REQUIRED = 'USER_REQUIRED';
export const USER_LOADED = 'USER_LOADED';

export function singIn(form, type) {
    return function(dispatch){
        const request = type === 'login' ? loginRequest : registerRequest;
        request(form)
            .then(res => {
                if (res.ok)
                    return res.json();
                return Promise.reject(res.status);
            })
            .then(data => {
                if(data.success){
                    const authToken = data.accessToken.split("Bearer ")[1];
                    
                    setCookie('token', authToken);
            
                    localStorage.setItem('token', data.refreshToken);
            
                    dispatch({
                        type: SET_USER,
                        user: data.user,
                    });
                } 
            });
    }
}

export function forgotPassword(form) {
    return function(dispatch) {
        forgotPasswordRequest(form)
        .then(res => {
            if (res.ok)
                return res.json();
            return Promise.reject(res.status);
        })
        .then(data => {
            if(data.success){       
                dispatch({
                    type: SET_CHANGING_PASSWORD
                });;
            } 
        });
    }
}

export function resetPassword(form) {
    return function(dispatch) {
        resetPasswordRequest(form)
        .then(res => {
            if (res.ok)
                return res.json();
            return Promise.reject(res.status);
        })
        .then(data => {
            if(data.success){       
                dispatch({
                    type: SET_CHANGING_PASSWORD
                });;
            } 
        });
    }
}

export function getUser() {
    return function(dispatch){
        dispatch({
            type: USER_REQUIRED
        })
        getUserRequest()
            .then(res => {
                //if (res.ok) return res.json();
                //return Promise.reject(res.json());
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
                }
            })
            .catch(res => {
                if(res.message === 'jwt expired') {
                    //updateTocken(getUser);
                    dispatch(updateTocken(getUser()))
                } else {
                    dispatch({
                        type: USER_LOADED
                    })
                }

            })
    }
  };

function updateTocken(callback) {
    return function(dispatch) {
        refreshTockenRequest()
        .then(res => {
            return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
        })
        .then(data => {
            if (data.success) {
                const authToken = data.accessToken.split("Bearer ")[1];
                setCookie('token', authToken);
                localStorage.setItem('token', data.refreshToken);
                dispatch(callback);
            }
        })
        .catch((res) => {
            console.log(res.message);
            dispatch({
                type: USER_LOADED
            })
        })
    }
}

export function singOut() {
    return function(dispatch){
        logoutRequest()
            .then(res => {
                return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
            })
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: SET_USER,
                        user: null,
                    });
                    deleteCookie('token');
                    localStorage.removeItem('token');
                }
            })
            .catch((res) => {
                console.log(res.message);
            })
    }
}