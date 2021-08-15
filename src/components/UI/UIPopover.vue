<template>
  <el-popover :popper-class="popperClass" class="ui-popover">
    <template #reference>
      <slot name="reference"> </slot>
    </template>
    <slot> </slot>
  </el-popover>
</template>

<script>
export default {
  name: 'UIPopover',
  props: {
    popperClass: { type: String, default: 'ui-popover__popover' }
  }
};
</script>

<style lang="scss">
@import '~element-plus/packages/theme-chalk/src/popover.scss';

.ui-popover {
  &__popover {
    min-width: auto !important;
    width: auto !important;
    padding: 0 !important;
  }
}
</style>
