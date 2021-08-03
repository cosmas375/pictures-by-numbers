<template>
  <Container class="generator">
    <ImageUploader v-if="!sourceImg" @file-ready="onFileReady" />
    <Preview
      v-else
      :image="result"
      @print-click="onPrintClick"
      @reset="onResetClick"
    />
  </Container>
</template>

<script>
import Container from '@/components/layout/Container';
import ImageUploader from '@/components/Generator/ImageUploader';
import Preview from '@/components/Generator/Preview';
import processImage from '@/libs/processImage';

export default {
  name: 'Generator',
  data() {
    return {
      sourceImg: null,
      result: null,
      isResultReady: false
    };
  },
  methods: {
    onFileReady(img) {
      this.sourceImg = img;
      this.setResultReady(false);
      processImage(img)
        .then(this.onReady)
        .catch(this.onError);
    },
    async onReady(result) {
      this.result = result;
      this.setResultReady(true);
    },
    onError() {
      this.$notify({
        message: this.$t('image_processor.error.title'),
        type: 'error',
        duration: 5000
      });
    },
    onPrintClick() {
      alert('print');
    },
    onResetClick() {
      this.setResultReady(false);
      this.result = null;
      this.sourceImg = null;
    },
    setResultReady(value) {
      this.isResultReady = value;
    }
  },
  components: { Container, ImageUploader, Preview }
};
</script>

<style lang="scss">
.generator {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
}
</style>
