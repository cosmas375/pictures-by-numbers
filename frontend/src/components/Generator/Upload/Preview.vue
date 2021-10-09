<template>
  <div class="preview">
    <img
      :src="require('@/assets/img/previews/preview.jpg')"
      @load="onBaseLoad"
      class="preview__base"
      ref="base"
    />
    <img
      :src="imageSrc"
      @load="onPreviewLoad"
      class="preview__image"
      :style="{
        ...transforms
      }"
      ref="preview"
    />
  </div>
</template>

<script>
import { getCssTransform } from '@/libs/get-inscribed';

export default {
  name: 'Preview',
  props: {
    image: { type: Object, default: null }
  },
  data() {
    return {
      isBaseImageLoaded: false,
      isPreviewLoaded: false,
      transforms: {},
      imageCss: {}
    };
  },
  computed: {
    imageSrc() {
      return this.image ? this.image.src : null;
    },
    imageSize() {
      const image = this.image;

      const origW = 2183;
      const origH = 3342;
      const width = `${(image.width * 301) / origW}px`;
      const height = `${(image.height * 460) / origH}px`;
      return image ? { width, height } : {};
    },
    isReadyToShow() {
      return this.isBaseImageLoaded && this.isPreviewLoaded;
    }
  },
  methods: {
    onBaseLoad() {
      this.isBaseImageLoaded = true;
      this.calculateTransform();
    },
    onPreviewLoad() {
      this.isPreviewLoaded = true;
      this.calculateTransform();
    },
    calculateTransform() {
      if (!this.isReadyToShow) {
        return;
      }

      const base = this.$refs.base;
      if (!this.image || !base) {
        return null;
      }
      const rect = base.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      console.log(w, h);

      const origW = 2183;
      const origH = 3342;
      const points = [
        { x: 534, y: 694 },
        { x: 1632, y: 694 },
        { x: 534, y: 2278 },
        { x: 1632, y: 2278 }
      ];
      this.transforms = getCssTransform(
        this.image,
        points.map(point => {
          const x = (point.x / origW) * w;
          const y = (point.y / origH) * h;
          return {
            x,
            y
          };
        })
      );
    },
    addResizeEventListeners() {
      addEventListener('resize', this.calculateTransform);
    },
    removeResizeEventListeners() {
      removeEventListener('resize', this.calculateTransform);
    }
  },
  mounted() {
    this.calculateTransform();
    this.addResizeEventListeners();
  },
  beforeUnmount() {
    this.removeResizeEventListeners();
  }
};
</script>

<style lang="scss">
.preview {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &__base {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  &__preview-wrap {
    position: absolute;
    left: 0;
    top: 0;
  }

  &__image {
    transform-origin: 0 0;
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
