<template>
  <div :class="`app app_${theme}`">
    <ImageProcessor :theme="theme" @switch-theme="switchTheme" />
  </div>
</template>

<script>
import ImageProcessor from '@/components/ImageProcessor.vue';
import { THEMES, saveTheme, getSavedTheme } from '@/helpers/themesHelper';

export default {
  name: 'App',
  components: {
    ImageProcessor
  },
  data() {
    return {
      theme: THEMES.light
    };
  },
  methods: {
    switchTheme() {
      const newTheme = this.theme === THEMES.light ? THEMES.dark : THEMES.light;

      this.theme = newTheme;
      saveTheme(newTheme);
    }
  },
  created() {
    this.theme = getSavedTheme();
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/element-ui';
@import '@/assets/scss/resets';
@import '@/assets/scss/common';

.app {
}
</style>
