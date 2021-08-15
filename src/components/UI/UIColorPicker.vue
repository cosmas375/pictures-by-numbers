<template>
  <el-color-picker
    :model-value="value"
    :size="size"
    :popper-class="popperClass"
    @update:modelValue="$emit('input', $event)"
    class="ui-color-picker"
  >
    <slot> </slot>
  </el-color-picker>
</template>

<script>
export default {
  name: 'UIColorPicker',
  props: {
    value: { type: String },
    size: { type: String, default: 'medium' },
    popperClass: { type: String, default: 'ui-color-picker__popover' }
  },
  emits: {
    input: null
  }
};
</script>

<style lang="scss">
@import '~element-plus/packages/theme-chalk/src/color-picker.scss';
@import '@/assets/scss/theming/theming';

.ui-color-picker {
  .el-icon-arrow-down {
    display: none;
  }

  &__popover {
    @include themed() {
      transition: background-color $theme-transition, color $theme-transition;
    }
  }
}

.el-color-dropdown {
  &__link-btn {
    display: none;
  }
}
</style>
