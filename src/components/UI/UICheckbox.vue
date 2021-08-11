<template>
  <div class="ui-checkbox">
    <input :id="id" type="checkbox" class="ui-checkbox__input" />
    <label
      :for="id"
      @click="onClick"
      class="ui-checkbox__label"
      :class="{ 'ui-checkbox__label_active': modelValue || value }"
    >
    </label>
  </div>
</template>

<script>
export default {
  name: 'UICheckbox',
  props: {
    value: Boolean,
    modelValue: Boolean,
    id: String
  },
  emits: {
    'update:modelValue': null,
    input: null
  },
  methods: {
    onClick() {
      const newValue = !this.modelValue;
      this.$emit('update:modelValue', newValue);
      this.$emit('input', newValue);
    }
  }
};
</script>

<style lang="scss">
.ui-checkbox {
  display: inline-block;

  &__input {
    display: none;
  }

  &__label {
    display: block;
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 0.2rem;
    border: 0.1rem solid black;
    position: relative;
    cursor: pointer;

    &_active {
      &:after {
        content: '';
        width: 0.4rem;
        height: 0.8rem;
        border: 0.2rem solid black;
        border-left: 0;
        border-top: 0;
        position: absolute;
        left: 0.4rem;
        top: 0.1rem;
        transform: rotate(45deg);
      }
    }
  }
}
</style>
