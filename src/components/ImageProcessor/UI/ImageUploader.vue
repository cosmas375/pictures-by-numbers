<template>
  <UIFileUpload
    :drag="true"
    :show-file-list="false"
    :before-upload="beforeUpload"
    :on-change="onChange"
    class="image-uploader"
  >
    <i class="image-uploader__icon el-icon-upload"></i>
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
    beforeUpload() {
      console.log([...arguments]);
    },
    onChange(file) {
      const img = new Image();
      img.src = URL.createObjectURL(file.raw);
      img.onload = () => this.$emit('file-ready', img);
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/theming';

.image-uploader {
  &__tip {
    text-align: center;
    @include themed() {
      color: t($text-color);
    }
  }
}
</style>
