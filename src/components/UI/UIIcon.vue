<template>
  <div class="ui-icon">
    <i :class="icon"> </i>
  </div>
</template>

<script>
export default {
  name: 'UIIcon',
  props: {
    icon: { type: String }
  }
};
</script>

<style lang="scss"></style>
