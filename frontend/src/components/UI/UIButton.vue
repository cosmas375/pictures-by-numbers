<template>
  <button
    :disabled="disabled"
    @click="$emit('click', $event)"
    class="ui-button"
    :class="{
      'ui-button_disabled': disabled
    }"
  >
    <slot> </slot>
  </button>
</template>

<script>
export default {
  name: 'UIButton',
  props: {
    disabled: Boolean
  },
  emits: {
    click: null
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/theming/theming';
@import '@/assets/scss/responsiveness';

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

  &_disabled {
    cursor: default;

    @include themed() {
      background-color: t($background-color-button-disabled);
      color: t($color-button-disabled);
    }

    &:hover {
      @include themed() {
        background-color: t($background-color-button-disabled);
        color: t($color-button-disabled);
      }
    }
  }
}
</style>
