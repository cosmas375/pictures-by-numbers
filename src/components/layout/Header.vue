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
            :to="{ name: 'home' }"
            class="menu__link"
            :class="{ menu__link_active: this.activeRouteName === 'home' }"
          >
            {{ $t('menu.home') }}
          </router-link>
        </div>
        <div class="menu__item">
          <router-link
            :to="{ name: 'upload' }"
            class="menu__link"
            :class="{
              menu__link_active:
                this.activeRouteName === 'upload' ||
                this.activeRouteName === 'printing'
            }"
          >
            {{ $t('menu.generator') }}
          </router-link>
          <router-link
            v-if="isPrintingAvailable"
            :to="{ name: 'printing' }"
            class="menu__link menu__link_printing"
            :class="{ menu__link_active: this.activeRouteName === 'printing' }"
          >
            <UIIcon icon="printing" />
          </router-link>
        </div>
      </div>
    </div>
  </Container>
</template>

<script>
import Container from '@/components/layout/Container';

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
    }
  },
  components: { Container }
};
</script>

<style lang="scss">
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
      margin-left: 4rem;
    }
  }

  &__link {
    cursor: pointer;
    position: relative;
    text-decoration: none;
    color: black;

    &:after {
      content: '';
      position: absolute;
      left: -0.2rem;
      bottom: -1rem;
      width: calc(100% + 0.4rem);
      height: 0.1rem;
      background-color: black;
      opacity: 0;
    }

    &_active {
      &:after {
        opacity: 1;
        bottom: -0.4rem;
        transition: bottom 0.2s, opacity 0.2s;
      }
    }

    &_printing {
      margin-left: 0.4rem;
    }
  }
}
</style>
