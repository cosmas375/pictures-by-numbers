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
  outline: none;
  cursor: pointer;
  font-size: 1.4rem;
  transition: background-color $theme-transition, color $theme-transition;

  border: none;
  border-radius: 0.5rem;

  @include themed() {
    background-color: t($background-color-button);
    color: t($color-button);
  }

  &:hover {
    @include themed() {
      background-color: t($background-color-button-hover);
      color: t($color-button-hover);
    }
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    font-size: 2rem !important;
  }
}
</style>
