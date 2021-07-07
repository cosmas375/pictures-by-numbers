<template>
  <div class="theme-switch">
    <UISwitch
      :value="isDarkThemeEnabled"
      :inactive-text="$t('common.dark_mode')"
      active-color="#ffffff"
      @input="switchTheme"
      class="theme-switch__switch"
    />
    <UIIcon
      icon="el-icon-moon"
      size="2rem"
      @click="switchTheme"
      class="theme-switch__icon"
    />
  </div>
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
  display: flex;
  align-items: center;

  &__icon {
    margin-left: 0.8rem;
    cursor: pointer;
    @include themed() {
      color: t($text-color);
      transition: color $theme-transition;
    }
  }
}
</style>
