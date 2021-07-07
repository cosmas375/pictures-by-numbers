<template>
  <div class="ui-switch">
    <el-switch :value="value" @input="$emit('input', $event)" />
  </div>
</template>

<script>
export default {
  name: 'UISwitch',
  props: {
    value: { type: Boolean }
  }
};
</script>

<style lang="scss">
@import '~element-plus/packages/theme-chalk/src/switch.scss';
</style>
