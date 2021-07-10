<template>
  <el-dropdown class="ui-dropdown">
    <slot> </slot>
    <template #dropdown>
      <slot name="dropdown"> </slot>
    </template>
  </el-dropdown>
</template>

<script>
export default {
  name: 'UIDropdown'
};
</script>

<style lang="scss">
@import '~element-plus/packages/theme-chalk/src/dropdown.scss';
</style>
