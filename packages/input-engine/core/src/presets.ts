import type { InputEngineConfig, InputEnginePresetManifest } from './types';
import { resolveInputEngineConfig } from './config';

export function createInputEnginePreset<TPlugin = unknown>(
    preset: InputEnginePresetManifest<TPlugin>,
): InputEnginePresetManifest<TPlugin> {
    return preset;
}

// preset 按调用方传入顺序叠加；最后再合并外部 config，确保业务入口拥有最终覆盖权。
export function resolveInputEnginePresetConfig<TPlugin = unknown>(
    presets: Array<InputEnginePresetManifest<TPlugin>> = [],
    config?: InputEngineConfig,
) {
    return resolveInputEngineConfig(...presets.map((preset) => preset.config), config);
}

// preset 插件先于外部插件注册，外部插件可以通过相同 id 覆盖预设中的默认实现。
export function resolveInputEnginePresetPlugins<TPlugin = unknown>(
    presets: Array<InputEnginePresetManifest<TPlugin>> = [],
    plugins: TPlugin[] = [],
): TPlugin[] {
    return [...presets.flatMap((preset) => preset.plugins ?? []), ...plugins];
}
