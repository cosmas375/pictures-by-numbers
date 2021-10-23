<template>
  <main class="landing">
    <section class="landing__section landing__section_hero">
      <div v-html="$t('landing.hero')" class="landing__hero-text"></div>
    </section>

    <section class="landing__section landing__section_greetings">
      <div class="landing__section-content">
        <div class="landing__text">
          {{ $t('landing.greetings') }}
        </div>
        <div class="landing__text">
          {{ $t('landing.greetings_content_1') }}
        </div>
      </div>
    </section>
    <section class="landing__section landing__section_explanation">
      <div class="landing__section-content">
        <div class="landing__text">
          {{ $t('landing.explanation_1') }}
        </div>
        <div class="landing__text">
          {{ $t('landing.explanation_2') }}
        </div>
      </div>
      <div class="landing__section-content landing__section-content_centered">
        <UIButton @click="onTryItClick" class="landing__try-button">
          <div class="landing__try-button-content">
            {{ $t('landing.try_it') }}
            <UIIcon icon="try_it" />
          </div>
        </UIButton>
      </div>
    </section>
    <div class="landing__section landing__section_scroll-further">
      <div class="landing__section-content landing__section-content_centered">
        <div class="landing__text landing__text_centered">
          {{ $t('landing.ideas') }}
        </div>
      </div>
    </div>
    <section class="landing__section landing__section_features">
      <div class="landing__section-content">
        <div class="landing__title">
          {{ $t('landing.why_its_cool') }}
        </div>
        <ul>
          <li class="landing__text">
            {{ $t('landing.cool_1') }}
          </li>
          <li class="landing__text">
            {{ $t('landing.cool_2') }}
          </li>
          <li class="landing__text">
            {{ $t('landing.cool_3') }}
          </li>
        </ul>
      </div>
    </section>
    <section class="landing__section landing__section_ideas">
      <div class="landing__section-content"></div>
    </section>
    <section class="landing__section landing__section_sm">
      <div class="landing__section-content">
        <div class="landing__text landing__text_flex">
          {{ $t('landing.instagram') }}
          <a
            :href="$t('landing.instagram_url')"
            target="_blank"
            class="landing__sm-link"
          >
            <UIIcon
              :icon="require('@/assets/svg/instagram.svg')"
              size="2.4rem"
            />
          </a>
        </div>
        <div class="landing__text">
          {{ $t('landing.instagram_description') }}
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { ROUTES } from '@/router';

export default {
  name: 'Landing',
  methods: {
    onTryItClick() {
      this.$router.push({ name: ROUTES.Upload });
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/theming/theming';
@import '@/assets/scss/responsiveness';

.landing {
  &__section {
    width: 100%;

    &_hero {
      height: 100vh;
      overflow: hidden;
      background-color: #000;
      display: flex;
      justify-content: center;
      background-image: url('~@/assets/img/hero.png');
      background-size: cover;
      background-repeat: no-repeat;
    }

    &_greetings {
      padding: 8rem 0 4rem;
    }

    &_features {
      background-color: #fff;
      padding: 6.4rem 0;
    }

    &_sm {
      margin: 6.4rem 0;
    }

    &_scroll-further {
      padding: 8rem 0;
    }
  }

  &__section-content {
    position: relative;
    max-width: 55rem;
    height: 100%;
    margin: 0 auto;
    padding: 0 1rem;
    box-sizing: border-box;

    &_centered {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  &__try-button {
    margin-top: 6rem;
  }
  &__try-button-content {
    display: flex;
    align-items: center;
    column-gap: 1rem;
  }

  &__hero-text {
    position: absolute;
    height: 100%;
    left: 0;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    padding-left: 15%;
    padding-bottom: 15vh;
    box-sizing: border-box;

    font-size: 6.4rem;
    font-weight: bold;
    text-transform: capitalize;
    line-height: 9rem;
    letter-spacing: 0.4rem;
  }

  &__title {
    font-size: 2.4rem;
    margin-bottom: 1.4rem;
    @include themed() {
      color: t($color);
      transition: color $theme-transition;
    }
    user-select: none;
  }
  &__text {
    font-size: 1.6rem;
    line-height: 2rem;
    @include themed() {
      color: t($color);
      transition: color $theme-transition;
    }
    user-select: none;

    &_flex {
      display: flex;
      align-items: center;
    }

    &_centered {
      text-align: center;
    }

    & + .landing__text {
      margin-top: 1rem;
    }
  }

  &__sm-link {
    @include themed() {
      background-color: t($background-color-header);
      color: t($color-secondary);
    }
    font-size: 1.2rem;
    margin-left: 1rem;
  }

  &__footer-link {
    text-decoration: none;
  }
}

@include screen-m {
}
</style>
