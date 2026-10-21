// 输入引擎共享的公开契约尽量不绑定具体界面框架，方便业务容器、插件和外壳复用同一套语义。
export type InputEngineDevice =
    // 桌面端布局，通常拥有完整工具栏、浮层和较宽的编辑区域。
    | 'desktop'
    // 移动端布局，通常需要底部安全区、紧凑工具栏和更保守的浮层尺寸。
    | 'mobile';

// 插槽是插件唯一允许渲染的位置；外壳负责布局，插件只声明自己贡献到哪个插槽。
// 新增插槽前应先确认现有语义无法覆盖，避免业务组件绕过外壳直接依赖 DOM 结构。
export type InputEngineSlot =
    // 输入引擎主体上方的整行扩展区，适合任务或场景选择。
    | 'before_input'
    // 输入框边框内部的顶部提示区。
    | 'input_header'
    // 以完整输入框主体为基准的浮层，不受上下方扩展区高度影响。
    | 'input_overlay'
    // 顶部模式栏，适合“普通问答 / 分析模式 / 写作模式”这类输入模式切换。
    | 'mode_bar'
    // 引用栏，适合展示已关联的历史消息、引用文件或上下文对象。
    | 'ref_bar'
    // 附件区，位于输入框主体上方，适合文件卡片、上传进度和附件错误提示。
    | 'attachment_area'
    // 输入框左侧前缀区，适合 + 按钮、命令入口等固定左侧操作。
    | 'input_prefix'
    // 编辑器主体区；业务插件接管后可以替换默认 textarea 或 slot editor。
    | 'editor_area'
    // 编辑器覆盖层，适合候选提示、输入联想、局部浮层，不应承载主编辑器。
    | 'editor_overlay'
    // 输入框右侧后缀区，适合语音、发送、停止等主要操作按钮。
    | 'input_suffix'
    // 输入框底部已激活工具区，适合联网、深度分析、模型等常驻状态按钮。
    | 'active_tools'
    // 桌面端外部工具栏左侧区，适合输入框外的次级工具按钮。
    | 'toolbar_leading'
    // 桌面端外部工具栏右侧区，适合设置、快捷操作或补充动作。
    | 'toolbar_trailing'
    // 输入引擎主体下方的整行扩展区，适合由插件提供与输入模式联动的面板。
    | 'after_input'
    // 浮层区，适合 + 菜单、slash 菜单等相对输入框定位的面板。
    | 'floating_panel'
    // 移动端顶部区，适合移动端专属提示、引用摘要或收起入口。
    | 'mobile_top'
    // 移动端工具栏区，适合 H5 底部紧凑工具按钮。
    | 'mobile_toolbar';

export type InputEnginePluginKind =
    // 输入模式类插件，例如模式栏或模式切换策略。
    | 'mode'
    // 工具类插件，例如联网、深度分析、模型选择、slash 工具。
    | 'tool'
    // 附件类插件，例如上传入口、附件列表和附件状态展示。
    | 'attachment'
    // 引用类插件，例如引用消息、知识库片段或外部上下文展示。
    | 'reference'
    // 编辑器类插件，用于接管 editor_area 或增强编辑行为。
    | 'editor'
    // 策略类插件，不一定渲染 UI，主要用于注入配置、className 或行为约束。
    | 'policy';

export type InputEngineSlotInsertPosition =
    // 插入到编辑器内容开头。
    | 'start'
    // 插入到编辑器内容末尾。
    | 'end'
    // 插入到当前光标位置，是组件岛编辑器的默认插入策略。
    | 'cursor';

export interface InputEngineSlotOption {
    // 展示给用户看的选项内容，可以是文本，也可以是业务侧传入的轻量 React 节点。
    label: unknown;
    // 选项的稳定值，select/input-engine 内部只按 value 做选择和回写。
    value: string;
    // 禁用后仍可展示，但不应触发选择动作。
    disabled?: boolean;
    // 业务扩展数据，例如模型类型、文件 id、权限信息等，内核不解析。
    metadata?: Record<string, unknown>;
}

export interface InputEngineSlotRenderContext {
    // 当前编辑器或 slot 是否禁用；组件岛应据此禁止交互。
    disabled?: boolean;
    // 当前编辑器或 slot 是否只读；只读通常允许选择文字但不允许改值。
    readOnly?: boolean;
}

// 组件岛编辑器的基础配置，参考 Ant Design X Sender slotConfig 思路。
// 非 text 类型必须提供稳定 key，因为 DOM span 占位和 React Portal 需要用 key 做映射。
export interface InputEngineSlotConfigBase {
    // 非文本 slot 的稳定标识；同一个 key 会被视为同一个组件岛。
    key?: string;
    type:
        // 普通文本片段，最终直接参与 text 投影。
        | 'text'
        // 内联输入控件，适合短文本参数位。
        | 'input'
        // 内联下拉控件，适合模型、枚举参数等可选项。
        | 'select'
        // 不可编辑标签，适合指标、维度、实体等结构化 token。
        | 'tag'
        // 自定义 React 组件岛，由 customRender 完全接管渲染。
        | 'custom'
        // 可编辑内联内容块，适合局部自由文本占位。
        | 'content'
        // 技能/工具 token，适合表达当前激活的工具能力。
        | 'skill';
    // 当前 slot 的值；具体类型由 slot type 和业务 metadata 共同约定。
    value?: unknown;
    // 把 value 投影为最终提交文本；未提供时使用通用默认投影。
    formatResult?: (value: unknown) => string;
    // 保留业务原始数据，内核只透传，不做结构假设。
    metadata?: Record<string, unknown>;
}

export interface InputEngineSlotTextConfig extends InputEngineSlotConfigBase {
    type: 'text';
    // 文本片段的内容。
    value?: string;
    // 预留字段：表达该文本片段是否允许被编辑，当前默认跟随编辑器整体行为。
    editable?: boolean;
    // 文本片段为空时的提示文案。
    placeholder?: string;
}

export interface InputEngineSlotInputConfig extends InputEngineSlotConfigBase {
    key: string;
    type: 'input';
    props?: {
        // 控件初始值；value 存在时优先以 value 为准。
        defaultValue?: unknown;
        // 输入控件为空时展示的占位文案。
        placeholder?: string;
    };
}

export interface InputEngineSlotSelectConfig extends InputEngineSlotConfigBase {
    key: string;
    type: 'select';
    props?: {
        // 控件初始选中值；value 存在时优先以 value 为准。
        defaultValue?: string;
        // 下拉选项；字符串会被规范化为 label/value 相同的选项。
        options: Array<string | InputEngineSlotOption>;
        // 未选择时展示的占位文案。
        placeholder?: string;
    };
}

export interface InputEngineSlotTagConfig extends InputEngineSlotConfigBase {
    key: string;
    type: 'tag';
    props?: {
        // 标签展示内容；不传时使用 value 或 formatResult 投影。
        label?: unknown;
        // 标签内部值，通常对应结构化实体的业务 id 或展示名。
        value?: unknown;
        // 是否允许用户关闭该标签。
        closable?: boolean;
    };
}

export interface InputEngineSlotCustomConfig extends InputEngineSlotConfigBase {
    key: string;
    type: 'custom';
    // 自定义组件的附加配置，只由 customRender 和业务侧解释。
    props?: Record<string, unknown>;
    // 自定义组件岛渲染函数；必须通过 onChange 回写值，不能直接改 DOM。
    customRender?: (
        value: unknown,
        onChange: (value: unknown) => void,
        context: InputEngineSlotRenderContext,
        item: InputEngineSlotCustomConfig,
    ) => unknown;
}

export interface InputEngineSlotContentConfig extends InputEngineSlotConfigBase {
    key: string;
    type: 'content';
    props?: {
        // 可编辑内容块初始值；value 存在时优先以 value 为准。
        defaultValue?: unknown;
        // 内容块为空时的占位文案。
        placeholder?: string;
    };
}

export interface InputEngineSlotSkillConfig extends InputEngineSlotConfigBase {
    key: string;
    type: 'skill';
    // 技能 token 展示标题。
    title?: unknown;
    // 是否允许用户关闭该技能 token。
    closable?: boolean;
}

export type InputEngineSlotConfig =
    | InputEngineSlotTextConfig
    | InputEngineSlotInputConfig
    | InputEngineSlotSelectConfig
    | InputEngineSlotTagConfig
    | InputEngineSlotCustomConfig
    | InputEngineSlotContentConfig
    | InputEngineSlotSkillConfig;

export interface InputEngineSkillConfig {
    // 技能稳定值，通常是工具 id 或技能 id。
    value: string;
    // 技能展示标题。
    title?: unknown;
    // 是否允许关闭。
    closable?: boolean;
}

// 编辑器值有意支持纯文本之外的结构，便于现有可编辑区域和未来富文本编辑器共享同一状态形态。
export interface InputEngineEditorValue {
    // 纯文本投影，提交策略、发送按钮可用性通常优先读取它。
    text: string;
    // 编辑器内部 HTML 快照，仅用于调试或特殊回填，不建议作为业务单一事实来源。
    html?: string;
    // 旧结构化数据或业务结构化内容的扩展位，内核不解析。
    structured?: unknown[];
    // 组件岛配置，是 slot editor 的权威结构化值。
    slotConfig?: InputEngineSlotConfig[];
    // 当前技能 token 的快捷投影，通常由 slotConfig 中的 skill 派生。
    skill?: InputEngineSkillConfig;
}

export type InputEngineAttachmentType =
    // 本地或远程文件附件。
    | 'file'
    // 图片附件，后续可用于预览或视觉化展示。
    | 'image'
    // 链接附件，通常只有 url 和标题。
    | 'link'
    // 远程业务对象，例如历史文档、知识库文件或云端素材。
    | 'remote';
export type InputEngineAttachmentStatus =
    // 已进入附件列表但尚未开始上传或处理。
    | 'idle'
    // 上传或处理进行中，通常需要展示 progress。
    | 'uploading'
    // 已准备好参与提交。
    | 'ready'
    // 上传或处理失败，通常需要展示 message。
    | 'error';

// 附件描述只表达输入引擎需要渲染和判断的最小信息；业务文件标识、上传回包等扩展信息放到扩展字段。
export interface InputEngineAttachmentDescriptor {
    // 附件稳定 id，用于更新、移除和渲染 key。
    id: string;
    // 用户可见的附件名称。
    name: string;
    // 附件类型，决定默认图标和预览方式。
    type: InputEngineAttachmentType;
    // 附件状态，决定是否可提交、是否展示进度或错误。
    status: InputEngineAttachmentStatus;
    // 上传或处理进度，建议使用 0-100。
    progress?: number;
    // 文件大小，单位字节。
    size?: number;
    // 附件可访问地址，适合远程文件、图片或链接。
    url?: string;
    // 状态说明或错误文案。
    message?: string;
    // 附件来源，例如 local、selected、remote；仅作展示或业务透传。
    source?: string;
    // 业务扩展信息，例如 fileId、原始 File、后端回包等。
    metadata?: Record<string, unknown>;
}

// 上传运行时只通过这组 helper 增量写入附件状态，避免真实上传逻辑进入插件或内核。
export interface InputEngineAttachmentRuntimeHelpers {
    // 追加一个附件，适合上传开始时写入 uploading 占位。
    addAttachment: (attachment: InputEngineAttachmentDescriptor) => void;
    // 局部更新附件，适合进度、成功、失败等增量状态。
    updateAttachment: (id: string, patch: Partial<InputEngineAttachmentDescriptor>) => void;
    // 移除指定附件。
    removeAttachment: (id: string) => void;
    // 清空全部附件。
    clearAttachments: () => void;
}

export type InputEngineReferenceType =
    // 文件引用，通常来自历史附件或文档池。
    | 'file'
    // 图片引用。
    | 'image'
    // 链接引用。
    | 'link'
    // 消息引用，例如引用上一轮回答或历史对话。
    | 'message'
    // 业务自定义引用对象。
    | 'custom';

// 引用描述用于表达“这次输入关联了哪些上下文”，例如历史消息、文件、图片或客户自定义对象。
export interface InputEngineReferenceDescriptor {
    // 引用稳定 id，用于移除和渲染 key。
    id: string;
    // 引用类型，决定默认展示方式。
    type: InputEngineReferenceType;
    // 主标题，通常是文件名、消息摘要或链接标题。
    title: string;
    // 副标题，通常用于来源、大小、时间等辅助信息。
    subtitle?: string;
    // 是否允许用户从输入框中移除该引用。
    removable?: boolean;
    // 业务扩展信息，内核只透传。
    metadata?: Record<string, unknown>;
}

export interface InputEngineModeDescriptor {
    // 模式稳定 id，例如 default、analysis。
    id: string;
    // 模式展示名称。
    label: string;
    // 模式图标。
    icon?: unknown;
    // 禁用后仍可展示，但不应允许选择。
    disabled?: boolean;
    // 禁用原因，用于 tooltip 或无障碍提示。
    disabledReason?: string;
    // 业务扩展信息。
    metadata?: Record<string, unknown>;
}

// 通用工具描述只关心按钮的展示和状态；联网搜索、深度分析等业务语义应放到调用方或 metadata 中。
export interface InputEngineToolDescriptor {
    // 工具稳定 id，例如 network、deep-analysis。
    id: string;
    // 工具展示名称。
    label: string;
    // 工具图标。
    icon?: unknown;
    // 工具是否处于激活状态。
    active?: boolean;
    // 工具是否禁用。
    disabled?: boolean;
    // 禁用原因，用于 tooltip 或菜单提示。
    disabledReason?: string;
    // 业务扩展信息，例如权限、实验开关、后端参数。
    metadata?: Record<string, unknown>;
}

// 选项描述用于模型选择、历史文档选择等通用选择器，具体业务对象统一通过 metadata 承载。
export interface InputEngineOptionDescriptor {
    // 用户可见的选项文案。
    label: string;
    // 选项稳定值。
    value: string;
    // 选项是否禁用。
    disabled?: boolean;
    // 禁用原因。
    disabledReason?: string;
    // 业务扩展信息。
    metadata?: Record<string, unknown>;
}

// 选项组是选择器插件的状态来源，一个组对应一个独立下拉或选择区域。
export interface InputEngineOptionGroupDescriptor {
    // 选项组稳定 id，例如 model、history-doc。
    id: string;
    // 选项组展示名称。
    label: string;
    // 当前组选项列表。
    options: InputEngineOptionDescriptor[];
    // 当前组已选中的 value。
    selectedValue?: string;
    // 整组选项是否禁用。
    disabled?: boolean;
    // 整组禁用原因。
    disabledReason?: string;
    // 是否正在加载选项。
    loading?: boolean;
    // 业务扩展信息。
    metadata?: Record<string, unknown>;
}

// 语音状态先保持为通用开关，不假设具体录音、识别或权限模型，便于后续适配不同业务实现。
export interface InputEngineVoiceState {
    // 语音是否处于激活态，例如录音中或语音面板打开。
    active: boolean;
    // 语音能力是否禁用。
    disabled?: boolean;
    // 禁用原因。
    disabledReason?: string;
    // 业务扩展信息，例如识别类型、权限状态、设备能力。
    metadata?: Record<string, unknown>;
}

export interface InputEngineFloatingPanelState {
    // 浮层是否打开。
    open: boolean;
    // 浮层锚点 id，例如某个按钮或工具入口。
    anchorId?: string;
    // 业务扩展信息。
    metadata?: Record<string, unknown>;
}

export interface InputEngineSlashCommandState {
    // slash 菜单是否打开。
    open: boolean;
    // slash 后的过滤词。
    query: string;
    // 菜单锚点 id。
    anchorId?: string;
    // 业务扩展信息。
    metadata?: Record<string, unknown>;
}

export type InputEngineToolMenuItemType =
    // 切换某个工具 active 状态，例如联网、深度分析。
    | 'toggle-tool'
    // 触发文件选择和上传流程。
    | 'upload'
    // 业务自定义菜单项，由 runtime.onToolMenuItemSelect 接管。
    | 'custom';

// 工具菜单项只描述通用交互意图；具体上传和业务动作仍由 commands 或 runtime adapter 承接。
export interface InputEngineToolMenuItemDescriptor {
    // 菜单项稳定 id。
    id: string;
    // 菜单项展示名称。
    label: string;
    // 菜单项交互类型。
    type: InputEngineToolMenuItemType;
    // 菜单项图标。
    icon?: unknown;
    // toggle-tool 类型关联的工具 id。
    toolId?: string;
    // upload 类型允许的文件类型，透传给 input[type=file]。
    accept?: string;
    // upload 类型是否允许多选文件。
    multiple?: boolean;
    // 菜单项是否禁用。
    disabled?: boolean;
    // 禁用原因。
    disabledReason?: string;
    // 业务扩展信息。
    metadata?: Record<string, unknown>;
}

export type InputEngineToolMenuSelectSource =
    // 用户从 + 工具菜单选择。
    | 'tool-menu'
    // 用户从 slash 命令菜单选择。
    | 'slash-command';

// 功能配置控制能力是否参与渲染，适合按产品形态或租户能力做粗粒度开关。
export interface InputEngineFeaturesConfig {
    // 是否启用附件相关插槽和默认附件策略。
    attachments: boolean;
    // 是否启用引用上下文能力。
    references: boolean;
    // 是否启用模式栏能力。
    modeBar: boolean;
    // 是否启用工具模式能力，例如联网、深度分析等。
    toolMode: boolean;
    // 是否启用语音入口。
    voice: boolean;
    // 是否允许插件接管编辑器区域。
    customEditor: boolean;
}

// 布局配置只描述插槽顺序和可见性，不关心每个插槽里具体渲染什么插件。
export interface InputEngineLayoutConfig {
    // 桌面端按顺序渲染的插槽列表。
    desktopSlots: InputEngineSlot[];
    // 移动端按顺序渲染的插槽列表。
    mobileSlots: InputEngineSlot[];
    // 强制隐藏的插槽列表，优先级高于设备布局。
    hiddenSlots: InputEngineSlot[];
    // 移动端折叠态隐藏或收纳的插槽列表。
    collapsedMobileSlots: InputEngineSlot[];
}

// 策略配置描述输入引擎通用规则；复杂业务校验应通过策略插件或运行时适配器补充。
export interface InputEnginePoliciesConfig {
    // 是否允许空文本提交。
    allowEmptySubmit: boolean;
    // 是否允许“无文本但有附件”提交。
    allowEmptyWithAttachments: boolean;
    // 附件数量上限。
    maxAttachmentCount: number;
    // 文本长度上限，按纯文本投影计算。
    maxTextLength: number;
    // 提交按钮被策略禁用时展示的原因。
    submitDisabledReason?: string;
}

// 文案配置集中承载默认展示文本，方便后续接入国际化或客户化文案。
export interface InputEngineCopywritingConfig {
    // 编辑器为空时展示的默认占位文案。
    placeholder: string;
    // 提交按钮无障碍标签或兜底标题。
    submitLabel: string;
    // 停止生成按钮无障碍标签或兜底标题。
    stopLabel: string;
    // 附件列表为空时的兜底文案。
    attachmentEmptyText: string;
    // 上传中禁止提交时的默认提示。
    uploadingDisabledReason: string;
    // 附件超出数量限制时的默认提示。
    overAttachmentLimitReason: string;
}

// 能力配置描述当前运行环境是否允许某类操作，通常由场景、设备、权限或实验开关决定。
export interface InputEngineCapabilitiesConfig {
    // 当前环境是否允许上传附件。
    canUploadAttachment: boolean;
    // 当前环境是否允许使用语音。
    canUseVoice: boolean;
    // 当前环境是否允许使用工具模式。
    canUseToolMode: boolean;
    // 当前环境是否允许添加引用上下文。
    canUseReference: boolean;
    // 当前环境是否允许仅凭附件提交。
    canSubmitAttachmentOnly: boolean;
}

export interface InputEngineConfig {
    // 功能开关补丁，最终会与默认配置合并。
    features?: Partial<InputEngineFeaturesConfig>;
    // 布局配置补丁，最终会与默认布局合并。
    layout?: Partial<InputEngineLayoutConfig>;
    // 通用策略补丁，最终会与默认策略合并。
    policies?: Partial<InputEnginePoliciesConfig>;
    // 文案补丁，最终会与默认文案合并。
    copywriting?: Partial<InputEngineCopywritingConfig>;
    // 环境能力补丁，最终会与默认能力合并。
    capabilities?: Partial<InputEngineCapabilitiesConfig>;
}

// 解析后的配置是组件真正消费的结果，已合并默认值、环境、场景、设备和插件策略补丁。
export interface ResolvedInputEngineConfig {
    features: InputEngineFeaturesConfig;
    layout: InputEngineLayoutConfig;
    policies: InputEnginePoliciesConfig;
    copywriting: InputEngineCopywritingConfig;
    capabilities: InputEngineCapabilitiesConfig;
}

export interface InputEnginePluginContext<TFile = unknown> {
    // 当前输入引擎状态快照，插件只能读取，不应直接修改。
    state: InputEngineState;
    // 已解析后的完整配置，包含默认值、preset 和调用方配置。
    config: ResolvedInputEngineConfig;
    // 暴露给插件的命令面；文件类型由具体运行层决定。
    commands: InputEngineCommands<TFile>;
    // 面向渲染和策略判断的派生视图状态。
    viewModel: InputEngineViewModel;
    // 当前设备形态，插件可据此决定是否适用。
    device: InputEngineDevice;
}

export interface InputEnginePluginContributionBase<
    TContext = InputEnginePluginContext,
    TSlot extends string = InputEngineSlot,
> {
    // contribution 允许一个插件向多个插槽贡献能力，例如同时声明入口和浮层。
    slot: TSlot;
    // 贡献适用的设备；all 表示桌面和移动端都适用。
    device?: InputEngineDevice | 'all';
    // 同一插槽内的排序值，越小越靠前。
    order?: number;
    // 渲染或执行前判断，适合按状态、能力或场景隐藏某个贡献。
    appliesWhen?: (props: TContext) => boolean;
}

export interface InputEngineResolvedPluginContributionBase<
    TPlugin,
    TContribution = InputEnginePluginContributionBase,
    TSlot extends string = InputEngineSlot,
> {
    // 贡献来源插件。
    plugin: TPlugin;
    // 原始贡献描述。
    contribution: TContribution;
    // 最终渲染或执行插槽。
    slot: TSlot;
    // 最终排序值，已合并插件级和 contribution 级默认值。
    order: number;
}

export interface InputEnginePluginManifestBase<
    TContext = InputEnginePluginContext,
    TContribution extends InputEnginePluginContributionBase<TContext, string> =
        InputEnginePluginContributionBase<TContext>,
    TSlot extends string = InputEngineSlot,
> {
    // 插件稳定 id。
    id: string;
    // 插件类型，用于调试、分组和能力识别。
    kind: InputEnginePluginKind;
    // 插件版本，便于后续排查配置或灰度差异。
    version?: string;
    // 插件展示名称。
    label?: string;
    // 插件能力声明；具体 UI 必须通过 contributions 精确插入。
    slots: TSlot[];
    // 多插槽贡献列表，同一插件可以向多个 slot 提供不同 UI 或判断条件。
    contributions?: TContribution[];
    // 插件级默认排序值，未指定 contribution.order 时使用。
    order?: number;
    // 插件整体是否适用于当前状态。
    appliesWhen?: (props: TContext) => boolean;
    // 插件级策略补丁，用于影响配置，不应执行业务副作用。
    policy?: (props: TContext) => InputEngineConfig | void;
}

export interface InputEnginePresetManifest<TPlugin = unknown> {
    // preset 稳定 id，便于调试、覆盖和后续做预设组合分析。
    id: string;
    // preset 展示名称，主要用于文档、调试面板或业务侧选择器。
    label?: string;
    // 全局配置补丁；调用方配置应在 preset 之后合并，以保留最终覆盖权。
    config?: InputEngineConfig;
    // preset 附带的一组插件；具体插件形态由运行层决定，core 不假设 React 或 DOM。
    plugins?: TPlugin[];
}

// 运行时状态按行为拆分而不是按视觉组件拆分，即使桌面端和移动端结构不同，也能共享同一状态模型。
export interface InputEngineState {
    // 编辑器当前值，是文本、结构化内容和组件岛配置的统一入口。
    editor: InputEngineEditorValue;
    // 当前激活模式 id，应对应 modes 中的某一项。
    activeMode: string;
    // 可选模式列表。
    modes: InputEngineModeDescriptor[];
    // 通用工具状态列表，例如联网、深度分析。
    tools: InputEngineToolDescriptor[];
    // 通用选择器状态列表，例如模型选择、历史文档选择。
    optionGroups: InputEngineOptionGroupDescriptor[];
    // 语音通用状态。
    voice: InputEngineVoiceState;
    // + 工具菜单浮层状态。
    toolMenu: InputEngineFloatingPanelState;
    // slash 命令菜单状态。
    slashCommand: InputEngineSlashCommandState;
    // 当前附件列表。
    attachments: InputEngineAttachmentDescriptor[];
    // 当前引用上下文列表。
    references: InputEngineReferenceDescriptor[];
    // 编辑器或输入框整体是否聚焦。
    focused: boolean;
    // 是否处于输入法组合输入中。
    composing: boolean;
    // 是否正在提交或生成中。
    isSubmitting: boolean;
    // 输入框整体禁用原因，通常用于提交按钮和 tooltip。
    disabledReason?: string;
}

// 事件是输入引擎的状态变更边界；界面组件只派发事件，状态如何变化由归约器决定。
export type InputEngineEvent =
    // 编辑器内容发生变化。
    | { type: 'EDITOR_CHANGED'; value: InputEngineEditorValue }
    // 聚焦状态发生变化。
    | { type: 'FOCUS_CHANGED'; focused: boolean }
    // 输入法组合输入状态发生变化。
    | { type: 'COMPOSITION_CHANGED'; composing: boolean }
    // 用户选择了某个输入模式。
    | { type: 'MODE_SELECTED'; modeId: string }
    // 批量重置可选模式列表。
    | { type: 'MODES_SET'; modes: InputEngineModeDescriptor[] }
    // 批量重置通用工具列表。
    | { type: 'TOOLS_SET'; tools: InputEngineToolDescriptor[] }
    // 切换某个通用工具的 active 状态；active 缺省时由 reducer 取反。
    | { type: 'TOOL_TOGGLED'; toolId: string; active?: boolean }
    // 写入或覆盖某个选项组。
    | { type: 'OPTION_GROUP_SET'; optionGroup: InputEngineOptionGroupDescriptor }
    // 选择某个选项组中的选项。
    | { type: 'OPTION_SELECTED'; groupId: string; value: string }
    // 切换语音状态；active 缺省时由 reducer 取反。
    | { type: 'VOICE_TOGGLED'; active?: boolean }
    // 打开 + 工具菜单浮层。
    | { type: 'TOOL_MENU_OPENED'; anchorId?: string; metadata?: Record<string, unknown> }
    // 关闭 + 工具菜单浮层。
    | { type: 'TOOL_MENU_CLOSED' }
    // 打开 slash 命令菜单。
    | {
          type: 'SLASH_COMMAND_OPENED';
          query?: string;
          anchorId?: string;
          metadata?: Record<string, unknown>;
      }
    // 关闭 slash 命令菜单。
    | { type: 'SLASH_COMMAND_CLOSED' }
    // 更新 slash 命令过滤词。
    | { type: 'SLASH_COMMAND_QUERY_CHANGED'; query: string }
    // 批量覆盖附件列表。
    | { type: 'ATTACHMENTS_SET'; attachments: InputEngineAttachmentDescriptor[] }
    // 追加一个附件。
    | { type: 'ATTACHMENT_ADDED'; attachment: InputEngineAttachmentDescriptor }
    // 局部更新某个附件。
    | { type: 'ATTACHMENT_UPDATED'; id: string; patch: Partial<InputEngineAttachmentDescriptor> }
    // 移除某个附件。
    | { type: 'ATTACHMENT_REMOVED'; id: string }
    // 清空全部附件。
    | { type: 'ATTACHMENTS_CLEARED' }
    // 批量覆盖引用列表。
    | { type: 'REFERENCES_SET'; references: InputEngineReferenceDescriptor[] }
    // 追加一个引用。
    | { type: 'REFERENCE_ADDED'; reference: InputEngineReferenceDescriptor }
    // 移除某个引用。
    | { type: 'REFERENCE_REMOVED'; id: string }
    // 清空全部引用。
    | { type: 'REFERENCES_CLEARED' }
    // 标记提交开始，通常进入生成中或停止按钮态。
    | { type: 'SUBMIT_STARTED' }
    // 标记提交结束，通常恢复发送按钮态。
    | { type: 'SUBMIT_FINISHED' }
    // 设置输入框整体禁用原因。
    | { type: 'DISABLED_REASON_SET'; reason?: string };

export interface InputEngineSubmitPayload {
    // 提交用纯文本投影。
    text: string;
    // 提交时的完整编辑器值。
    editor: InputEngineEditorValue;
    // 提交时的激活模式。
    activeMode: string;
    // 提交时的通用工具状态快照。
    tools: InputEngineToolDescriptor[];
    // 提交时的通用选项组状态快照。
    optionGroups: InputEngineOptionGroupDescriptor[];
    // 提交时的语音状态快照。
    voice: InputEngineVoiceState;
    // 提交时的附件快照。
    attachments: InputEngineAttachmentDescriptor[];
    // 提交时的引用快照。
    references: InputEngineReferenceDescriptor[];
}

export interface InputEngineToolTogglePayload {
    // 被切换的工具 id。
    toolId: string;
    // 切换后的 active 状态。
    active: boolean;
    // 被切换工具的完整描述，找不到时为空。
    tool?: InputEngineToolDescriptor;
}

export interface InputEngineOptionSelectPayload {
    // 发生选择的选项组 id。
    groupId: string;
    // 被选中的选项 value。
    value: string;
    // 被选中选项的完整描述，找不到时为空。
    option?: InputEngineOptionDescriptor;
}

export interface InputEngineLoadOptionsPayload {
    // 需要加载选项的选项组 id。
    groupId: string;
    // 当前选项组快照，找不到时为空。
    group?: InputEngineOptionGroupDescriptor;
}

export interface InputEngineVoiceTogglePayload {
    // 切换后的语音 active 状态。
    active: boolean;
    // 切换后的语音状态快照。
    voice: InputEngineVoiceState;
}

export interface InputEngineToolMenuItemSelectPayload {
    // 被选择的工具菜单项。
    item: InputEngineToolMenuItemDescriptor;
    // 选择来源，用于区分 + 菜单和 slash 菜单。
    source: InputEngineToolMenuSelectSource;
}

// 运行时适配器是输入引擎和业务系统之间的副作用出口，例如真实提交、停止生成、上传和埋点。
export interface InputEngineRuntimeAdapters<TFile = unknown> {
    // 提交输入内容，由业务侧决定真实请求和清空策略。
    submit?: (payload: InputEngineSubmitPayload) => Promise<void> | void;
    // 停止当前生成或提交过程。
    stop?: () => Promise<void> | void;
    // 用户选择文件后的副作用入口；可返回附件数组，也可通过 helpers 增量写入附件状态。
    onFilesSelected?: (
        files: TFile[],
        helpers: InputEngineAttachmentRuntimeHelpers,
    ) =>
        | Promise<InputEngineAttachmentDescriptor[] | void>
        | InputEngineAttachmentDescriptor[]
        | void;
    // 模式变化后的业务回调。
    onModeChange?: (modeId: string) => Promise<void> | void;
    // 工具切换后的业务回调。
    onToolToggle?: (payload: InputEngineToolTogglePayload) => Promise<void> | void;
    // 选项选择后的业务回调。
    onOptionSelect?: (payload: InputEngineOptionSelectPayload) => Promise<void> | void;
    // 自定义工具菜单项选择后的业务回调。
    onToolMenuItemSelect?: (payload: InputEngineToolMenuItemSelectPayload) => Promise<void> | void;
    // 远程加载选项列表；返回值会写回对应 optionGroup。
    loadOptions?: (
        payload: InputEngineLoadOptionsPayload,
    ) => Promise<InputEngineOptionDescriptor[] | void> | InputEngineOptionDescriptor[] | void;
    // 语音切换后的业务回调。
    onVoiceToggle?: (payload: InputEngineVoiceTogglePayload) => Promise<void> | void;
    // 全量事件观察回调，适合埋点或调试，不应在这里反向派发同类事件。
    onEvent?: (event: InputEngineEvent, state: InputEngineState) => void;
}

// 命令是暴露给外壳和插件的安全命令面，副作用应通过运行时适配器离开，而不是在这里直接调用应用接口。
export interface InputEngineCommands<TFile = unknown> {
    // 低层事件派发入口，插件优先使用更语义化的命令。
    dispatch: (event: InputEngineEvent) => void;
    // 更新完整编辑器值。
    updateEditor: (value: InputEngineEditorValue) => void;
    // 仅更新纯文本，适合简单 textarea 或快捷清空。
    updateText: (text: string) => void;
    // 选择输入模式。
    selectMode: (modeId: string) => void;
    // 切换工具状态，并触发运行时回调。
    toggleTool: (toolId: string, active?: boolean) => Promise<void>;
    // 选择选项组中的值，并触发运行时回调。
    selectOption: (groupId: string, value: string) => Promise<void>;
    // 加载某个选项组的远程选项。
    loadOptions: (groupId: string) => Promise<void>;
    // 切换语音状态，并触发运行时回调。
    toggleVoice: (active?: boolean) => Promise<void>;
    // 打开 + 工具菜单。
    openToolMenu: (anchorId?: string) => void;
    // 关闭 + 工具菜单。
    closeToolMenu: () => void;
    // 打开 slash 命令菜单。
    openSlashCommand: (query?: string, anchorId?: string) => void;
    // 关闭 slash 命令菜单。
    closeSlashCommand: () => void;
    // 更新 slash 命令过滤词。
    updateSlashCommandQuery: (query: string) => void;
    // 选择工具菜单项，内置项由命令处理，自定义项交给 runtime。
    selectToolMenuItem: (
        item: InputEngineToolMenuItemDescriptor,
        source?: InputEngineToolMenuSelectSource,
    ) => Promise<void>;
    // 添加文件并进入上传运行时契约。
    addFiles: (files: TFile[]) => Promise<void>;
    // 移除附件。
    removeAttachment: (id: string) => void;
    // 移除引用。
    removeReference: (id: string) => void;
    // 提交当前输入。
    submit: () => Promise<void>;
    // 停止当前提交或生成。
    stop: () => Promise<void>;
}

// 视图模型面向渲染且保持紧凑，外壳在布局输入框时不应重新执行业务策略判断。
export interface InputEngineViewModel {
    // 当前是否允许提交。
    canSubmit: boolean;
    // 不允许提交时的原因。
    disableReason?: string;
    // 当前激活模式完整描述。
    activeMode?: InputEngineModeDescriptor;
    // 当前设备和布局策略下实际可见的插槽。
    visibleSlots: InputEngineSlot[];
}
