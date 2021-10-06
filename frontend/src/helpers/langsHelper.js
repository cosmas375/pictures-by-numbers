const LS_KEY_LANG = 'lang';

export const DEFAUTL_LANG = 'en';
export const LANGS = ['ru', 'en'];

export function saveLang(value) {
  localStorage.setItem(LS_KEY_LANG, value);
}

export function getDefaultLanguage() {
  const savedLang = getSavedLang();
  if (savedLang) {
    return savedLang;
  }

  const navLang = getLangByNavigator();
  if (navLang) {
    return navLang;
  }

  return DEFAUTL_LANG;
}

function getSavedLang() {
  return localStorage.getItem(LS_KEY_LANG);
}

function getLangByNavigator() {
  const lang = window.navigator.language.toLowerCase().slice(0, 2);
  return LANGS.includes(lang) ? lang : null;
}
