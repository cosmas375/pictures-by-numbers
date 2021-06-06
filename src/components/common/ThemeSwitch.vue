<template>
  <UISwitch
    :value="isDarkThemeEnabled"
    :inactive-text="$t('common.dark_mode')"
    active-color="#ffffff"
    @input="switchTheme"
    class="theme-switch"
  />
</template>

<script>
import { THEMES } from '@/helpers/themesHelper';

export default {
  name: 'ThemeSwitch',
  props: {
    theme: { type: String, default: 'light' }
  },
  computed: {
    isDarkThemeEnabled() {
      return this.theme === THEMES.dark;
    }
  },
  methods: {
    switchTheme() {
      this.$emit('switch-theme');
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/theming';

.theme-switch {
  .el-switch__label {
    @include themed() {
      color: t($text-color);
    }
  }
}
</style>
