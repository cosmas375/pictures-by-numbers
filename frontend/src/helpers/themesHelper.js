const LS_KEY_DARK_MODE_ENABLED = 'dark-mode-enabled';

export const DEFAULT_THEME = 'light';
export const THEMES = {
  // sync with @/assets/scss/themes.scss
  light: 'light',
  dark: 'dark'
};

export function saveTheme(value) {
  localStorage.setItem(LS_KEY_DARK_MODE_ENABLED, value);
}

export function getDefautlTheme() {
  const savedTheme = getSavedTheme();
  if (savedTheme) {
    return savedTheme;
  }

  const themeByTime = getThemeByTime();
  if (themeByTime) {
    return themeByTime;
  }

  return DEFAULT_THEME;
}

function getSavedTheme() {
  const savedKey = localStorage.getItem(LS_KEY_DARK_MODE_ENABLED);
  return savedKey ? THEMES[savedKey] : null;
}

function getThemeByTime() {
  const currentHour = new Date().getHours();
  return currentHour > 5 && currentHour < 20 ? THEMES.light : THEMES.dark;
}
