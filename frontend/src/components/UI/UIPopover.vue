<template>
  <el-popover
    :popper-class="popperClass"
    @show="$emit('show')"
    @hide="$emit('hide')"
    class="ui-popover"
  >
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
  },
  emits: {
    show: null,
    hide: null
  }
};
</script>

<style lang="scss">
.ui-popover {
  &__popover {
    min-width: auto !important;
    width: auto !important;
    padding: 0 !important;
  }
}
</style>
