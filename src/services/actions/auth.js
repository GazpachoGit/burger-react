import { loginRequest, registerRequest, forgotPasswordRequest, getUserRequest, logoutRequest } from '../auth-api';
import { setCookie } from '../../utils/cookie-utils';
//import {authUrl} from '../../utils/constants';

export const SET_USER = 'SET_USER';
export const SET_CHANGING_PASSWORD = 'SET_CHANGING_PASSWORD';

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
                    const authToken = data.accessToken.split("Bearer ")
                    setCookie('token', authToken);
            
                    localStorage.setItem('token', data.refreshToken);
            
                    dispatch({
                        type: SET_USER,
                        email: data.user.email,
                        name: data.user.name,
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
                });
            } 
        });
    }
}

export function getUser() {
    return function(dispatch){
        getUserRequest()
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: SET_USER,
                        email: data.user.email,
                        name: data.user.name,
                    });
                }
            });
    }
  };