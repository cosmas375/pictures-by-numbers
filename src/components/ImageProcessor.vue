<template>
  <div class="image-processor">
    <div class="image-processor__content"></div>
    <div class="image-processor__controls">
      <UISwitch
        :value="isDarkThemeEnabled"
        :inactive-text="$t('common.dark_mode')"
        @input="switchTheme"
      />
    </div>
  </div>
</template>

<script>
import { THEMES } from '@/helpers/themesHelper';

export default {
  name: 'ImageProcessor',
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
.image-processor {
  width: 100vw;
  height: 100vh;
  display: flex;

  &__content {
    flex: 2;
    min-height: 80vh;
    @include themed() {
      background: t($img-processor-bg-content);
    }
  }

  &__controls {
    flex: 1;
    @include themed() {
      background: t($img-processor-bg-controls);
    }
  }
}

@media only screen and (max-width: 1310px) {
  .image-processor {
    flex-direction: column;
  }
}
</style>
