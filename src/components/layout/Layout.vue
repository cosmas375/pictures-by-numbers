<template>
  <div class="layout">
    <div
      class="layout__block layout__block_header"
      :class="{ layout__block_header_collapsed: isHeaderCollapsed }"
    >
      <slot name="header"></slot>
    </div>
    <div ref="content" class="layout__block layout__block_content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      scrollTop: 0
    };
  },
  computed: {
    isHeaderCollapsed() {
      return !!this.scrollTop;
    }
  },
  methods: {
    onScroll() {
      this.scrollTop = this.$refs.content.scrollTop;
    }
  },
  mounted() {
    this.$refs.content.addEventListener('scroll', this.onScroll);
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/scroll-mixin';

body {
  background-color: #f8f8f8;
  @include scrollbar;
}

.layout {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  &__block {
    width: 100%;
    position: relative;

    &_header {
      display: flex;
      justify-content: center;
      align-items: center;

      height: 7rem;
      position: sticky;
      top: 0;
      box-shadow: 0 0.4rem 2rem rgba(0, 0, 0, 0.25);
      background-color: #fff;
      z-index: 5;
      transition: height 0.2s;

      &_collapsed {
        height: 5rem;
      }
    }

    &_content {
      background-color: #f8f8f8;
      overflow: auto;
      flex: 1;
      @include scrollbar;
    }
  }
}
</style>
