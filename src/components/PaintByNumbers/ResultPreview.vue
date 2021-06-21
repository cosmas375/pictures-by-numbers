<template>
  <div class="result-preview">
    <div v-if="!image" class="result-preview__placeholder">
      <UIIcon icon="el-icon-view" class="result-preview__placeholder-icon" />
      <span class="result-preview__placeholder-text">
        {{ $t('image_processor.preview.placeholder') }}
      </span>
    </div>
    <div v-if="isLoadingStateEnabled" class="result-preview__loader">
      <UIIcon icon="el-icon-loading" class="result-preview__loader-icon" />
      <span class="result-preview__loader-text">{{
        $t('image_processor.preview.loader')
      }}</span>
    </div>
    <ResultComparison
      v-if="isResultReady"
      :sourceImage="image"
      :processedImage="processedImage"
      :labelsLocations="labelsLocations"
      class="result-preview__compare"
    />
  </div>
</template>

<script>
import ResultComparison from '@/components/PaintByNumbers/ResultComparison';
import processImage from '@/utils/processImage';

export default {
  name: 'ResultPreview',
  props: {
    image: { type: [File, Object] }
  },
  data() {
    return {
      isLoadingStateEnabled: false,
      isResultReady: false,
      processedImage: null,
      labelsLocations: null
    };
  },
  methods: {
    setLoadingState(value) {
      this.isLoadingStateEnabled = value;
    },
    setResultReady(value) {
      this.isResultReady = value;
    },
    async onReady({ outlined, labelsLocations }) {
      this.processedImage = outlined;
      this.labelsLocations = labelsLocations;
      this.setLoadingState(false);
      this.setResultReady(true);
    },
    onError(error) {
      console.log(error);
      // this.$ui.alert(error);
    }
  },
  watch: {
    image(v) {
      this.setResultReady(false);
      this.setLoadingState(true);
      processImage(v)
        .then(this.onReady)
        .catch(this.onError);
    }
  },
  components: {
    ResultComparison
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/theming';

$min-container-height: 40rem;

.result-preview {
  width: 100%;
  @include themed() {
    background-color: t($canvas-bg);
    transition: background-color $theme-transition;
  }

  &_loading {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__placeholder {
    width: 100%;
    min-height: $min-container-height;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  &__placeholder-icon {
    font-size: 4.8rem;
    @include themed() {
      color: t($text-color-secondary);
      transition: color $theme-transition;
    }
  }
  &__placeholder-text {
    font-size: 1.4rem;
    @include themed() {
      color: t($text-color-secondary);
      transition: color $theme-transition;
    }
  }

  &__loader {
    width: 100%;
    min-height: $min-container-height;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  &__loader-icon {
    font-size: 2.4rem;
    @include themed() {
      color: t($text-color-secondary);
      transition: color $theme-transition;
    }
  }
  &__loader-text {
    margin-top: 0.4rem;
    font-size: 1.4rem;
    @include themed() {
      color: t($text-color-secondary);
      transition: color $theme-transition;
    }
  }

  &__compare {
    position: relative;
  }
}
</style>
