<template>
  <div class="ui-icon">
    <i :class="mappedIcon" :style="{ fontSize: size }"> </i>
  </div>
</template>

<script>
const ICONS_MAP = {
  printing: 'el-icon-printer',
  'light-theme': 'el-icon-sunny',
  'dark-theme': 'el-icon-moon',
  upload: 'el-icon-upload',
  loading: 'el-icon-loading',
  preview: 'el-icon-view',
  settings: 'el-icon-s-tools',
  info: 'el-icon-question',
  download: 'el-icon-download',
  back: 'el-icon-arrow-left',
  check: 'el-icon-circle-check',
  close: 'el-icon-close',
  notification_info: 'el-icon-info',
  notification_error: 'el-icon-error',
  try_it: 'el-icon-arrow-right'
};

export default {
  name: 'UIIcon',
  props: {
    icon: { type: String },
    size: { type: String, default: '1.4rem' }
  },
  computed: {
    mappedIcon() {
      return ICONS_MAP[this.icon] || this.icon;
    }
  }
};
</script>

<style lang="scss">
$--font-path: '~element-plus/packages/theme-chalk/src/fonts';
@import '~element-plus/packages/theme-chalk/src/icon.scss';
</style>
