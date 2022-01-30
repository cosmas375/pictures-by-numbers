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
          <div class="upload__palette">
            <div class="upload__palette-colors">
              <UIRemovable
                v-for="(color, index) in customPalette"
                :key="index"
                :disabled="isColorsRemovingDisabled"
                @remove="removeColor(index)"
              >
                <UIColorPicker
                  :value="color"
                  @input="setColor($event, index)"
                />
              </UIRemovable>
              <UIButton
                :disabled="isColorsAddingDisabled"
                @click="addColor"
                class="upload__palette-add-button"
              >
                <UIIcon icon="add" />
              </UIButton>
            </div>
            <div class="upload__palette-controls" v-if="isCustomPaletteChanged">
              <span @click="regeneratePreview" class="upload__reset-btn">
                {{ $t('upload.update_preview') }}
              </span>
            </div>
          </div>
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

const MAX_PALETTE_SIZE = 64;
const MIN_PALETTE_SIZE = 2;

export default {
  name: 'Upload',
  props: {
    source: { type: Object, default: null },
    preview: { type: Object, default: null },
    palette: { type: Array, default: () => [] }
  },
  emits: {
    'file-ready': null,
    'get-pdf': null,
    'reset-upload': null,
    'upload-error': null,
    'regenerate-preview': null
  },
  data() {
    return {
      customPalette: [],
      isCustomPaletteChanged: false
    };
  },
  components: { Container, ImageUploader, Preview },
  computed: {
    previewLayout() {
      if (!this.preview) {
        return;
      }
      return getLayout(this.preview);
    },
    isColorsRemovingDisabled() {
      return this.customPalette.length <= MIN_PALETTE_SIZE;
    },
    isColorsAddingDisabled() {
      return this.customPalette.length >= MAX_PALETTE_SIZE;
    }
  },
  methods: {
    updateCustomPalette() {
      this.customPalette = this.palette ? this.palette.slice() : [];
      this.isCustomPaletteChanged = false;
    },
    setColor(color, index) {
      this.customPalette[index] = color;
      this.isCustomPaletteChanged = true;
    },
    removeColor(target) {
      if (this.customPalette.length <= MIN_PALETTE_SIZE) {
        return;
      }

      this.customPalette = this.customPalette.reduce(
        (result, item, index) =>
          index === target ? result : result.concat([item]),
        []
      );
      this.isCustomPaletteChanged = true;
    },
    addColor() {
      if (this.customPalette.length >= MAX_PALETTE_SIZE) {
        return;
      }
      this.customPalette = this.customPalette.concat(['#ffffff']);
      this.isCustomPaletteChanged = true;
    },
    regeneratePreview() {
      this.$emit('regenerate-preview', this.customPalette);
    }
  },
  mounted() {
    this.updateCustomPalette();
  },
  watch: {
    palette() {
      this.updateCustomPalette();
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

        &__preview-controls {
          max-width: 40%;
          width: 40%;
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
    margin-top: 1.6rem;
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

  &__palette {
    width: 100%;
    margin-bottom: 2rem;

    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__palette-colors {
    display: flex;
    flex-wrap: wrap;
    row-gap: 2rem;
    column-gap: 1rem;
  }
  &__palette-controls {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    column-gap: 2rem;
    row-gap: 1rem;
  }
  &__palette-add-button {
    padding: 1rem;
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
