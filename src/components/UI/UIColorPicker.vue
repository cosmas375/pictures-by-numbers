<template>
  <el-color-picker
    :value="value"
    :size="size"
    @input="$emit('input')"
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
    size: { type: String, default: 'medium' }
  },
  emits: {
    input: null
  }
};
</script>

<style lang="scss">
@import '~element-plus/packages/theme-chalk/src/color-picker.scss';

.ui-color-picker {
  .el-icon-arrow-down {
    display: none;
  }
}

.el-color-dropdown {
  &__link-btn {
    display: none;
  }
}
</style>
