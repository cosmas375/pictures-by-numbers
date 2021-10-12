<template>
  <Container class="upload">
    <ImageUploader
      v-if="!source"
      @file-ready="$emit('file-ready', $event)"
      @error="$emit('upload-error', $event)"
      class="upload__uploader"
    />
    <template v-else>
      <div v-if="!preview" class="upload__loader">
        <UIIcon icon="loading" size="2.4rem" class="upload__loader-icon" />
        <div class="upload__loader-text">
          {{ $t('upload.loading') }}
        </div>
      </div>
      <div v-else :class="`upload__preview upload__preview_${previewLayout}`">
        <Preview :image="preview" class="upload__preview-block" />
        <div class="upload__preview-controls">
          <UIButton @click="$emit('get-pdf')">
            {{ $t('upload.get_pdf') }}
          </UIButton>
          <div @click="$emit('reset-upload')" class="upload__reset-btn">
            {{ $t('upload.reset') }}
          </div>
        </div>
      </div>
    </template>
  </Container>
</template>

<script>
import Container from '@/components/layout/Container';
import ImageUploader from '@/components/Generator/Upload/ImageUploader';
import Preview from '@/components/Generator/Upload/Preview';
import { getLayout } from '@/helpers/layoutHelper';

export default {
  name: 'Upload',
  props: {
    source: { type: Object, default: null },
    preview: { type: Object, default: null }
  },
  emits: {
    'file-ready': null,
    'get-pdf': null,
    'reset-upload': null
  },
  components: { Container, ImageUploader, Preview },
  computed: {
    previewLayout() {
      if (!this.preview) {
        return;
      }
      return getLayout(this.preview);
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/theming/theming';
@import '@/assets/scss/responsiveness';

.upload {
  width: 100%;
  height: 100%;
  min-height: 34rem;
  padding-top: 4rem;
  padding-bottom: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &__uploader {
    width: auto;
    height: auto;
  }

  &__preview {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;

    &_portrait {
      .upload {
        &__preview-block {
          max-width: 60%;
          max-height: 100%;
          width: 60%;
          height: 100%;
        }
      }
    }

    &_landscape {
      flex-direction: column;
      justify-content: center;

      .upload {
        &__preview-block {
          max-width: 100%;
          max-height: 75%;
          width: 100%;
          height: 75%;
        }
      }
    }
  }

  &__preview-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding: 4rem 6rem;
  }

  &__reset-btn {
    margin-top: 1rem;
    font-size: 1.2rem;
    cursor: pointer;
    position: relative;
    transition: color 0.2s;
    @include themed() {
      color: t($color-secondary);
      transition: color $theme-transition;
    }

    &:after {
      content: '';
      width: calc(100% + 0.4rem);
      height: 0.1rem;
      position: absolute;
      left: -0.2rem;
      bottom: -0.2rem;
      @include themed() {
        background-color: t($color-secondary);
        transition: background-color $theme-transition;
      }
    }

    &:hover {
      @include themed() {
        color: t($color-red);
      }

      &:after {
        background-color: black;
        @include themed() {
          background-color: t($color-red);
        }
      }
    }
  }

  &__loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    @include themed() {
      color: t($color);
      transition: color $theme-transition;
    }
  }
  &__loader-text {
    margin-top: 1rem;
    font-size: 1.4rem;
  }
}

@include screen-m {
  .upload {
    &__preview {
      flex-direction: column;
      justify-content: center;

      .upload {
        &__preview-block {
          max-width: 100%;
          max-height: 75%;
          width: 80%;
          height: 75%;
        }
        &__preview-controls {
          width: 100%;
          padding-left: 0;
          padding-right: 0;
        }
      }
    }
  }
}
</style>
