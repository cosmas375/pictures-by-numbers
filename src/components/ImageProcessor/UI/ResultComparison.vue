<template>
  <div class="result-comparison">
    <div class="result-comparison__img">
      <canvas ref="canvas" class="result-comparison__canvas"></canvas>
    </div>
    <div ref="slider" class="result-comparison__slider">
      <UIIcon icon="el-icon-d-caret" class="result-comparison__slider-icon" />
    </div>
    <div
      ref="overlay"
      class="result-comparison__img result-comparison__img_overlay"
    >
      <img
        ref="source"
        :src="imageSrc"
        alt="source"
        class="result-comparison__source"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResultComparison',
  props: {
    image: { type: [File, Object] }
  },
  data() {
    return {
      width: 0
    };
  },
  computed: {
    imageSrc() {
      return this.image ? this.image.src : null;
    }
  },
  methods: {
    updateImage(img) {
      const canvas = this.$refs.canvas;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 123, 456);
    },
    updateOverlay() {
      const overlay = this.$refs.overlay;
      this.width = overlay.clientWidth;
      const height = overlay.clientWidth;
      overlay.style.width = `${this.width / 2}px`;
      const slider = this.$refs.slider;
      slider.style.top = `${height / 2 - slider.offsetHeight / 2}px`;
      slider.style.left = `${this.width / 2 - slider.offsetWidth / 2}px`;
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
    }
  },
  watch: {
    image(v) {
      this.updateImage(v);
      this.$refs.source.onload = this.updateOverlay;
    }
  },
  beforeUnmount() {
    const slider = this.$refs.slider;
    slider.removeEventListener('mousedown', this.onSliderMousedown);
    slider.removeEventListener('touchstart', this.onSliderMousedown);
    window.removeEventListener('mouseup', this.onSliderMouseup);
    window.removeEventListener('touchend', this.onSliderMouseup);
    window.removeEventListener('mousemove', this.onMousemove);
    window.removeEventListener('touchmove', this.onMousemove);
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/theming';

.result-comparison {
  &__img {
    position: absolute;
    width: auto;
    height: auto;
    overflow: hidden;

    &_overlay {
      @include themed() {
        border-right: 0.2rem solid t($text-color-secondary);
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
    }
    border-radius: 50%;
    cursor: ew-resize;
  }
  &__slider-icon {
    position: absolute;
    left: 0.2rem;
    top: 0.1rem;
    transform: rotate(90deg);
    font-size: 3.2rem;
    @include themed() {
      color: t($text-color-secondary);
    }
  }
}
</style>
