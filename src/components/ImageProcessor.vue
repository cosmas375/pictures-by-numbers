<template>
  <div class="image-processor">
    <div class="image-processor__content">
      <Logo />
    </div>
    <div class="image-processor__controls">
      <div
        class="image-processor__controls-row image-processor__controls-row_bottom"
      >
        <LangSelect
          :value="lang"
          :langs="langs"
          @input="$emit('set-lang', $event)"
          class="image-processor__lang-select"
        />
        <ThemeSwitch
          :theme="theme"
          @switch-theme="$emit('switch-theme')"
          class="image-processor__theme-switch"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '@/components/Logo';
import LangSelect from '@/components/LangSelect';
import ThemeSwitch from '@/components/ThemeSwitch';

export default {
  name: 'ImageProcessor',
  props: {
    theme: { type: String, default: 'light' },
    lang: { type: String, default: 'en' },
    langs: { type: Array, default: () => [] }
  },
  emits: {
    'set-lang': null,
    'switch-theme': null
  },
  components: {
    Logo,
    LangSelect,
    ThemeSwitch
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/theming';
.image-processor {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;

  &__content {
    flex: 2;
    padding: 3rem 5%;
    @include themed() {
      background: t($img-processor-bg-content);
    }
  }

  &__controls {
    flex: 1;
    padding: 12rem 2rem;
    @include themed() {
      background: t($img-processor-bg-controls);
    }
  }

  &__controls-row {
    &_bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}

@media only screen and (max-width: 1280px) {
  .image-processor {
    flex-direction: column;

    &__controls {
      padding: 4rem 4rem;
    }
  }
}
@media only screen and (max-width: 480px) {
  .image-processor {
    &__controls-row {
      &_bottom {
        flex-direction: column;
      }
    }

    &__theme-switch {
      margin-top: 2rem;
    }
  }
}
</style>
