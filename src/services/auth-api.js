import { getCookie } from '../utils/cookie-utils';
import {authUrl} from '../utils/constants';

export const loginRequest = async form => {
  return await fetch(`${authUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  });
};

export const registerRequest = async form => {
  return await fetch(`${authUrl}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  });
}

export const forgotPasswordRequest = async form => {
  return await fetch(`${authUrl}/password-reset`, {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  });
}

export const getUserRequest = async () =>
  await fetch(`${authUrl}/auth/user`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  });

export const logoutRequest = async () => {
  return await fetch(`${authUrl}/auth/logout`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  });
};

