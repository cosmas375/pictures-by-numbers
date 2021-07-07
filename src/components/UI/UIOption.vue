<template>
  <el-option :label="label" :value="value" class="ui-option">
    <slot> </slot>
  </el-option>
</template>

<script>
export default {
  name: 'UIOption',
  props: {
    value: { type: String },
    label: { type: String }
  }
};
</script>

<style lang="scss">
@import '~element-plus/packages/theme-chalk/src/option.scss';
</style>
