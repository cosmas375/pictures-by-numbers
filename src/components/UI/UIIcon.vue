<template>
  <div class="ui-icon">
    <i :class="icon"> </i>
  </div>
</template>

<script>
export default {
  name: 'UIIcon',
  props: {
    icon: { type: String }
  }
};
</script>

<style lang="scss">
$--font-path: '~element-plus/packages/theme-chalk/src/fonts';
@import '~element-plus/packages/theme-chalk/src/icon.scss';
</style>
