<template>
  <div class="errPage-container ms-page">
    <ErrorA />
    <ErrorB />
    <!-- $t is vue-i18n global function to translate lang -->
    <h3 class="warn-content">{{ $t('errorLog.tips') }}</h3>
    <aside class="warn-content">
      {{ $t('errorLog.description') }}
      <a target="_blank" class="link-type" href="https://panjiachen.github.io/vue-element-admin-site/guide/advanced/error.html">
        {{ $t('errorLog.documentation') }}
      </a>
    </aside>
    <main class="err">
      <a href="#" style="display: block;">
        <img style="width: 100%; height: auto;" src="https://wpimg.wallstcn.com/360e4842-4db5-42d0-b078-f9a84a825546.gif">
      </a>
    </main>
  </div>
</template>

<script>
import ErrorA from './components/ErrorTestA'
import ErrorB from './components/ErrorTestB'

export default {
  name: 'ErrorLog',
  components: { ErrorA, ErrorB }
}
</script>

<style lang="scss" scoped>
  .errPage-container {
    .err {
      padding: 10px 0 0;
    }
  }
</style>
