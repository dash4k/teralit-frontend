import fetchWithToken from './fetchWithToken.js';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const makePrediction = async ({ sessionId }) => {
  const response = await fetchWithToken(`${BASE_URL}/sessions/${sessionId}/classification`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') throw new Error(responseJson.message);

  return { error: false };
};

export const viewPrediction = async ({ sessionId }) => {
  const response = await fetchWithToken(`${BASE_URL}/sessions/${sessionId}/classification`, {
    method: 'GET',
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') throw new Error(responseJson.message);

  return { error: false, classification: responseJson.data };
};
