<template>
  <UISlide
    class="preview-slide"
    :class="{
      'preview-slide_visible': isVisible
    }"
  >
    <div class="preview-slide__block"></div>
    <div class="preview-slide__block preview-slide__block_main">
      <img
        v-if="base"
        :src="baseImageSrc"
        @load="onBaseLoad"
        class="preview-slide__base-image"
        ref="base"
      />
      <img
        :src="imageSrc"
        class="preview-slide__result-preview"
        :class="{
          'preview-slide__result-preview_inscribed': base
        }"
        :style="{
          ...transforms
        }"
      />
    </div>
    <div class="preview-slide__block"></div>
  </UISlide>
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

      if (!this.base) {
        this.isVisible = true;
        return;
      }

      if (!base.complete || !base.naturalHeight) {
        return;
      }

      const rect = base.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      const transformedPoints = this.base.points.map(point => {
        const x = (point.x / this.base.width) * w;
        const y = (point.y / this.base.height) * h;
        return {
          x,
          y
        };
      });

      this.transforms = {
        ...getCssTransform(this.preview, transformedPoints),
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  &_visible {
    opacity: 1;
  }

  &__block {
    height: 100%;
    &_main {
      height: 100%;
      flex-grow: 1;
    }
  }

  &__base-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  &__result-preview {
    border-radius: 0.4rem;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;

    &_inscribed {
      position: absolute;
      left: 0;
      top: 0;
      transform-origin: 0 0;
      max-width: unset;
      max-height: unset;
      box-shadow: 0 0 1rem rgb(0, 0, 0, 12%);
      opacity: 0.85;
    }
  }
}
</style>
