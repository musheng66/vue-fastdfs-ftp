<template>
  <div class="bottom-bar">
    <div class="left"><span class="info" v-if="selectedList.length > 0">当前选中 {{ selectedList.length }} 项</span><span class="info">共 {{ itemList.length }} 项</span></div>
    <div class="center"></div>
    <div class="right">CASIC | 2020</div>
  </div>
</template>

<script>
export default {
  computed: {
    selectedList: {
      get () {
        return this.$store.state.fastdfs.selectedList
      }
    },
    itemList: {
      get () {
        return this.$store.state.fastdfs.itemList
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../../styles/mixin.scss";
  .bottom-bar {
    @include flex();
    @include justify-content(space-between);
    .left, .right, .center {
      padding: 0 5px;
    }
    .left {
      color: #666;
      .info {
        padding: 0 10px 0 0;
      }
    }
  }
</style>
