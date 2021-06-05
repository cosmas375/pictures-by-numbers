import { createI18n } from 'vue-i18n';
import messages from '@/locale';

const i18n = createI18n({
  locale: window.navigator.language.toLowerCase().slice(0, 2),
  fallbackLocale: 'se',
  messages
});

export default i18n;
