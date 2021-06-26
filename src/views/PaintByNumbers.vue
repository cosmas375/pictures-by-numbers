<template>
  <div class="processor">
    <div class="processor__block processor__block_content">
      <div class="processor__content-row processor__content-row_logo">
        <Logo />
      </div>
      <div class="processor__content-row processor__content-row_preview">
        <div class="processor__preview preview">
          <div v-if="!isResultReady" class="preview__container">
            <ProcessorPlaceholder v-if="isPlaceholderVisible" />
            <ProcessorLoader v-if="isLoaderVisible" />
          </div>
          <template v-else>
            <ResultPreview
              :first="sourceImage"
              :second="processedImage"
              class="preview__compare"
            />
            <UIButton @click="downloadPdf" class="preview__download-btn">
              {{ $t('image_processor.preview.download') }}
            </UIButton>
          </template>
        </div>
      </div>
    </div>
    <div class="processor__block processor__block_controls">
      <div class="processor__top-controls">
        <ImageUploader @file-ready="onFileReady" />
      </div>
      <div class="processor__bottom-controls">
        <LangSelect
          :value="lang"
          :langs="langs"
          @input="$emit('set-lang', $event)"
          class="processor__lang-select"
        />
        <ThemeSwitch
          :theme="theme"
          @switch-theme="$emit('switch-theme')"
          class="processor__theme-switch"
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
import ProcessorPlaceholder from '@/components/PaintByNumbers/ProcessorPlaceholder';
import ProcessorLoader from '@/components/PaintByNumbers/ProcessorLoader';
import ResultPreview from '@/components/PaintByNumbers/ResultPreview';

import processImage from '@/libs/processImage';
import generatePdf from '@/helpers/generatePdf';

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
      sourceImage: null,
      isLoaderVisible: false,
      isResultReady: false,
      processingResult: null
    };
  },
  computed: {
    isPlaceholderVisible() {
      return !this.sourceImage;
    },
    processedImage() {
      return this.processingResult ? this.processingResult.image : null;
    },
    palette() {
      return this.processingResult ? this.processingResult.palette : null;
    }
  },
  methods: {
    onFileReady(img) {
      this.sourceImage = img;
      this.setResultReady(false);
      this.setLoadingState(true);
      processImage(img)
        .then(this.onReady)
        .catch(this.onError);
    },

    setLoadingState(value) {
      this.isLoaderVisible = value;
    },
    setResultReady(value) {
      this.isResultReady = value;
    },
    async onReady(result) {
      this.processingResult = result;
      this.setLoadingState(false);
      this.setResultReady(true);
    },
    onError(error) {
      console.log(error);
      // this.$ui.alert(error);
    },

    downloadPdf() {
      generatePdf({
        image: this.processedImage,
        palette: this.palette
      });
    }
  },
  components: {
    Logo,
    LangSelect,
    ThemeSwitch,
    ImageUploader,
    ProcessorPlaceholder,
    ProcessorLoader,
    ResultPreview
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/theming';

.processor {
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
      padding: 3rem 5% 6rem;
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

.preview {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__container {
    width: 100%;
    min-height: 40rem;
    display: flex;
    align-items: center;
    @include themed() {
      background-color: t($img-processor-bg-controls);
      transition: background-color $theme-transition;
    }
  }

  &__compare {
    position: relative;
  }

  &__download-btn {
    margin-top: 3rem;
  }
}

@media only screen and (max-width: 1024px) {
  .processor {
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
  .processor {
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
