<template>
  <div class="ui-file-upload">
    <el-upload
      :action="action"
      :auto-upload="autoUpload"
      :drag="drag"
      :show-file-list="showFileList"
      :list-type="listType"
      :on-change="onChange"
    >
      <slot></slot>
      <template #tip>
        <slot name="tip"></slot>
      </template>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'UIFileUpload',
  props: {
    action: { type: String, default: '' },
    autoUpload: { type: Boolean, default: false },
    showFileList: Boolean,
    drag: Boolean,
    limit: Number,
    listType: String,
    onSuccess: Function,
    onChange: Function
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/theming/theming';

.ui-file-upload,
.ui-file-upload > div,
.ui-file-upload .el-upload {
  width: 100%;
  height: 100%;
}

.el-upload-dragger {
  width: 100%;
  height: 100%;
  border: none;
  .el-icon-upload {
    margin: 0;
  }
}
</style>
