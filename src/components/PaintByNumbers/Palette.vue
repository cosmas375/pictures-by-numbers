<template>
  <div class="palette">
    <div
      v-for="color in items"
      :key="color.key"
      class="palette__color"
      :style="{ backgroundColor: color.value }"
    >
      <span class="palette__color-value">
        {{ color.displayValue }}
      </span>
    </div>
  </div>
</template>

<script>
import { RGBtoHEX } from '@/libs/processImage/helpers/colorTransform';

export default {
  name: 'Palette',
  props: {
    colors: { type: Array, default: () => [] }
  },
  computed: {
    items() {
      return this.colors.map(color => {
        const hex = RGBtoHEX(color);
        return {
          key: hex,
          value: hex,
          displayValue: hex
        };
      });
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/theming';

.palette {
  display: flex;
  flex-wrap: wrap;
  column-gap: 1rem;
  row-gap: 1rem;

  &__color {
    display: inline-block;
    width: 8rem;
    height: 8rem;
    position: relative;
    overflow: hidden;
    @include themed() {
      border: 0.2rem solid t('text-color-secondary');
      border-radius: 0.5rem;
    }

    &:hover {
      .palette__color-value {
        opacity: 1;
      }
    }
  }

  &__color-value {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    font-size: 1.4rem;
    letter-spacing: 0.1rem;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.4);

    opacity: 0;
    transition: opacity 0.2s;
  }
}
</style>
