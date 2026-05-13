const THEME_STATE_KEY = import.meta.env.VITE_THEME_STATE_KEY;

function getThemeState() {
  return localStorage.getItem(THEME_STATE_KEY);
}

function putThemeState(themeState) {
  return localStorage.setItem(THEME_STATE_KEY, themeState);
}

export {
  getThemeState,
  putThemeState
};
