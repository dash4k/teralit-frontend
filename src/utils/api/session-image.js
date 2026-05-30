import fetchWithToken from './fetchWithToken.js';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const uploadImage = async ({ sessionId, image }) => {
  const formData = new FormData();
  formData.append('image', image);

  const response = await fetchWithToken(`${BASE_URL}/sessions/${sessionId}/image`, {
    method: 'POST',
    body: formData,
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') throw new Error(responseJson.message);

  return { error: false };
};

export const viewImage = async ({ sessionId }) => {
  const response = await fetchWithToken(`${BASE_URL}/sessions/${sessionId}/image`, {
    method: 'GET',
  });

  if (!response.ok) throw new Error('HTTP error! status: ', response.status);

  const blob = await response.blob();

  const imageUrl = URL.createObjectURL(blob);

  return { error: false, imageUrl };
};
