<template>
  <div class="processor-placeholder">
    <UIIcon icon="preview" size="4.8rem" class="processor-placeholder__icon" />
    <span class="processor-placeholder__text">
      {{ $t('image_processor.preview.placeholder') }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'ProcessorPlaceholder'
};
</script>

<style lang="scss">
@import '@/assets/scss/theming/theming';

.processor-placeholder {
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
    font-size: 1.4rem;
    @include themed() {
      color: t($text-color-secondary);
      transition: color $theme-transition;
    }
  }
}
</style>
