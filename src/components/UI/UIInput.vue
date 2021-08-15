<template>
  <input :value="modelValue || value" @input="onInput" class="ui-input" />
</template>

<script>
export default {
  name: 'UIInput',
  props: {
    value: [String, Number],
    modelValue: [String, Number]
  },
  emits: {
    'update:modelValue': null,
    input: null
  },
  methods: {
    onInput(e) {
      const newValue = e.target.value;
      this.$emit('update:modelValue', newValue);
      this.$emit('input', newValue);
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/theming/theming';

.ui-input {
  border: none;
  border-bottom: 0.1rem solid #565656;
  background-color: transparent;
  outline: none;
  @include themed() {
    color: t($color);
    transition: color $theme-transition;
  }
}
</style>
