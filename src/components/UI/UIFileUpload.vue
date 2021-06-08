<template>
  <div class="ui-file-upload">
    <el-upload
      :action="action"
      :auto-upload="autoUpload"
      :drag="drag"
      :show-file-list="showFileList"
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
    onSuccess: Function,
    onChange: Function
  }
};
</script>

<style lang="scss"></style>
