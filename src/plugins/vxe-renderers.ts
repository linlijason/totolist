import { h } from 'vue'
import type { VxeColumnPropTypes, VxeGlobalRendererHandles } from 'vxe-table'
import VXETable from 'vxe-table'
import FilterComplex from '@/renderers/FilterComplex.vue'

// Renderer name constant
export const FILTERS_COMPLEX_INPUT = 'filters-complex-input'

type RenderFilterParams = VxeGlobalRendererHandles.RenderFilterParams

type FilterRule = {
  operator:
    | 'contains'
    | 'notContains'
    | 'equals'
    | 'notEquals'
    | 'startsWith'
    | 'endsWith'
    | 'gt'
    | 'gte'
    | 'lt'
    | 'lte'
    | 'between'
  value?: string | number | Date | null
  valueTo?: string | number | Date | null
}

type ComplexFilterData = {
  matchMode: 'and' | 'or'
  rules: FilterRule[]
}

function getCellValue(row: any, column: any) {
  const field = column.field || column.property
  if (!field) return undefined
  // Support nested fields like a.b.c via simple split
  const segments = String(field).split('.')
  let cur: any = row
  for (const key of segments) {
    if (cur == null) return undefined
    cur = cur[key]
  }
  return cur
}

function toNumber(val: any): number | null {
  if (val === '' || val == null) return null
  const n = Number(val)
  return Number.isFinite(n) ? n : null
}

function toDate(val: any): number | null {
  if (val === '' || val == null) return null
  const t = new Date(val).getTime()
  return Number.isFinite(t) ? t : null
}

function compareByOperator(
  rawCellValue: any,
  rule: FilterRule,
  valueType: 'string' | 'number' | 'date'
): boolean {
  const operator = rule.operator

  if (valueType === 'number') {
    const cellNum = toNumber(rawCellValue)
    const a = toNumber(rule.value)
    const b = toNumber(rule.valueTo)
    if (cellNum == null) return false
    switch (operator) {
      case 'equals':
        return a != null ? cellNum === a : true
      case 'notEquals':
        return a != null ? cellNum !== a : true
      case 'gt':
        return a != null ? cellNum > a : true
      case 'gte':
        return a != null ? cellNum >= a : true
      case 'lt':
        return a != null ? cellNum < a : true
      case 'lte':
        return a != null ? cellNum <= a : true
      case 'between':
        if (a == null && b == null) return true
        if (a == null) return b != null ? cellNum <= b : true
        if (b == null) return cellNum >= a
        return cellNum >= a && cellNum <= b
      default:
        // string operators on number fall back to toString contains
        const s = String(rawCellValue ?? '')
        const query = String(rule.value ?? '')
        if (!query) return true
        if (operator === 'contains') return s.includes(query)
        if (operator === 'notContains') return !s.includes(query)
        if (operator === 'startsWith') return s.startsWith(query)
        if (operator === 'endsWith') return s.endsWith(query)
        return true
    }
  }

  if (valueType === 'date') {
    const cellTs = toDate(rawCellValue)
    const a = toDate(rule.value)
    const b = toDate(rule.valueTo)
    if (cellTs == null) return false
    switch (operator) {
      case 'equals':
        return a != null ? cellTs === a : true
      case 'notEquals':
        return a != null ? cellTs !== a : true
      case 'gt':
        return a != null ? cellTs > a : true
      case 'gte':
        return a != null ? cellTs >= a : true
      case 'lt':
        return a != null ? cellTs < a : true
      case 'lte':
        return a != null ? cellTs <= a : true
      case 'between':
        if (a == null && b == null) return true
        if (a == null) return b != null ? cellTs <= b : true
        if (b == null) return cellTs >= a
        return cellTs >= a && cellTs <= b
      default:
        return true
    }
  }

  // string
  const s = String(rawCellValue ?? '')
  const query = String(rule.value ?? '')
  switch (operator) {
    case 'equals':
      return query ? s === query : true
    case 'notEquals':
      return query ? s !== query : true
    case 'contains':
      return query ? s.includes(query) : true
    case 'notContains':
      return query ? !s.includes(query) : true
    case 'startsWith':
      return query ? s.startsWith(query) : true
    case 'endsWith':
      return query ? s.endsWith(query) : true
    case 'gt':
    case 'gte':
    case 'lt':
    case 'lte':
    case 'between': {
      // try number compare fallback
      const cellNum = toNumber(rawCellValue)
      const a = toNumber(rule.value)
      const b = toNumber(rule.valueTo)
      if (cellNum == null) return false
      if (operator === 'gt') return a != null ? cellNum > a : true
      if (operator === 'gte') return a != null ? cellNum >= a : true
      if (operator === 'lt') return a != null ? cellNum < a : true
      if (operator === 'lte') return a != null ? cellNum <= a : true
      if (a == null && b == null) return true
      if (a == null) return b != null ? cellNum <= b : true
      if (b == null) return cellNum >= a
      return cellNum >= a && cellNum <= b
    }
    default:
      return true
  }
}

VXETable.renderer.add(FILTERS_COMPLEX_INPUT, {
  renderFilter(renderOpts: VxeColumnPropTypes.FilterRender, params: RenderFilterParams) {
    return [h(FilterComplex as any, { params, renderOpts })]
  },
  filterResetMethod({ options }) {
    options.forEach((opt) => {
      const data: ComplexFilterData = {
        matchMode: 'and',
        rules: [
          { operator: 'contains', value: '' },
        ],
      }
      ;(opt as any).data = data
      ;(opt as any).checked = false
    })
  },
  filterMethod({ option, row, column }) {
    const data = (option as any).data as ComplexFilterData
    if (!data || !Array.isArray(data.rules) || data.rules.length === 0) return true

    const valueType = (column as any)?.filterRender?.props?.valueType as
      | 'string'
      | 'number'
      | 'date' | undefined
    const vt = valueType || 'string'

    const results = data.rules.map((rule) => compareByOperator(getCellValue(row, column), rule, vt))
    if (data.matchMode === 'or') return results.some(Boolean)
    return results.every(Boolean)
  },
})