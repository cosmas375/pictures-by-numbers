<template>
  <div class="layout">
    <div class="layout__block layout__block_header ">
      <slot name="header"></slot>
    </div>
    <div ref="content" class="layout__block layout__block_content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout'
};
</script>

<style lang="scss">
.layout {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  &__block {
    width: 100%;
    position: relative;

    &_header {
      display: flex;
      justify-content: center;
      align-items: center;

      height: 6.4rem;
      position: sticky;
      top: 0;
      box-shadow: 0 0.4rem 2rem rgba(0, 0, 0, 0.25);
      background-color: #fff;
      z-index: 5;
    }

    &_content {
      background-color: #f8f8f8;
      overflow: auto;
      flex: 1;
    }
  }
}
</style>
