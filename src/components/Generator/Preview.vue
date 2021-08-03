<template>
  <div :class="`preview preview_${layout}`">
    <div class="preview__images">
      <img :src="imageSrc" class="preview__image" />
    </div>
    <div v-if="!image" class="preview__loading">
      <UIIcon icon="loading" size="2.4rem" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Preview',
  props: {
    image: Image
  },
  computed: {
    imageSrc() {
      return this.image ? this.image.color.src : null;
    },
    layout() {
      return 'portrait';
      // if (!this.image) {
      //   return;
      // }
      // return this.image.meta.width > this.image.meta.height
      //   ? 'landscape'
      //   : 'portrait';
    }
  }
};
</script>

<style lang="scss">
.preview {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  &_portrait {
    .preview {
      &__image {
        width: 50%;
      }
    }
  }

  &_landscape {
    flex-direction: column;

    .preview {
      &__image {
        max-width: 100%;
        max-height: 50%;
      }
    }
  }

  &__image {
    box-shadow: 1.5rem 1rem 0.9rem rgba(0, 0, 0, 0.23);
  }
}
</style>
