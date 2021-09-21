<template>
  <Layout
    :is-scroll-to-topButton-available="isScrollToTopButtonAvailable"
    :class="`app app_${theme}`"
  >
    <template #header>
      <Header
        :lang="lang"
        :langs="langs"
        :theme="theme"
        :is-printing-available="isPrintingRouteAvailable"
        @set-lang="switchLang"
        @switch-theme="switchTheme"
      />
    </template>
    <template #content>
      <router-view
        v-slot="{ Component }"
        @image-loaded="onImageReady"
        @image-removed="onImageRemoved"
        @notify="showNotification"
      >
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
      <Notifications :notifications="notifications" @hide="hideNotification" />
    </template>
  </Layout>
</template>

<script>
import Layout from '@/components/layout/Layout';
import Header from '@/components/layout/Header';
import Notifications from '@/components/common/Notifications';

import {
  THEMES,
  DEFAULT_THEME,
  saveTheme,
  getDefautlTheme
} from '@/helpers/themesHelper';
import {
  LANGS,
  DEFAUTL_LANG,
  saveLang,
  getDefaultLanguage
} from '@/helpers/langsHelper';
import { ROUTES } from '@/router';

import { nanoid } from 'nanoid';

export default {
  name: 'App',
  data() {
    return {
      theme: DEFAULT_THEME,
      lang: DEFAUTL_LANG,
      langs: LANGS,
      isPrintingRouteAvailable: false,
      notifications: []
    };
  },
  computed: {
    isScrollToTopButtonAvailable() {
      return this.$route.name === ROUTES.Home;
    }
  },
  methods: {
    // theme
    switchTheme() {
      const theme = this.theme === THEMES.light ? THEMES.dark : THEMES.light;
      this.setTheme(theme);
      saveTheme(theme);
    },
    setTheme(theme) {
      this.updateBodyThemeClassName(theme);
      this.theme = theme;
    },
    updateBodyThemeClassName(theme) {
      document.body.classList.remove(`app-body_${this.theme}`);
      document.body.classList.add(`app-body_${theme}`);
    },

    // lang
    switchLang(lang) {
      this.setLang(lang);
      saveLang(lang);
    },
    setLang(lang) {
      this.lang = lang;
      this.$localization.setLocale(lang);
    },

    onImageReady() {
      this.isPrintingRouteAvailable = true;
    },
    onImageRemoved() {
      this.isPrintingRouteAvailable = false;
    },
    showNotification(notification) {
      const id = nanoid();
      this.notifications.push({
        id,
        ...notification
      });
      if (notification.duration) {
        setTimeout(() => {
          this.hideNotification(id);
        }, notification.duration);
      }
    },
    hideNotification(id) {
      this.notifications = this.notifications.filter(
        notification => notification.id !== id
      );
    }
  },
  created() {
    this.setTheme(getDefautlTheme());
    this.setLang(getDefaultLanguage());
  },
  components: { Layout, Header, Notifications }
};
</script>

<style lang="scss">
@import '@/assets/scss/resets';
@import '@/assets/scss/fonts';

html {
  font-size: 10px;
}

body {
  overflow: hidden;
}
</style>
