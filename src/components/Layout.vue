<template>
  <div ref="component" class="layout">
    <div
      class="layout__block layout__block_header "
      :class="{ layout__block_header_compressed: isHeaderCompressed }"
    >
      <div class="layout__container">
        <slot name="header"></slot>
      </div>
    </div>
    <div class="layout__block layout__block_content">
      <div class="layout__container">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      isHeaderCompressed: false
    };
  },
  methods: {
    onScroll() {
      this.isHeaderCompressed = !!this.$refs.component.scrollTop;
    }
  },
  mounted() {
    this.$refs.component.addEventListener('scroll', this.onScroll);
  },
  beforeUnmount() {
    this.$refs.component.removeEventListener('scroll', this.onScroll);
  }
};
</script>

<style lang="scss">
.layout {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;

  &__block {
    width: 100%;
    position: relative;

    &_header {
      display: flex;
      justify-content: center;
      align-items: center;

      position: sticky;
      top: 0;
      box-shadow: 0 0.4rem 2rem rgba(0, 0, 0, 0.25);
      background-color: #fff;
      z-index: 5;

      height: 6.4rem;
      min-height: 6.3rem;
      transition: height, 0.2s;

      &_compressed {
        height: 4.8rem;
        min-height: 4.8rem;
      }
    }

    &_content {
      background-color: #f8f8f8;
    }
  }

  &__container {
    width: 120rem;
    height: 100%;
    margin: 0 auto;
  }
}
</style>
