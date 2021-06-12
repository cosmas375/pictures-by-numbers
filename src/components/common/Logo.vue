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

@font-face {
  font-family: 'Painting With Chocolate';
  src: url('~@/assets/fonts/Painting_With_Chocolate.ttf') format('truetype');
}

.logo {
  display: flex;
  align-items: center;
  user-select: none;

  &__icon {
    font-size: 4.8rem;
    margin-right: 1rem;
    @include themed() {
      color: t($text-color);
      transition: color $theme-transition;
    }
    border-radius: 0.5rem;
  }

  &__content {
    font-family: 'Painting With Chocolate', 'Brush Script MT', sans-serif;
    font-size: 3.2rem;

    @include themed() {
      color: t($text-color);
      transition: color $theme-transition;
    }
  }
}
</style>
