<template>
  <router-view
    :source="source"
    :preview="preview"
    :outline="outline"
    :palette="palette"
    :pdfSettings="pdfSettings"
    @file-ready="onFileReady"
    @get-pdf="onGetPdfClick"
    @reset-upload="onResetUpload"
    @set-settings="updatePdfSettings"
    @download="queuePdfGeneration"
    @back-to-upload="onBackToUpload"
  ></router-view>
  <GlobalOverlay v-if="isPdfGenerationQueued" class="generator__spinner">
    <UIIcon icon="loading" size="3.2rem" class="generator__spinner-icon" />
    {{ $t('printing.pdf_generation_in_progress') }}
  </GlobalOverlay>
</template>

<script>
import GlobalOverlay from '@/components/common/GlobalOverlay';
import processImage, { generateOutlineImage } from '@/libs/processImage';
import { ROUTES } from '@/router';
import generatePdf from '@/helpers/generatePdf';
import { HEXtoRGB } from '@/libs/processImage/helpers/colorTransform';

export default {
  name: 'Generator',
  components: { GlobalOverlay },
  data() {
    return {
      source: null,
      preview: null,
      outlineData: null,
      outline: null,
      palette: null,
      pdfSettings: {
        includePalette: true,
        includePreview: true,
        includeSource: false,
        fileName: this.$t('printing.default_file_name'),
        safetyPaddings: 5, // mm
        outlineColor: '#c8c8c8',
        displayNumbers: true
      },
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
    async onPreviewReady({ preview, palette }) {
      this.preview = preview;
      this.palette = palette;
    },
    async onResultReady({ outline }) {
      this.outlineData = outline;
      await this.generateOutline();
      this.setResultReady(true);
      if (this.isPdfGenerationQueued) {
        this.generatePdf();
      }
    },
    onError() {
      console.log('error occurred');
      this.setPdfGenerationQueued(false);
      this.setResultReady(false);
    },
    onResetUpload() {
      this.$emit('image-removed');
      this.source = null;
      this.preview = null;
      this.outlineData = null;
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
    queuePdfGeneration() {
      if (this.isResultReady) {
        this.generatePdf();
      } else {
        this.setPdfGenerationQueued(true);
      }
    },
    async generateOutline(settings = this.pdfSettings) {
      this.outline = null;
      if (!this.outlineData) {
        return;
      }
      this.outline = await generateOutlineImage(this.outlineData, {
        outlineColor: HEXtoRGB(settings.outlineColor),
        displayNumbers: settings.displayNumbers
      });
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
    updatePdfSettings(settings) {
      if (
        this.pdfSettings.outlineColor !== settings.outlineColor ||
        this.pdfSettings.displayNumbers !== settings.displayNumbers
      ) {
        this.generateOutline(settings);
      }
      this.pdfSettings = settings;
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
