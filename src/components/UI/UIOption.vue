<template>
  <div class="ui-option">
    <el-option :label="label" :value="value">
      <slot> </slot>
    </el-option>
  </div>
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
