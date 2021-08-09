<template>
  <div class="page">
    <svg
      x="0px"
      y="0px"
      :viewBox="`0 0 ${size.width} ${size.height}`"
      class="page__svg"
    ></svg>
    <div class="page__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page',
  props: {
    layout: { type: String, default: 'portrait' },
    padding: { type: Number, default: 0 }
  },
  computed: {
    size() {
      return this.layout === 'portrait'
        ? { width: 210, height: 297 }
        : { width: 297, height: 210 };
    }
  }
};
</script>

<style lang="scss">
.page {
  background-color: #fff;
  position: relative;
  width: 100%;
  height: 100%;

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
  }
}
</style>
