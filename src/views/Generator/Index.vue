<template>
  <Container class="generator" :class="{ 'generator_no-scroll': noScroll }">
    <router-view
      :source="source"
      :preview="preview"
      :outline="outline"
      :palette="palette"
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
      preview: null,
      outline: null,
      palette: []
    };
  },
  computed: {
    noScroll() {
      return this.$route.name === ROUTES.Upload;
    }
  },
  methods: {
    async onFileReady(img) {
      this.source = img;
      this.$emit('image-loaded');
      await processImage(img, {
        onPreviewReady: this.onPreviewReady,
        onResultReady: this.onResultReady,
        onError: this.onError
      });
    },
    onPreviewReady({ preview, palette }) {
      this.preview = preview;
      this.palette = palette;
    },
    onResultReady({ outline }) {
      this.outline = outline;
    },
    onError() {
      this.$notify({
        message: this.$t('image_processor.error.title'),
        type: 'error',
        duration: 5000
      });
    },
    onResetUpload() {
      this.$emit('image-removed');
      this.source = null;
      this.preview = null;
      this.outline = null;
      this.palette = [];
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

  &_no-scroll {
    height: 100%;
  }
}
</style>
