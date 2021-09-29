<template>
  <div class="preview">
    <img :src="imageSrc" class="preview__image" />
  </div>
</template>

<script>
export default {
  name: 'Preview',
  props: {
    image: { type: Object, default: null }
  },
  computed: {
    imageSrc() {
      return this.image ? this.image.src : null;
    }
  }
};
</script>

<style lang="scss">
.preview {
  max-width: 100%;
  max-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &__image {
    max-width: 100%;
    max-height: 100%;
    box-shadow: 1.5rem 1rem 0.9rem rgba(0, 0, 0, 0.23);
  }
}
</style>
