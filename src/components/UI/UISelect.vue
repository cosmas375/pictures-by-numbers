<template>
  <el-select v-model="fuck" :size="size" class="ui-select">
    <template #prefix>
      <slot name="prefix"> </slot>
    </template>
    <slot> </slot>
  </el-select>
</template>

<script>
export default {
  name: 'UISelect',
  props: {
    value: { type: String },
    size: { type: String }
  },
  computed: {
    fuck: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  },
  emits: {
    input: null
  }
};
</script>

<style lang="scss">
@import '~element-plus/packages/theme-chalk/src/select.scss';
</style>
