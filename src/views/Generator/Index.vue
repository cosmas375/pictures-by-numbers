<template>
  <router-view
    :source="source"
    :preview="preview"
    :outline="outline"
    :palette="palette"
    @file-ready="onFileReady"
    @get-pdf="onGetPdfClick"
    @reset-upload="onResetUpload"
    @back-to-upload="onBackToUpload"
  ></router-view>
</template>

<script>
import processImage from '@/libs/processImage';
import { ROUTES } from '@/router';

export default {
  name: 'Generator',
  data() {
    return {
      source: null,
      preview: null,
      outline: null,
      palette: null
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
    },
    onBackToUpload() {
      this.$router.push({ name: ROUTES.Upload });
    }
  }
};
</script>
