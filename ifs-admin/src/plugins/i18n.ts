import { createI18n } from 'vue-i18n'

const messages = {
  'zh-CN': {
    menu: { business: '业务页面' },
    actions: { create: '新建', edit: '修改', query: '查询' },
    filters: { text: '文本', number: '数字', date: '时间' },
  },
  'en-US': {
    menu: { business: 'Business' },
    actions: { create: 'Create', edit: 'Edit', query: 'Query' },
    filters: { text: 'Text', number: 'Number', date: 'Date' },
  },
}

const i18n = createI18n({
  legacy: false,
  locale: 'zh-CN',
  fallbackLocale: 'en-US',
  messages,
})

export default i18n