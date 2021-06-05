<template>
  <div class="ui-switch">
    <el-switch
      :value="value"
      :active-text="activeText"
      :inactive-text="inactiveText"
      @input="$emit('input', $event)"
    />
  </div>
</template>

<script>
export default {
  name: 'UISwitch',
  props: {
    value: { type: Boolean },
    activeText: { type: String },
    inactiveText: { type: String }
  }
};
</script>

<style lang="scss"></style>
