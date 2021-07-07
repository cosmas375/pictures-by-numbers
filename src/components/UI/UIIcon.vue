<template>
  <div class="ui-icon">
    <i :class="icon" :style="{ fontSize: size }"> </i>
  </div>
</template>

<script>
export default {
  name: 'UIIcon',
  props: {
    icon: { type: String },
    size: { type: String, default: '1.4rem' }
  }
};
</script>

<style lang="scss">
$--font-path: '~element-plus/packages/theme-chalk/src/fonts';
@import '~element-plus/packages/theme-chalk/src/icon.scss';
</style>
