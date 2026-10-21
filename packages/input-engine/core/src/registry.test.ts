import { describe, expect, it, rs } from '@rstest/core';
import { createInputEngineState } from './kernel';
import {
    createInputEnginePreset,
    resolveInputEnginePresetConfig,
    resolveInputEnginePresetPlugins,
} from './presets';
import { resolveInputEnginePluginContributions } from './registry';
import { noopInputEngineRuntime } from './runtime';

interface TestContext {
    device: 'desktop' | 'mobile';
    enabled?: boolean;
}

interface TestContribution {
    slot: 'menu' | 'toolbar';
    device?: 'desktop' | 'mobile' | 'all';
    order?: number;
    appliesWhen?: (props: TestContext) => boolean;
    value: string;
}

interface TestPlugin {
    id: string;
    slots: Array<'menu' | 'toolbar'>;
    order?: number;
    appliesWhen?: (props: TestContext) => boolean;
    contributions?: TestContribution[];
}

describe('input-engine core registry and presets', () => {
    it('按插件和 contribution 规则解析通用贡献', () => {
        const plugins: TestPlugin[] = [
            {
                id: 'hidden',
                slots: ['menu'],
                appliesWhen: () => false,
                contributions: [{ slot: 'menu', value: 'hidden' }],
            },
            {
                id: 'mobile',
                slots: ['menu'],
                contributions: [{ slot: 'menu', device: 'mobile', value: 'mobile' }],
            },
            {
                id: 'second',
                order: 20,
                slots: ['menu'],
                contributions: [{ slot: 'menu', value: 'second' }],
            },
            {
                id: 'first',
                order: 10,
                slots: ['menu'],
                contributions: [{ slot: 'menu', order: 1, value: 'first' }],
            },
        ];

        expect(
            resolveInputEnginePluginContributions(plugins, 'menu', {
                device: 'desktop',
                enabled: true,
            }).map((item) => item.contribution.value),
        ).toEqual(['first', 'second']);
    });

    it('slots 只声明位置，不会兼容生成隐式 contribution', () => {
        const plugins: TestPlugin[] = [{ id: 'legacy', slots: ['menu'] }];

        expect(
            resolveInputEnginePluginContributions(plugins, 'menu', { device: 'desktop' }),
        ).toEqual([]);
    });

    it('解析 preset 配置和插件顺序', () => {
        const preset = createInputEnginePreset<TestPlugin>({
            id: 'preset',
            config: { copywriting: { placeholder: '预设文案' } },
            plugins: [{ id: 'preset-plugin', slots: ['toolbar'] }],
        });
        const externalPlugin: TestPlugin = { id: 'external-plugin', slots: ['toolbar'] };

        expect(resolveInputEnginePresetConfig([preset]).copywriting.placeholder).toBe('预设文案');
        expect(
            resolveInputEnginePresetPlugins([preset], [externalPlugin]).map((plugin) => plugin.id),
        ).toEqual(['preset-plugin', 'external-plugin']);
    });

    it('空 runtime 默认不执行副作用', async () => {
        const onEvent = rs.fn();

        expect(
            await noopInputEngineRuntime.submit?.({
                activeMode: 'default',
                attachments: [],
                editor: { text: '' },
                optionGroups: [],
                references: [],
                text: '',
                tools: [],
                voice: { active: false },
            }),
        ).toBeUndefined();
        noopInputEngineRuntime.onEvent?.(
            { type: 'FOCUS_CHANGED', focused: true },
            createInputEngineState(),
        );
        expect(onEvent).not.toHaveBeenCalled();
    });
});
