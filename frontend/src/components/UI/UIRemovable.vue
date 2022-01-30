<template>
  <div class="ui-removable">
    <slot></slot>
    <UIButton
      :disabled="disabled"
      @click="$emit('remove')"
      class="ui-removable__button"
    >
      <UIIcon icon="remove" size="1rem" class="ui-removable__icon" />
    </UIButton>
  </div>
</template>

<script>
export default {
  name: 'UIRemovable',
  props: {
    disabled: Boolean
  }
};
</script>

<style lang="scss">
.ui-removable {
  position: relative;

  &__button {
    position: absolute;
    right: -0.5rem;
    top: -0.5rem;
    padding: 0.4rem;
    line-height: 0.8rem;
    border-radius: 50%;
    outline: none;
  }
}
</style>
