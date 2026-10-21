import type {
    InputEngineConfig,
    InputEngineEditorValue,
    InputEngineEvent,
    InputEngineState,
    InputEngineViewModel,
    ResolvedInputEngineConfig,
} from './types';
import { resolveInputEngineConfig } from './config';
import { normalizeInputEngineEditorValue } from './utils/slotEditor';

// 内核默认状态刻意保持轻量，应用特有的模式、引用和附件应通过初始状态、事件或业务容器进入。
export const defaultInputEngineState: InputEngineState = {
    editor: { text: '' },
    activeMode: 'default',
    modes: [{ id: 'default', label: '默认' }],
    tools: [],
    optionGroups: [],
    voice: { active: false },
    toolMenu: { open: false },
    slashCommand: { open: false, query: '' },
    attachments: [],
    references: [],
    focused: false,
    composing: false,
    isSubmitting: false,
};

// 为每个实例创建全新的状态对象，避免不同输入引擎实例误共享并修改默认数组。
export function createInputEngineState(initialState?: Partial<InputEngineState>): InputEngineState {
    return {
        ...defaultInputEngineState,
        ...initialState,
        editor: normalizeEditorValue({
            ...defaultInputEngineState.editor,
            ...initialState?.editor,
        }),
        modes: initialState?.modes ? [...initialState.modes] : [...defaultInputEngineState.modes],
        tools: initialState?.tools ? [...initialState.tools] : [],
        optionGroups: initialState?.optionGroups ? [...initialState.optionGroups] : [],
        voice: { ...defaultInputEngineState.voice, ...initialState?.voice },
        toolMenu: { ...defaultInputEngineState.toolMenu, ...initialState?.toolMenu },
        slashCommand: { ...defaultInputEngineState.slashCommand, ...initialState?.slashCommand },
        attachments: initialState?.attachments ? [...initialState.attachments] : [],
        references: initialState?.references ? [...initialState.references] : [],
    };
}

// 纯状态归约器不依赖界面框架、浏览器结构或应用接口，便于在接入业务前独立验证输入引擎。
export function inputEngineReducer(
    state: InputEngineState,
    event: InputEngineEvent,
): InputEngineState {
    switch (event.type) {
        case 'EDITOR_CHANGED':
            return { ...state, editor: normalizeEditorValue(event.value) };
        case 'FOCUS_CHANGED':
            return { ...state, focused: event.focused };
        case 'COMPOSITION_CHANGED':
            return { ...state, composing: event.composing };
        case 'MODE_SELECTED':
            return { ...state, activeMode: event.modeId };
        case 'MODES_SET':
            return {
                ...state,
                modes: event.modes,
                activeMode: event.modes.some((mode) => mode.id === state.activeMode)
                    ? state.activeMode
                    : (event.modes[0]?.id ?? 'default'),
            };
        case 'TOOLS_SET':
            return { ...state, tools: event.tools };
        case 'TOOL_TOGGLED':
            return {
                ...state,
                tools: state.tools.map((tool) =>
                    tool.id === event.toolId
                        ? { ...tool, active: event.active ?? !tool.active }
                        : tool,
                ),
            };
        case 'OPTION_GROUP_SET':
            return {
                ...state,
                optionGroups: upsertOptionGroup(state.optionGroups, event.optionGroup),
            };
        case 'OPTION_SELECTED':
            return {
                ...state,
                optionGroups: state.optionGroups.map((group) =>
                    group.id === event.groupId ? { ...group, selectedValue: event.value } : group,
                ),
            };
        case 'VOICE_TOGGLED':
            return {
                ...state,
                voice: { ...state.voice, active: event.active ?? !state.voice.active },
            };
        case 'TOOL_MENU_OPENED':
            return {
                ...state,
                toolMenu: { open: true, anchorId: event.anchorId, metadata: event.metadata },
            };
        case 'TOOL_MENU_CLOSED':
            return { ...state, toolMenu: { ...state.toolMenu, open: false } };
        case 'SLASH_COMMAND_OPENED':
            return {
                ...state,
                slashCommand: {
                    open: true,
                    query: event.query ?? '',
                    anchorId: event.anchorId,
                    metadata: event.metadata,
                },
            };
        case 'SLASH_COMMAND_CLOSED':
            return { ...state, slashCommand: { ...state.slashCommand, open: false, query: '' } };
        case 'SLASH_COMMAND_QUERY_CHANGED':
            return { ...state, slashCommand: { ...state.slashCommand, query: event.query } };
        case 'ATTACHMENTS_SET':
            return { ...state, attachments: event.attachments };
        case 'ATTACHMENT_ADDED':
            return { ...state, attachments: [...state.attachments, event.attachment] };
        case 'ATTACHMENT_UPDATED':
            return {
                ...state,
                attachments: state.attachments.map((attachment) =>
                    attachment.id === event.id ? { ...attachment, ...event.patch } : attachment,
                ),
            };
        case 'ATTACHMENT_REMOVED':
            return {
                ...state,
                attachments: state.attachments.filter((attachment) => attachment.id !== event.id),
            };
        case 'ATTACHMENTS_CLEARED':
            return { ...state, attachments: [] };
        case 'REFERENCES_SET':
            return { ...state, references: event.references };
        case 'REFERENCE_ADDED':
            return { ...state, references: [...state.references, event.reference] };
        case 'REFERENCE_REMOVED':
            return {
                ...state,
                references: state.references.filter((reference) => reference.id !== event.id),
            };
        case 'REFERENCES_CLEARED':
            return { ...state, references: [] };
        case 'SUBMIT_STARTED':
            return { ...state, isSubmitting: true };
        case 'SUBMIT_FINISHED':
            return { ...state, isSubmitting: false };
        case 'DISABLED_REASON_SET':
            return { ...state, disabledReason: event.reason };
        default:
            return state;
    }
}

// 面向外壳组件的派生状态，会把策略结果转换成可渲染的提交状态、禁用原因和可见插槽。
export function deriveInputEngineViewModel(
    state: InputEngineState,
    config: ResolvedInputEngineConfig,
    device: 'desktop' | 'mobile',
): InputEngineViewModel {
    const disableReason = getSubmitDisabledReason(state, config);
    const sourceSlots =
        device === 'mobile' ? config.layout.mobileSlots : config.layout.desktopSlots;
    const visibleSlots = sourceSlots.filter((slot) => !config.layout.hiddenSlots.includes(slot));

    return {
        canSubmit: !state.isSubmitting && !disableReason,
        disableReason,
        activeMode: state.modes.find((mode) => mode.id === state.activeMode),
        visibleSlots,
    };
}

// 插件可以追加小范围配置补丁，最终配置仍由内核统一解析，外壳组件不需要自行合并策略。
export function applyInputEnginePolicyPatches(
    baseConfig: ResolvedInputEngineConfig,
    patches: Array<InputEngineConfig | void>,
): ResolvedInputEngineConfig {
    // 插件 patch 允许返回 void；这里显式收窄类型后再交给配置解析器合并。
    return resolveInputEngineConfig(
        baseConfig,
        ...patches.filter((patch): patch is InputEngineConfig => Boolean(patch)),
    );
}

function normalizeEditorValue(value: InputEngineEditorValue): InputEngineEditorValue {
    return normalizeInputEngineEditorValue(value);
}

function upsertOptionGroup(
    groups: InputEngineState['optionGroups'],
    nextGroup: InputEngineState['optionGroups'][number],
): InputEngineState['optionGroups'] {
    const exists = groups.some((group) => group.id === nextGroup.id);
    if (!exists) return [...groups, nextGroup];

    return groups.map((group) => (group.id === nextGroup.id ? nextGroup : group));
}

// 提交可用性集中在这里判断，确保工具栏按钮、键盘提交和未来插件动作使用一致的禁用原因。
function getSubmitDisabledReason(state: InputEngineState, config: ResolvedInputEngineConfig) {
    if (state.isSubmitting) return config.policies.submitDisabledReason;
    if (state.composing) return undefined;
    if (state.disabledReason) return state.disabledReason;

    const hasText = state.editor.text.trim().length > 0;
    const hasAttachments = state.attachments.length > 0;
    const hasUploadingAttachments = state.attachments.some(
        (attachment) => attachment.status === 'uploading',
    );
    const isOverAttachmentLimit = state.attachments.length > config.policies.maxAttachmentCount;

    if (hasUploadingAttachments) return config.copywriting.uploadingDisabledReason;
    if (isOverAttachmentLimit) return config.copywriting.overAttachmentLimitReason;
    if (hasText) return undefined;
    if (
        hasAttachments &&
        config.policies.allowEmptyWithAttachments &&
        config.capabilities.canSubmitAttachmentOnly
    )
        return undefined;
    if (config.policies.allowEmptySubmit) return undefined;

    return config.policies.submitDisabledReason || '请输入内容';
}
