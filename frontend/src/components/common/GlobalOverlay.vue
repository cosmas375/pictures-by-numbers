<template>
  <div class="global-overlay">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GlobalOverlay'
};
</script>

<style lang="scss">
.global-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 20;
}
</style>
