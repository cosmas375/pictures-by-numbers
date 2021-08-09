<template>
  <Layout :class="`app app_${theme}`">
    <template #header>
      <Header
        :lang="lang"
        :langs="langs"
        :theme="theme"
        :is-printing-available="isPrintingRouteAvailable"
        @set-lang="setLang"
        @switch-theme="switchTheme"
      />
    </template>
    <template #content>
      <router-view
        @image-loaded="onImageReady"
        @image-removed="onImageRemoved"
      />
    </template>
  </Layout>
</template>

<script>
import Layout from '@/components/layout/Layout';
import Header from '@/components/layout/Header';

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
      isPrintingRouteAvailable: false
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
    },
    onImageReady() {
      this.isPrintingRouteAvailable = true;
    },
    onImageRemoved() {
      this.isPrintingRouteAvailable = false;
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

.app {
  min-width: 48rem;
}
</style>
