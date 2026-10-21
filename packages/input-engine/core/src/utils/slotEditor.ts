import type {
    InputEngineEditorValue,
    InputEngineSlotConfig,
    InputEngineSkillConfig,
    InputEngineSlotOption,
    InputEngineSlotSkillConfig,
    InputEngineSlotTextConfig,
} from '../types';

export const INPUT_ENGINE_SLOT_INVISIBLE_CHAR = '\ufeff';

export function createInputEngineTextSlot(value: string): InputEngineSlotTextConfig {
    return {
        type: 'text',
        value,
    };
}

export function createInputEngineSkillSlot(
    skill: InputEngineSkillConfig,
): InputEngineSlotSkillConfig {
    return {
        closable: skill.closable,
        key: `skill-${skill.value}`,
        title: skill.title,
        type: 'skill',
        value: skill.value,
    };
}

export function getInputEngineSlotKey(config: InputEngineSlotConfig, index: number) {
    return config.type === 'text' ? `text-${index}` : config.key;
}

export function getInputEngineSlotValue(config: InputEngineSlotConfig) {
    if (config.value !== undefined) return config.value;
    if (config.type === 'input' || config.type === 'content' || config.type === 'custom') {
        return config.props?.defaultValue ?? '';
    }
    if (config.type === 'select') {
        return config.props?.defaultValue ?? '';
    }
    if (config.type === 'tag') {
        return config.props?.value ?? '';
    }
    if (config.type === 'skill') {
        return config.value ?? '';
    }
    return config.value ?? '';
}

export function getInputEngineSlotText(config: InputEngineSlotConfig) {
    const value = getInputEngineSlotValue(config);

    if (config.formatResult) {
        return config.formatResult(value);
    }

    if (config.type === 'text') {
        return String(config.value ?? '');
    }
    if (config.type === 'tag') {
        const label = config.props?.label;
        if (typeof label === 'string' || typeof label === 'number') {
            return String(label);
        }
    }

    // 保留内核的默认字符串投影契约；结构化值的展示由调用方通过 formatResult 指定。
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    return value === undefined || value === null ? '' : String(value);
}

export function normalizeInputEngineSlotOptions(
    options: Array<string | InputEngineSlotOption> = [],
) {
    return options.map<InputEngineSlotOption>((option) =>
        typeof option === 'string'
            ? {
                  label: option,
                  value: option,
              }
            : option,
    );
}

export function projectInputEngineSlotConfigText(slotConfig: InputEngineSlotConfig[] = []) {
    return slotConfig.map(getInputEngineSlotText).join('');
}

export function getInputEngineRenderableSlotConfig(
    value: InputEngineEditorValue,
): InputEngineSlotConfig[] {
    const baseSlotConfig =
        value.slotConfig ?? (value.text ? [createInputEngineTextSlot(value.text)] : []);
    if (!value.skill || baseSlotConfig.some((slot) => slot.type === 'skill')) {
        return baseSlotConfig;
    }

    // skill 是编辑器级能力，调用方只传 skill 时也应该自动出现在文本流组件岛中。
    return [createInputEngineSkillSlot(value.skill), ...baseSlotConfig];
}

export function normalizeInputEngineEditorValue(
    value: InputEngineEditorValue,
): InputEngineEditorValue {
    const slotConfig =
        value.slotConfig ?? (value.skill ? getInputEngineRenderableSlotConfig(value) : undefined);
    const slotText = slotConfig ? projectInputEngineSlotConfigText(slotConfig) : undefined;

    return {
        ...value,
        ...(slotConfig ? { slotConfig } : {}),
        text: slotText ?? value.text ?? '',
    };
}
