<template>
  <UIFileUpload
    :drag="true"
    :show-file-list="false"
    :on-change="onChange"
    class="image-uploader"
  >
    <div class="image-uploader__content">
      <UIIcon icon="upload" size="6.7rem" class="image-uploader__icon" />
      <div class="image-uploader__text">
        {{ $t('image_processor.file_upload.text') }}
      </div>
      <div class="image-uploader__tip">
        {{ $t('image_processor.file_upload.tip') }}
      </div>
    </div>
  </UIFileUpload>
</template>

<script>
export default {
  name: 'ImageUploader',
  emits: {
    'file-ready': null
  },
  methods: {
    onChange(file) {
      const img = new Image();
      img.src = URL.createObjectURL(file.raw);
      img.onload = () => this.$emit('file-ready', img);
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/theming/theming';

.image-uploader {
  width: 42rem;
  height: 58.8rem;
  box-shadow: 1.5rem 1rem 0.9rem rgba(0, 0, 0, 0.23);
  border-radius: 0.5rem;
  position: relative;

  &__content {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__tip {
    text-align: center;
    @include themed() {
      color: t($text-color);
      transition: color $theme-transition;
    }
  }
  &__text {
    @include themed() {
      color: t($text-color);
      transition: color $theme-transition;
    }
  }
}
</style>
