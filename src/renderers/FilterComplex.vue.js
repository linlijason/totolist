import { computed, reactive, watch } from 'vue';
const props = defineProps();
const option = computed(() => props.params.column.filters[0]);
const valueType = computed(() => props.renderOpts?.props?.valueType ?? 'string');
const model = reactive(option.value.data ?? {
    matchMode: 'and',
    rules: [
        { operator: valueType.value === 'string' ? 'contains' : 'equals', value: '', valueTo: '' },
    ],
});
const operatorOptions = computed(() => {
    if (valueType.value === 'string') {
        return [
            { label: '包含', value: 'contains' },
            { label: '不包含', value: 'notContains' },
            { label: '等于', value: 'equals' },
            { label: '不等于', value: 'notEquals' },
            { label: '开头为', value: 'startsWith' },
            { label: '结尾为', value: 'endsWith' },
        ];
    }
    return [
        { label: '等于', value: 'equals' },
        { label: '不等于', value: 'notEquals' },
        { label: '大于', value: 'gt' },
        { label: '大于等于', value: 'gte' },
        { label: '小于', value: 'lt' },
        { label: '小于等于', value: 'lte' },
        { label: '区间', value: 'between' },
    ];
});
function syncOption() {
    option.value.data = JSON.parse(JSON.stringify(model));
    const checked = hasAnyEffectiveCondition();
    props.params.$panel.changeOption(null, checked, option.value);
}
function hasAnyEffectiveCondition() {
    return model.rules.some((r) => {
        if (r.operator === 'between')
            return r.value !== '' || r.valueTo !== '';
        return r.value !== '' && r.value !== null && r.value !== undefined;
    });
}
function onAnyChange() {
    syncOption();
}
function addRule() {
    model.rules.push({ operator: operatorOptions.value[0].value, value: '', valueTo: '' });
    syncOption();
}
function removeRule(idx) {
    if (model.rules.length <= 1)
        return;
    model.rules.splice(idx, 1);
    syncOption();
}
function confirm() {
    props.params.$panel.confirmFilter();
}
function reset() {
    props.params.$panel.resetFilter();
}
watch(() => props.params.column, () => {
    // ensure local model follows external option.data when column changes
    const d = option.value.data;
    if (d) {
        model.matchMode = d.matchMode;
        model.rules.splice(0, model.rules.length, ...d.rules);
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "fc-panel" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "fc-row fc-mode" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "fc-mode-label" },
});
const __VLS_0 = {}.VxeRadioGroup;
/** @type {[typeof __VLS_components.VxeRadioGroup, typeof __VLS_components.vxeRadioGroup, typeof __VLS_components.VxeRadioGroup, typeof __VLS_components.vxeRadioGroup, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.model.matchMode),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.model.matchMode),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onChange: (__VLS_ctx.onAnyChange)
};
__VLS_3.slots.default;
const __VLS_8 = {}.VxeRadio;
/** @type {[typeof __VLS_components.VxeRadio, typeof __VLS_components.vxeRadio, typeof __VLS_components.VxeRadio, typeof __VLS_components.vxeRadio, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    label: "and",
}));
const __VLS_10 = __VLS_9({
    label: "and",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
var __VLS_11;
const __VLS_12 = {}.VxeRadio;
/** @type {[typeof __VLS_components.VxeRadio, typeof __VLS_components.vxeRadio, typeof __VLS_components.VxeRadio, typeof __VLS_components.vxeRadio, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    label: "or",
}));
const __VLS_14 = __VLS_13({
    label: "or",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_15.slots.default;
var __VLS_15;
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "fc-rules" },
});
for (const [rule, idx] of __VLS_getVForSourceType((__VLS_ctx.model.rules))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "fc-rule" },
        key: (idx),
    });
    const __VLS_16 = {}.VxeSelect;
    /** @type {[typeof __VLS_components.VxeSelect, typeof __VLS_components.vxeSelect, ]} */ ;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
        ...{ 'onChange': {} },
        modelValue: (rule.operator),
        options: (__VLS_ctx.operatorOptions),
        ...{ class: "fc-operator" },
    }));
    const __VLS_18 = __VLS_17({
        ...{ 'onChange': {} },
        modelValue: (rule.operator),
        options: (__VLS_ctx.operatorOptions),
        ...{ class: "fc-operator" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    let __VLS_20;
    let __VLS_21;
    let __VLS_22;
    const __VLS_23 = {
        onChange: (__VLS_ctx.onAnyChange)
    };
    var __VLS_19;
    if (rule.operator !== 'between') {
        if (__VLS_ctx.valueType === 'number') {
            const __VLS_24 = {}.VxeInput;
            /** @type {[typeof __VLS_components.VxeInput, typeof __VLS_components.vxeInput, ]} */ ;
            // @ts-ignore
            const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
                ...{ 'onInput': {} },
                modelValue: (rule.value),
                modelModifiers: { number: true, },
                ...{ class: "fc-input" },
                type: "number",
                placeholder: "值",
            }));
            const __VLS_26 = __VLS_25({
                ...{ 'onInput': {} },
                modelValue: (rule.value),
                modelModifiers: { number: true, },
                ...{ class: "fc-input" },
                type: "number",
                placeholder: "值",
            }, ...__VLS_functionalComponentArgsRest(__VLS_25));
            let __VLS_28;
            let __VLS_29;
            let __VLS_30;
            const __VLS_31 = {
                onInput: (__VLS_ctx.onAnyChange)
            };
            var __VLS_27;
        }
        else if (__VLS_ctx.valueType === 'date') {
            const __VLS_32 = {}.VxeInput;
            /** @type {[typeof __VLS_components.VxeInput, typeof __VLS_components.vxeInput, ]} */ ;
            // @ts-ignore
            const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
                ...{ 'onInput': {} },
                modelValue: (rule.value),
                ...{ class: "fc-input" },
                type: "date",
                placeholder: "日期",
            }));
            const __VLS_34 = __VLS_33({
                ...{ 'onInput': {} },
                modelValue: (rule.value),
                ...{ class: "fc-input" },
                type: "date",
                placeholder: "日期",
            }, ...__VLS_functionalComponentArgsRest(__VLS_33));
            let __VLS_36;
            let __VLS_37;
            let __VLS_38;
            const __VLS_39 = {
                onInput: (__VLS_ctx.onAnyChange)
            };
            var __VLS_35;
        }
        else {
            const __VLS_40 = {}.VxeInput;
            /** @type {[typeof __VLS_components.VxeInput, typeof __VLS_components.vxeInput, ]} */ ;
            // @ts-ignore
            const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
                ...{ 'onInput': {} },
                modelValue: (rule.value),
                ...{ class: "fc-input" },
                placeholder: "值",
            }));
            const __VLS_42 = __VLS_41({
                ...{ 'onInput': {} },
                modelValue: (rule.value),
                ...{ class: "fc-input" },
                placeholder: "值",
            }, ...__VLS_functionalComponentArgsRest(__VLS_41));
            let __VLS_44;
            let __VLS_45;
            let __VLS_46;
            const __VLS_47 = {
                onInput: (__VLS_ctx.onAnyChange)
            };
            var __VLS_43;
        }
    }
    else {
        if (__VLS_ctx.valueType === 'number') {
            const __VLS_48 = {}.VxeInput;
            /** @type {[typeof __VLS_components.VxeInput, typeof __VLS_components.vxeInput, ]} */ ;
            // @ts-ignore
            const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
                ...{ 'onInput': {} },
                modelValue: (rule.value),
                modelModifiers: { number: true, },
                ...{ class: "fc-input" },
                type: "number",
                placeholder: "起始值",
            }));
            const __VLS_50 = __VLS_49({
                ...{ 'onInput': {} },
                modelValue: (rule.value),
                modelModifiers: { number: true, },
                ...{ class: "fc-input" },
                type: "number",
                placeholder: "起始值",
            }, ...__VLS_functionalComponentArgsRest(__VLS_49));
            let __VLS_52;
            let __VLS_53;
            let __VLS_54;
            const __VLS_55 = {
                onInput: (__VLS_ctx.onAnyChange)
            };
            var __VLS_51;
        }
        else if (__VLS_ctx.valueType === 'date') {
            const __VLS_56 = {}.VxeInput;
            /** @type {[typeof __VLS_components.VxeInput, typeof __VLS_components.vxeInput, ]} */ ;
            // @ts-ignore
            const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
                ...{ 'onInput': {} },
                modelValue: (rule.value),
                ...{ class: "fc-input" },
                type: "date",
                placeholder: "起始日期",
            }));
            const __VLS_58 = __VLS_57({
                ...{ 'onInput': {} },
                modelValue: (rule.value),
                ...{ class: "fc-input" },
                type: "date",
                placeholder: "起始日期",
            }, ...__VLS_functionalComponentArgsRest(__VLS_57));
            let __VLS_60;
            let __VLS_61;
            let __VLS_62;
            const __VLS_63 = {
                onInput: (__VLS_ctx.onAnyChange)
            };
            var __VLS_59;
        }
        else {
            const __VLS_64 = {}.VxeInput;
            /** @type {[typeof __VLS_components.VxeInput, typeof __VLS_components.vxeInput, ]} */ ;
            // @ts-ignore
            const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
                ...{ 'onInput': {} },
                modelValue: (rule.value),
                ...{ class: "fc-input" },
                placeholder: "起始值",
            }));
            const __VLS_66 = __VLS_65({
                ...{ 'onInput': {} },
                modelValue: (rule.value),
                ...{ class: "fc-input" },
                placeholder: "起始值",
            }, ...__VLS_functionalComponentArgsRest(__VLS_65));
            let __VLS_68;
            let __VLS_69;
            let __VLS_70;
            const __VLS_71 = {
                onInput: (__VLS_ctx.onAnyChange)
            };
            var __VLS_67;
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "fc-between-sep" },
        });
        if (__VLS_ctx.valueType === 'number') {
            const __VLS_72 = {}.VxeInput;
            /** @type {[typeof __VLS_components.VxeInput, typeof __VLS_components.vxeInput, ]} */ ;
            // @ts-ignore
            const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
                ...{ 'onInput': {} },
                modelValue: (rule.valueTo),
                modelModifiers: { number: true, },
                ...{ class: "fc-input" },
                type: "number",
                placeholder: "结束值",
            }));
            const __VLS_74 = __VLS_73({
                ...{ 'onInput': {} },
                modelValue: (rule.valueTo),
                modelModifiers: { number: true, },
                ...{ class: "fc-input" },
                type: "number",
                placeholder: "结束值",
            }, ...__VLS_functionalComponentArgsRest(__VLS_73));
            let __VLS_76;
            let __VLS_77;
            let __VLS_78;
            const __VLS_79 = {
                onInput: (__VLS_ctx.onAnyChange)
            };
            var __VLS_75;
        }
        else if (__VLS_ctx.valueType === 'date') {
            const __VLS_80 = {}.VxeInput;
            /** @type {[typeof __VLS_components.VxeInput, typeof __VLS_components.vxeInput, ]} */ ;
            // @ts-ignore
            const __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({
                ...{ 'onInput': {} },
                modelValue: (rule.valueTo),
                ...{ class: "fc-input" },
                type: "date",
                placeholder: "结束日期",
            }));
            const __VLS_82 = __VLS_81({
                ...{ 'onInput': {} },
                modelValue: (rule.valueTo),
                ...{ class: "fc-input" },
                type: "date",
                placeholder: "结束日期",
            }, ...__VLS_functionalComponentArgsRest(__VLS_81));
            let __VLS_84;
            let __VLS_85;
            let __VLS_86;
            const __VLS_87 = {
                onInput: (__VLS_ctx.onAnyChange)
            };
            var __VLS_83;
        }
        else {
            const __VLS_88 = {}.VxeInput;
            /** @type {[typeof __VLS_components.VxeInput, typeof __VLS_components.vxeInput, ]} */ ;
            // @ts-ignore
            const __VLS_89 = __VLS_asFunctionalComponent(__VLS_88, new __VLS_88({
                ...{ 'onInput': {} },
                modelValue: (rule.valueTo),
                ...{ class: "fc-input" },
                placeholder: "结束值",
            }));
            const __VLS_90 = __VLS_89({
                ...{ 'onInput': {} },
                modelValue: (rule.valueTo),
                ...{ class: "fc-input" },
                placeholder: "结束值",
            }, ...__VLS_functionalComponentArgsRest(__VLS_89));
            let __VLS_92;
            let __VLS_93;
            let __VLS_94;
            const __VLS_95 = {
                onInput: (__VLS_ctx.onAnyChange)
            };
            var __VLS_91;
        }
    }
    const __VLS_96 = {}.VxeButton;
    /** @type {[typeof __VLS_components.VxeButton, typeof __VLS_components.vxeButton, typeof __VLS_components.VxeButton, typeof __VLS_components.vxeButton, ]} */ ;
    // @ts-ignore
    const __VLS_97 = __VLS_asFunctionalComponent(__VLS_96, new __VLS_96({
        ...{ 'onClick': {} },
        status: "danger",
        ...{ class: "fc-remove" },
        disabled: (__VLS_ctx.model.rules.length === 1),
    }));
    const __VLS_98 = __VLS_97({
        ...{ 'onClick': {} },
        status: "danger",
        ...{ class: "fc-remove" },
        disabled: (__VLS_ctx.model.rules.length === 1),
    }, ...__VLS_functionalComponentArgsRest(__VLS_97));
    let __VLS_100;
    let __VLS_101;
    let __VLS_102;
    const __VLS_103 = {
        onClick: (...[$event]) => {
            __VLS_ctx.removeRule(idx);
        }
    };
    __VLS_99.slots.default;
    var __VLS_99;
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "fc-actions" },
});
const __VLS_104 = {}.VxeButton;
/** @type {[typeof __VLS_components.VxeButton, typeof __VLS_components.vxeButton, typeof __VLS_components.VxeButton, typeof __VLS_components.vxeButton, ]} */ ;
// @ts-ignore
const __VLS_105 = __VLS_asFunctionalComponent(__VLS_104, new __VLS_104({
    ...{ 'onClick': {} },
    size: "small",
}));
const __VLS_106 = __VLS_105({
    ...{ 'onClick': {} },
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_105));
let __VLS_108;
let __VLS_109;
let __VLS_110;
const __VLS_111 = {
    onClick: (__VLS_ctx.addRule)
};
__VLS_107.slots.default;
var __VLS_107;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "fc-spacer" },
});
const __VLS_112 = {}.VxeButton;
/** @type {[typeof __VLS_components.VxeButton, typeof __VLS_components.vxeButton, typeof __VLS_components.VxeButton, typeof __VLS_components.vxeButton, ]} */ ;
// @ts-ignore
const __VLS_113 = __VLS_asFunctionalComponent(__VLS_112, new __VLS_112({
    ...{ 'onClick': {} },
    size: "small",
}));
const __VLS_114 = __VLS_113({
    ...{ 'onClick': {} },
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_113));
let __VLS_116;
let __VLS_117;
let __VLS_118;
const __VLS_119 = {
    onClick: (__VLS_ctx.reset)
};
__VLS_115.slots.default;
var __VLS_115;
const __VLS_120 = {}.VxeButton;
/** @type {[typeof __VLS_components.VxeButton, typeof __VLS_components.vxeButton, typeof __VLS_components.VxeButton, typeof __VLS_components.vxeButton, ]} */ ;
// @ts-ignore
const __VLS_121 = __VLS_asFunctionalComponent(__VLS_120, new __VLS_120({
    ...{ 'onClick': {} },
    size: "small",
    status: "primary",
}));
const __VLS_122 = __VLS_121({
    ...{ 'onClick': {} },
    size: "small",
    status: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_121));
let __VLS_124;
let __VLS_125;
let __VLS_126;
const __VLS_127 = {
    onClick: (__VLS_ctx.confirm)
};
__VLS_123.slots.default;
var __VLS_123;
/** @type {__VLS_StyleScopedClasses['fc-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['fc-row']} */ ;
/** @type {__VLS_StyleScopedClasses['fc-mode']} */ ;
/** @type {__VLS_StyleScopedClasses['fc-mode-label']} */ ;
/** @type {__VLS_StyleScopedClasses['fc-rules']} */ ;
/** @type {__VLS_StyleScopedClasses['fc-rule']} */ ;
/** @type {__VLS_StyleScopedClasses['fc-operator']} */ ;
/** @type {__VLS_StyleScopedClasses['fc-input']} */ ;
/** @type {__VLS_StyleScopedClasses['fc-input']} */ ;
/** @type {__VLS_StyleScopedClasses['fc-input']} */ ;
/** @type {__VLS_StyleScopedClasses['fc-input']} */ ;
/** @type {__VLS_StyleScopedClasses['fc-input']} */ ;
/** @type {__VLS_StyleScopedClasses['fc-input']} */ ;
/** @type {__VLS_StyleScopedClasses['fc-between-sep']} */ ;
/** @type {__VLS_StyleScopedClasses['fc-input']} */ ;
/** @type {__VLS_StyleScopedClasses['fc-input']} */ ;
/** @type {__VLS_StyleScopedClasses['fc-input']} */ ;
/** @type {__VLS_StyleScopedClasses['fc-remove']} */ ;
/** @type {__VLS_StyleScopedClasses['fc-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['fc-spacer']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            valueType: valueType,
            model: model,
            operatorOptions: operatorOptions,
            onAnyChange: onAnyChange,
            addRule: addRule,
            removeRule: removeRule,
            confirm: confirm,
            reset: reset,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
