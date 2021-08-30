<template>
  <div class="landing">
    <div class="landing__row landing__row_hero">
      <div v-html="$t('landing.hero')" class="landing__hero-text"></div>
    </div>

    <div class="landing__row landing__row_greetings">
      <div class="landing__row-content landing__row-content_greetings">
        <div class="landing__title">
          {{ $t('landing.greetings') }}
        </div>
        <div class="landing__text">
          {{ $t('landing.greetings_content_1') }}
        </div>
        <div class="landing__text">
          {{ $t('landing.greetings_content_2') }}
        </div>
      </div>
    </div>
    <div class="landing__row landing__row_feature landing__row_feature_1">
      <div class="landing__feature-bg"></div>
      <div class="landing__row-content landing__row-content_feature">
        <img
          src="@/assets/img/placeholder.jpeg"
          alt="boost_up_interior"
          class="landing__feature-image"
        />
        <div class="landing__feature-description">
          <div class="landing__title">
            {{ $t('landing.feature_interior_title') }}
          </div>
          <div class="landing__text">
            {{ $t('landing.feature_interior') }}
          </div>
        </div>
      </div>
    </div>
    <div class="landing__row landing__row_feature landing__row_feature_2">
      <div class="landing__feature-bg"></div>
      <div class="landing__row-content landing__row-content_feature">
        <div class="landing__feature-description">
          <div class="landing__text">
            {{ $t('landing.feature_gift') }}
          </div>
          <div class="landing__text landing__text_secondary">
            {{ $t('landing.feature_gift_secondary') }}
          </div>
        </div>
        <img
          src="@/assets/img/placeholder.jpeg"
          alt="gift"
          class="landing__feature-image"
        />
      </div>
    </div>
    <div class="landing__row landing__row_feature landing__row_feature_3">
      <div class="landing__feature-bg"></div>
      <div class="landing__row-content landing__row-content_feature">
        <img
          src="@/assets/img/placeholder.jpeg"
          alt="rules"
          class="landing__feature-image"
        />
        <div class="landing__feature-description">
          <div class="landing__title">
            {{ $t('landing.feature_rules_title') }}
          </div>
          <div class="landing__text">
            {{ $t('landing.feature_rules') }}
          </div>
        </div>
      </div>
    </div>

    <div class="landing__footer">
      <div class="landing__footer-content">
        <div class="landing__footer-line">
          {{ $t('landing.footer_1') }}
          <a
            :href="$t('landing.instagram_url')"
            target="_blank"
            class="landing__footer-link"
          >
            <img
              src="@/assets/svg/instagram.svg"
              alt="instagram"
              class="landing__footer-icon"
            />
          </a>
        </div>
        <div class="landing__footer-line">
          {{ $t('landing.footer_2') }}
        </div>
        <div class="landing__footer-line">
          {{ $t('landing.footer_3') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Landing'
};
</script>

<style lang="scss">
@import '@/assets/scss/theming/theming';

.landing {
  height: 100%;

  &__row {
    width: 100%;

    &_hero {
      height: 100%;
      overflow: hidden;
      background-color: #000;
      display: flex;
      justify-content: center;
      background-image: url('~@/assets/img/hero.png');
      background-size: cover;
      background-repeat: no-repeat;
    }

    &_greetings {
      padding: 8rem 0 12rem;
    }

    &_feature {
      position: relative;

      & + .landing__row_feature {
        margin-top: 14rem;
      }

      &_1 {
        .landing {
          &__feature-bg {
            width: 75%;
            left: 0;
          }
          &__feature-image {
            transform: translate(-6rem, 0) rotate(-4deg);
          }
        }
      }
      &_2 {
        .landing {
          &__feature-bg {
            width: 100%;
            left: 0;
          }
          &__feature-image {
            transform: translate(6rem, 0) rotate(2deg);
          }
        }
      }
      &_3 {
        .landing {
          &__feature-bg {
            width: 75%;
            right: 0;
          }
          &__feature-image {
            transform: translate(-8rem, -8rem) rotate(-2deg);
          }
          &__feature-description {
            transform: translate(0, 20rem);
          }
        }
      }
    }
  }

  &__row-content {
    position: relative;
    width: 55rem;
    margin: 0 auto;
    padding: 0 1rem;

    &_feature {
      display: flex;
      align-items: center;
    }
  }

  &__feature-bg {
    position: absolute;
    height: 100%;
    top: 0%;
    @include themed() {
      background-color: t($background-color-feature);
    }
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
    font-size: 1.8rem;
    margin-bottom: 1.4rem;
    @include themed() {
      color: t($color);
      transition: color $theme-transition;
    }
    user-select: none;
  }
  &__text {
    font-size: 1.4rem;
    line-height: 2rem;
    @include themed() {
      color: t($color);
      transition: color $theme-transition;
    }
    user-select: none;

    &_secondary {
      position: absolute;
      bottom: 6rem;
      font-size: 1rem;
      @include themed() {
        color: t($color-secondary);
        transition: color $theme-transition;
      }
    }
  }

  &__footer {
    margin-top: 24rem;
    @include themed() {
      background-color: t($background-color-header);
      color: t($color-secondary);
    }
    font-size: 1.2rem;
  }

  &__footer-content {
    width: 50rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    row-gap: 0.6rem;
    padding: 2.4rem;
  }

  &__footer-link {
    text-decoration: none;
    height: 1.4rem;
  }

  &__footer-icon {
    margin-left: 0.8rem;
    height: 100%;
  }

  &__footer-line {
    display: flex;
    align-items: center;
    user-select: none;
  }
}
</style>
