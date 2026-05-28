import { refreshAccessToken } from './authentication.js';
import { getAccessToken, putAccessToken, putRefreshToken } from './localStorage.js';

const fetchWithToken = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  if (response.status === 401) {
    const { data: { accessToken, refreshToken } } = await refreshAccessToken();

    putRefreshToken(refreshToken);
    putAccessToken(accessToken);

    return await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  return response;
};

export default fetchWithToken;
