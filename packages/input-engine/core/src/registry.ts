import type {
    InputEngineDevice,
    InputEnginePluginContributionBase,
    InputEngineResolvedPluginContributionBase,
} from './types';

interface ResolvablePluginContribution<
    TContext,
    TSlot extends string,
> extends InputEnginePluginContributionBase<TContext, TSlot> {}

interface ResolvablePlugin<TContext, TContribution, TSlot extends string> {
    id: string;
    slots: TSlot[];
    contributions?: TContribution[];
    order?: number;
    appliesWhen?: (props: TContext) => boolean;
}

function sortResolvedPluginContributions<
    TPlugin extends { id: string },
    TContribution,
    TSlot extends string,
>(
    a: InputEngineResolvedPluginContributionBase<TPlugin, TContribution, TSlot>,
    b: InputEngineResolvedPluginContributionBase<TPlugin, TContribution, TSlot>,
) {
    return a.order - b.order || a.plugin.id.localeCompare(b.plugin.id);
}

function normalizePluginContributions<
    TContext extends { device: InputEngineDevice },
    TSlot extends string,
    TContribution extends ResolvablePluginContribution<TContext, TSlot>,
    TPlugin extends ResolvablePlugin<TContext, TContribution, TSlot>,
>(plugin: TPlugin): TContribution[] {
    if (plugin.contributions?.length) {
        return plugin.contributions;
    }

    // slots 只声明能力位置，不再隐式生成 UI；真正渲染必须由 contributions 明确描述。
    return [];
}

// 插件 contribution 解析只依赖排序、设备和 appliesWhen 语义，可被 React 顶层插件和 launcher 子插件共用。
export function resolveInputEnginePluginContributions<
    TContext extends { device: InputEngineDevice },
    TSlot extends string,
    TContribution extends ResolvablePluginContribution<TContext, TSlot>,
    TPlugin extends ResolvablePlugin<TContext, TContribution, TSlot>,
>(plugins: TPlugin[], slot: TSlot, props: TContext) {
    return plugins
        .filter((plugin) => plugin.appliesWhen?.(props) ?? true)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || a.id.localeCompare(b.id))
        .flatMap((plugin) =>
            normalizePluginContributions<TContext, TSlot, TContribution, TPlugin>(plugin).map(
                (contribution) => ({
                    plugin,
                    contribution,
                }),
            ),
        )
        .filter(({ contribution }) => contribution.slot === slot)
        .filter(
            ({ contribution }) =>
                contribution.device === undefined ||
                contribution.device === 'all' ||
                contribution.device === props.device,
        )
        .filter(({ contribution }) => contribution.appliesWhen?.(props) ?? true)
        .map<InputEngineResolvedPluginContributionBase<TPlugin, TContribution, TSlot>>(
            ({ plugin, contribution }) => ({
                plugin,
                contribution,
                slot,
                order: contribution.order ?? plugin.order ?? 0,
            }),
        )
        .sort(sortResolvedPluginContributions);
}
