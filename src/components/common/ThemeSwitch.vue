<template>
  <UISwitch
    :value="isDarkThemeEnabled"
    :inactive-text="$t('common.dark_mode')"
    active-color="#ffffff"
    @input="$emit('switch-theme')"
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
  emits: {
    'switch-theme': null
  },
  computed: {
    isDarkThemeEnabled() {
      return this.theme === THEMES.dark;
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
      transition: color $theme-transition;
    }
  }
}
</style>
