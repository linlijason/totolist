<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import VxeTablePro from '../components/VxeTablePro.vue'

const { t } = useI18n()

const selectValue = ref('A')
const options = [
  { label: 'A 类', value: 'A' },
  { label: 'B 类', value: 'B' },
]

const queryVisible = ref(false)
const queryForm = ref({
  text: '',
  number: undefined as undefined | number,
  date: undefined as any,
})

const baseColumns = [
  { field: 'name', title: '姓名', sortable: true, filters: [{ data: '' }], minWidth: 140 },
  { field: 'age', title: '年龄', sortable: true, minWidth: 120 },
  { field: 'address', title: '地址', minWidth: 200 },
]

const columnsTab1 = computed(() => baseColumns.map(c => ({ ...c, editRender: { name: 'input' } })))
const columnsTab2 = computed(() => baseColumns.map(c => ({ ...c, editRender: { name: 'input' } })))

const dataTab1 = ref(Array.from({ length: 37 }).map((_, i) => ({
  id: i + 1,
  name: `张三 ${i + 1}`,
  age: 20 + (i % 10),
  address: `上海市黄浦区外滩 ${i + 1} 号`,
})))

const dataTab2 = ref(Array.from({ length: 53 }).map((_, i) => ({
  id: i + 1,
  name: `李四 ${i + 1}`,
  age: 25 + (i % 10),
  address: `北京市朝阳区国贸 ${i + 1} 号`,
})))

function onCreate() {}
function onEdit() {}
function onQuery() { queryVisible.value = true }
function onQueryOk() {
  // 模拟查询
  queryVisible.value = false
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-3">
      <a-select v-model:value="selectValue" style="width: 160px" :options="options" />
      <a-space>
        <a-button type="primary" @click="onCreate">{{ t('actions.create') }}</a-button>
        <a-button @click="onEdit">{{ t('actions.edit') }}</a-button>
        <a-button @click="onQuery">{{ t('actions.query') }}</a-button>
      </a-space>
    </div>

    <a-modal v-model:open="queryVisible" title="查询条件" @ok="onQueryOk">
      <a-form :model="queryForm" label-col="{ span: 6 }" wrapper-col="{ span: 16 }">
        <a-form-item :label="t('filters.text')">
          <a-input v-model:value="queryForm.text" allow-clear />
        </a-form-item>
        <a-form-item :label="t('filters.number')">
          <a-input-number v-model:value="queryForm.number" style="width: 100%" />
        </a-form-item>
        <a-form-item :label="t('filters.date')">
          <a-date-picker v-model:value="queryForm.date" style="width: 100%" />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-tabs type="card">
      <a-tab-pane key="1" tab="Tab 1">
        <VxeTablePro :columns="columnsTab1" :data="dataTab1" />
      </a-tab-pane>
      <a-tab-pane key="2" tab="Tab 2">
        <VxeTablePro :columns="columnsTab2" :data="dataTab2" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>