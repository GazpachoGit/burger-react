import { loginRequest, registerRequest, getUserRequest, logoutRequest } from '../auth-api';
import { setCookie } from './utils';

export const SET_USER = 'SET_USER';

export function singIn(form, type) {
    return function(dispatch){
        const request = type === 'login' ? loginRequest : registerRequest;

        const data = request(form)
        .then(res => {
            if (res.ok)
                return res.json();
            return Promise.reject(res.status);
        })
        .then(data => data);

    if(data.success){
        const authToken = data.authToken.split("Bearer ")
        setCookie('token', authToken);

        localStorage.setItem('token', data.refreshToken);

        dispatch({
            type: SET_USER,
            email: data.user.email,
            name: data.user.name,
        });
    } 
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