<template>
  <div
    class="preview-slide"
    :class="{
      'preview-slide_visible': isVisible
    }"
  >
    <img
      :src="baseImageSrc"
      @load="onBaseLoad"
      class="preview-slide__base-image"
      ref="base"
    />
    <img
      :src="imageSrc"
      class="preview-slide__result-preview"
      :style="{
        ...transforms
      }"
    />
  </div>
</template>

<script>
import { getCssTransform } from '@/libs/get-inscribed';

export default {
  name: 'PreviewSlide',
  props: {
    preview: { type: Object, default: null },
    base: { type: Object, default: null }
  },
  data() {
    return {
      transforms: {},
      isVisible: false
    };
  },
  computed: {
    imageSrc() {
      return this.preview ? this.preview.src : null;
    },
    baseImageSrc() {
      return this.base ? this.base.src : null;
    }
  },
  methods: {
    onBaseLoad() {
      this.calculateTransform();
    },
    calculateTransform() {
      const base = this.$refs.base;

      if (!base.complete || !base.naturalHeight) {
        console.log('fuck');
        return;
      }

      const rect = base.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      this.transforms = {
        ...getCssTransform(
          this.preview,
          this.base.points.map(point => {
            const x = (point.x / this.base.width) * w;
            const y = (point.y / this.base.height) * h;
            return {
              x,
              y
            };
          })
        ),
        top: `${base.offsetTop}px`,
        left: `${base.offsetLeft}px`
      };
      this.isVisible = true;
    },
    addResizeEventListeners() {
      addEventListener('resize', this.calculateTransform);
    },
    removeResizeEventListeners() {
      removeEventListener('resize', this.calculateTransform);
    }
  },
  mounted() {
    this.addResizeEventListeners();
    this.calculateTransform();
  },
  beforeUnmount() {
    this.removeResizeEventListeners();
  }
};
</script>

<style lang="scss">
@import '~@/assets/scss/theming/theming';

.preview-slide {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity $theme-transition;

  &_visible {
    opacity: 1;
  }

  &__base-image {
    max-width: 100%;
    max-height: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__result-preview {
    transform-origin: 0 0;
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
