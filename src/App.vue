<template>
  <div class="wrap">
    <h2>filters-complex-input - 全部效果演示</h2>

    <vxe-table :data="rows" border height="560" :column-config="{ resizable: true }">
      <vxe-column type="seq" width="60" />

      <vxe-column field="name" title="姓名"
                  :filters="[{ data: { matchMode: 'and', rules: [{ operator: 'contains', value: '' }] } }]"
                  :filter-render="{ name: 'filters-complex-input', props: { valueType: 'string' } }"
                  min-width="160" />

      <vxe-column field="age" title="年龄"
                  :filters="[{ data: { matchMode: 'or', rules: [{ operator: 'gte', value: 18 }] } }]"
                  :filter-render="{ name: 'filters-complex-input', props: { valueType: 'number' } }"
                  width="140" />

      <vxe-column field="score" title="分数"
                  :filters="[{ data: { matchMode: 'and', rules: [{ operator: 'between', value: 60, valueTo: 90 }] } }]"
                  :filter-render="{ name: 'filters-complex-input', props: { valueType: 'number' } }"
                  width="180" />

      <vxe-column field="joinDate" title="入职日期"
                  :filters="[{ data: { matchMode: 'and', rules: [{ operator: 'between', value: '', valueTo: '' }] } }]"
                  :filter-render="{ name: 'filters-complex-input', props: { valueType: 'date' } }"
                  min-width="200" />

      <vxe-column field="dept" title="部门"
                  :filters="[{ data: { matchMode: 'or', rules: [{ operator: 'equals', value: '研发' }] } }]"
                  :filter-render="{ name: 'filters-complex-input', props: { valueType: 'string' } }"
                  min-width="140" />
    </vxe-table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

type Row = {
  id: number
  name: string
  age: number
  score: number
  joinDate: string
  dept: string
}

const rows = ref<Row[]>([
  { id: 1, name: '张三', age: 22, score: 78, joinDate: '2023-03-08', dept: '研发' },
  { id: 2, name: '李四', age: 19, score: 88, joinDate: '2022-11-12', dept: '产品' },
  { id: 3, name: '王五', age: 28, score: 59, joinDate: '2021-01-26', dept: '测试' },
  { id: 4, name: '赵六', age: 17, score: 92, joinDate: '2024-06-01', dept: '研发' },
  { id: 5, name: '钱七', age: 31, score: 67, joinDate: '2020-08-16', dept: '运维' },
  { id: 6, name: '孙八', age: 26, score: 95, joinDate: '2019-05-09', dept: '产品' },
  { id: 7, name: '周九', age: 24, score: 83, joinDate: '2023-12-24', dept: '测试' },
  { id: 8, name: '吴十', age: 21, score: 76, joinDate: '2018-09-30', dept: '研发' },
])
</script>

<style>
html, body, #app { height: 100%; }
body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"; }
.wrap { padding: 16px; }
</style>