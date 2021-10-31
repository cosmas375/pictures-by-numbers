<template>
  <div class="notification">
    <div class="notification__block">
      <UIIcon
        :icon="getIcon(type)"
        size="1.6rem"
        :class="`notification__type-icon notification__type-icon_${type}`"
      />
    </div>
    <div class="notification__block notification__block_content">
      <div v-if="title" class="notification__title">
        {{ title }}
      </div>
      <div v-if="message" class="notification__message">
        {{ message }}
      </div>
    </div>
    <div class="notification__block notification__block_close-icon">
      <UIIcon
        icon="close"
        @click="$emit('hide')"
        class="notification__close-button"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UINotification',
  props: {
    type: { type: String, default: 'info' },
    title: String,
    message: String
  },
  methods: {
    getIcon(type) {
      return `notification_${type}`;
    }
  }
};
</script>

<style lang="scss">
@import '~@/assets/scss/theming/theming';

.notification {
  display: flex;
  box-shadow: 0.4rem 0.4rem 2rem rgba(0, 0, 0, 0.2);
  padding: 1rem 2rem 1rem 1rem;
  border-radius: 0.5rem;
  min-width: 18rem;
  @include themed() {
    color: t($color);
    background-color: t($background-color-notification);
    transition: color $theme-transition, background-color $theme-transition;
  }

  &__block {
    &_content {
      flex: 1;
      padding: 0 1rem;
    }
    &_close-icon {
      display: flex;
      align-items: center;
    }
  }

  &__type-icon {
    &_error {
      @include themed() {
        color: t($color-red);
        transition: color $theme-transition;
      }
    }
  }

  &__title {
    font-weight: bold;
    line-height: 1.4rem;
    margin-top: 0.1rem;
  }

  &__close-button {
    cursor: pointer;
  }
}
</style>
