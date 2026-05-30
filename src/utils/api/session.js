import fetchWithToken from './fetchWithToken.js';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const createSession = async () => {
  const response = await fetchWithToken(`${BASE_URL}/sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') throw new Error(responseJson.message);

  return { error: false, sessionId: responseJson.data.id };
};

export const listSessions = async () => {
  const response = await fetchWithToken(`${BASE_URL}/sessions`, {
    method: 'GET',
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') throw new Error(responseJson.message);

  return { error: false, sessions: responseJson.data.sessions };
};

export const viewSession = async ({ id }) => {
  const response = await fetchWithToken(`${BASE_URL}/sessions/${id}`, {
    method: 'GET',
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') throw new Error(responseJson.message);

  return { error: false, session: responseJson.data };
};

export const editStatus = async ({ id, status }) => {
  const response = await fetchWithToken(`${BASE_URL}/sessions/${id}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') throw new Error(responseJson.message);

  return { error: false };
};

export const editTimestamp = async ({ id }) => {
  const response = await fetchWithToken(`${BASE_URL}/sessions/${id}/timestamp`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') throw new Error(responseJson.message);

  return { error: false };
};

export const removeSession = async ({ id }) => {
  const response = await fetchWithToken(`${BASE_URL}/sessions/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') throw new Error(responseJson.message);

  return { error: false };
};
