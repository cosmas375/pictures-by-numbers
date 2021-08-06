<template>
  <div class="printing">
    <div class="printing__title">
      PDF settings:
    </div>
    <div class="printing__pages">
      <div class="printing__pages-item">
        <div class="printing__page printing__page_image">
          <img :src="outlineImage" alt="outline" class="printing__image" />
        </div>
        <div class="printing__page-controls">
          <input
            id="include_outline"
            type="checkbox"
            class="printing__checkbox"
          />
          <label for="include_outline" class="printing__page-controls-label">
            Outline
          </label>
        </div>
      </div>
      <div class="printing__pages-item">
        <div class="printing__page">
          <div class="printing__palette palette">
            <div class="palette__color"></div>
          </div>
        </div>
        <div class="printing__page-controls">
          <input
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
        <div class="printing__page printing__page_image">
          <img :src="previewImage" alt="preview" class="printing__image" />
        </div>
        <div class="printing__page-controls">
          <input
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
        <div class="printing__page printing__page_image">
          <img :src="sourceImage" alt="source" class="printing__image" />
        </div>
        <div class="printing__page-controls">
          <input
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
        <div class="printing__settings-value">123</div>
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
        <div class="printing__settings-value">123</div>
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
        <div class="printing__settings-value">123</div>
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
export default {
  name: 'Printing',
  props: {
    outline: { type: Object, default: null },
    palette: { type: Array, default: () => [] },
    preview: { type: Object, default: null },
    source: { type: Object, default: null }
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
    }
  }
};
</script>

<style lang="scss">
.printing {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__title {
    width: 100%;
    margin-bottom: 3.2rem;
    font-size: 2.4rem;
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
    width: 100%;
    overflow: auto;
    display: flex;
    align-items: center;
    column-gap: 4rem;
  }

  &__pages-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__page {
    width: 21rem;
    height: 29.4rem;
    position: relative;
    background-color: #fff;
    box-sizing: border-box;

    &_image {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
    }

    &_palette {
      padding: 8px 2px;
    }
  }

  &__image {
    max-width: 100%;
    max-height: 100%;
  }

  &__settings {
    margin-top: 3.2rem;
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
