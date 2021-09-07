<template>
  <div class="page">
    <svg
      x="0px"
      y="0px"
      :viewBox="`0 0 ${size.width} ${size.height}`"
      class="page__svg"
    ></svg>
    <div class="page__content" :style="{ padding: paddingStyle }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { FORMATS, FORMATS_DATA } from '@/data/formats';

export default {
  name: 'Page',
  props: {
    layout: { type: String, default: 'portrait' },
    padding: { type: Number, default: 0 },
    format: { type: String, default: FORMATS.A4 }
  },
  computed: {
    size() {
      const width = FORMATS_DATA[this.format].width;
      const height = FORMATS_DATA[this.format].height;
      return this.layout === 'portrait'
        ? { width, height }
        : { width: height, height: width };
    },
    paddingStyle() {
      const getPadding = size => `${(this.padding / size) * 100}%`;
      const topPadding = getPadding(this.size.height);
      const leftPadding = getPadding(this.size.width);
      return `${topPadding} ${leftPadding}`;
    }
  }
};
</script>

<style lang="scss">
.page {
  background-color: #fff;
  position: relative;

  &__svg {
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
  }

  &__content {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    box-sizing: border-box;
  }
}
</style>
