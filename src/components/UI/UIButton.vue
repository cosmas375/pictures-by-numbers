<template>
  <div class="ui-button">
    <el-button :type="type" @click="$emit('click', $event)">
      <slot> </slot>
    </el-button>
  </div>
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
