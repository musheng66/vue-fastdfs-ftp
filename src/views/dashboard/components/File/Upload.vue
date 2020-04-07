<template>
  <div class="upload">
    <!-- 上传文件 -->
    <el-dialog title="上传文件" :visible.sync="dialogVisibleUpload" width="480px" append-to-body>
      <div class="dialog-content">
        <el-upload
          class="upload-file"
          drag
          :action="'/fastdfs/upload/file/' + currentDir.id"
          :on-success="uploadSuccess"
          :file-list="fileList">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传不超过 <b>500M</b> 的文件</div>
        </el-upload>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      dialogVisibleUpload: false,
      fileList: []
    }
  },
  computed: {
    currentDir: {
      get () {
        return this.$store.state.fastdfs.currentDir
      }
    }
  },
  mounted () {
  },
  methods: {
    upload () {
      this.dialogVisibleUpload = true
    },
    uploadSuccess () {
      this.dialogVisibleUpload = false
      if (this.currentDir.id) this.$store.dispatch('fastdfs/getDirById', this.currentDir.id).then()
    }
  }
}
</script>
<style lang="scss">
  .dialog-content {
    .upload-file {
      width: 100%;
      .el-upload {
        width: 100%;
        .el-upload-dragger {
          width: 100%;
        }
      }
    }
  }
</style>
