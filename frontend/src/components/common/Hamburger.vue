<template>
  <div
    @click="$emit('click')"
    class="hamburger"
    :class="{ hamburger_active: active }"
  >
    <div class="hamburger__line"></div>
    <div class="hamburger__line"></div>
    <div class="hamburger__line"></div>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    active: Boolean
  },
  emits: {
    click: null
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/theming/theming';

.hamburger {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 2rem;
  height: 1.5rem;
  cursor: pointer;
  position: relative;

  &_active {
    .hamburger__line {
      &:nth-child(1) {
        transform: translate(0, 0.75rem) rotate(45deg);
      }
      &:nth-child(2) {
        opacity: 0;
      }
      &:nth-child(3) {
        transform: translate(0, -0.75rem) rotate(-45deg);
      }
    }
  }

  &__line {
    position: absolute;
    left: 0;
    width: 100%;
    height: 0.2rem;
    transition: all $theme-transition;
    @include themed() {
      background-color: t($color);
    }

    &:nth-child(1) {
      top: 0;
    }
    &:nth-child(2) {
      top: 50%;
    }
    &:nth-child(3) {
      top: 100%;
    }
  }
}
</style>
