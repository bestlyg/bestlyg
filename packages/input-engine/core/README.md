# Input Engine Core

`@bestlyg/input-engine` 提供与 UI 框架无关的输入状态、事件归约器、配置合并、插件贡献排序及结构化文本投影。没有运行时依赖，可用于浏览器、Node 和 CLI。

源码及原有两份测试复制自 ask-bi 本地 `main` 的 `node/packages/input-engine/core/src/`，来源提交为 `3c3d517fc0d9986b2bcfbb89ac698d1712fa9859`。

迁入后的适配：

- 包名改为 `@bestlyg/input-engine`，通过 Rslib 输出 ESM、CommonJS 和类型声明。
- 测试使用当前仓库的共享 Rstest 配置，并纳入根 `test` 和 `test:unit`。
- 修复默认配置未提供禁用文案时，`isSubmitting` 状态仍返回 `canSubmit: true` 的问题；补充开始提交及完成提交的回归验证。
- 统一当前仓库的格式，其他内核行为沿用来源实现。

## 使用

消费包先声明 `"@bestlyg/input-engine": "workspace:^"`，然后执行工作区安装和本包构建。

```ts
import {
    createInputEngineState,
    deriveInputEngineViewModel,
    inputEngineReducer,
    resolveInputEngineConfig,
} from '@bestlyg/input-engine';

const config = resolveInputEngineConfig({
    policies: { maxAttachmentCount: 3 },
});
let state = createInputEngineState();
state = inputEngineReducer(state, {
    type: 'EDITOR_CHANGED',
    value: { text: '分析这份表格' },
});
const view = deriveInputEngineViewModel(state, config, 'desktop');
// view.canSubmit === true
state = inputEngineReducer(state, { type: 'SUBMIT_STARTED' });
// deriveInputEngineViewModel(state, config, 'desktop').canSubmit === false
```

`resolveInputEnginePluginContributions` 按插槽、设备、条件及顺序筛选插件贡献；`resolveInputEnginePresetConfig` 按预设顺序合并配置，调用方配置最后覆盖；`normalizeInputEngineEditorValue` 把文本、选择项、标签及技能投影为提交文本。

本包是可复用内核，尚未接入现有业务页面。UI、网络请求、上传、语音、IME 键盘处理及文本长度限制由消费方实现；`maxTextLength` 是提供给宿主的配置，归约器不会截断输入。`noopInputEngineRuntime` 可用于原型，真实业务应注入自己的适配器。

```sh
pnpm --filter @bestlyg/input-engine build
pnpm --filter @bestlyg/input-engine test
```
