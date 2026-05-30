import fetchWithToken from './fetchWithToken.js';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const agentAnswer = async ({ sessionId, role, content }) => {
  const response = await fetchWithToken(`${BASE_URL}/sessions/${sessionId}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ role, content }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') throw new Error(responseJson.message);

  return { error: false, agentMessage: responseJson.data.agentMessage };
};

export const listMessages = async ({ sessionId }) => {
  const response = await fetchWithToken(`${BASE_URL}/sessions/${sessionId}/messages`, {
    method: 'GET',
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') throw new Error(responseJson.message);

  return { error: false, messages: responseJson.data.messages };
};
