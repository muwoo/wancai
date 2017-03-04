<template>
  <div id="upload">
    <i class="el-icon-plus avatar-uploader-icon "></i>
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
  </div>
</template>

<script>
// eslint-disable-next-line
import qiniu from '../common/qiniu';

export default {
  name: 'upload',
  props: [
    'imageUrl',
    'token',
    'fileName',
  ],
  methods: {
    handleUploadImage() {
      // qiniu
    },
  },
};
</script>

<style lang="scss" scoped>
#upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  // position: relative;
  overflow: hidden;
  height: 100px;
  width: 100px;

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
}
</style>
