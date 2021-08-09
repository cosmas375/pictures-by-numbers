<template>
  <router-view
    :source="source"
    :preview="preview"
    :outline="outline"
    :palette="palette"
    @file-ready="onFileReady"
    @get-pdf="onGetPdfClick"
    @reset-upload="onResetUpload"
    @download="queuePdfGeneration"
    @back-to-upload="onBackToUpload"
  ></router-view>
  <GlobalOverlay v-if="isPdfGenerationQueued" class="generator__spinner">
    <UIIcon icon="loading" size="3.2rem" class="generator__spinner-icon" />
    PDF generation in progress...
  </GlobalOverlay>
</template>

<script>
import GlobalOverlay from '@/components/common/GlobalOverlay';
import processImage from '@/libs/processImage';
import { ROUTES } from '@/router';
import generatePdf from '@/helpers/generatePdf';

export default {
  name: 'Generator',
  components: { GlobalOverlay },
  data() {
    return {
      source: null,
      preview: null,
      outline: null,
      palette: null,
      pdfSettings: {},
      isResultReady: false,
      isPdfGenerationQueued: false
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
      this.setResultReady(true);
      if (this.isPdfGenerationQueued) {
        this.generatePdf();
      }
    },
    onError() {
      this.$notify({
        message: this.$t('image_processor.error.title'),
        type: 'error',
        duration: 5000
      });
      this.setPdfGenerationQueued(false);
      this.setResultReady(false);
    },
    onResetUpload() {
      this.$emit('image-removed');
      this.source = null;
      this.preview = null;
      this.outline = null;
      this.palette = [];
      this.pdfSettings = {};
      this.setPdfGenerationQueued(false);
      this.setResultReady(false);
    },
    onGetPdfClick() {
      this.$router.push({ name: ROUTES.Print });
    },
    onBackToUpload() {
      this.$router.push({ name: ROUTES.Upload });
      this.setPdfGenerationQueued(false);
    },
    queuePdfGeneration(settings) {
      console.log(settings);
      this.pdfSettings = settings;
      if (this.isResultReady) {
        this.generatePdf();
      } else {
        this.setPdfGenerationQueued(true);
      }
    },
    generatePdf() {
      generatePdf({
        outline: this.outline,
        palette: this.palette,
        preview: this.preview,
        source: this.source,
        settings: this.pdfSettings
      });
      this.setPdfGenerationQueued(false);
    },
    setResultReady(value) {
      this.isResultReady = value;
    },
    setPdfGenerationQueued(value) {
      this.isPdfGenerationQueued = value;
    }
  }
};
</script>

<style lang="scss">
.generator {
  &__spinner {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__spinner-icon {
    margin-bottom: 1rem;
  }
}
</style>
