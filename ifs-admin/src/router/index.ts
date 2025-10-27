import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../layouts/BasicLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../pages/BusinessPage.vue'),
        meta: { title: '首页' },
      },
      {
        path: 'business',
        name: 'business',
        component: () => import('../pages/BusinessPage.vue'),
        meta: { title: '业务页面' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router