import { ref } from 'vue';
const rows = ref([
    { id: 1, name: '张三', age: 22, score: 78, joinDate: '2023-03-08', dept: '研发' },
    { id: 2, name: '李四', age: 19, score: 88, joinDate: '2022-11-12', dept: '产品' },
    { id: 3, name: '王五', age: 28, score: 59, joinDate: '2021-01-26', dept: '测试' },
    { id: 4, name: '赵六', age: 17, score: 92, joinDate: '2024-06-01', dept: '研发' },
    { id: 5, name: '钱七', age: 31, score: 67, joinDate: '2020-08-16', dept: '运维' },
    { id: 6, name: '孙八', age: 26, score: 95, joinDate: '2019-05-09', dept: '产品' },
    { id: 7, name: '周九', age: 24, score: 83, joinDate: '2023-12-24', dept: '测试' },
    { id: 8, name: '吴十', age: 21, score: 76, joinDate: '2018-09-30', dept: '研发' },
]);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "wrap" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
const __VLS_0 = {}.VxeTable;
/** @type {[typeof __VLS_components.VxeTable, typeof __VLS_components.vxeTable, typeof __VLS_components.VxeTable, typeof __VLS_components.vxeTable, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    data: (__VLS_ctx.rows),
    border: true,
    height: "560",
    columnConfig: ({ resizable: true }),
}));
const __VLS_2 = __VLS_1({
    data: (__VLS_ctx.rows),
    border: true,
    height: "560",
    columnConfig: ({ resizable: true }),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
const __VLS_4 = {}.VxeColumn;
/** @type {[typeof __VLS_components.VxeColumn, typeof __VLS_components.vxeColumn, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    type: "seq",
    width: "60",
}));
const __VLS_6 = __VLS_5({
    type: "seq",
    width: "60",
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
const __VLS_8 = {}.VxeColumn;
/** @type {[typeof __VLS_components.VxeColumn, typeof __VLS_components.vxeColumn, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    field: "name",
    title: "姓名",
    filters: ([{ data: { matchMode: 'and', rules: [{ operator: 'contains', value: '' }] } }]),
    filterRender: ({ name: 'filters-complex-input', props: { valueType: 'string' } }),
    minWidth: "160",
}));
const __VLS_10 = __VLS_9({
    field: "name",
    title: "姓名",
    filters: ([{ data: { matchMode: 'and', rules: [{ operator: 'contains', value: '' }] } }]),
    filterRender: ({ name: 'filters-complex-input', props: { valueType: 'string' } }),
    minWidth: "160",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
const __VLS_12 = {}.VxeColumn;
/** @type {[typeof __VLS_components.VxeColumn, typeof __VLS_components.vxeColumn, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    field: "age",
    title: "年龄",
    filters: ([{ data: { matchMode: 'or', rules: [{ operator: 'gte', value: 18 }] } }]),
    filterRender: ({ name: 'filters-complex-input', props: { valueType: 'number' } }),
    width: "140",
}));
const __VLS_14 = __VLS_13({
    field: "age",
    title: "年龄",
    filters: ([{ data: { matchMode: 'or', rules: [{ operator: 'gte', value: 18 }] } }]),
    filterRender: ({ name: 'filters-complex-input', props: { valueType: 'number' } }),
    width: "140",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
const __VLS_16 = {}.VxeColumn;
/** @type {[typeof __VLS_components.VxeColumn, typeof __VLS_components.vxeColumn, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    field: "score",
    title: "分数",
    filters: ([{ data: { matchMode: 'and', rules: [{ operator: 'between', value: 60, valueTo: 90 }] } }]),
    filterRender: ({ name: 'filters-complex-input', props: { valueType: 'number' } }),
    width: "180",
}));
const __VLS_18 = __VLS_17({
    field: "score",
    title: "分数",
    filters: ([{ data: { matchMode: 'and', rules: [{ operator: 'between', value: 60, valueTo: 90 }] } }]),
    filterRender: ({ name: 'filters-complex-input', props: { valueType: 'number' } }),
    width: "180",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
const __VLS_20 = {}.VxeColumn;
/** @type {[typeof __VLS_components.VxeColumn, typeof __VLS_components.vxeColumn, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    field: "joinDate",
    title: "入职日期",
    filters: ([{ data: { matchMode: 'and', rules: [{ operator: 'between', value: '', valueTo: '' }] } }]),
    filterRender: ({ name: 'filters-complex-input', props: { valueType: 'date' } }),
    minWidth: "200",
}));
const __VLS_22 = __VLS_21({
    field: "joinDate",
    title: "入职日期",
    filters: ([{ data: { matchMode: 'and', rules: [{ operator: 'between', value: '', valueTo: '' }] } }]),
    filterRender: ({ name: 'filters-complex-input', props: { valueType: 'date' } }),
    minWidth: "200",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
const __VLS_24 = {}.VxeColumn;
/** @type {[typeof __VLS_components.VxeColumn, typeof __VLS_components.vxeColumn, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    field: "dept",
    title: "部门",
    filters: ([{ data: { matchMode: 'or', rules: [{ operator: 'equals', value: '研发' }] } }]),
    filterRender: ({ name: 'filters-complex-input', props: { valueType: 'string' } }),
    minWidth: "140",
}));
const __VLS_26 = __VLS_25({
    field: "dept",
    title: "部门",
    filters: ([{ data: { matchMode: 'or', rules: [{ operator: 'equals', value: '研发' }] } }]),
    filterRender: ({ name: 'filters-complex-input', props: { valueType: 'string' } }),
    minWidth: "140",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['wrap']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            rows: rows,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
