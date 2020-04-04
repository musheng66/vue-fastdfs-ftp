/**
 * @description 将 router 中的 title 翻译成 i18n 设置的语言，用于导航面包屑中显示
 * @param title
 * @returns {*}
 */
export function generateTitle (title) {
  const hasKey = this.$te('route.' + title)
  const translatedTitle = this.$t('route.' + title) // $t :this method from vue-i18n, inject in @/lang/index.js

  if (hasKey) {
    return translatedTitle
  }
  return title
}
