<template>
  <div class="upload">
    <!-- 上传文件 -->
    <el-dialog title="上传文件" :visible.sync="dialogVisibleUpload" width="480px" append-to-body>
      <div class="dialog-content">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="uploadSubmit">确 定</el-button>
        <el-button @click="dialogVisibleUpload = false">取 消</el-button>
      </span>
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
      formCreateDir: {
        name: ''
      }
    }
  },
  computed: {
    currentDirId: {
      get () {
        return this.$store.state.fastdfs.currentDirId
      }
    }
  },
  mounted () {
  },
  methods: {
    upload () {
      this.formCreateDir.name = ''
      this.dialogVisibleUpload = true
    },
    uploadSubmit () {
      this.$store.dispatch('fastdfs/createDir', { parentId: this.currentDirId, name: this.formCreateDir.name }).then(res => {
        this.dialogVisibleUpload = false
        if (this.currentDirId) this.$store.dispatch('fastdfs/getDirById', this.currentDirId).then()
      })
    }
  }
}
</script>
