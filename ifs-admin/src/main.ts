import { createApp } from 'vue'
import './style.css'
import 'uno.css'
import App from './App.vue'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

import router from './router'
import i18n from './plugins/i18n'

const app = createApp(App)
app.use(Antd)
app.use(VXETable)
app.use(router)
app.use(i18n)
app.mount('#app')
