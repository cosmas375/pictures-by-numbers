const LS_KEY_DARK_MODE_ENABLED = 'dark-mode-enabled';

export const THEMES = {
  // sync with @/assets/scss/themes.scss
  light: 'light',
  dark: 'dark'
};

export function saveTheme(value) {
  localStorage.setItem(LS_KEY_DARK_MODE_ENABLED, value);
}

export function getSavedTheme() {
  return THEMES[localStorage.getItem(LS_KEY_DARK_MODE_ENABLED)];
}
