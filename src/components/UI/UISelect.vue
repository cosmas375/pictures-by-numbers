<template>
  <el-select
    :modelValue="value"
    :size="size"
    @update:modelValue="$emit('input', $event)"
    class="ui-select"
  >
    <slot> </slot>
  </el-select>
</template>

<script>
export default {
  name: 'UISelect',
  props: {
    value: { type: String },
    size: { type: String }
  },
  emits: {
    input: null
  }
};
</script>

<style lang="scss">
@import '~element-plus/packages/theme-chalk/src/select.scss';
</style>
