import fetchWithToken from './fetchWithToken.js';
import toast from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const viewProfile = async () => {
  const response = await fetchWithToken(`${BASE_URL}/profile`, {
    method: 'GET',
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    toast.error(responseJson.message);
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
};

export const editProfile = async ({ name }) => {
  const response = await fetchWithToken(`${BASE_URL}/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    toast.error(responseJson.message);
    return { error: true };
  }

  return { error: false };
};

export const removeAccount = async () => {
  const response = await fetchWithToken(`${BASE_URL}/users`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    toast.error(responseJson.message);
    return { error: true };
  }

  return { error: false };
};
