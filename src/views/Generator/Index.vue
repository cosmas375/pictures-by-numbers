<template>
  <Container class="generator">
    <router-view
      :sourceImage="source"
      :preview="preview"
      @file-ready="onFileReady"
      @get-pdf="onGetPdfClick"
      @reset-upload="onResetUpload"
    ></router-view>
  </Container>
</template>

<script>
import Container from '@/components/layout/Container';
import processImage from '@/libs/processImage';
import { ROUTES } from '@/router';

export default {
  name: 'Generator',
  data() {
    return {
      source: null,
      preview: null
    };
  },
  methods: {
    onFileReady(img) {
      this.source = img;
      processImage(img, {
        onPreviewReady: this.onPreviewReady,
        onResultReady: this.onResultReady,
        onError: this.onError
      });
    },
    onPreviewReady({ preview }) {
      this.preview = preview;
    },
    onResultReady() {
      //
    },
    onError() {
      this.$notify({
        message: this.$t('image_processor.error.title'),
        type: 'error',
        duration: 5000
      });
    },
    onResetUpload() {
      this.source = null;
      this.preview = null;
    },
    onGetPdfClick() {
      this.$router.push({ name: ROUTES.Print });
    }
  },
  components: { Container }
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
