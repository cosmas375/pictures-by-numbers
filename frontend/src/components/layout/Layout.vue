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

      <div
        @click="scrollToTop"
        class="layout__scroll-to-top"
        :class="{
          'layout__scroll-to-top_visible': isScrollToTopButtonVisible
        }"
      >
        <UIIcon
          icon="scroll_to_top"
          size="4rem"
          class="layout__scroll-to-top-icon"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  props: {
    isScrollToTopButtonAvailable: Boolean
  },
  data() {
    return {
      scrollTop: 0,
      contentComponent: null
    };
  },
  computed: {
    isHeaderCollapsed() {
      return !!this.scrollTop;
    },
    isScrollToTopButtonVisible() {
      return this.isScrollToTopButtonAvailable && !!this.scrollTop;
    }
  },
  methods: {
    onScroll() {
      if (this.contentComponent) {
        this.scrollTop = this.contentComponent.scrollTop;
      }
    },
    setScrollEventListener() {
      if (this.$refs.content) {
        this.$refs.content.addEventListener('scroll', this.onScroll);
        this.contentComponent = this.$refs.content;
      }
    },
    removeScrollEventListener() {
      this.$refs.content.removeEventListener('scroll', this.onScroll);
    },
    scrollToTop() {
      if (!this.contentComponent) {
        return;
      }
      this.contentComponent.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  },
  mounted() {
    this.setScrollEventListener();
  },
  beforeUnmount() {
    this.removeScrollEventListener();
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/scroll-mixin';
@import '@/assets/scss/theming/theming';

body {
  background-color: #f8f8f8;
  @include scrollbar;
}

.layout {
  width: 100vw;
  min-width: 32rem;
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
      @include themed() {
        background-color: t($background-color-header);
        transition: background-color $theme-transition, height 0.2s;
      }

      &_collapsed {
        height: 5rem;
      }
    }

    &_content {
      overflow: auto;
      flex: 1;
      @include scrollbar;
      @include themed() {
        background-color: t($background-color-content);
        transition: background-color $theme-transition;
      }
    }
  }

  &__scroll-to-top {
    position: fixed;
    bottom: 4rem;
    right: 4rem;
    cursor: pointer;
    border-radius: 50%;
    padding: 0.4rem;
    opacity: 0;
    pointer-events: none;
    transition: color $theme-transition, background-color $theme-transition,
      opacity $theme-transition;

    @include themed() {
      color: t($color);
    }

    &:hover {
      @include themed() {
        color: t($color-button-hover);
        background-color: t($background-color-button-hover);
      }
    }

    &_visible {
      opacity: 1;
      pointer-events: all;
    }
  }
  &__scroll-to-top-icon {
    position: relative;
    bottom: 0.3rem;
    z-index: 5;
  }
}
</style>
