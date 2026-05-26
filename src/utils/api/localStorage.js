const THEME_STATE_KEY = import.meta.env.VITE_THEME_STATE_KEY;
const REFRESH_TOKEN_KEY = import.meta.env.VITE_REFRESH_TOKEN_KEY;
const ACCESS_TOKEN_KEY = import.meta.env.VITE_ACCESS_TOKEN_KEY;

export const getRefreshToken = () => {
  return localStorage.get(REFRESH_TOKEN_KEY);
};

export const putRefreshToken = (refreshToken) => {
  return localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const getAccessToken = () => {
  return localStorage.get(ACCESS_TOKEN_KEY);
};

export const putAccessToken = (accessToken) => {
  return localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
};

export const getThemeState = () => {
  return localStorage.getItem(THEME_STATE_KEY);
};

export const putThemeState = (themeState) => {
  return localStorage.setItem(THEME_STATE_KEY, themeState);
};
