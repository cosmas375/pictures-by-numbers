<template>
  <div class="theme-switch">
    <UIIcon
      icon="el-icon-sunny"
      size="2rem"
      @click="setLightTheme"
      class="theme-switch__icon"
    />
    <UISwitch
      :value="isDarkThemeEnabled"
      :inactive-text="$t('common.dark_mode')"
      active-color="#ffffff"
      @input="switchTheme"
      class="theme-switch__switch"
    />
    <UIIcon
      icon="el-icon-moon"
      size="1.6rem"
      @click="setDarkTheme"
      class="theme-switch__icon"
    />
  </div>
</template>

<script>
import { THEMES } from '@/helpers/themesHelper';

export default {
  name: 'ThemeSwitch',
  props: {
    theme: { type: String, default: THEMES.light }
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
    },
    setLightTheme() {
      if (this.isDarkThemeEnabled) {
        this.switchTheme();
      }
    },
    setDarkTheme() {
      if (!this.isDarkThemeEnabled) {
        this.switchTheme();
      }
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
    cursor: pointer;
    @include themed() {
      color: t($text-color);
      transition: color $theme-transition;
    }
  }

  &__switch {
    margin: 0 0.8rem;
  }
}
</style>
