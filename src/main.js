import { createApp } from 'vue';
import App from './App.vue';
import 'vxe-table/lib/style.css';
import VXETable from 'vxe-table';
import XEUtils from 'xe-utils';
// Make sure vxe-table can find xe-utils
// @ts-ignore
window.XEUtils = XEUtils;
import './plugins/vxe-renderers';
createApp(App).use(VXETable).mount('#app');
