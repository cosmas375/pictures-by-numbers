<template>
  <el-button :type="type" @click="$emit('click', $event)" class="ui-button">
    <slot> </slot>
  </el-button>
</template>

<script>
export default {
  name: 'UIButton',
  props: {
    type: { type: String }
  },
  emits: {
    click: null
  }
};
</script>

<style lang="scss">
@import '~element-plus/packages/theme-chalk/src/button.scss';
</style>
