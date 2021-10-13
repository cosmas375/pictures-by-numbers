<template>
  <div class="preview">
    <UISlider class="preview__slider">
      <template #slides>
        <UISlide v-for="demo in demos" :key="demo.src">
          <PreviewSlide :preview="image" :base="demo" />
        </UISlide>
      </template>
    </UISlider>
  </div>
</template>

<script>
import PreviewSlide from '@/components/Generator/Upload/PreviewSlide';

export default {
  name: 'Preview',
  props: {
    image: { type: Object, default: null }
  },
  computed: {
    demos() {
      return [
        {
          src: require('@/assets/img/previews/preview.jpg'),
          width: 2183,
          height: 3342,
          points: [
            { x: 534, y: 694 },
            { x: 1632, y: 694 },
            { x: 534, y: 2278 },
            { x: 1632, y: 2278 }
          ]
        }
      ];
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
