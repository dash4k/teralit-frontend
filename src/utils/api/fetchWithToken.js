import { getAccessToken, putAccessToken, putRefreshToken } from './localStorage.js';

const fetchWithToken = async (url, options = {}) => {
  const response = fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  if (response.status === 401) {
    const { accessToken, refreshToken } = await refreshToken();

    putRefreshToken(refreshToken);
    putAccessToken(accessToken);

    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken}`,
      },
    });
  }

  return response;
};

export default fetchWithToken;
