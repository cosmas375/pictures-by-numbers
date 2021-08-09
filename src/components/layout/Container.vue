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
  width: 120rem;
  box-sizing: border-box;
  margin: 0 auto;
}
</style>
