<template>
  <div class="ui-select">
    <el-select
      :modelValue="value"
      :size="size"
      @update:modelValue="$emit('input', $event)"
    >
      <slot> </slot>
    </el-select>
  </div>
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
