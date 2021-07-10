<template>
  <el-dropdown-menu class="ui-dropdown-menu">
    <slot> </slot>
  </el-dropdown-menu>
</template>

<script>
export default {
  name: 'UIDropdownMenu'
};
</script>

<style lang="scss">
@import '~element-plus/packages/theme-chalk/src/dropdown-menu.scss';
</style>
