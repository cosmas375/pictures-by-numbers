<template>
  <div :class="`app app_${theme}`">
    <router-view
      :theme="theme"
      :lang="lang"
      :langs="langs"
      @switch-theme="switchTheme"
      @set-lang="setLang"
    ></router-view>
  </div>
</template>

<script>
import { THEMES, saveTheme, getSavedTheme } from '@/helpers/themesHelper';
import { LANGS, saveLang, getSavedLang } from '@/helpers/langsHelper';

export default {
  name: 'App',
  data() {
    return {
      theme: THEMES.light,
      lang: LANGS[0],
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
      this.$i18n.locale = lang;
      saveLang(lang);
    }
  },
  created() {
    this.theme = getSavedTheme();
    this.setLang(getSavedLang());
  }
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
