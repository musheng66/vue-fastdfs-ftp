<template>
  <div class="option">
    <el-button-group>
      <el-button type="primary" icon="el-icon-upload2" title="上传文件" @click="upload">上传文件</el-button>
      <el-button type="" icon="el-icon-folder-add" title="新建文件夹" @click="createDir">新建文件夹</el-button>
    </el-button-group>
    <!-- 新建文件夹 -->
    <create-dir ref="createDir"></create-dir>
    <!-- 上传文件 -->
    <upload-file ref="uploadFile"></upload-file>
  </div>
</template>

<script>
import CreateDir from '../File/CreateDir'
import Upload from '../File/Upload'
export default {
  components: {
    CreateDir,
    UploadFile: Upload
  },
  methods: {
    upload () {
      this.$refs.uploadFile.upload()
    },
    createDir () {
      this.$refs.createDir.createDir()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../../styles/mixin.scss";
  .option {
    @include flex();
  }
</style>
