<template>
  <router-view
    :source="source"
    :preview="preview"
    :outline="outline"
    :palette="palette"
    :pdfSettings="pdfSettings"
    @file-ready="onFileReady"
    @upload-error="onUploadError"
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
import { HEXtoRGB, RGBtoHEX } from '@/libs/processImage/helpers/colorTransform';
import { OUTLINE_COLOR } from '@/libs/processImage/settings';
import { nanoid } from 'nanoid';

export default {
  name: 'Generator',
  components: { GlobalOverlay },
  emits: {
    notify: null,
    'image-loaded': null,
    'image-removed': null
  },
  data() {
    return {
      uploadId: null,
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
        outlineColor: RGBtoHEX(OUTLINE_COLOR),
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
      this.uploadId = nanoid();
      this.source = img;
      this.$emit('image-loaded');
      await processImage(img, {
        onPreviewReady: this.onPreviewReady,
        onResultReady: this.onResultReady,
        onError: this.onError,
        uploadId: this.uploadId
      });
    },
    onUploadError(error) {
      this.$emit('notify', {
        type: 'error',
        title: this.$t(`upload.error.${error}`),
        duration: 3000
      });
    },
    async onPreviewReady({ preview, palette, uploadId }) {
      if (!this.uploadId || this.uploadId !== uploadId) {
        return;
      }
      this.preview = preview;
      this.palette = palette;
    },
    async onResultReady({ outline, uploadId }) {
      if (!this.uploadId || this.uploadId !== uploadId) {
        return;
      }
      this.outlineData = outline;
      await this.generateOutline();
      this.setResultReady(true);
      if (this.isPdfGenerationQueued) {
        this.generatePdf();
      }
    },
    onError(error) {
      if (error) {
        console.log(error);
      }
      this.setPdfGenerationQueued(false);
      this.setResultReady(false);
    },
    onResetUpload() {
      this.$emit('image-removed');
      this.uploadId = null;
      this.source = null;
      this.preview = null;
      this.outlineData = null;
      this.outline = null;
      this.palette = [];
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
    setDefaultPdfSettings() {
      this.pdfSettings = {
        includePalette: true,
        includePreview: true,
        includeSource: false,
        fileName: this.$t('printing.default_file_name'),
        safetyPaddings: 5, // mm
        outlineColor: '#c8c8c8',
        displayNumbers: true
      };
    },
    setResultReady(value) {
      this.isResultReady = value;
    },
    setPdfGenerationQueued(value) {
      this.isPdfGenerationQueued = value;
    }
  },
  mounted() {
    this.setDefaultPdfSettings();
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
