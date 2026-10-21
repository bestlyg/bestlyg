import type {
    InputEngineCapabilitiesConfig,
    InputEngineConfig,
    InputEngineFeaturesConfig,
    InputEngineLayoutConfig,
    InputEnginePoliciesConfig,
    ResolvedInputEngineConfig,
} from './types';

// 默认配置只描述与产品无关的输入引擎行为，产品、客户和场景配置应通过配置解析函数叠加。
// 这些开关是“是否允许渲染/使用某类能力”的基础层，不承载具体业务判断。
const defaultFeatures: InputEngineFeaturesConfig = {
    attachments: true,
    references: true,
    modeBar: true,
    toolMode: true,
    voice: true,
    customEditor: true,
};

const defaultLayout: InputEngineLayoutConfig = {
    desktopSlots: [
        'input_header',
        'input_overlay',
        'before_input',
        'mode_bar',
        'ref_bar',
        'attachment_area',
        'input_prefix',
        'editor_area',
        'input_suffix',
        'active_tools',
        'floating_panel',
        'toolbar_leading',
        'toolbar_trailing',
        'after_input',
    ],
    mobileSlots: [
        'input_header',
        'input_overlay',
        'before_input',
        'after_input',
        'mobile_top',
        'attachment_area',
        'input_prefix',
        'editor_area',
        'input_suffix',
        'active_tools',
        'floating_panel',
        'mobile_toolbar',
    ],
    hiddenSlots: [],
    collapsedMobileSlots: ['mode_bar', 'ref_bar'],
};

// 基础策略只覆盖输入引擎通用约束；上传中、数据集加载中等业务校验应由业务容器或策略插件补充。
const defaultPolicies: InputEnginePoliciesConfig = {
    allowEmptySubmit: false,
    allowEmptyWithAttachments: true,
    maxAttachmentCount: 10,
    maxTextLength: 8000,
};

const defaultCopywriting = {
    placeholder: '随便说点什么',
    submitLabel: '发送',
    stopLabel: '停止',
    attachmentEmptyText: '暂无附件',
    uploadingDisabledReason: '文件仍在上传中',
    overAttachmentLimitReason: '附件数量过多',
};

// 能力配置描述当前环境是否具备某类能力，便于运行时按设备、租户或场景关闭功能。
const defaultCapabilities: InputEngineCapabilitiesConfig = {
    canUploadAttachment: true,
    canUseVoice: true,
    canUseToolMode: true,
    canUseReference: true,
    canSubmitAttachmentOnly: true,
};

export const defaultInputEngineConfig: ResolvedInputEngineConfig = {
    features: defaultFeatures,
    layout: defaultLayout,
    policies: defaultPolicies,
    copywriting: defaultCopywriting,
    capabilities: defaultCapabilities,
};

// 按优先级合并配置；数组会整体替换而不是深度合并，因为插槽顺序本身就是完整的布局决策。
export function resolveInputEngineConfig(
    ...configs: Array<InputEngineConfig | undefined>
): ResolvedInputEngineConfig {
    return configs.reduce<ResolvedInputEngineConfig>(
        (resolved, config) => {
            if (!config) return resolved;

            return {
                features: { ...resolved.features, ...config.features },
                layout: { ...resolved.layout, ...config.layout },
                policies: { ...resolved.policies, ...config.policies },
                copywriting: { ...resolved.copywriting, ...config.copywriting },
                capabilities: { ...resolved.capabilities, ...config.capabilities },
            };
        },
        {
            features: { ...defaultInputEngineConfig.features },
            layout: {
                ...defaultInputEngineConfig.layout,
                desktopSlots: [...defaultInputEngineConfig.layout.desktopSlots],
                mobileSlots: [...defaultInputEngineConfig.layout.mobileSlots],
                hiddenSlots: [...defaultInputEngineConfig.layout.hiddenSlots],
                collapsedMobileSlots: [...defaultInputEngineConfig.layout.collapsedMobileSlots],
            },
            policies: { ...defaultInputEngineConfig.policies },
            copywriting: { ...defaultInputEngineConfig.copywriting },
            capabilities: { ...defaultInputEngineConfig.capabilities },
        },
    );
}
