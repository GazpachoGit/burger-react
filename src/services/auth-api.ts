import { getCookie } from '../utils/cookie-utils';
import { authUrl } from '../utils/constants';

type TForm = {
  [key: string]: number | boolean | string;
}

export const loginRequest = async (form: TForm) => {
  return await fetch(`${authUrl}/auth/login`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  });
};

export const registerRequest = async (form: TForm) => {
  return await fetch(`${authUrl}/auth/register`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  });
}

export const forgotPasswordRequest = async (form: TForm) => {
  return await fetch(`${authUrl}/password-reset`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  });
}
export const resetPasswordRequest = async (form: TForm) => {
  return await fetch(`${authUrl}/password-reset/reset`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  });
}

export const getUserRequest = async () => {
  const token = getCookie('token');
  return await fetch(`${authUrl}/auth/user`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  });
}

export const updateUserRequest = async (form: TForm) => {
  console.log(JSON.stringify(form))
  return await fetch(`${authUrl}/auth/user`, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  });
}



export const refreshTockenRequest = async () =>
  await fetch(`${authUrl}/auth/token`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ token: localStorage.getItem('token') })
  });

export const logoutRequest = async () => {
  return await fetch(`${authUrl}/auth/logout`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ token: localStorage.getItem('token') })
  });
};

