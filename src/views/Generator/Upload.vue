<template>
  <div class="upload">
    <ImageUploader v-if="!source" @file-ready="$emit('file-ready', $event)" />
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
  </div>
</template>

<script>
import ImageUploader from '@/components/Generator/ImageUploader';
import Preview from '@/components/Generator/Preview';

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
  components: { ImageUploader, Preview },
  computed: {
    imageSrc() {
      return this.preview ? this.preview.src : null;
    },
    previewLayout() {
      if (!this.preview) {
        return;
      }
      return this.preview.width > this.preview.height
        ? 'landscape'
        : 'portrait';
    }
  }
};
</script>

<style lang="scss">
.upload {
  height: 100%;
  display: flex;
  align-items: center;
  padding-bottom: 2rem;

  &__preview {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &_portrait {
      .upload {
        &__preview-block {
          max-width: 60%;
          max-height: 100%;
        }
        &__preview-controls {
          padding: 0 6rem;
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
        }
        &__preview-controls {
          padding: 4rem 6rem 0;
        }
      }
    }
  }

  &__preview-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__reset-btn {
    margin-top: 1rem;
    font-size: 1.2rem;
    cursor: pointer;
    position: relative;
    transition: color 0.2s;

    &:after {
      content: '';
      width: calc(100% + 0.4rem);
      height: 0.1rem;
      background-color: black;
      position: absolute;
      left: -0.2rem;
      bottom: -0.2rem;
      transition: background-color 0.2s;
    }

    &:hover {
      color: red;

      &:after {
        background-color: red;
      }
    }
  }

  &__loader {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__loader-text {
    margin-top: 1rem;
    font-size: 1.4rem;
  }
}
</style>
