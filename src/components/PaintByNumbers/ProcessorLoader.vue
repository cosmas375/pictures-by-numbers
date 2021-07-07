<template>
  <div class="processor-loader">
    <UIIcon
      icon="el-icon-loading"
      size="2.4rem"
      class="processor-loader__icon"
    />
    <span class="processor-loader__text">{{
      $t('image_processor.preview.loader')
    }}</span>
  </div>
</template>

<script>
export default {
  name: 'ProcessorPlaceholder'
};
</script>

<style lang="scss">
@import '@/assets/scss/theming';

.processor-loader {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__icon {
    @include themed() {
      color: t($text-color-secondary);
      transition: color $theme-transition;
    }
  }

  &__text {
    margin-top: 0.4rem;
    font-size: 1.4rem;
    @include themed() {
      color: t($text-color-secondary);
      transition: color $theme-transition;
    }
  }
}
</style>
