<template>
  <div class="result-preview">
    <div class="result-preview__container">
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
        ref="comparisonBlock"
      />
    </div>
    <UIButton
      v-if="isResultReady"
      @click="downloadPdf"
      class="result-preview__download-btn"
    >
      {{ $t('image_processor.preview.download') }}
    </UIButton>
  </div>
</template>

<script>
import ResultComparison from '@/components/PaintByNumbers/ResultComparison';
import processImage from '@/libs/processImage';
import JSPDF from 'jspdf';

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
    },

    downloadPdf() {
      const sheetParams = {
        format: 'a4',
        unit: 'mm',
        width: 210,
        height: 297
      };

      const orientation =
        this.processedImage.width > this.processedImage.height
          ? 'landscape'
          : 'portrait';

      const sheetAspectRatio = sheetParams.width / sheetParams.height;
      const aspectRatio =
        this.processedImage.width / this.processedImage.height;
      const mainDimension = aspectRatio > sheetAspectRatio ? 'width' : 'height';
      const secondaryDimension =
        aspectRatio > sheetAspectRatio ? 'height' : 'width';
      const mmPerPx =
        sheetParams[mainDimension] / this.processedImage[mainDimension];

      const centeringMargin =
        ((sheetParams[secondaryDimension] -
          this.processedImage[secondaryDimension] * mmPerPx) /
          2) *
        0.8;

      const mainDimensionMargin = 5;
      const secondaryDimensionMargin =
        (10 / this.processedImage[mainDimension]) *
        this.processedImage[secondaryDimension];

      const doc = new JSPDF({
        orientation,
        unit: 'mm',
        format: sheetParams.format
      });
      doc.addImage(
        this.$refs.comparisonBlock.$refs.canvas,
        'JPEG', // TODO: to be replaced w PNG
        secondaryDimension === 'width' ? centeringMargin : mainDimensionMargin,
        secondaryDimension === 'height' ? centeringMargin : mainDimensionMargin,
        mainDimension === 'width'
          ? this.processedImage[mainDimension] * mmPerPx -
              mainDimensionMargin * 2
          : this.processedImage[secondaryDimension] * mmPerPx -
              secondaryDimensionMargin * 2,
        mainDimension === 'height'
          ? this.processedImage[mainDimension] * mmPerPx -
              mainDimensionMargin * 2
          : this.processedImage[secondaryDimension] * mmPerPx -
              secondaryDimensionMargin * 2
      );
      doc.save('My awesome artwork.pdf');
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
  display: flex;
  flex-direction: column;
  align-items: center;

  &__container {
    width: 100%;
    @include themed() {
      background-color: t($canvas-bg);
      transition: background-color $theme-transition;
    }
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

  &__download-btn {
    margin-top: 2rem;
  }
}
</style>
