import type { InputEngineRuntimeAdapters } from './types';

// 安全的空运行时，供输入引擎在接入对话提交、上传、语音或埋点服务前独立渲染、演示和验证。
export const noopInputEngineRuntime: InputEngineRuntimeAdapters = {
    submit: () => undefined,
    stop: () => undefined,
    onFilesSelected: () => undefined,
    onModeChange: () => undefined,
    onToolToggle: () => undefined,
    onOptionSelect: () => undefined,
    onToolMenuItemSelect: () => undefined,
    loadOptions: () => undefined,
    onVoiceToggle: () => undefined,
    onEvent: () => undefined,
};
