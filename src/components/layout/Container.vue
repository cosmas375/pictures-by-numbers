<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Container'
};
</script>

<style lang="scss">
.container {
  width: 100%;
  max-width: 120rem;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0 2rem;
}
</style>
