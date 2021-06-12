<template>
  <div class="image-processor">
    <div class="image-processor__block image-processor__block_content">
      <div
        class="image-processor__content-row image-processor__content-row_logo"
      >
        <Logo />
      </div>
      <div
        class="image-processor__content-row image-processor__content-row_preview"
      >
        <ResultPreview :image="sourceImg" @done="setProcessingDone(true)" />
      </div>
      <div
        v-if="isProcessingDone"
        class="image-processor__content-row image-processor__content-row_reset"
      >
        <UIIcon
          icon="el-icon-close"
          class="image-processor__reset-btn"
          @click="resetImage"
        />
      </div>
    </div>
    <div class="image-processor__block image-processor__block_controls">
      <div class="image-processor__top-controls">
        <ImageUploader @file-ready="onFileReady" />
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
import ImageUploader from '@/components/PaintByNumbers/ImageUploader';
import ResultPreview from '@/components/PaintByNumbers/ResultPreview';

export default {
  name: 'PaintByNumbers',
  props: {
    theme: { type: String, default: 'light' },
    lang: { type: String, default: 'en' },
    langs: { type: Array, default: () => [] }
  },
  emits: {
    'set-lang': null,
    'switch-theme': null
  },
  data() {
    return {
      sourceImg: null,
      isProcessingDone: false
    };
  },
  methods: {
    onFileReady(img) {
      this.sourceImg = img;
      this.setProcessingDone(false);
    },
    setProcessingDone(value) {
      this.isProcessingDone = value;
    },
    resetImage() {
      this.sourceImg = null;
    }
  },
  components: {
    Logo,
    LangSelect,
    ThemeSwitch,
    ImageUploader,
    ResultPreview
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/theming';

.image-processor {
  min-height: 100vh;
  display: flex;
  position: relative;

  &__block {
    box-sizing: border-box;
    height: 100%;
    position: relative;

    &_content {
      width: 67%;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      padding: 3rem 5% 8rem;
      @include themed() {
        background-color: t($img-processor-bg-content);
        transition: background-color $theme-transition;
      }
    }

    &_controls {
      padding: 3rem 2rem 2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 33%;
      height: 100vh;
      position: fixed;
      right: 0;
      top: 0;
      @include themed() {
        background-color: t($img-processor-bg-controls);
        transition: background-color $theme-transition;
      }
    }
  }

  &__content-row {
    &_logo {
      margin-bottom: 3.5rem;
    }

    &_preview {
      flex: 1;
    }

    &_reset {
      position: absolute;
      bottom: 6rem;
      left: 50%;
    }
  }

  &__top-controls {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 4rem;
    overflow: auto;
  }

  &__bottom-controls {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  &__reset-btn {
    font-size: 2.4em;
    cursor: pointer;
    @include themed() {
      color: t($text-color-red);
      transition: color $theme-transition;
    }
  }
}

@media only screen and (max-width: 1024px) {
  .image-processor {
    flex-direction: column;

    &__block {
      width: 100%;

      &_content {
        padding-bottom: 4rem;
        min-height: auto;
        flex: 1;
      }

      &_controls {
        position: relative;
        height: auto;
        padding: 4rem 4rem;
      }
    }
  }
}
@media only screen and (max-width: 480px) {
  .image-processor {
    &__bottom-controls {
      flex-direction: column;
      align-items: center;
    }

    &__theme-switch {
      margin-top: 2rem;
    }
  }
}
</style>
