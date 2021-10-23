<template>
  <div class="preview">
    <UISlider class="preview__slider">
      <template #slides>
        <PreviewSlide
          v-for="(demo, index) in demos"
          :key="index"
          :preview="image"
          :base="demo"
        />
      </template>
    </UISlider>
  </div>
</template>

<script>
import PreviewSlide from '@/components/Generator/Upload/PreviewSlide';
import previews from '@/data/previews';
import { getLayout } from '@/helpers/layoutHelper';
import getRandomNumbers from '@/utils/getRandomNumbers';

export default {
  name: 'Preview',
  props: {
    image: { type: Object, default: null }
  },
  computed: {
    demos() {
      const previewsCount = 2;
      const images = previews[getLayout(this.image)];
      const randomNumbers = getRandomNumbers(
        0,
        images.length - 1,
        previewsCount
      );
      return [null].concat(
        images
          .filter((item, index) => randomNumbers.includes(index))
          .map(item => {
            return {
              ...item,
              src: require(`@/assets/img/previews/${item.src}`)
            };
          })
      );
    }
  },
  components: {
    PreviewSlide
  }
};
</script>

<style lang="scss">
.preview {
  width: 100%;
  height: 100%;

  &__slider {
    height: 100%;
  }
}
</style>
