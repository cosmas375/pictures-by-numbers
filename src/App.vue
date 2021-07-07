<template>
  <div :class="`app app_${theme}`">
    <PaintByNumbers
      :theme="theme"
      :lang="lang"
      :langs="langs"
      @switch-theme="switchTheme"
      @set-lang="setLang"
    />
  </div>
</template>

<script>
import PaintByNumbers from '@/views/PaintByNumbers';
import {
  THEMES,
  DEFAULT_THEME,
  saveTheme,
  getSavedTheme
} from '@/helpers/themesHelper';
import {
  LANGS,
  DEFAUTL_LANG,
  saveLang,
  getSavedLang
} from '@/helpers/langsHelper';

export default {
  name: 'App',
  data() {
    return {
      theme: DEFAULT_THEME,
      lang: DEFAUTL_LANG,
      langs: LANGS
    };
  },
  methods: {
    switchTheme() {
      const newTheme = this.theme === THEMES.light ? THEMES.dark : THEMES.light;

      this.theme = newTheme;
      saveTheme(newTheme);
    },
    setLang(lang) {
      this.lang = lang;
      this.$localization.setLocale(lang);
      saveLang(lang);
    }
  },
  created() {
    this.theme = getSavedTheme();
    this.setLang(getSavedLang());
  },
  components: { PaintByNumbers }
};
</script>

<style lang="scss">
@import '@/assets/scss/resets';

html {
  font-size: 10px;
  font-family: Helvetica, sans-serif;
}

.app {
  min-height: 100vh;
  min-width: 36rem;
}
</style>
