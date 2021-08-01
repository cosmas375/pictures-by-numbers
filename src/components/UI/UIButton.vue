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
@import '@/assets/scss/theming/theming';

.el-button {
  @include themed() {
    border-color: t($border-color);
    background-color: t($file-uploader-bg-color);
    transition: background-color $theme-transition,
      border-color $theme-transition;
  }

  &:hover {
    @include themed() {
      background-color: t($border-color);
    }
    & > span {
      @include themed() {
        color: t($text-color-hover);
      }
    }
  }

  & > span {
    @include themed() {
      color: t($text-color);
      transition: color $theme-transition;
    }
  }
}
</style>
