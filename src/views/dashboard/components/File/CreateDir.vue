<template>
  <div class="create-dir">
    <!-- 新建文件夹 -->
    <el-dialog title="新建文件夹" :visible.sync="dialogVisibleCreateDir" width="480px" append-to-body>
      <div class="dialog-content">
        <el-form ref="formCreateDir" :model="formCreateDir" label-width="40px">
          <el-form-item label="名称">
            <el-input v-model="formCreateDir.name"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createDirSubmit">确 定</el-button>
        <el-button @click="dialogVisibleCreateDir = false">取 消</el-button>
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
      dialogVisibleCreateDir: false,
      formCreateDir: {
        name: ''
      }
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
    createDir () {
      this.formCreateDir.name = ''
      this.dialogVisibleCreateDir = true
    },
    createDirSubmit () {
      this.$store.dispatch('fastdfs/createDir', { parentId: this.currentDir.id, dirName: this.formCreateDir.name }).then(res => {
        this.dialogVisibleCreateDir = false
        this.$message({ type: 'success', message: '创建成功!' })
        if (this.currentDir.id) this.$store.dispatch('fastdfs/getDirById', this.currentDir.id).then()
      })
    }
  }
}
</script>
