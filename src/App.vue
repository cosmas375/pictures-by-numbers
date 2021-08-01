<template>
  <Layout :class="`app app_${theme}`">
    <template #header>
      <Header
        :lang="lang"
        :langs="langs"
        :theme="theme"
        :is-printing-available="isImageLoaded"
        @set-lang="setLang"
        @switch-theme="switchTheme"
      />
    </template>
    <template #content>
      <router-view></router-view>
    </template>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout';
import Header from '@/components/Header';

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
      langs: LANGS,
      isImageLoaded: true
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
  components: { Layout, Header }
};
</script>

<style lang="scss">
@import '@/assets/scss/resets';

html {
  font-size: 10px;
  font-family: Helvetica, sans-serif;
}

body {
  overflow: hidden;
}
</style>
