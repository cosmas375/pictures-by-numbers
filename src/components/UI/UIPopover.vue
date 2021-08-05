<template>
  <el-popover class="ui-popover">
    <template #reference>
      <slot name="reference"> </slot>
    </template>
    <slot> </slot>
  </el-popover>
</template>

<script>
export default {
  name: 'UIPopover'
};
</script>

<style lang="scss">
@import '~element-plus/packages/theme-chalk/src/popover.scss';
.el-popover.el-popper {
  min-width: auto !important;
  width: auto !important;
  padding: 0;
}
</style>
