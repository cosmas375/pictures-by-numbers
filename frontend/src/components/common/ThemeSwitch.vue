<template>
  <div class="theme-switch">
    <UIIcon
      icon="light-theme"
      size="2.4rem"
      @click="setLightTheme"
      class="theme-switch__icon"
    />
    <UISwitch
      :value="isDarkThemeEnabled"
      active-color="#ffffff"
      @input="switchTheme"
      class="theme-switch__switch"
    />
    <UIIcon
      icon="dark-theme"
      size="2rem"
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
@import '@/assets/scss/theming/theming';

.theme-switch {
  display: flex;
  align-items: center;

  &__icon {
    cursor: pointer;
    @include themed() {
      color: t($color);
      transition: color $theme-transition;
    }
  }

  &__switch {
    margin: 0 0.8rem;
  }
}
</style>
