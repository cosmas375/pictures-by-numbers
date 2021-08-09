<template>
  <div class="printing">
    <div class="printing__title">
      PDF settings
    </div>
    <div class="printing__pages">
      <div class="printing__pages-item">
        <Page
          :layout="pageLayout"
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
          <label for="include_outline" class="printing__page-controls-label">
            Outline
          </label>
        </div>
      </div>
      <div class="printing__pages-item">
        <Page
          class="printing__page"
          :class="{ printing__page_enabled: includePalette }"
        >
          <div class="printing__page-content printing__page-content_palette">
            <div class="palette__color"></div>
          </div>
          <div
            class="printing__page-shadow"
            :class="{ 'printing__page-shadow_visible': !includePalette }"
          ></div>
        </Page>
        <div class="printing__page-controls">
          <input
            v-model="includePalette"
            id="include_palette"
            type="checkbox"
            class="printing__checkbox"
          />
          <label for="include_palette" class="printing__page-controls-label">
            Palette
          </label>
        </div>
      </div>
      <div class="printing__pages-item">
        <Page
          :layout="pageLayout"
          class="printing__page"
          :class="{ printing__page_enabled: includePreview }"
        >
          <div class="printing__page-content printing__page-content_image">
            <img :src="previewImage" alt="preview" class="printing__image" />
          </div>
          <div
            class="printing__page-shadow"
            :class="{ 'printing__page-shadow_visible': !includePreview }"
          ></div>
        </Page>
        <div class="printing__page-controls">
          <input
            v-model="includePreview"
            id="include_reference"
            type="checkbox"
            class="printing__checkbox"
          />
          <label for="include_reference" class="printing__page-controls-label">
            Reference
          </label>
        </div>
      </div>
      <div class="printing__pages-item">
        <Page
          :layout="pageLayout"
          class="printing__page"
          :class="{ printing__page_enabled: includeSource }"
        >
          <div class="printing__page-content printing__page-content_image">
            <img :src="sourceImage" alt="source" class="printing__image" />
          </div>
          <div
            class="printing__page-shadow"
            :class="{ 'printing__page-shadow_visible': !includeSource }"
          ></div>
        </Page>
        <div class="printing__page-controls">
          <input
            v-model="includeSource"
            id="include_source"
            type="checkbox"
            class="printing__checkbox"
          />
          <label for="include_source" class="printing__page-controls-label">
            Source image
          </label>
        </div>
      </div>
    </div>
    <div class="printing__settings printing-settings">
      <div class="printing__settings-row">
        <div class="printing__settings-name">
          Safety padding
          <UITooltip placement="top-start">
            <UIIcon icon="info" size="1.8rem" class="printing__settings-hint" />
            <template #content>
              fuck this shit
            </template>
          </UITooltip>
        </div>
        <div class="printing__settings-value">
          <input v-model="safetyPaddings" min="0" max="15" type="number" />
          mm
        </div>
      </div>
      <div class="printing__settings-row">
        <div class="printing__settings-name">
          Outline color
          <UITooltip placement="top-start">
            <UIIcon icon="info" size="1.8rem" class="printing__settings-hint" />
            <template #content>
              fuck this shit
            </template>
          </UITooltip>
        </div>
        <div class="printing__settings-value">
          <UIColorPicker v-model="outlineColor" />
        </div>
      </div>
      <div class="printing__settings-row">
        <div class="printing__settings-name">
          Dsplay numbers
          <UITooltip placement="top-start">
            <UIIcon icon="info" size="1.8rem" class="printing__settings-hint" />
            <template #content>
              fuck this shit
            </template>
          </UITooltip>
        </div>
        <div class="printing__settings-value">
          <input
            v-model="displayNumbers"
            type="checkbox"
            class="printing__checkbox"
          />
        </div>
      </div>
      <div class="printing__settings-row printing__settings-row_btn">
        <UIButton>
          Download
        </UIButton>
      </div>
    </div>
  </div>
</template>

<script>
import Page from '@/components/common/Page';
import { getLayout } from '@/helpers/layoutHelper';

export default {
  name: 'Printing',
  props: {
    outline: { type: Object, default: null },
    palette: { type: Array, default: () => [] },
    preview: { type: Object, default: null },
    source: { type: Object, default: null }
  },
  components: { Page },
  data() {
    return {
      includePalette: true,
      includePreview: true,
      includeSource: false,
      safetyPaddings: 5, // mm
      outlineColor: '#c8c8c8',
      displayNumbers: true
    };
  },
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
    }
  },
  methods: {
    onDownloadClick() {
      this.$emit('download', {
        includePalette: this.includePalette,
        includePreview: this.includePreview,
        includeSource: this.includeSource,
        safetyPaddings: this.safetyPaddings,
        outloneColor: this.outlineColor,
        displayNumbers: this.displayNumbers
      });
    }
  }
};
</script>

<style lang="scss">
.printing {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  &__title {
    width: 100%;
    margin-bottom: 2rem;
    font-size: 2.4rem;
    text-align: center;
  }

  &__page {
    box-shadow: none;
    transition: box-shadow 0.2s;

    &_enabled {
      box-shadow: 1rem 0.5rem 1rem rgba(0, 0, 0, 0.2);
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
    transition: background-color 0.2s;

    &_visible {
      background-color: rgba(255, 255, 255, 0.8);
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
  }

  &__pages {
    width: 90%;
    display: flex;
    align-items: center;
    column-gap: 4rem;
  }

  &__pages-item {
    width: 24%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    &_landscape {
    }
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
    margin-top: 2.4rem;
    width: 24rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__settings-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 1rem;
    &_btn {
      justify-content: center;
      margin-top: 2rem;
    }
  }

  &__settings-name {
    font-size: 1.4rem;
    display: flex;
    align-items: center;
  }
  &__settings-hint {
    cursor: pointer;
    margin-left: 0.6rem;
    color: #999999;
  }
}

.palette {
}
</style>
