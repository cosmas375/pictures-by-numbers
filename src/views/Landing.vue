<template>
  <div class="landing">
    <div class="landing__row landing__row_hero">
      <img src="@/assets/img/hero.jpg" alt="stains" class="landing__hero-img" />
    </div>

    <div class="landing__row landing__row_about-us">
      <Container>
        <div class="landing__title">
          fuck this shit
        </div>
        <div class="landing__text">
          fuck this shit fuck this shit fuck this shit fuck this shit fuck this
          shit fuck this shit fuck this shit
        </div>
      </Container>
    </div>
  </div>
</template>

<script>
import Container from '@/components/layout/Container';

export default {
  name: 'Landing',
  components: { Container }
};
</script>

<style lang="scss">
.landing {
  height: 100%;

  &__row {
    &_hero {
      height: 100%;
      width: 100%;
      overflow: hidden;
      background-color: #000;
      text-align: center;
    }
    &_about-us {
      padding: 4rem 0;
    }
  }

  &__hero-img {
    height: 100%;
  }

  &__title {
    font-size: 2.4rem;
    margin-bottom: 2rem;
  }
  &__text {
    font-size: 1.4rem;
    line-height: 2rem;
  }
}
</style>
