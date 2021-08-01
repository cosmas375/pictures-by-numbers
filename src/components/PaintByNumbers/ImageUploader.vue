<template>
  <UIFileUpload
    :drag="true"
    :show-file-list="false"
    :on-change="onChange"
    class="image-uploader"
  >
    <UIIcon icon="upload" size="6.7rem" class="image-uploader__icon" />
    <div class="image-uploader__text">
      {{ $t('image_processor.file_upload.text') }}
    </div>
    <template #tip>
      <div class="image-uploader__tip">
        {{ $t('image_processor.file_upload.tip') }}
      </div>
    </template>
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
  width: 100%;

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

  .el-upload {
    width: 100%;
  }
  .el-upload-dragger {
    width: 100%;
  }
}
</style>
