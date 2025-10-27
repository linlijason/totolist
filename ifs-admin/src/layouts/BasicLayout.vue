<script setup lang="ts">
import { h, ref, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const collapsed = ref(false)
const route = useRoute()
const { locale, t } = useI18n()

const menuItems = computed(() => [
  { key: '/business', label: () => h(RouterLink, { to: '/business' }, { default: () => t('menu.business') }), icon: null },
])

const selectedKeys = computed(() => [route.path === '/' ? '/business' : route.path])

const breadcrumbItems = computed(() => route.matched.map(r => ({
  path: r.path,
  title: (r.meta?.title as string) || (r.name as string) || r.path,
})).filter(i => i.path !== '/'))

function changeLang(next: string) {
  locale.value = next
}

function onLangMenuClick(info: { key: string | number }) {
  changeLang(String(info.key))
}
</script>

<template>
  <a-layout h="100%" class="h-100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible :width="220">
      <div class="px-3 py-3 text-center text-16 font-600">IFS Admin</div>
      <a-menu theme="dark" mode="inline" :items="menuItems" :selectedKeys="selectedKeys" />
    </a-layout-sider>

    <a-layout>
      <a-layout-header class="flex items-center justify-between" :style="{ height: 'var(--header-height)' }">
        <div class="flex-1"></div>
        <div class="flex items-center gap-3">
          <a-dropdown>
            <a-avatar style="cursor: pointer" src="https://avatars.githubusercontent.com/u/000?v=4" />
            <template #overlay>
              <a-menu @click="onLangMenuClick">
                <a-menu-item key="zh-CN">简体中文</a-menu-item>
                <a-menu-item key="en-US">English</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>

      <a-layout-content class="p-4">
        <a-breadcrumb class="mb-4">
          <a-breadcrumb-item v-for="item in breadcrumbItems" :key="item.path">
            {{ item.title }}
          </a-breadcrumb-item>
        </a-breadcrumb>
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.h-100vh { height: 100vh; }
</style>