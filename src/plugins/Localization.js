import { createI18n } from 'vue-i18n';
import messages from '@/locale';

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages
});

export default {
  install: function(app) {
    app.use(i18n);
    app.config.globalProperties.$localization = {
      setLocale: locale => (i18n.global.locale = locale)
    };
  }
};
