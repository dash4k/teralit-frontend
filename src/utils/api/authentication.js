import { getRefreshToken } from './localStorage.js';
import fetchWithToken from './fetchWithToken.js';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const register = async ({ email, password, name }) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    const message =
      typeof responseJson.message === 'object'
        ? responseJson.message.message
        : responseJson.message;

    throw new Error(message);
  }

  return { error: false };
};

export const verifyEmail = async (verifyToken) => {
  const response = await fetch(`${BASE_URL}/verify-email?token=${verifyToken}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return { error: false };
};

export const resendVerification = async ({ email }) => {
  const response = await fetch(`${BASE_URL}/resend-verification`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    const message =
      typeof responseJson.message === 'object'
        ? responseJson.message.message
        : responseJson.message;

    throw new Error(message);
  }

  return { error: false };
};

export const login = async ({ email, password }) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    const message =
      typeof responseJson.message === 'object'
        ? responseJson.message.message
        : responseJson.message;

    throw new Error(message);
  }

  return { error: false, data: responseJson.data };
};

export const refreshAccessToken = async () => {
  const token = getRefreshToken();
  const response = await fetch(`${BASE_URL}/authentications`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken: token }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    const message =
      typeof responseJson.message === 'object'
        ? responseJson.message.message
        : responseJson.message;

    throw new Error(message);
  }

  return { error: false, data: responseJson.data };
};

export const logout = async () => {
  const token = getRefreshToken();
  const response = await fetchWithToken(`${BASE_URL}/authentications`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken: token }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    const message =
      typeof responseJson.message === 'object'
        ? responseJson.message.message
        : responseJson.message;

    throw new Error(message);
  }

  return { error: false };
};
