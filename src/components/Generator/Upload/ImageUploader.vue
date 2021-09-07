<template>
  <Page class="image-uploader">
    <UIFileUpload
      :drag="true"
      :show-file-list="false"
      :limit="1"
      list-type="picture"
      :on-change="onChange"
    >
      <div class="image-uploader__content">
        <UIIcon icon="upload" size="6.7rem" class="image-uploader__icon" />
        <div class="image-uploader__text image-uploader__text_main">
          {{ $t('upload.uploader.text') }}
        </div>
        <div class="image-uploader__text image-uploader__text_tip">
          {{ $t('upload.uploader.tip') }}
        </div>
      </div>
    </UIFileUpload>
  </Page>
</template>

<script>
import Page from '@/components/common/Page';
import { FORMATS, FORMATS_DATA } from '@/data/formats';
import { LAYOUTS, getLayout } from '@/helpers/layoutHelper';

export default {
  name: 'ImageUploader',
  props: {
    maxFormat: { type: String, default: FORMATS.A4 }
  },
  emits: {
    'file-ready': null,
    error: null
  },
  components: { Page },
  methods: {
    onChange(file) {
      const raw = file.raw;
      this.validateFileByType(raw)
        .then(() => {
          const image = new Image();
          image.src = URL.createObjectURL(raw);
          image.onload = () => {
            const img = {
              src: image.src,
              width: image.width,
              height: image.height
            };
            this.validateImageBySize(img)
              .then(() => {
                this.$emit('file-ready', img);
              })
              .catch(e => {
                this.onError(e);
              });
          };
        })
        .catch(e => {
          this.onError(e);
        });
    },
    onError(e) {
      this.$emit('error', e);
    },
    validateFileByType(file) {
      const errorName = 'wrong_file_format';

      return new Promise((resolve, reject) => {
        if (['image/jpeg', 'image/png'].includes(file.type)) {
          resolve();
        }
        reject(errorName);
      });
    },
    validateImageBySize(img) {
      const errorName = 'too_large_image';

      return new Promise((resolve, reject) => {
        const layout = getLayout(img);
        const maxFormatData = FORMATS_DATA[this.maxFormat];
        if (layout === LAYOUTS.Landscape) {
          img.width > maxFormatData.heightPX ||
          img.height > maxFormatData.widthPX
            ? reject(errorName)
            : resolve();
        } else {
          img.width > maxFormatData.widthPX ||
          img.height > maxFormatData.heightPX
            ? reject(errorName)
            : resolve();
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/theming/theming';

.image-uploader {
  box-shadow: 1.5rem 1rem 2rem rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  border: 0.1rem dashed;
  @include themed() {
    border-color: t($border-color);
    transition: border-color $theme-transition;
  }

  &__content {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    box-sizing: border-box;
    @include themed() {
      background-color: t($background-color-file-uploader);
      transition: background-color $theme-transition;
    }
  }

  &__text {
    @include themed() {
      color: t($color);
      transition: all $theme-transition;
    }

    &_main {
      font-size: 1.8rem;
      margin-top: 1.8rem;
    }

    &_tip {
      font-size: 1.2rem;
      margin-top: 1rem;
      text-align: center;
      line-height: 1.6rem;
    }
  }
}
</style>
