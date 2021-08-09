<template>
  <Page class="image-uploader">
    <UIFileUpload :drag="true" :show-file-list="false" :on-change="onChange">
      <div class="image-uploader__content">
        <UIIcon icon="upload" size="6.7rem" class="image-uploader__icon" />
        <div class="image-uploader__text">
          {{ $t('upload.uploader.text') }}
        </div>
        <div class="image-uploader__tip">
          {{ $t('upload.uploader.tip') }}
        </div>
      </div>
    </UIFileUpload>
  </Page>
</template>

<script>
import Page from '@/components/common/Page';

export default {
  name: 'ImageUploader',
  emits: {
    'file-ready': null
  },
  components: { Page },
  methods: {
    onChange(file) {
      const img = new Image();
      img.src = URL.createObjectURL(file.raw);
      img.onload = () =>
        this.$emit('file-ready', {
          src: img.src,
          width: img.width,
          height: img.height
        });
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/theming/theming';

.image-uploader {
  box-shadow: 1.5rem 1rem 2rem rgba(0, 0, 0, 0.2);

  &__content {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    box-sizing: border-box;
  }

  &__text {
    font-size: 1.4rem;
    margin-top: 1.4rem;
    @include themed() {
      color: t($text-color);
      transition: color $theme-transition;
    }
  }
  &__tip {
    font-size: 1rem;
    margin-top: 0.6rem;
    text-align: center;
    @include themed() {
      color: t($text-color);
      transition: color $theme-transition;
    }
  }
}
</style>
