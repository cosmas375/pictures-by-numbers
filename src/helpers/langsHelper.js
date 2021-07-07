const LS_KEY_LANG = 'lang';

export const DEFAUTL_LANG = 'en';
export const LANGS = ['ru', 'en'];

export function saveLang(value) {
  localStorage.setItem(LS_KEY_LANG, value);
}

export function getSavedLang() {
  const lsData = localStorage.getItem(LS_KEY_LANG);
  if (lsData) {
    return lsData;
  }

  const navLang = window.navigator.language.toLowerCase().slice(0, 2);
  if (LANGS.includes(navLang)) {
    return navLang;
  }

  return DEFAUTL_LANG;
}
