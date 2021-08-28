<template>
  <Container>
    <div class="header">
      <div ref="desktopMenu" class="header__menu menu menu_desktop">
        <router-link :to="{ name: 'home' }" class="menu__logo" />
        <div class="menu__wrap">
          <div class="menu__item">
            <router-link
              :to="{ name: Routes.Home }"
              class="menu__link"
              :class="{
                menu__link_active: this.activeRouteName === Routes.Home
              }"
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
            <UIPopover
              @show="showSettings"
              @hide="hideSettings"
              class="menu__settings settings"
            >
              <template #reference>
                <UIIcon
                  icon="settings"
                  size="1.6rem"
                  class="settings__toggler"
                />
              </template>
              <div @click.stop class="settings__popover">
                <div class="settings__item">
                  <ThemeSwitch
                    :theme="theme"
                    @switch-theme="$emit('switch-theme')"
                    class="settings__theme-switch"
                  />
                </div>
                <div class="settings__item">
                  <LangSelect
                    :value="lang"
                    :langs="langs"
                    :visible="isSettingsOptionsVisible"
                    @input="$emit('set-lang', $event)"
                  />
                </div>
              </div>
            </UIPopover>
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

      <div class="header__menu menu menu_mobile">
        <div class="menu__controls">
          <UIIcon
            v-if="isSettingsOptionsVisible"
            icon="back"
            size="2rem"
            @click="hideSettings"
            class="menu__back-button"
          />
          <router-link :to="{ name: 'home' }" class="menu__logo" />
          <Hamburger
            :active="isMobileMenuExpanded"
            @click="toggleMobileMenu"
            class="menu__hamburger"
          />
        </div>
        <div
          class="menu__wrap"
          :class="{ menu__wrap_visible: isMobileMenuExpanded }"
        >
          <div class="menu__item">
            <router-link
              :to="{ name: Routes.Home }"
              class="menu__link"
              :class="{
                menu__link_active: this.activeRouteName === Routes.Home
              }"
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
          <div class="menu__item">
            <div @click="showSettings" class="menu__link">
              {{ $t('menu.settings') }}
            </div>
          </div>
        </div>
        <div
          class="menu__wrap"
          :class="{ menu__wrap_visible: isSettingsOptionsVisible }"
        >
          <div class="menu__item">
            <ThemeSwitch
              :theme="theme"
              @switch-theme="$emit('switch-theme')"
              class="menu__theme-switch"
            />
          </div>
          <div class="menu__item">
            <LangSelect
              :value="lang"
              :langs="langs"
              :visible="isSettingsOptionsVisible"
              @input="$emit('set-lang', $event)"
            />
          </div>
        </div>
      </div>
    </div>
  </Container>
</template>

<script>
import Container from '@/components/layout/Container';
import ThemeSwitch from '@/components/common/ThemeSwitch';
import LangSelect from '@/components/common/LangSelect';
import Hamburger from '@/components/common/Hamburger';
import { ROUTES } from '@/router';

export default {
  name: 'Header',
  props: {
    lang: String,
    langs: { type: Array, default: () => [] },
    theme: String,
    isPrintingAvailable: Boolean
  },
  emits: {
    'switch-theme': null,
    'set-lang': null
  },
  components: {
    Container,
    ThemeSwitch,
    LangSelect,
    Hamburger
  },
  data() {
    return {
      isMobileMenuExpanded: false,
      isSettingsOptionsVisible: false
    };
  },
  computed: {
    activeRouteName() {
      return this.$route.name;
    },
    Routes() {
      return ROUTES;
    }
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuExpanded ? this.hideMobileMenu() : this.showMobileMenu();
    },
    showMobileMenu() {
      this.isMobileMenuExpanded = true;
    },
    hideMobileMenu() {
      this.isMobileMenuExpanded = false;
      this.hideSettings();
    },
    onResize() {
      if (this.$refs.desktopMenu.scrollWidth) {
        this.isSettingsOptionsVisible = false;
        this.isMobileMenuExpanded = false;
      }
    },
    showSettings() {
      this.isSettingsOptionsVisible = true;
    },
    hideSettings() {
      this.isSettingsOptionsVisible = false;
    }
  },
  watch: {
    isMobileMenuExpanded(v) {
      if (!v) {
        this.isSettingsOptionsVisible = false;
      }
    },
    activeRouteName() {
      this.hideMobileMenu();
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize);
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/theming/theming';
@import '@/assets/scss/responsiveness';

.header {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.menu {
  width: 100%;
  height: 100%;
  align-items: center;

  &_desktop {
    display: flex;
    justify-content: space-between;

    .menu {
      &__wrap {
        display: flex;
        align-items: center;
        column-gap: 4rem;
      }
    }
  }

  &_mobile {
    display: none;
    justify-content: center;

    .menu {
      &__wrap {
        width: 100vw;
        height: 100vh;
        padding-top: 10rem;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 5;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        transform: translate(110%, 0);
        transition: all $theme-transition;
        @include themed() {
          background-color: t($background-color-overlay);
        }

        &_visible {
          transform: translate(0, 0);
        }
      }

      &__controls {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        z-index: 10;
      }

      &__back-button {
        position: absolute;
        top: calc(50% - 1rem);
        left: 0;
        cursor: pointer;
        @include themed() {
          color: t($color);
        }
      }

      &__hamburger {
        position: absolute;
        top: calc(50% - 0.75rem);
        right: 0;
      }

      &__item {
        width: 100%;
        height: 7rem;
        position: relative;

        &:not(:last-child) {
          &:after {
            content: '';
            width: 90%;
            height: 0.2rem;
            position: absolute;
            left: 5%;
            bottom: -0.2rem;
            @include themed() {
              background-color: t($border-color);
            }
          }
        }
      }

      &__link {
        font-size: 2rem;

        &_active {
          &:after {
            bottom: -0.8rem;
          }
        }
      }
    }

    .lang-select {
      &__options {
        position: absolute;
        width: 90%;
        top: 100%;
        left: 5%;
        border-radius: 0.5rem;
        border: 0.1rem solid;
        @include themed() {
          border-color: t($border-color);
        }
      }
      &__bullet {
        display: none;
      }
      &__item {
        background-color: transparent;
        border-top: none;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  &__logo {
    @include themed() {
      background-image: t($src-logo);
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
    }
    width: 12.2rem;
    height: 3.2rem;
  }

  &__item {
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__link {
    height: 2rem;
    cursor: pointer;
    position: relative;
    text-decoration: none;
    font-weight: 600;
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
      margin-left: -1.8rem;
      opacity: 0;
      pointer-events: none;

      &.menu__link {
        &_visible {
          margin-left: 0.4rem;
          opacity: 1;
          pointer-events: all;
        }
      }
    }
  }
}

.settings {
  &__toggler {
    cursor: pointer;
    @include themed() {
      color: t($color);
      transition: color $theme-transition;
    }
  }

  &__popover {
    min-width: 18rem;
    border-radius: 0.4rem;
    @include themed() {
      background-color: t($background-color-popover);
      transition: background-color $theme-transition;
    }
  }

  &__item {
    position: relative;
    & + .settings__item {
      &:before {
        content: '';
        width: 75%;
        height: 0.1rem;
        position: absolute;
        top: 0;
        left: 12.5%;
        @include themed() {
          background-color: t($border-color);
          transition: background-color $theme-transition;
        }
      }
    }
  }

  &__theme-switch {
    padding: 1rem 1.2rem;
    justify-content: center;
  }
}

@include screen-m {
  .menu {
    &_desktop {
      display: none;
    }
    &_mobile {
      display: flex;
    }
  }
}
</style>
