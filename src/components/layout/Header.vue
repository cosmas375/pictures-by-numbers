<template>
  <Container>
    <div class="header">
      <div class="header__block header__block_right">
        <router-link :to="{ name: 'home' }">
          <img class="header__logo" src="@/assets/img/logo.png" alt="stains" />
        </router-link>
      </div>

      <div class="header__block header__block_left menu">
        <div class="menu__item">
          <router-link
            :to="{ name: Routes.Home }"
            class="menu__link"
            :class="{ menu__link_active: this.activeRouteName === Routes.Home }"
          >
            {{ $t('menu.home') }}
          </router-link>
        </div>
        <div class="menu__item">
          <router-link
            :to="{ name: Routes.Upload }"
            class="menu__link"
            :class="{
              menu__link_active:
                this.activeRouteName === Routes.Upload ||
                this.activeRouteName === Routes.Print
            }"
          >
            {{ $t('menu.generator') }}
          </router-link>
          <router-link
            :to="{ name: Routes.Print }"
            class="menu__link menu__link_printing"
            :class="{
              menu__link_active: activeRouteName === Routes.Print,
              menu__link_visible: isPrintingAvailable,
              menu__link_hidden: !isPrintingAvailable
            }"
          >
            <UIIcon icon="printing" size="1.8rem" />
          </router-link>
        </div>
        <div class="menu__item menu__item_settings">
          <Settings
            :theme="theme"
            :lang="lang"
            :langs="langs"
            @switch-theme="$emit('switch-theme')"
            @set-lang="$emit('set-lang', $event)"
          />
        </div>
      </div>
    </div>
  </Container>
</template>

<script>
import Container from '@/components/layout/Container';
import Settings from '@/components/common/Settings';
import { ROUTES } from '@/router';

export default {
  name: 'Header',
  props: {
    lang: String,
    langs: { type: Array, default: () => [] },
    theme: String,
    isPrintingAvailable: Boolean
  },
  computed: {
    activeRouteName() {
      return this.$route.name;
    },
    Routes() {
      return ROUTES;
    }
  },
  components: { Container, Settings }
};
</script>

<style lang="scss">
@import '@/assets/scss/theming/theming';

.header {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  &__block {
    height: 100%;
    display: flex;
    align-items: center;
  }

  &__logo {
    height: 3.2rem;
  }
}

.menu {
  &__item {
    font-size: 1.4rem;
    display: flex;
    align-items: center;

    & + .menu__item {
      margin-left: 3rem;

      &_settings {
        margin-left: 2rem;
      }
    }
  }

  &__link {
    height: 2rem;
    cursor: pointer;
    position: relative;
    text-decoration: none;
    @include themed() {
      color: t($color);
      transition: all $theme-transition;
    }

    &:after {
      content: '';
      position: absolute;
      left: -0.2rem;
      bottom: -1rem;
      width: calc(100% + 0.4rem);
      height: 0.1rem;
      opacity: 0;
      @include themed() {
        background-color: t($color);
        transition: background-color $theme-transition, bottom 0.2s,
          opacity 0.2s;
      }
    }

    &_active {
      &:after {
        opacity: 1;
        bottom: -0.4rem;
      }
    }

    &_printing {
      margin-left: 0.4rem;
    }

    &_hidden {
      opacity: 0;
      transform: translate(-0.6rem);
      pointer-events: none;
    }

    &_visible {
      opacity: 1;
      transform: translate(0);
    }

    @media screen and (max-width: 768px) {
      font-size: 1.8rem;
    }
  }
}
</style>
