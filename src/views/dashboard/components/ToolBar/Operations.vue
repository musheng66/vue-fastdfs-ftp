<template>
  <div class="option">
    <el-button-group>
      <el-button type="primary" icon="el-icon-upload2" title="上传文件">上传文件</el-button>
      <el-button type="" icon="el-icon-folder-add" title="新建文件夹">新建文件夹</el-button>
    </el-button-group>
  </div>
</template>

<script>

export default {
  components: { }
}
</script>

<style lang="scss" scoped>
  @import "../../../../styles/mixin.scss";
  .option {
    @include flex();
  }
</style>
