<template>
  <div
    ref="root"
    class="result-comparison"
    :class="{ 'result-comparison_resizing': isResizing }"
    :style="{ height: `${this.height}px` }"
  >
    <div class="result-comparison__wrap">
      <div class="result-comparison__img">
        <canvas ref="canvas" class="result-comparison__canvas"></canvas>
      </div>
      <div ref="slider" class="result-comparison__slider"></div>
      <div
        ref="overlay"
        class="result-comparison__img result-comparison__img_overlay"
      >
        <img
          ref="source"
          :src="sourceImageUrl"
          :style="{ width: `${width}px` }"
          alt="source"
          class="result-comparison__source"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { SMOOTHING_FACTOR } from '@/core/smooth';

export default {
  name: 'ResultComparison',
  props: {
    sourceImage: { type: [File, Object] },
    processedImage: { type: [File, Object] }
  },
  data() {
    return {
      width: 0,
      height: 0,
      scalingFactor: 1,
      sliderPosition: null,
      resizeDebounceTimeout: null,
      isResizing: false
    };
  },
  computed: {
    sourceImageUrl() {
      return this.sourceImage ? this.sourceImage.src : null;
    }
  },
  methods: {
    updateResponsiveImageSize() {
      if (!this.sourceImage) {
        this.width = 0;
        this.height = 0;
        this.scalingFactor = 1;
        return;
      }
      this.width = this.$refs.root.offsetWidth;
      this.scalingFactor = this.width / this.sourceImage.width;
      this.height = this.sourceImage.height * this.scalingFactor;
    },
    async updateImage() {
      const canvas = this.$refs.canvas;
      canvas.width = this.width;
      canvas.height = this.height;
      const ctx = canvas.getContext('2d');
      ctx.setTransform(this.scalingFactor, 0, 0, this.scalingFactor, 0, 0);
      ctx.drawImage(
        this.processedImage,
        SMOOTHING_FACTOR,
        SMOOTHING_FACTOR,
        this.processedImage.width,
        this.processedImage.height,
        0,
        0,
        this.processedImage.width,
        this.processedImage.height
      );
    },
    updateOverlay() {
      const startupSliderPosition = this.getStartupSliderPosition();
      this.$refs.overlay.style.width = `${startupSliderPosition}px`;
      const slider = this.$refs.slider;
      slider.style.top = `${this.height / 2 - slider.offsetHeight / 2}px`;
      slider.style.left = `${startupSliderPosition - slider.offsetWidth / 2}px`;
      slider.addEventListener('mousedown', this.onSliderMousedown);
      slider.addEventListener('touchstart', this.onSliderMousedown);
      window.addEventListener('mouseup', this.onSliderMouseup);
      window.addEventListener('touchend', this.onSliderMouseup);
    },
    onSliderMousedown(e) {
      e.preventDefault();
      window.addEventListener('mousemove', this.onMousemove);
      window.addEventListener('touchmove', this.onMousemove);
    },
    onSliderMouseup() {
      window.removeEventListener('mousemove', this.onMousemove);
      window.removeEventListener('touchmove', this.onMousemove);
    },
    onMousemove(e) {
      let pos = this.getCursorPosition(e);
      if (pos < 0) {
        pos = 0;
      } else if (pos > this.width) {
        pos = this.width;
      }
      this.slide(pos);
      this.saveSliderPosition(pos);
    },
    getCursorPosition(e) {
      const overlayRect = this.$refs.overlay.getBoundingClientRect();
      return e.pageX - overlayRect.left - window.pageXOffset;
    },
    slide(x) {
      const slider = this.$refs.slider;
      const overlay = this.$refs.overlay;
      overlay.style.width = `${x}px`;
      slider.style.left = `${overlay.offsetWidth - slider.offsetWidth / 2}px`;
    },

    saveSliderPosition(x) {
      this.sliderPosition = x / this.width;
    },
    getStartupSliderPosition() {
      return this.sliderPosition === null
        ? this.width / 2
        : this.sliderPosition * this.width;
    },

    onResize() {
      if (!this.processedImage) {
        return;
      }
      if (this.resizeDebounceTimeout) {
        clearTimeout(this.resizeDebounceTimeout);
      } else {
        this.isResizing = true;
      }
      this.resizeDebounceTimeout = setTimeout(() => {
        this.updateResponsiveImageSize();
        this.updateImage();
        this.updateOverlay();
        this.isResizing = false;
        this.resizeDebounceTimeout = null;
      }, 500);
    }
  },
  mounted() {
    this.updateResponsiveImageSize();
    this.updateImage();
    this.updateOverlay();
    window.addEventListener('resize', this.onResize);
  },
  beforeUnmount() {
    const slider = this.$refs.slider;
    slider.removeEventListener('mousedown', this.onSliderMousedown);
    slider.removeEventListener('touchstart', this.onSliderMousedown);
    window.removeEventListener('mouseup', this.onSliderMouseup);
    window.removeEventListener('touchend', this.onSliderMouseup);
    window.removeEventListener('mousemove', this.onMousemove);
    window.removeEventListener('touchmove', this.onMousemove);
    window.removeEventListener('resize', this.onResize);
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/theming';

.result-comparison {
  width: 100%;
  height: 100%;
  transition: opacity 0.2s;

  &_resizing {
    opacity: 0;
  }

  &__img {
    position: absolute;
    width: auto;
    height: auto;
    overflow: hidden;

    &_overlay {
      @include themed() {
        border-right: 0.1rem solid t($text-color-secondary);
        box-shadow: 0.1rem 0 0 0 t($text-color-secondary);
        transition: border-right-color $theme-transition;
      }
    }

    & > * {
      display: block;
    }
  }

  &__slider {
    position: absolute;
    z-index: 9;

    width: 4rem;
    height: 4rem;
    @include themed() {
      border: 0.2rem solid t($text-color-secondary);
      background-color: t($canvas-bg);
      transition: border-color $theme-transition,
        background-color $theme-transition;
    }
    border-radius: 50%;
    cursor: ew-resize;

    $arrow-offset: 0.1rem;
    $arrow-size: 0.7rem;
    &:after,
    &:before {
      content: '';
      position: absolute;
      top: calc(50% - #{$arrow-size});
      display: block;
      border: $arrow-size solid transparent;
    }
    &:before {
      left: $arrow-offset;
      @include themed() {
        border-right: $arrow-size solid t($text-color-secondary);
        transition: border-right-color $theme-transition;
      }
    }
    &:after {
      right: $arrow-offset;
      @include themed() {
        border-left: $arrow-size solid t($text-color-secondary);
        transition: border-left-color $theme-transition;
      }
    }
  }
}
</style>
