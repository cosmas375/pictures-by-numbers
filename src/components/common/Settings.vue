<template>
  <UIPopover class="settings">
    <template #reference>
      <UIIcon icon="settings" size="1.6rem" class="settings__toggler" />
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
          @input="$emit('set-lang', $event)"
        />
      </div>
    </div>
  </UIPopover>
</template>

<script>
import ThemeSwitch from '@/components/common/ThemeSwitch';
import LangSelect from '@/components/common/LangSelect';

export default {
  name: 'Settings',
  props: {
    theme: String,
    lang: String,
    langs: { type: Array, default: () => [] }
  },
  emits: {
    'switch-theme': null,
    'set-lang': null
  },
  components: { ThemeSwitch, LangSelect }
};
</script>

<style lang="scss">
@import '@/assets/scss/theming/theming';

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
</style>
