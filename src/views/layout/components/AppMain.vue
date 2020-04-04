<template>
  <section class="app-main">
<!--    <el-scrollbar class="page-content">-->
      <div class="ms-page">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="cachedViews">
            <router-view :key="key" class="ms-view"/>
          </keep-alive>
        </transition>
      </div>
<!--    </el-scrollbar>-->
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews () {
      return this.$store.state.tagsView.cachedViews
    },
    key () {
      return this.$route.fullPath
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../styles/variables";
.app-main {
  /*height: calc(100% - #{$navBarHeight});*/
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  .page-content {
    height: 100%;
  }
}

.fixed-header+.app-main {
  height: 100%;
  padding-top: $navBarHeight;
  .page-content {
    height: 100%;
  }
}

.hasTagsView {
  .app-main {
    height: calc(100% - #{$navBarHeight} - #{$tagsViewHeight});
  }

  .fixed-header+.app-main {
    height: 100%;
    padding-top: calc(#{$navBarHeight} + #{$tagsViewHeight});
  }
}
</style>
