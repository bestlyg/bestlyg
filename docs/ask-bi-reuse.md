# ask-bi main 模块复用评估

本次读取 `/Users/bestlyg/Documents/projects/ask-bi` 的本地 `main`，固定提交为 `3c3d517fc0d9986b2bcfbb89ac698d1712fa9859`。该目录当时检出的是功能分支，因此源码通过 `git show <commit>:<path>` 读取和复制，没有使用检出分支上的文件。本地 `main` 与 `origin/main` 不同，本次结论只对应用户指定的本地 `main`。

评估依据是目录边界、包清单、公开入口、依赖及候选模块的关键实现和测试；没有把逐行审计整个仓库作为完成结论。

## 项目结构与迁移边界

- `node/packages/client` 和 `server` 是 React / Nest 主应用，共享协议分为 `core-shared`、`client-shared` 和 `server-shared`。插件、Rui Runtime、会话、权限及客户化代码大量依赖这些应用的宿主契约。
- `node/packages/input-engine` 将纯状态内核和 React 编辑器分开，是较清晰的复用边界。
- `node/packages/shared/preview`、`node/packages/file-editor` 分别封装文件预览和 Excel 导入、编辑、导出，可作为完整功能包评估，迁移成本主要在 UI 依赖、Worker 和后端存储接入。
- `mobius/packages` 中有 Agent、工具与记忆能力；例如 `xbrain-core` 通过 Provider / Store 接口隔离宿主。其 Python 运行环境和模型、存储接入不是当前 TypeScript 项目的直接依赖。
- `workspace-runtime` 是独立 Python 服务，负责 Linux UID、Git / S3 挂载和 code-server 会话，需要部署及身份边界配合。
- 按源仓库规则跳过已废弃的顶层 `python/`。`mobius-server-sdk` 的 README 也明确标记废弃，当前实现位于 Server 的 External/Mobius 模块。

当前项目已经有数字格式化、前缀树、文本流、SSE、配置值类型、日志、分页等同类共享能力。迁入时应比较实现差异，避免再引入一份平行工具。

## 本次落地

| 来源（均相对 ask-bi 根目录）                       | 当前项目位置                                  | 处理                                                                              |
| -------------------------------------------------- | --------------------------------------------- | --------------------------------------------------------------------------------- |
| `node/packages/input-engine/core/src/`             | `packages/input-engine/core/`                 | 复制全部 8 个实现/类型文件及 2 份测试，适配为独立工作区包 `@bestlyg/input-engine` |
| `node/packages/shared/core-shared/src/sse.ts`      | `packages/shared/core-shared/src/sse.ts`      | 合并原生 `Headers`、元组 headers 和非成功响应正文处理，保留当前已有导出           |
| `node/packages/shared/core-shared/src/sse.test.ts` | `packages/shared/core-shared/src/sse.test.ts` | 迁入流分块、生命周期、错误和终止测试，补充调用方 headers 与错误正文用例           |

输入内核迁入时发现：`isSubmitting` 分支返回可选的禁用文案，后续用文案真假计算 `canSubmit`，默认配置会允许重复提交。当前副本改为显式判断 `isSubmitting`，通过开始/完成提交测试验证；未改动 ask-bi 源仓库。

SSE 回归测试先在旧实现复现了原生 `Headers` 缺少默认请求头、元组 headers 请求未发出的错误；合并后统一通过原生 `Headers` 读取、补齐请求头，保留调用方指定的值，并透传非成功 HTTP 响应正文。

## 还值得迁入的模块

| 优先级 | 模块与来源                                                                  | 可复用价值                                                                        | 接入工作                                                                                                                         |
| ------ | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| 高     | `node/packages/shared/core-shared/src/chart-recommendation/`                | 表格字段分析、图表候选推荐和 ECharts option 生成，适合现有统计页面及 CSV 数据展示 | V2 依赖 `@antv/data-wizard`；V3 需要 Cordis、字段/模型规划契约和图表插件生命周期。应作为完整模块迁移并保留测试，不能只复制根入口 |
| 高     | `node/packages/shared/preview/`                                             | CSV、PDF、Office、图片、Markdown 等统一预览                                       | 替换 `@dipeak/icons`，处理 PDF/Office Worker、CSS 和资源路径；原包 React 18 / antd 5 peer 约束需与当前 React 19 / antd 6 对齐    |
| 中     | `node/packages/file-editor/core/`、`excel-editor/`、`server/`               | Excel / CSV 与 Univer workbook 转换，浏览器编辑，Node Worker 导入导出             | 一并处理 Univer、ExcelJS、XLSX、LuckyExcel、JSZip、Worker 输出；Nest 模块需要接入本项目鉴权、上传目录和清理策略                  |
| 中     | `node/packages/input-engine/react/`                                         | 在已迁入内核上提供桌面/移动输入框、附件、引用、Sender 与插件插槽                  | 依赖 Tiptap、ProseMirror、client/doc-shared 和图标；先移除业务依赖并适配 React / antd 版本，再接具体页面                         |
| 中     | `node/packages/shared/core-shared/src/locale-resource.ts` 及 `ui-locale.ts` | 多语言资源 key、空值、插值和组件占位符校验                                        | 先确定当前项目的支持语言、namespace 和 key 规则，再接构建检查；原规则包含 Ask-BI 的客户端/服务端约定                             |
| 中     | `node/packages/shared/preview/src/markdown/safe-url.tsx`                    | Markdown 链接和图片的协议白名单及链接 rel 处理                                    | 适合接入后续 Markdown 预览；它只负责 URL，不能替代 HTML 清理或 MDX 执行隔离                                                      |
| 低     | `node/packages/shared/client-shared/src/browser-storage.ts`                 | Storage 不存在时的内存后备、JSON 默认值                                           | 当前实现未捕获 Storage getter / 操作抛错；SSR 的模块级内存不能作为用户登录态存储。修正边界后再接入                               |

## 适合借鉴设计，暂不直接复制

- Server 的配置、错误治理、插件注册、权限和分布式通知：可借鉴入口注入、统一错误契约及生命周期，但直接复制会带入租户、项目、Prisma / Redis 和 Rui 宿主依赖。
- CLI 的命令层和终端 UI：分层值得参考；命令、凭据、服务与路由清单仍绑定 Ask-BI API，不能整体换名后直接运行。
- `xbrain-core` 与 `workspace-runtime`：边界清晰，但分别需要 Python 记忆系统与 Linux 工作区基础设施；应作为独立功能立项接入。
- `stream-file-line-by-line.ts`：当前逐行事件写入未处理 `write()` 背压，不宜照搬为大文件流工具。
- `timeout.ts`：仅创建拒绝用的计时 Promise，不取消底层任务，也没有竞争结束后的计时器清理；当前项目如需取消语义，应优先围绕 `AbortSignal` 设计。

本次新增输入内核已可单独构建和调用，应用页面尚未接入；上述候选尚未复制，不能视为已完成功能。

## 验证记录

- 输入内核、Core Shared 和客户端构建通过；新包的 ESM / CommonJS 公开入口均实际加载并验证了提交状态。
- `pnpm lint`、新包 `tsc --noEmit`、格式检查、`git diff --check` 通过。
- 新包冻结锁文件安装及工作区 `pnpm peers check` 通过。
- 全量 `pnpm test` 最终通过 49 个文件、368 项测试，包含生产服务、watch 模式和浏览器冒烟测试。
- 首轮全量中 367 项通过，浏览器用例因客户端构建同时替换产物而失败，trace 确认旧 JS 资源返回 404。构建结束后按稳定产物重跑全量通过；未改动或放宽断言。
