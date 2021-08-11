<template>
  <UITooltip placement="bottom" class="back-button">
    <UIIcon icon="back" size="2.4rem" @click="$emit('click')" />
    <template #content>
      {{ $t('printing.back_to_upload') }}
    </template>
  </UITooltip>
</template>

<script>
export default {};
</script>

<style>
.back-button {
  cursor: pointer;
}
</style>
