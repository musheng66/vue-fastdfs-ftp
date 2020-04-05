<template>
  <div class="dashboard-container">
    <header class="tools">
      <TooBar></TooBar>
    </header>
    <main class="home">
      <file></file>
    </main>
    <footer class="footer">
      <bottom-bar></bottom-bar>
    </footer>
  </div>
</template>

<script>
import { TooBar, File, BottomBar } from './components'

export default {
  name: 'Dashboard',
  components: {
    TooBar,
    File,
    BottomBar
  },
  data () {
    return { }
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
  @import "../../styles/mixin.scss";
  .dashboard-container {
    @include flex();
    @include flex-direction(column);
    .tools {
      padding: 5px;
      height: 46px;
    }
    .home {
      flex: 1;
      padding: 5px;
      height: calc(100% - 46px - 29px);
    }
    .footer {
      color: #aaa;
      padding: 5px;
      height: 29px;
      background: rgba(222, 222, 222, 0.4);
    }
  }
</style>
