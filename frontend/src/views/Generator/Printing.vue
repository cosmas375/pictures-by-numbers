<template>
  <Container class="printing">
    <div class="printing__title">
      <UITooltip placement="bottom" class="printing__back-button">
        <UIIcon icon="back" size="2rem" @click="onBackClick" />
        <template #content>
          {{ $t('printing.back_to_upload') }}
        </template>
      </UITooltip>
      {{ $t('printing.title') }}
    </div>
    <div class="printing__settings">
      <div class="printing__settings-row">
        <div class="printing__settings-name">
          {{ $t('printing.pages_to_include') }}
        </div>
      </div>
    </div>
    <div class="printing__pages">
      <div class="printing__pages-wrap">
        <div class="printing__pages-item">
          <Page
            :layout="pageLayout"
            :padding="pdfSettings.safetyPaddings"
            class="printing__page printing__page_enabled"
          >
            <div
              v-if="outline"
              class="printing__page-content printing__page-content_image"
            >
              <img :src="outlineImage" alt="outline" class="printing__image" />
            </div>
            <UIIcon
              v-else
              icon="loading"
              size="2.4rem"
              class="printing__page-loader"
            />
          </Page>
          <div class="printing__page-controls">
            <div for="include_outline" class="printing__page-controls-label">
              {{ $t('printing.outline') }}
            </div>
          </div>
        </div>
        <div class="printing__pages-item">
          <Page
            :padding="5"
            @click="toggleIncludePalette"
            class="printing__page printing__page_selectable"
            :class="{ printing__page_enabled: pdfSettings.includePalette }"
          >
            <div
              v-if="palette"
              class="printing__page-content printing__page-content_palette palette"
            >
              <div
                v-for="(color, index) in colors"
                :key="color"
                class="palette__item"
              >
                <div class="palette__number">{{ index + 1 }})</div>
                <div
                  class="palette__color"
                  :style="{ backgroundColor: color }"
                ></div>
                <div class="palette__title">{{ color }}</div>
              </div>
            </div>
            <UIIcon
              v-else
              icon="loading"
              size="2.4rem"
              class="printing__page-loader"
            />
            <div
              class="printing__page-shadow"
              :class="{
                'printing__page-shadow_visible': !pdfSettings.includePalette
              }"
            ></div>
          </Page>
          <div class="printing__page-controls">
            <UICheckbox
              id="include_palette"
              :value="pdfSettings.includePalette"
              @input="toggleIncludePalette"
              class="printing__checkbox"
            />
            <div
              @click="toggleIncludePalette"
              class="printing__page-controls-label printing__page-controls-label_clickable"
            >
              {{ $t('printing.palette') }}
            </div>
          </div>
        </div>
        <div class="printing__pages-item">
          <Page
            :padding="pdfSettings.safetyPaddings"
            :layout="pageLayout"
            @click="toggleIncludePreview"
            class="printing__page printing__page_selectable"
            :class="{ printing__page_enabled: pdfSettings.includePreview }"
          >
            <div
              v-if="preview"
              class="printing__page-content printing__page-content_image"
            >
              <img :src="previewImage" alt="preview" class="printing__image" />
            </div>
            <UIIcon
              v-else
              icon="loading"
              size="2.4rem"
              class="printing__page-loader"
            />
            <div
              class="printing__page-shadow"
              :class="{
                'printing__page-shadow_visible': !pdfSettings.includePreview
              }"
            ></div>
          </Page>
          <div class="printing__page-controls">
            <UICheckbox
              id="include_reference"
              :value="pdfSettings.includePreview"
              @input="toggleIncludePreview"
              class="printing__checkbox"
            />
            <div
              @click="toggleIncludePreview"
              class="printing__page-controls-label printing__page-controls-label_clickable"
            >
              {{ $t('printing.preview') }}
            </div>
          </div>
        </div>
        <div class="printing__pages-item">
          <Page
            :padding="pdfSettings.safetyPaddings"
            :layout="pageLayout"
            @click="toggleIncludeSource"
            class="printing__page printing__page_selectable"
            :class="{ printing__page_enabled: pdfSettings.includeSource }"
          >
            <div class="printing__page-content printing__page-content_image">
              <img :src="sourceImage" alt="source" class="printing__image" />
            </div>
            <div
              class="printing__page-shadow"
              :class="{
                'printing__page-shadow_visible': !pdfSettings.includeSource
              }"
            ></div>
          </Page>
          <div class="printing__page-controls">
            <UICheckbox
              id="include_source"
              :value="pdfSettings.includeSource"
              @input="toggleIncludeSource"
              class="printing__checkbox"
            />
            <div
              @click="toggleIncludeSource"
              class="printing__page-controls-label printing__page-controls-label_clickable"
            >
              {{ $t('printing.source') }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="printing__settings">
      <div class="printing__settings-row printing__settings-row_wrap">
        <div class="printing__settings-name">
          {{ $t('printing.file_name') }}
        </div>
        <div class="printing__settings-value">
          <UIInput
            :value="pdfSettings.fileName"
            @input="onFileNameChange"
            class="printing__input"
          />.pdf
        </div>
      </div>
      <div class="printing__settings-row printing__settings-row_wrap">
        <div class="printing__settings-name">
          {{ $t('printing.safety_paddings') }}
        </div>
        <div class="printing__settings-value">
          <UIInput
            :value="pdfSettings.safetyPaddings"
            min="0"
            max="15"
            type="number"
            @input="onSafetyPaddingsChange"
            class="printing__input"
          />
          {{ $t('printing.units') }}
        </div>
      </div>
      <div class="printing__settings-row">
        <div class="printing__settings-name">
          {{ $t('printing.outline_color') }}
        </div>
        <div class="printing__settings-value">
          <UIColorPicker
            :value="pdfSettings.outlineColor"
            @input="onOutlineColorChange"
            size="small"
            class="printing__color-picker"
          />
        </div>
      </div>
      <div class="printing__settings-row">
        <div class="printing__settings-name">
          {{ $t('printing.display_numbers') }}
        </div>
        <div class="printing__settings-value">
          <UICheckbox
            :value="pdfSettings.displayNumbers"
            @input="onDisplayNumbersChange"
            class="printing__checkbox"
          />
        </div>
      </div>
      <div class="printing__settings-row printing__settings-row_btn">
        <UIButton @click="onDownloadClick" class="printing__download-btn">
          <div class="printing__download-btn-content">
            <UIIcon
              icon="download"
              size="1.8rem"
              class="printing__download-btn-icon"
            />
            {{ $t('printing.download') }}
          </div>
        </UIButton>
      </div>
    </div>
  </Container>
</template>

<script>
import Container from '@/components/layout/Container';
import Page from '@/components/common/Page';
import { getLayout } from '@/helpers/layoutHelper';

export default {
  name: 'Printing',
  props: {
    outline: { type: Object, default: null },
    palette: { type: [Array, Object], default: null },
    preview: { type: Object, default: null },
    source: { type: Object, default: null },
    pdfSettings: { type: Object, default: () => ({}) }
  },
  emits: {
    'back-to-upload': null,
    'set-settings': null,
    download: null
  },
  components: { Container, Page },
  computed: {
    outlineImage() {
      return this.outline ? this.outline.src : null;
    },
    previewImage() {
      return this.preview ? this.preview.src : null;
    },
    sourceImage() {
      return this.source ? this.source.src : null;
    },
    pageLayout() {
      if (!this.source) {
        return;
      }
      return getLayout(this.source);
    },
    colors() {
      return this.palette || [];
    }
  },
  methods: {
    onDownloadClick() {
      this.$emit('download');
    },
    onBackClick() {
      this.$emit('back-to-upload');
    },
    updateSettings(updates) {
      this.$emit('set-settings', {
        ...this.pdfSettings,
        ...updates
      });
    },
    toggleIncludePalette() {
      this.updateSettings({
        includePalette: !this.pdfSettings.includePalette
      });
    },
    toggleIncludePreview() {
      this.updateSettings({
        includePreview: !this.pdfSettings.includePreview
      });
    },
    toggleIncludeSource() {
      this.updateSettings({
        includeSource: !this.pdfSettings.includeSource
      });
    },
    onFileNameChange(fileName) {
      this.updateSettings({ fileName });
    },
    onSafetyPaddingsChange(value) {
      this.updateSettings({
        safetyPaddings: Math.max(0, Math.min(Number(value), 15))
      });
    },
    onOutlineColorChange(outlineColor) {
      this.updateSettings({ outlineColor });
    },
    onDisplayNumbersChange() {
      this.updateSettings({
        displayNumbers: !this.pdfSettings.displayNumbers
      });
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/scroll-mixin';
@import '@/assets/scss/theming/theming';
@import '@/assets/scss/responsiveness';

.printing {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 3rem;
  padding-bottom: 4rem;

  &__back-button {
    margin-right: 1rem;
    cursor: pointer;
    @include themed() {
      color: t($color);
      transition: color $theme-transition;
    }
  }

  &__title {
    width: 100%;
    margin-bottom: 2rem;
    font-size: 2.4rem;
    display: flex;
    align-items: center;
    @include themed() {
      color: t($color);
      transition: color $theme-transition;
    }
  }

  &__page {
    box-shadow: none;
    transition: box-shadow 0.2s;

    &_enabled {
      box-shadow: 1rem 0.5rem 1rem rgba(0, 0, 0, 0.2);
    }

    &_selectable {
      cursor: pointer;
    }
  }

  &__page-loader {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__page-shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: background-color $theme-transition;

    &_visible {
      @include themed() {
        background-color: t($background-color-page-shadow);
      }
    }
  }

  &__page-controls {
    margin-top: 1rem;
    display: flex;
    align-items: center;
  }
  &__page-controls-label {
    user-select: none;
    margin-left: 0.4rem;
    font-size: 1.4rem;
    @include themed() {
      color: t($color);
      transition: color $theme-transition;
    }

    &_clickable {
      cursor: pointer;
    }
  }

  &__pages {
    width: 100%;
    overflow-x: auto;
    margin-bottom: 2.4rem;

    @include scrollbar;
  }

  &__pages-wrap {
    display: flex;
    align-items: center;
    column-gap: 4rem;
    min-width: 100rem;
    padding: 1rem 2rem 2rem;
  }

  &__pages-item {
    width: 24%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__page-content {
    width: 100%;
    height: 100%;
    &_image {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &__image {
    max-width: 100%;
    max-height: 100%;
  }

  &__settings {
    width: 32rem;
    font-size: 1.4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__settings-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-height: 3rem;

    &_btn {
      justify-content: center;
    }

    & + .printing__settings-row {
      margin-top: 1rem;

      &_btn {
        margin-top: 2rem;
      }
    }
  }

  &__settings-name {
    display: flex;
    align-items: center;
    @include themed() {
      color: t($color);
      transition: color $theme-transition;
    }
  }
  &__settings-value {
    @include themed() {
      color: t($color);
      transition: color $theme-transition;
    }
  }

  &__download-btn-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__download-btn-icon {
    margin-right: 0.8rem;
  }
}

@include screen-s {
  .printing {
    &__settings {
      font-size: 1.6rem;
    }
    &__settings-row {
      width: 100%;
      margin-bottom: 1.4rem;

      &_wrap {
        flex-direction: column;
        align-items: flex-start;

        .printing {
          &__settings-name {
            width: 100%;
          }
          &__settings-value {
            width: 100%;
            display: flex;
            align-items: center;
          }
        }
      }
    }
    &__settings-name {
      margin-bottom: 0.8rem;
    }
    &__settings-value {
    }
    &__input {
      flex: 1;
      margin-right: 0.4rem;
    }
  }
}

@include screen-m {
  .printing {
    &__settings {
      width: 100%;
    }
  }
}

.palette {
  &__item {
    display: flex;
    align-items: center;

    & + .palette__item {
      margin-top: 0.2rem;
    }
  }

  &__color {
    width: 1rem;
    height: 1rem;
    margin: 0 0.4rem;
    border: 0.1rem solid black;
    border-radius: 0.2rem;
  }
}
</style>
