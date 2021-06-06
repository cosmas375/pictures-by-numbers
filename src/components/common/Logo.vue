<template>
  <div class="logo">
    <UIIcon icon="el-icon-picture" class="logo__icon" />
    <div class="logo__content">{{ $t('logo') }}</div>
  </div>
</template>

<script>
export default {
  name: 'Logo'
};
</script>

<style lang="scss">
@import '@/assets/scss/theming';

.logo {
  display: flex;
  align-items: center;
  user-select: none;

  &__icon {
    font-size: 4.8rem;
    margin-right: 1rem;
    @include themed() {
      color: t($text-color);
    }
  }

  &__content {
    font-family: 'Brush Script MT', sans-serif;
    font-size: 3.2rem;

    @include themed() {
      color: t($text-color);
    }
  }
}
</style>
