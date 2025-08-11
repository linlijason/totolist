<template>
  <div class="fc-panel">
    <div class="fc-row fc-mode">
      <label class="fc-mode-label">匹配模式</label>
      <vxe-radio-group v-model="model.matchMode" @change="onAnyChange">
        <vxe-radio label="and">AND</vxe-radio>
        <vxe-radio label="or">OR</vxe-radio>
      </vxe-radio-group>
    </div>

    <div class="fc-rules">
      <div class="fc-rule" v-for="(rule, idx) in model.rules" :key="idx">
        <vxe-select v-model="rule.operator" :options="operatorOptions" class="fc-operator" @change="onAnyChange" />

        <template v-if="rule.operator !== 'between'">
          <vxe-input
            v-if="valueType === 'number'"
            v-model.number="(rule as any).value"
            class="fc-input"
            type="number"
            placeholder="值"
            @input="onAnyChange"
          />
          <vxe-input
            v-else-if="valueType === 'date'"
            v-model="(rule as any).value"
            class="fc-input"
            type="date"
            placeholder="日期"
            @input="onAnyChange"
          />
          <vxe-input
            v-else
            v-model="(rule as any).value"
            class="fc-input"
            placeholder="值"
            @input="onAnyChange"
          />
        </template>

        <template v-else>
          <vxe-input
            v-if="valueType === 'number'"
            v-model.number="(rule as any).value"
            class="fc-input"
            type="number"
            placeholder="起始值"
            @input="onAnyChange"
          />
          <vxe-input
            v-else-if="valueType === 'date'"
            v-model="(rule as any).value"
            class="fc-input"
            type="date"
            placeholder="起始日期"
            @input="onAnyChange"
          />
          <vxe-input
            v-else
            v-model="(rule as any).value"
            class="fc-input"
            placeholder="起始值"
            @input="onAnyChange"
          />
          <span class="fc-between-sep">~</span>
          <vxe-input
            v-if="valueType === 'number'"
            v-model.number="(rule as any).valueTo"
            class="fc-input"
            type="number"
            placeholder="结束值"
            @input="onAnyChange"
          />
          <vxe-input
            v-else-if="valueType === 'date'"
            v-model="(rule as any).valueTo"
            class="fc-input"
            type="date"
            placeholder="结束日期"
            @input="onAnyChange"
          />
          <vxe-input
            v-else
            v-model="(rule as any).valueTo"
            class="fc-input"
            placeholder="结束值"
            @input="onAnyChange"
          />
        </template>

        <vxe-button status="danger" class="fc-remove" @click="removeRule(idx)" :disabled="model.rules.length === 1">删除</vxe-button>
      </div>
    </div>

    <div class="fc-actions">
      <vxe-button size="small" @click="addRule">新增条件</vxe-button>
      <div class="fc-spacer"></div>
      <vxe-button size="small" @click="reset">重置</vxe-button>
      <vxe-button size="small" status="primary" @click="confirm">确认</vxe-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, watch } from 'vue'
import type { VxeGlobalRendererHandles } from 'vxe-table'

const props = defineProps<{ params: VxeGlobalRendererHandles.RenderFilterParams; renderOpts: any }>()

const option = computed(() => props.params.column.filters![0])
const valueType = computed<'string' | 'number' | 'date'>(() => props.renderOpts?.props?.valueType ?? 'string')

const model = reactive<{ matchMode: 'and' | 'or'; rules: any[] }>(
  (option.value.data as any) ?? {
    matchMode: 'and',
    rules: [
      { operator: valueType.value === 'string' ? 'contains' : 'equals', value: '', valueTo: '' },
    ],
  }
)

const operatorOptions = computed(() => {
  if (valueType.value === 'string') {
    return [
      { label: '包含', value: 'contains' },
      { label: '不包含', value: 'notContains' },
      { label: '等于', value: 'equals' },
      { label: '不等于', value: 'notEquals' },
      { label: '开头为', value: 'startsWith' },
      { label: '结尾为', value: 'endsWith' },
    ]
  }
  return [
    { label: '等于', value: 'equals' },
    { label: '不等于', value: 'notEquals' },
    { label: '大于', value: 'gt' },
    { label: '大于等于', value: 'gte' },
    { label: '小于', value: 'lt' },
    { label: '小于等于', value: 'lte' },
    { label: '区间', value: 'between' },
  ]
})

function syncOption() {
  option.value.data = JSON.parse(JSON.stringify(model))
  const checked = hasAnyEffectiveCondition()
  props.params.$panel!.changeOption!(null as any, checked, option.value)
}

function hasAnyEffectiveCondition() {
  return model.rules.some((r) => {
    if (r.operator === 'between') return r.value !== '' || r.valueTo !== ''
    return r.value !== '' && r.value !== null && r.value !== undefined
  })
}

function onAnyChange() {
  syncOption()
}

function addRule() {
  model.rules.push({ operator: operatorOptions.value[0].value, value: '', valueTo: '' })
  syncOption()
}

function removeRule(idx: number) {
  if (model.rules.length <= 1) return
  model.rules.splice(idx, 1)
  syncOption()
}

function confirm() {
  props.params.$panel!.confirmFilter!()
}

function reset() {
  props.params.$panel!.resetFilter!()
}

watch(
  () => props.params.column,
  () => {
    // ensure local model follows external option.data when column changes
    const d = option.value.data as any
    if (d) {
      model.matchMode = d.matchMode
      model.rules.splice(0, model.rules.length, ...d.rules)
    }
  }
)
</script>

<style scoped>
.fc-panel {
  width: 360px;
  padding: 10px 12px 12px;
}
.fc-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.fc-mode {
  margin-bottom: 8px;
}
.fc-mode-label {
  color: #666;
  font-size: 12px;
}
.fc-rules {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.fc-rule {
  display: flex;
  align-items: center;
  gap: 8px;
}
.fc-operator { width: 120px; }
.fc-input { width: 120px; }
.fc-between-sep { color: #999; }
.fc-remove { margin-left: 4px; }
.fc-actions {
  margin-top: 10px;
  display: flex;
  align-items: center;
}
.fc-spacer { flex: 1; }
</style>