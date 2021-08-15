<template>
  <button @click="$emit('click', $event)" class="ui-button">
    <slot> </slot>
  </button>
</template>

<script>
export default {
  name: 'UIButton',
  emits: {
    click: null
  }
};
</script>

<style lang="scss">
@import '~element-plus/packages/theme-chalk/src/button.scss';
@import '@/assets/scss/theming/theming';

.ui-button {
  padding: 1rem 2rem;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  border-radius: 0.5rem;

  @include themed() {
    background-color: t($color);
    color: t($background-color-header);
    transition: background-color $theme-transition, color $theme-transition;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    font-size: 2rem !important;
  }
}
</style>
