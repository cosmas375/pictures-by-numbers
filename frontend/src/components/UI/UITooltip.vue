<template>
  <el-tooltip :placement="placement" :visible-arrow="false" class="ui-tooltip">
    <slot> </slot>
    <template #content>
      <slot name="content"> </slot>
    </template>
  </el-tooltip>
</template>

<script>
export default {
  name: 'UITooltip',
  props: {
    placement: { type: String, default: 'top' }
  }
};
</script>

<style lang="scss"></style>
