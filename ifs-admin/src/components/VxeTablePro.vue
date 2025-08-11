<script setup lang="ts">
import { ref, watch } from 'vue'
import type { VxeTableInstance, VxeColumnProps } from 'vxe-table'

interface RecordItem {
  [key: string]: any
}

const props = defineProps<{
  columns: VxeColumnProps[]
  data: RecordItem[]
}>()

const tableRef = ref<VxeTableInstance>()
const pager = ref({ currentPage: 1, pageSize: 10, total: 0 })

watch(() => props.data, (list) => {
  pager.value.total = list?.length || 0
}, { immediate: true })

function handleMenuClick({ menu, column }: any) {
  const $table = tableRef.value
  if (!$table) return
  if (menu.code === 'SORT_ASC') {
    $table.sort(column, 'asc')
  } else if (menu.code === 'SORT_DESC') {
    $table.sort(column, 'desc')
  } else if (menu.code === 'FIX_LEFT') {
    $table.setColumnFixed(column, 'left')
  } else if (menu.code === 'FIX_RIGHT') {
    $table.setColumnFixed(column, 'right')
  } else if (menu.code === 'FIX_NONE') {
    $table.setColumnFixed(column, null)
  } else if (menu.code === 'HIDE_COL') {
    $table.hideColumn(column)
  }
}

function handlePageChange({ currentPage, pageSize }: any) {
  pager.value.currentPage = currentPage
  pager.value.pageSize = pageSize
}
</script>

<template>
  <div>
    <vxe-toolbar :custom="true" :refresh="false" :zoom="false" :perfect="true" />

    <vxe-table
      ref="tableRef"
      border
      stripe
      show-overflow
      resizable
      :data="data"
      :edit-config="{ trigger: 'click', mode: 'row' }"
      :column-config="{ resizable: true, isHover: true }"
      :custom-config="{ storage: true }"
      :sort-config="{ multiple: false, trigger: 'cell' }"
      :menu-config="{
        header: {
          options: [
            [
              { code: 'SORT_ASC', name: '升序' },
              { code: 'SORT_DESC', name: '降序' },
            ],
            [
              { code: 'FIX_LEFT', name: '冻结到左侧' },
              { code: 'FIX_RIGHT', name: '冻结到右侧' },
              { code: 'FIX_NONE', name: '取消冻结' },
              { code: 'HIDE_COL', name: '隐藏该列' },
            ],
          ],
        },
      }"
      @menu-click="handleMenuClick"
    >
      <vxe-column type="seq" width="60" title="#" fixed="left" />
      <vxe-column v-for="col in columns" :key="String(col.field)" v-bind="col" :edit-render="col.editRender || { name: 'input' }" />
    </vxe-table>

    <div class="mt-3 flex justify-end">
      <vxe-pager
        :current-page="pager.currentPage"
        :page-size="pager.pageSize"
        :total="pager.total"
        :page-sizes="[10, 20, 50, 100]"
        @page-change="handlePageChange"
      />
    </div>
  </div>
</template>