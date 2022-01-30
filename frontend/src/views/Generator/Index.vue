<template>
  <router-view
    :source="source"
    :preview="preview"
    :outline="outline"
    :palette="paletteHEX"
    :pdfSettings="pdfSettings"
    @file-ready="onFileReady"
    @upload-error="onUploadError"
    @get-pdf="onGetPdfClick"
    @reset-upload="onResetUpload"
    @set-settings="updatePdfSettings"
    @download="queuePdfGeneration"
    @back-to-upload="onBackToUpload"
    @regenerate-preview="regeneratePreview"
  ></router-view>
  <GlobalOverlay v-if="isPdfGenerationQueued" class="generator__spinner">
    <UIIcon icon="loading" size="3.2rem" class="generator__spinner-icon" />
    {{ $t('printing.pdf_generation_in_progress') }}
  </GlobalOverlay>
</template>

<script>
import GlobalOverlay from '@/components/common/GlobalOverlay';
import { ImageProcessor, generateOutlineImage } from '@/libs/processImage';
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
      palette: [],
      preview: null,
      outlineData: null,
      outline: null,
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
    paletteHEX() {
      return this.palette.map(color => RGBtoHEX(color));
    }
  },
  methods: {
    async onFileReady(img) {
      this.uploadId = nanoid();
      this.source = img;
      this.$emit('image-loaded');
      this.processor = new ImageProcessor({
        onPaletteReady: this.getCallback(this.onPaletteReady.bind(this)),
        onPreviewReady: this.getCallback(this.onPreviewReady.bind(this)),
        onOutlineReady: this.getCallback(this.onOutlineReady.bind(this))
      });
      this.processor.generatePalette(img);
    },
    onUploadError(error) {
      this.$emit('notify', {
        type: 'error',
        title: this.$t(`upload.error.${error}`),
        duration: 3000
      });
    },
    getCallback(f) {
      const uploadId = this.uploadId;

      return function() {
        if (!this.uploadId || this.uploadId !== uploadId) {
          return;
        }

        f(...arguments);
      }.bind(this);
    },
    onPaletteReady(palette) {
      this.isPaletteReady = true;
      this.palette = palette;
      this.processor.generatePreview();
    },
    onPreviewReady(preview) {
      this.isPreviewReady = true;
      this.preview = preview;
      this.setResultReady(false);
      this.processor.generateOutline();
    },
    async onOutlineReady(outline) {
      this.outlineData = outline;
      await this.generateOutline();
      this.setResultReady(true);
      if (this.isPdfGenerationQueued) {
        this.generatePdf();
      }
    },
    onError() {
      this.setPdfGenerationQueued(false);
      this.setResultReady(false);
    },
    regeneratePreview(palette) {
      const newPalette = palette.map(color => HEXtoRGB(color));
      this.palette = newPalette;
      this.preview = null;
      this.processor.generatePreview(newPalette);
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
