<template>
  <el-dropdown-item class="ui-dropdown-item">
    <slot> </slot>
  </el-dropdown-item>
</template>

<script>
export default {
  name: 'UIDropdownItem'
};
</script>

<style lang="scss">
@import '~element-plus/packages/theme-chalk/src/dropdown-item.scss';
</style>
