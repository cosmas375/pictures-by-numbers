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
    <ResultComparison :image="image" class="result-preview__compare" />
  </div>
</template>

<script>
import ResultComparison from '@/components/PaintByNumbers/ResultComparison';
export default {
  name: 'ResultPreview',
  props: {
    image: { type: [File, Object] }
  },
  emits: {
    done: null
  },
  data() {
    return {
      isLoadingStateEnabled: false
    };
  },
  computed: {
    isResultReady() {
      return this.image && !this.isLoadingStateEnabled;
    }
  },
  methods: {
    setLoadingState(value) {
      this.isLoadingStateEnabled = value;
    }
  },
  watch: {
    image() {
      // this.setLoadingState(true);
    }
  },
  components: {
    ResultComparison
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/theming';

.result-preview {
  width: 100%;
  @include themed() {
    background-color: t($canvas-bg);
  }

  &_loading {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__placeholder {
    width: 100%;
    min-height: 40rem;
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
    }
  }
  &__placeholder-text {
    font-size: 1.4rem;
    @include themed() {
      color: t($text-color-secondary);
    }
  }

  &__loader {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  &__loader-icon {
    font-size: 2.4rem;
    @include themed() {
      color: t($text-color-secondary);
    }
  }
  &__loader-text {
    margin-top: 0.4rem;
    font-size: 1.4rem;
    @include themed() {
      color: t($text-color-secondary);
    }
  }

  &__compare {
    position: relative;
  }
}
</style>
