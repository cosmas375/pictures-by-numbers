<template>
  <div class="notifications">
    <transition-group name="notification">
      <UINotification
        v-for="notification in notifications"
        v-bind="notification"
        :key="notification.id"
        @hide="$emit('hide', notification.id)"
        class="notifications__item"
      />
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'Notifications',
  props: {
    notifications: { type: Array, default: () => [] }
  },
  emits: {
    hide: null
  }
};
</script>

<style lang="scss">
.notifications {
  position: fixed;
  top: 10rem;
  right: 3rem;

  &__item {
    & + .notifications__item {
      margin-top: 1.4rem;
    }
  }
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s;
}
.notification-enter, .notification-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateX(100px);
}
</style>
