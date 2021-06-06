<template>
  <div class="image-processor">
    <div class="image-processor__content">
      <div
        class="image-processor__content-row image-processor__content-row_logo"
      >
        <Logo />
      </div>
      <div class="image-processor__content-row">
        <canvas ref="canvas" class="image-processor__canvas"></canvas>
      </div>
    </div>
    <div class="image-processor__controls">
      <div class="image-processor__top-controls">
        <div
          class="image-processor__controls-row image-processor__controls-row_upload"
        >
          <ImageUploader @file-ready="onFileReady" />
        </div>
      </div>
      <div class="image-processor__bottom-controls">
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
import Logo from '@/components/common/Logo';
import LangSelect from '@/components/common/LangSelect';
import ThemeSwitch from '@/components/common/ThemeSwitch';
import ImageUploader from '@/components/ImageProcessor/UI/ImageUploader';

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
  methods: {
    onFileReady(img) {
      const canvas = this.$refs.canvas;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
    }
  },
  components: {
    Logo,
    LangSelect,
    ThemeSwitch,
    ImageUploader
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

  &__content-row {
    &_logo {
      margin-bottom: 3.5rem;
    }
  }

  &__canvas {
    width: 100%;
    height: 100%;
    @include themed() {
      background-color: t($canvas-bg);
    }
  }

  &__controls {
    flex: 1;
    padding: 12rem 2rem 4rem;
    display: flex;
    flex-direction: column;
    @include themed() {
      background: t($img-processor-bg-controls);
    }
  }

  &__top-controls {
    flex: 1;
  }

  &__bottom-controls {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  &__controls-row {
    &_upload {
      display: flex;
      align-items: center;
      justify-content: center;
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
    &__bottom-controls {
      flex-direction: column;
    }

    &__theme-switch {
      margin-top: 2rem;
    }
  }
}
</style>
