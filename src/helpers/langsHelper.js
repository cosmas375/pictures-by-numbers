const LS_KEY_LANG = 'lang';

export const LANGS = ['ru', 'en'];

export function saveLang(value) {
  localStorage.setItem(LS_KEY_LANG, value);
}

export function getSavedLang() {
  const lsData = localStorage.getItem(LS_KEY_LANG);
  if (lsData) {
    return lsData;
  }

  const navLang = window.navigator.language;
  const processedNavLang = navLang.toLowerCase().slice(0, 2);
  if (LANGS.includes(processedNavLang)) {
    return processedNavLang;
  }

  return LANGS[0];
}
