# 全仓库依赖升级分析 · 2026-10-20

结论：可以升级，但应分批执行。优先修复已命中安全公告的依赖，再处理需要同步升级的工具链，最后迁移有行为变化的大版本。当前 Node.js 24.22.0 满足本次候选版本所有已声明的 Node 引擎范围；主要约束来自 peer 依赖、类型声明、发布包对外兼容性和业务行为。

本轮仅分析，未修改 package.json、catalog、锁文件或业务源码，也未安装候选版本。以下“可升级”表示元数据及已检查的使用方式支持进入升级验证，不表示新版本已经通过构建或回归测试。

## 范围与统计口径

- 覆盖 44 个工作区包（含根目录）、204 项去重外部直接依赖、453 处外部依赖声明、70 处内部 workspace 依赖声明；包括 dependencies、devDependencies、optionalDependencies、peerDependencies。204 项均由默认 catalog 管理。
- 37 个工作区存在直接依赖更新。4 个工作区没有任何依赖：dipeak、module-checker、xidl 父包、@bestlyg/static；其余无需直接更新的包仍检查了锁文件和 peer 声明。
- 数据来自 npm 官方 registry，结合各包实际安装版本、独立锁文件、最新版本的 engines/peerDependencies/deprecated 元数据以及重点上游迁移说明。仓库仍配置 npmmirror；本轮没有修改 registry。
- 不能只看 `pnpm outdated`：其输出对部分 catalog 依赖采用声明下限。例如根目录 @types/node 已锁定 26.6.5，其他包仍为 26.1.1。本报告重新按实际版本计算。归一化 TypeScript npm alias 后，没有发现直接依赖安装版本与锁文件版本不一致。
- `sharedWorkspaceLockfile: false`，因此执行了 44 次完整 audit 和 44 次 `--prod` audit，88 份报告均成功返回。根目录单次递归命令的结果实际只覆盖根锁文件，不作为全仓库统计。
- 版本快照以本次直接查询 registry 的结果为准。扫描期间有新版本发布，因此部分版本比初始 outdated 输出更新；详细时间保存在证据文件中。

| 分类 | 去重依赖数 | 处理方式 |
| --- | ---: | --- |
| 最新版本在现有声明范围内 | 86 | 可分批更新；仍需处理联动依赖及回归 |
| 跨主版本 | 13 | 阅读迁移说明，结合实际调用点修改/验证 |
| 0.x 跨次版本，超出现有范围 | 5 | adm-zip、@types/adm-zip、KaTeX、Monaco、Oxfmt，按潜在破坏性变更处理 |
| 预发布版本更新 | 1 | c12 beta.5 → rc.2，独立验证 |
| 已达到当前 latest | 99 | 无需直接升版；仍可能有传递依赖告警或停维护问题 |
| **合计** | **204** | **105 项存在新版本** |

## 应最先处理的安全更新

按 GHSA 去重，全仓库命中 **190 项公告**：5 critical、77 high、89 moderate、19 low。生产依赖扫描命中其中 **127 项**：3 critical、53 high、56 moderate、15 low。34 个工作区的完整依赖图存在告警，8 个工作区的生产依赖图存在告警。

这些是锁文件版本命中公告的数量，不是已确认可利用漏洞数量。`--prod` 也包含 CLI/代码生成器等包的运行依赖，不代表全部部署到 Web 服务；workspace 链接需要结合所属包的独立审计理解。没有做攻击验证或完整可达性分析。

| 优先级 | 当前依赖/路径 | 建议目标 | 本仓库影响及验证 |
| --- | --- | --- | --- |
| P0 | server → express → proxy-addr 2.0.7 | proxy-addr ≥2.0.8；Express 5.2.1 → 5.3.0，并核对新锁图 | critical。检查代理 IP 解析；源码搜索未发现显式 `trust proxy` 配置，当前没有证明满足公告触发条件 |
| P0 | @bestlyg/xidl → handlebars 4.7.9 | 4.7.10 | 2 条 critical；renderTemplate 确实调用 compile。回归模板渲染及生成结果；未发现开启 allowProtoMethodsByDefault |
| P0 | root → oxfmt → tinypool 2.1.0 | tinypool ≥2.1.2 | 2 条 critical，属于开发工具链；核对 Oxfmt 更新或锁图刷新后的实际版本 |
| P1 | axios 1.18.1，5 个直接使用包 | 1.20.0，同时检查 form-data ≥4.0.6 | 多条 high；回归请求、重定向、上传以及服务端 URL 处理 |
| P1 | server → nodemailer 9.0.3 | 10.1.7 | 9.1.1 只修复部分告警，另有公告要求 ≥10.0.6。回归收件人解析、SMTP 配置和邮件构造 |
| P1 | cli/client → adm-zip 0.5.18 | 0.6.1 | ZIP 解压、内存分配等告警；0.6.0 仍不够；用内置类型替换 @types/adm-zip |
| P1 | server → compression 1.8.1 | 1.8.2 | high；回归响应提前关闭、SSE/流式响应及压缩行为 |
| P1 | client → react-router 8.2.0 | 8.5.0 | 公告修复下限为 8.3.0；验证路由、登录跳转和链接 |
| P1 | figlet 1.11.0 | 1.12.0 | 修复下限 1.11.3；涉及 root、cli、server-shared、xidl |
| P1 | cheerio → undici；pixi.js/docxtemplater → @xmldom/xmldom | 刷新到满足上游范围的已修复版本 | undici 7.x 至少覆盖到 7.29.1；xmldom 0.8.x ≥0.8.15、0.9.x ≥0.9.12，保留各自兼容分支 |
| P1/P2 | exceljs → archiver/unzipper/glob/minimatch/brace-expansion/tmp | 更新传递依赖并重新审计 | exceljs 本身 4.4.0 已是 latest，直接升版不能解决；尤其 server/server-shared 的旧锁图需要刷新 |

主要来源：[proxy-addr 公告](https://github.com/advisories/GHSA-jqcg-44mw-7w3h)、[Handlebars 公告](https://github.com/advisories/GHSA-p8wg-vrv2-v86f)、[Tinypool 公告](https://github.com/advisories/GHSA-85c8-ppgw-ccpr)、[Nodemailer 公告](https://github.com/advisories/GHSA-v53p-9fqp-m79j)。每项公告的全部路径、受影响版本及修复范围见附带 audit-summary.json。

另有 3 项公告在当前 registry 报告中没有已发布修复范围：braces、sprintf-js、svgo，当前均出现在开发依赖图。应先更新引入它们的上游链，检查能否移除旧依赖；若仍保留，记录具体用途并等待上游或替换组件。不能承诺执行一次 `audit --fix` 就全部清零，也不应统一强制覆盖到不兼容主版本。

## 必须联动升级或明确保留的组合

### Oxlint、tsgolint 与 TypeScript

- oxlint 1.73.0 → **1.89.0**，oxlint-tsgolint 0.24.0 → **7.0.2004** 应同步进行。新 Oxlint 声明 `oxlint-tsgolint >=7.0.2003`，单独升级 Oxlint 会留下不满足声明的组合。
- tsgolint 7.0.2004 的版本编码对应 TypeScript 7.0.2，并不是需要 TypeScript “7.0.2004”。本仓库已有 `@typescript/native = npm:typescript@^7.0.2`。
- 保留当前 `typescript = npm:@typescript/typescript6@^6.0.2` 与原生编译器并存的安排。TypeDoc 0.28.20 声明支持到 TS 6.0，Nest CLI 也使用 TS 6；不能将所有名为 typescript 的依赖直接替换为 7。
- Oxfmt 0.58.0 → 0.74.0 跨多个 0.x 次版本，单独检查格式化规则变化，避免把大规模格式差异混入业务修改。

依据：[tsgolint 稳定版与版本编码](https://oxc.rs/blog/2026-07-22-type-aware-linting-stable.html)、[类型检查兼容说明](https://oxc.rs/docs/guide/usage/linter/type-aware.html)，及本次 npm manifest 快照。

### 已存在的 peer 和类型问题

实际按每个已安装直接依赖的解析路径检查 peer 后发现 21 处范围不匹配，全部是 optional peer；没有发现无法解析的必需 peer：

1. **19 处 unbuild 3.6.1 → TypeScript 6.0.2**，上游声明仍为 `^5.9.2`。unbuild 本身没有更新版本可直接解决。已有构建成功不能等同于上游正式支持；应验证声明文件生成，决定保留兼容组合、为构建隔离编译器版本，或单独迁移构建工具。
2. **2 处 Vite 8.1.4 → esbuild 0.25.x**，分别在 client 和 generator-helpers，要求为 `^0.27.0 || ^0.28.0`。Vite 8.3.4 仍保留这一要求；需要检查可选 esbuild 使用路径与插件解析，升级 Vite 本身不会自动证明问题消失。
3. 当前 Node 运行时是 24.22.0，而 @types/node 混有 26.1.1、26.6.5。建议对齐 **24.x 类型线（本次最新 24.19.2）**，防止类型提示允许 Node 26 专属 API；这是对齐运行时，不是追逐 @types/node 的最新主版本。

仓库 `strictPeerDependencies: false` 会允许范围不满足的安装继续。以上检查覆盖直接依赖的已安装 peer 解析，不等同于检查所有传递包或实际执行所有可选功能。

### 前端框架与样式

React / React DOM **19.2.7 → 19.3.1**，@types/react / @types/react-dom 同步到 **19.3.0**。Ant Design **6.5.0 → 6.6.7**、Radix 27 个组件、react-hook-form、react-router、Recharts 等可按 UI 组升级，重点验证弹窗焦点、键盘交互、表单和布局。

Tailwind CSS、@tailwindcss/vite、@tailwindcss/postcss 同步 **4.3.2 → 4.3.3**；Vite **8.1.4 → 8.3.4** 与 @vitejs/plugin-react **6.0.3 → 6.1.2** 联合检查。shadcn CLI 更新不会自动刷新已复制到项目内的组件源码。

KaTeX 需特别处理：client 的 CSS 来自直接依赖 katex，而渲染使用 rehype-katex 7.0.1；后者仍依赖 `katex ^0.16.0`。直接将 CSS 对应版本从 0.17.0 改到 0.19.0 不会同步渲染器，需验证两者版本及公式样式，必要时调整集成方式。

### 服务端与测试框架

NestJS 12.2.0、Nest CLI/Schematics 12.0.9、Rspack 2.2.9、Rstest 三个包 0.12.4 已达本次 latest，可保留。TypeORM **1.0.0 → 1.1.2**、pg **8.22.0 → 8.23.1** 虽在范围内，仍须验证查询、事务和实体映射。

Playwright **1.61.1 → 1.64.1** 满足 @rstest/playwright 0.12.4 的 `^1.49.1` peer。升级时同步安装匹配的浏览器版本，重新跑浏览器测试。应先完成 client 构建再跑依赖预览产物的 E2E，避免构建过程替换 chunk 导致误报。

## 19 项超出现有范围的逐项判断

| 依赖 | 当前 → 候选 | 判断与本仓库重点 |
| --- | --- | --- |
| @changesets/cli | 2.31.0 → 3.0.3 | 与下面两项同步；Node/pnpm 满足要求；检查私有包版本策略、退出码及发布计划 |
| @changesets/get-release-plan | 4.0.16 → 5.0.2 | scripts/release.mjs 直接调用；5.x 仍保留 default export，可改用新增 named export，但本次不要求强制改写 |
| @changesets/types | 6.1.0 → 7.0.0 | 随发布工具组升级，不能独立留下旧类型 |
| @hookform/resolvers | 5.4.0 → 6.0.0 | 本次 breaking change 针对 Effect v4；项目登录表单使用 Zod，迁移成本预计低。仍回归表单错误与推断类型 |
| @types/jsdom | 28.0.3 → 30.0.0 | 与 jsdom 30 同步，修正当前类型主版本落后问题 |
| chalk | 5.6.2 → 6.0.1 | 主要提高 Node 下限到 22；当前环境满足。cscet/package-json-extension 等发布包需说明支持的 Node 下限 |
| dotenv | 17.4.2 → 18.0.8 | 检查配置加载优先级和日志。上游移除 .env.vault/preload 支持，提示日志改 stderr；已检查的源码使用 config/parse，未发现依赖被移除入口 |
| jotai | 2.20.1 → 3.0.1 | 变为 ESM，移除部分 util；源码使用 atom/hooks/atomWithStorage，未发现 atomFamily/loadable/setSelf。需验证登录状态持久化及订阅时序 |
| jsdom | 29.1.1 → 30.1.3 | CLI vendor 再导出，对使用方也有影响；Node 要求 ^22.22.2 / ^24.15.0 / ≥26，项目 runtime 满足，系统裸 node 22.19.0 不满足 |
| nanoid | 5.1.16 → 6.0.2 | 移除 Node 18/20 支持；验证 trace ID、自定义 alphabet、前端调用及共享包输出 |
| nodemailer | 9.0.3 → 10.1.7 | 建议安全批次处理；10.x 自带 TS 类型且提供 ESM/CJS，移除 @types/nodemailer 前先检查实际类型解析。测试邮件构造、SMTP 连接与失败分支 |
| oxlint-tsgolint | 0.24.0 → 7.0.2004 | 与 Oxlint 同步；检查新增类型规则以及现有 TS 选项 |
| p-queue | 9.3.1 → 10.0.0 | EventEmitter → EventTarget；clear() 取消任务行为改变。best-uploader 公开 tasks 对象且调用 clear，属于对外 API/行为迁移 |
| @types/adm-zip | 0.5.8 → 0.6.0 | 最新已是弃用的占位类型包；建议升级 adm-zip 后移除它，而非继续安装 0.6.0 |
| adm-zip | 0.5.18 → 0.6.1 | 安全更新优先；回归解压、路径和尺寸限制，配合内置类型 |
| katex | 0.17.0 → 0.19.0 | 先解决直接 CSS 与 rehype-katex 内部渲染版本的配套问题 |
| monaco-editor | 0.55.1 → 0.57.0 | 项目使用多个 esm worker 深层路径以及 languages.typescript 配置，需验证 worker 加载、语法服务与编辑器生命周期 |
| oxfmt | 0.58.0 → 0.74.0 | 0.x 跨次版本；验证格式规则及 tinypool 告警是否消除 |
| c12 | 4.0.0-beta.5 → 4.0.0-rc.2 | 仍是预发布；rc.2 将 watcher 改为原生 node:fs，server/e2e/xidl 的配置加载、热重载、环境覆盖单独验证 |

主要依据：[Changesets 迁移指南](https://changesets.dev/guide/migration)、[get-release-plan 变更记录](https://raw.githubusercontent.com/changesets/changesets/main/packages/get-release-plan/CHANGELOG.md)、[resolvers 6](https://github.com/react-hook-form/resolvers/releases/tag/v6.0.0)、[Jotai 3](https://jotai.org/docs/guides/migrating-to-v3)、[p-queue 10](https://github.com/sindresorhus/p-queue/releases/tag/v10.0.0)、[Nodemailer 10](https://github.com/nodemailer/nodemailer/releases/tag/v10.0.0)、[Chalk 6](https://github.com/chalk/chalk/releases/tag/v6.0.0)、[Nano ID 6](https://github.com/ai/nanoid/releases/tag/6.0.0)、[dotenv 记录](https://github.com/motdotla/dotenv/blob/master/CHANGELOG.md)、[c12 记录](https://raw.githubusercontent.com/unjs/c12/main/CHANGELOG.md)。迁移成本判断结合了本仓库源码；尚未安装候选版本验证。

如先留在旧主版本，也有保守更新：Changesets CLI 2.31.1、resolvers 5.9.2、Jotai 2.20.3、p-queue 9.3.5。Nodemailer 虽有 9.1.1，但不能覆盖本次全部安全告警，因此不作为完成修复的终点。

## 停维护依赖与可清理项

- **crypto-js 4.2.0**：npm 明确标记停止维护，没有更高版本。core-shared 和 server-shared 实际使用 AES-CBC、Pkcs7、Base64，且公开类型包含 CryptoJS 类型。需独立设计 Node crypto / Web Crypto 替换，保持旧密文、UTF-8、padding 和同步/异步调用语义的兼容；不能只删除依赖。
- **shadcn-ui 0.9.5**：已弃用；client 同时安装新 shadcn CLI。源码和脚本未找到旧 CLI 调用，建议移除旧包，统一使用 shadcn。
- **@types/adm-zip**：最新为占位包，按上节处理。
- inquirer、figlet、tapable 的当前发布包均自带类型，仓库还声明了对应 @types 包。它们是待核查的冗余候选，删除前应验证导出的声明文件及类型解析，不应仅凭版本号不同认定冲突。

停维护信息来自本次 npm 官方 manifest，完整原因保存在 registry-latest.json。

## 建议实施顺序与验收

1. **安全修复批次**：Handlebars、Axios、compression、figlet、Express 传递链、adm-zip；Nodemailer 10 单独验证后并入。刷新仍在兼容范围内的漏洞传递依赖，逐包重新 audit。
2. **工具链批次**：Oxlint + tsgolint、Oxfmt，核查 unbuild/TS、Vite/esbuild 和 Node 类型。Changesets 3 单独验证发布计划，测试不能调用当前 scripts/release.mjs 的真实 publish 流程。
3. **应用更新批次**：React/类型/UI、Tailwind/Vite、服务端 ORM/数据库驱动、Less 插件、文档工具和 Playwright；按消费者分组回归。
4. **行为迁移批次**：Jotai、p-queue、Monaco、KaTeX、c12；按实际功能决定优先级。CryptoJS 替换作为独立兼容性任务。

版本与锁文件应一起审阅。此仓库有独立锁文件，不能只修改根锁文件；catalog 的版本变化需同步相关工作区。oxfmt 0.74.0、oxlint 1.89.0、antd 6.6.7 等在 10 月 19–20 日刚发布，实施时应遵守项目的发布冷却策略，必要时选已观察的前一版本；本报告中的 latest 是候选，不是立即全量安装指令。

验证至少包括：冻结锁文件安装、peer 范围检查、lint/类型检查、受影响包 build、既有单元测试、先构建再跑完整 E2E，以及以下专项：邮件构造/模拟 SMTP、配置热重载、数据库事务、ZIP 解压、模板生成、上传队列取消、Monaco workers、KaTeX 样式。公开发布包增加 ESM/CJS 消费及声明文件验证，并明确新的 Node 支持下限。本轮未执行这些候选版本的验证。

## 证据文件

- [逐依赖与逐包快照](/Users/bestlyg/projects/bestlyg/.codex_tmp/dependency-audit-2026-10-20/dependency-snapshot.json)：版本范围、真实版本、最新版本、使用方、分类、发布时间、peer 结果。
- [全部安全公告与路径](/Users/bestlyg/projects/bestlyg/.codex_tmp/dependency-audit-2026-10-20/audit-summary.json)：190 个 GHSA 的去重结果及 all/prod 路径。
- [npm 最新 manifest 摘要](/Users/bestlyg/projects/bestlyg/.codex_tmp/dependency-audit-2026-10-20/registry-latest.json)：engines、peer、弃用信息、dependencies、exports。
- [88 次审计执行索引](/Users/bestlyg/projects/bestlyg/.codex_tmp/dependency-audit-2026-10-20/audit-index.json)：每个工作区的退出码和审计元数据。退出码 1 在这些有效报告中表示发现告警。


## 全部 44 个工作区

“更新”按每个工作区实际安装版本计算；“需单独计划”指跨主版本、超范围的 0.x 更新或预发布更新，不包含范围内但需要联动的升级。安全列均按该包的 GHSA 去重，不能把各行相加作为全仓库漏洞数。表中的编号用于下一表定位使用方。

| 编号 | 包 / manifest | 外部依赖数 | 可更新数 | 需单独计划 | 安全公告 全部 / 生产 |
| --- | --- | ---: | ---: | ---: | ---: |
| 01 | [bestlyg](/Users/bestlyg/projects/bestlyg/package.json) | 18 | 10 | 6 | 22 / 0 |
| 02 | [@bestlyg/cli](/Users/bestlyg/projects/bestlyg/packages/cli/package.json) | 33 | 14 | 5 | 70 / 49 |
| 03 | [@bestlyg/client](/Users/bestlyg/projects/bestlyg/packages/client/package.json) | 102 | 70 | 7 | 137 / 52 |
| 04 | [@bestlyg/code](/Users/bestlyg/projects/bestlyg/packages/code/package.json) | 4 | 2 | 0 | 0 / 0 |
| 05 | [@bestlyg/e2e](/Users/bestlyg/projects/bestlyg/packages/e2e/package.json) | 15 | 6 | 2 | 20 / 0 |
| 06 | [@bestlyg/icons](/Users/bestlyg/projects/bestlyg/packages/icons/package.json) | 11 | 4 | 0 | 19 / 0 |
| 07 | [@bestlyg/input-engine](/Users/bestlyg/projects/bestlyg/packages/input-engine/core/package.json) | 4 | 0 | 0 | 0 / 0 |
| 08 | [cscet](/Users/bestlyg/projects/bestlyg/packages/npm/china-software-copyright-extraction-tool/package.json) | 14 | 4 | 1 | 35 / 13 |
| 09 | [dipeak](/Users/bestlyg/projects/bestlyg/packages/npm/dipeak/package.json) | 0 | 0 | 0 | 0 / 0 |
| 10 | [generator-helpers](/Users/bestlyg/projects/bestlyg/packages/npm/generator-helpers/package.json) | 8 | 3 | 0 | 20 / 0 |
| 11 | [less-plugins](/Users/bestlyg/projects/bestlyg/packages/npm/less-plugins/package.json) | 3 | 1 | 0 | 0 / 0 |
| 12 | [@less-plugins/css-logical](/Users/bestlyg/projects/bestlyg/packages/npm/less-plugins/packages/css-logical/package.json) | 4 | 1 | 0 | 6 / 0 |
| 13 | [less-plugin-define-var](/Users/bestlyg/projects/bestlyg/packages/npm/less-plugins/packages/define-var/package.json) | 8 | 3 | 0 | 6 / 0 |
| 14 | [@less-plugins/get-current-package-name](/Users/bestlyg/projects/bestlyg/packages/npm/less-plugins/packages/get-current-package-name/package.json) | 4 | 1 | 0 | 6 / 0 |
| 15 | [@less-plugins/get-current-package-scope](/Users/bestlyg/projects/bestlyg/packages/npm/less-plugins/packages/get-current-package-scope/package.json) | 4 | 1 | 0 | 6 / 0 |
| 16 | [@less-plugins/get-env](/Users/bestlyg/projects/bestlyg/packages/npm/less-plugins/packages/get-env/package.json) | 4 | 1 | 0 | 6 / 0 |
| 17 | [@less-plugins/get-hashed-version](/Users/bestlyg/projects/bestlyg/packages/npm/less-plugins/packages/get-hashed-version/package.json) | 6 | 1 | 0 | 6 / 0 |
| 18 | [@less-plugins/get-package-info](/Users/bestlyg/projects/bestlyg/packages/npm/less-plugins/packages/get-package-info/package.json) | 5 | 1 | 0 | 6 / 0 |
| 19 | [@less-plugins/get-package-json-field](/Users/bestlyg/projects/bestlyg/packages/npm/less-plugins/packages/get-package-json-field/package.json) | 4 | 1 | 0 | 6 / 0 |
| 20 | [@less-plugins/playground](/Users/bestlyg/projects/bestlyg/packages/npm/less-plugins/packages/playground/package.json) | 4 | 1 | 0 | 6 / 0 |
| 21 | [@less-plugins/replace-properties](/Users/bestlyg/projects/bestlyg/packages/npm/less-plugins/packages/replace-properties/package.json) | 4 | 1 | 0 | 6 / 0 |
| 22 | [@less-plugins/rtl](/Users/bestlyg/projects/bestlyg/packages/npm/less-plugins/packages/rtl/package.json) | 4 | 1 | 0 | 6 / 0 |
| 23 | [@less-plugins/shared](/Users/bestlyg/projects/bestlyg/packages/npm/less-plugins/packages/shared/package.json) | 4 | 1 | 0 | 0 / 0 |
| 24 | [@less-plugins/template](/Users/bestlyg/projects/bestlyg/packages/npm/less-plugins/packages/template/package.json) | 4 | 1 | 0 | 6 / 0 |
| 25 | [md2resume](/Users/bestlyg/projects/bestlyg/packages/npm/md2resume/package.json) | 12 | 5 | 1 | 22 / 0 |
| 26 | [metadata-file](/Users/bestlyg/projects/bestlyg/packages/npm/metadata-file/package.json) | 1 | 0 | 0 | 0 / 0 |
| 27 | [module-checker](/Users/bestlyg/projects/bestlyg/packages/npm/module-checker/package.json) | 0 | 0 | 0 | 0 / 0 |
| 28 | [package-json-extension](/Users/bestlyg/projects/bestlyg/packages/npm/package-json-extension/package.json) | 11 | 3 | 1 | 22 / 0 |
| 29 | [template](/Users/bestlyg/projects/bestlyg/packages/npm/template/package.json) | 2 | 0 | 0 | 0 / 0 |
| 30 | [best-uploader](/Users/bestlyg/projects/bestlyg/packages/npm/uploader/package.json) | 8 | 2 | 1 | 22 / 0 |
| 31 | [xidl](/Users/bestlyg/projects/bestlyg/packages/npm/xidl/package.json) | 0 | 0 | 0 | 0 / 0 |
| 32 | [@xidl/core](/Users/bestlyg/projects/bestlyg/packages/npm/xidl/packages/core/package.json) | 4 | 1 | 0 | 22 / 0 |
| 33 | [@xidl/python-core](/Users/bestlyg/projects/bestlyg/packages/npm/xidl/packages/language/python/core/package.json) | 4 | 1 | 0 | 27 / 0 |
| 34 | [@xidl/typescript-client](/Users/bestlyg/projects/bestlyg/packages/npm/xidl/packages/language/typescript/client/package.json) | 4 | 1 | 0 | 22 / 0 |
| 35 | [@xidl/typescript-core](/Users/bestlyg/projects/bestlyg/packages/npm/xidl/packages/language/typescript/core/package.json) | 4 | 1 | 0 | 22 / 0 |
| 36 | [@xidl/typescript-server](/Users/bestlyg/projects/bestlyg/packages/npm/xidl/packages/language/typescript/server/package.json) | 4 | 1 | 0 | 22 / 0 |
| 37 | [@xidl/playground](/Users/bestlyg/projects/bestlyg/packages/npm/xidl/packages/playground/package.json) | 4 | 3 | 0 | 14 / 13 |
| 38 | [@xidl/shared](/Users/bestlyg/projects/bestlyg/packages/npm/xidl/packages/shared/package.json) | 12 | 3 | 0 | 22 / 0 |
| 39 | [@bestlyg/server](/Users/bestlyg/projects/bestlyg/packages/server/package.json) | 56 | 21 | 5 | 56 / 45 |
| 40 | [@bestlyg/client-shared](/Users/bestlyg/projects/bestlyg/packages/shared/client-shared/package.json) | 6 | 2 | 0 | 32 / 13 |
| 41 | [@bestlyg/core-shared](/Users/bestlyg/projects/bestlyg/packages/shared/core-shared/package.json) | 17 | 7 | 1 | 24 / 0 |
| 42 | [@bestlyg/server-shared](/Users/bestlyg/projects/bestlyg/packages/shared/server-shared/package.json) | 14 | 5 | 0 | 22 / 9 |
| 43 | [@bestlyg/static](/Users/bestlyg/projects/bestlyg/packages/static/package.json) | 0 | 0 | 0 | 0 / 0 |
| 44 | [@bestlyg/xidl](/Users/bestlyg/projects/bestlyg/packages/xidl/package.json) | 18 | 7 | 1 | 23 / 4 |

## 全部 204 项外部直接依赖

当前版本来自安装记录并与锁文件核对；多版本表示不同工作区未统一。`范围内` 仅为 semver 判断，不代表无需回归；`已最新` 也不代表其传递依赖无告警。npm alias 已按真实包名解析，未把 TypeScript 6 的兼容包误判为待升级到 TypeScript 7。使用方编号对应上一表。每项直接声明所在 dependencies/devDependencies/peerDependencies 见 JSON 快照。

| 依赖 | catalog 范围 | 当前版本 | latest 候选 | 判断 | 使用方编号 |
| --- | --- | --- | --- | --- | --- |
| [@ant-design/cssinjs](https://www.npmjs.com/package/@ant-design/cssinjs) | `^2.1.2` | 2.1.2 | 2.1.2 | 已最新 | 03 |
| [@ant-design/icons-svg](https://www.npmjs.com/package/@ant-design/icons-svg) | `^4.5.0` | 4.5.0 | 4.6.0 | 范围内 | 25 |
| [@changesets/cli](https://www.npmjs.com/package/@changesets/cli) | `^2.31.0` | 2.31.0 | 3.0.3 | 跨主版本 | 01 |
| [@changesets/get-release-plan](https://www.npmjs.com/package/@changesets/get-release-plan) | `^4.0.16` | 4.0.16 | 5.0.2 | 跨主版本 | 01 |
| [@changesets/types](https://www.npmjs.com/package/@changesets/types) | `^6.1.0` | 6.1.0 | 7.0.0 | 跨主版本 | 01 |
| [@commitlint/cli](https://www.npmjs.com/package/@commitlint/cli) | `^21.2.1` | 21.2.1 | 21.2.4 | 范围内 | 01 |
| [@commitlint/config-conventional](https://www.npmjs.com/package/@commitlint/config-conventional) | `^21.2.0` | 21.2.0 | 21.2.4 | 范围内 | 01 |
| [@emotion/hash](https://www.npmjs.com/package/@emotion/hash) | `^0.9.2` | 0.9.2 | 0.9.2 | 已最新 | 17 |
| [@hookform/resolvers](https://www.npmjs.com/package/@hookform/resolvers) | `^5.4.0` | 5.4.0 | 6.0.0 | 跨主版本 | 03 |
| [@manypkg/get-packages](https://www.npmjs.com/package/@manypkg/get-packages) | `^3.1.0` | 3.1.0 | 3.1.0 | 已最新 | 01, 02 |
| [@mdx-js/mdx](https://www.npmjs.com/package/@mdx-js/mdx) | `^3.1.1` | 3.1.1 | 3.1.1 | 已最新 | 03 |
| [@microsoft/fetch-event-source](https://www.npmjs.com/package/@microsoft/fetch-event-source) | `^2.0.1` | 2.0.1 | 2.0.1 | 已最新 | 03 |
| [@nestjs/cli](https://www.npmjs.com/package/@nestjs/cli) | `^12.0.9` | 12.0.9 | 12.0.9 | 已最新 | 39 |
| [@nestjs/common](https://www.npmjs.com/package/@nestjs/common) | `^12.2.0` | 12.2.0 | 12.2.0 | 已最新 | 39 |
| [@nestjs/config](https://www.npmjs.com/package/@nestjs/config) | `^12.0.1` | 12.0.1 | 12.0.1 | 已最新 | 39 |
| [@nestjs/core](https://www.npmjs.com/package/@nestjs/core) | `^12.2.0` | 12.2.0 | 12.2.0 | 已最新 | 39 |
| [@nestjs/jwt](https://www.npmjs.com/package/@nestjs/jwt) | `^12.0.3` | 12.0.3 | 12.0.3 | 已最新 | 39 |
| [@nestjs/platform-express](https://www.npmjs.com/package/@nestjs/platform-express) | `^12.2.0` | 12.2.0 | 12.2.0 | 已最新 | 39 |
| [@nestjs/schedule](https://www.npmjs.com/package/@nestjs/schedule) | `^12.0.2` | 12.0.2 | 12.0.2 | 已最新 | 39 |
| [@nestjs/schematics](https://www.npmjs.com/package/@nestjs/schematics) | `^12.0.9` | 12.0.9 | 12.0.9 | 已最新 | 39 |
| [@nestjs/serve-static](https://www.npmjs.com/package/@nestjs/serve-static) | `^12.0.0` | 12.0.0 | 12.0.0 | 已最新 | 39 |
| [@nestjs/testing](https://www.npmjs.com/package/@nestjs/testing) | `^12.2.0` | 12.2.0 | 12.2.0 | 已最新 | 39 |
| [@nestjs/typeorm](https://www.npmjs.com/package/@nestjs/typeorm) | `^12.0.2` | 12.0.2 | 12.0.2 | 已最新 | 39 |
| [@pixi/sound](https://www.npmjs.com/package/@pixi/sound) | `^6.0.1` | 6.0.1 | 6.0.1 | 已最新 | 03 |
| [@radix-ui/react-accordion](https://www.npmjs.com/package/@radix-ui/react-accordion) | `^1.2.16` | 1.2.16 | 1.3.1 | 范围内 | 03 |
| [@radix-ui/react-alert-dialog](https://www.npmjs.com/package/@radix-ui/react-alert-dialog) | `^1.1.19` | 1.1.19 | 1.2.1 | 范围内 | 03 |
| [@radix-ui/react-aspect-ratio](https://www.npmjs.com/package/@radix-ui/react-aspect-ratio) | `^1.1.11` | 1.1.11 | 1.2.0 | 范围内 | 03 |
| [@radix-ui/react-avatar](https://www.npmjs.com/package/@radix-ui/react-avatar) | `^1.2.2` | 1.2.2 | 1.3.1 | 范围内 | 03 |
| [@radix-ui/react-checkbox](https://www.npmjs.com/package/@radix-ui/react-checkbox) | `^1.3.7` | 1.3.7 | 1.4.1 | 范围内 | 03 |
| [@radix-ui/react-collapsible](https://www.npmjs.com/package/@radix-ui/react-collapsible) | `^1.1.16` | 1.1.16 | 1.2.1 | 范围内 | 03 |
| [@radix-ui/react-context-menu](https://www.npmjs.com/package/@radix-ui/react-context-menu) | `^2.3.3` | 2.3.3 | 2.4.1 | 范围内 | 03 |
| [@radix-ui/react-dialog](https://www.npmjs.com/package/@radix-ui/react-dialog) | `^1.1.19` | 1.1.19 | 1.3.1 | 范围内 | 03 |
| [@radix-ui/react-dropdown-menu](https://www.npmjs.com/package/@radix-ui/react-dropdown-menu) | `^2.1.20` | 2.1.20 | 2.2.1 | 范围内 | 03 |
| [@radix-ui/react-hover-card](https://www.npmjs.com/package/@radix-ui/react-hover-card) | `^1.1.19` | 1.1.19 | 1.2.1 | 范围内 | 03 |
| [@radix-ui/react-label](https://www.npmjs.com/package/@radix-ui/react-label) | `^2.1.11` | 2.1.11 | 2.1.17 | 范围内 | 03 |
| [@radix-ui/react-menubar](https://www.npmjs.com/package/@radix-ui/react-menubar) | `^1.1.20` | 1.1.20 | 1.2.1 | 范围内 | 03 |
| [@radix-ui/react-navigation-menu](https://www.npmjs.com/package/@radix-ui/react-navigation-menu) | `^1.2.18` | 1.2.18 | 1.4.1 | 范围内 | 03 |
| [@radix-ui/react-popover](https://www.npmjs.com/package/@radix-ui/react-popover) | `^1.1.19` | 1.1.19 | 1.3.1 | 范围内 | 03 |
| [@radix-ui/react-progress](https://www.npmjs.com/package/@radix-ui/react-progress) | `^1.1.12` | 1.1.12 | 1.2.1 | 范围内 | 03 |
| [@radix-ui/react-radio-group](https://www.npmjs.com/package/@radix-ui/react-radio-group) | `^1.4.3` | 1.4.3 | 1.5.1 | 范围内 | 03 |
| [@radix-ui/react-scroll-area](https://www.npmjs.com/package/@radix-ui/react-scroll-area) | `^1.2.14` | 1.2.14 | 1.4.0 | 范围内 | 03 |
| [@radix-ui/react-select](https://www.npmjs.com/package/@radix-ui/react-select) | `^2.3.3` | 2.3.3 | 2.4.1 | 范围内 | 03 |
| [@radix-ui/react-separator](https://www.npmjs.com/package/@radix-ui/react-separator) | `^1.1.11` | 1.1.11 | 1.2.0 | 范围内 | 03 |
| [@radix-ui/react-slider](https://www.npmjs.com/package/@radix-ui/react-slider) | `^1.4.3` | 1.4.3 | 1.6.1 | 范围内 | 03 |
| [@radix-ui/react-slot](https://www.npmjs.com/package/@radix-ui/react-slot) | `^1.3.0` | 1.3.0 | 1.5.0 | 范围内 | 03 |
| [@radix-ui/react-switch](https://www.npmjs.com/package/@radix-ui/react-switch) | `^1.3.3` | 1.3.3 | 1.4.1 | 范围内 | 03 |
| [@radix-ui/react-tabs](https://www.npmjs.com/package/@radix-ui/react-tabs) | `^1.1.17` | 1.1.17 | 1.2.1 | 范围内 | 03 |
| [@radix-ui/react-toast](https://www.npmjs.com/package/@radix-ui/react-toast) | `^1.2.19` | 1.2.19 | 1.3.1 | 范围内 | 03 |
| [@radix-ui/react-toggle](https://www.npmjs.com/package/@radix-ui/react-toggle) | `^1.1.14` | 1.1.14 | 1.2.1 | 范围内 | 03 |
| [@radix-ui/react-toggle-group](https://www.npmjs.com/package/@radix-ui/react-toggle-group) | `^1.1.15` | 1.1.15 | 1.2.1 | 范围内 | 03 |
| [@radix-ui/react-tooltip](https://www.npmjs.com/package/@radix-ui/react-tooltip) | `^1.2.12` | 1.2.12 | 1.4.1 | 范围内 | 03 |
| [@rspack/core](https://www.npmjs.com/package/@rspack/core) | `^2.2.9` | 2.2.9 | 2.2.9 | 已最新 | 39 |
| [@rstest/core](https://www.npmjs.com/package/@rstest/core) | `^0.12.4` | 0.12.4 | 0.12.4 | 已最新 | 01, 04, 05, 07, 08, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 26, 28, 39, 41, 42 |
| [@rstest/coverage-v8](https://www.npmjs.com/package/@rstest/coverage-v8) | `^0.12.4` | 0.12.4 | 0.12.4 | 已最新 | 39 |
| [@rstest/playwright](https://www.npmjs.com/package/@rstest/playwright) | `^0.12.4` | 0.12.4 | 0.12.4 | 已最新 | 05 |
| [@tailwindcss/postcss](https://www.npmjs.com/package/@tailwindcss/postcss) | `^4.3.2` | 4.3.2 | 4.3.3 | 范围内 | 03 |
| [@tailwindcss/vite](https://www.npmjs.com/package/@tailwindcss/vite) | `^4.3.2` | 4.3.2 | 4.3.3 | 范围内 | 03 |
| [@types/adm-zip](https://www.npmjs.com/package/@types/adm-zip) | `^0.5.8` | 0.5.8 | 0.6.0 | 0.x 超范围；建议移除类型占位包 | 02 |
| [@types/compression](https://www.npmjs.com/package/@types/compression) | `^1.8.1` | 1.8.1 | 1.8.1 | 已最新 | 39 |
| [@types/cookie-parser](https://www.npmjs.com/package/@types/cookie-parser) | `^1.4.10` | 1.4.10 | 1.4.10 | 已最新 | 39 |
| [@types/crypto-js](https://www.npmjs.com/package/@types/crypto-js) | `^4.2.2` | 4.2.2 | 4.2.2 | 已最新 | 41, 42 |
| [@types/doctrine](https://www.npmjs.com/package/@types/doctrine) | `^0.0.9` | 0.0.9 | 0.0.9 | 已最新 | 02 |
| [@types/express](https://www.npmjs.com/package/@types/express) | `^5.0.6` | 5.0.6 | 5.0.6 | 已最新 | 39, 41 |
| [@types/figlet](https://www.npmjs.com/package/@types/figlet) | `^1.7.0` | 1.7.0 | 1.7.0 | 已最新 | 02, 42 |
| [@types/fs-extra](https://www.npmjs.com/package/@types/fs-extra) | `^11.0.4` | 11.0.4 | 11.0.4 | 已最新 | 02, 38, 39, 42, 44 |
| [@types/inquirer](https://www.npmjs.com/package/@types/inquirer) | `^9.0.10` | 9.0.10 | 9.0.10 | 已最新 | 02 |
| [@types/jsdom](https://www.npmjs.com/package/@types/jsdom) | `^28.0.3` | 28.0.3 | 30.0.0 | 跨主版本 | 02 |
| [@types/less](https://www.npmjs.com/package/@types/less) | `^3.0.8` | 3.0.8 | 3.0.8 | 已最新 | 11, 13, 17, 18 |
| [@types/lodash](https://www.npmjs.com/package/@types/lodash) | `^4.17.24` | 4.17.24 | 4.17.26 | 范围内 | 02, 03, 04, 10, 25, 39, 44 |
| [@types/lodash-es](https://www.npmjs.com/package/@types/lodash-es) | `^4.17.12` | 4.17.12 | 4.17.12 | 已最新 | 38 |
| [@types/minimist](https://www.npmjs.com/package/@types/minimist) | `^1.2.5` | 1.2.5 | 1.2.5 | 已最新 | 02 |
| [@types/multer](https://www.npmjs.com/package/@types/multer) | `^2.2.0` | 2.2.0 | 2.3.0 | 范围内 | 39 |
| [@types/mustache](https://www.npmjs.com/package/@types/mustache) | `^4.2.6` | 4.2.6 | 4.2.6 | 已最新 | 44 |
| [@types/node](https://www.npmjs.com/package/@types/node) | `^26.1.1` | 26.1.1, 26.6.5 | 26.6.5 | 范围内 | 01, 02, 03, 04, 05, 06, 07, 08, 10, 11, 13, 25, 28, 30, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 44 |
| [@types/nodemailer](https://www.npmjs.com/package/@types/nodemailer) | `^8.0.1` | 8.0.1 | 8.0.2 | 范围内 | 39 |
| [@types/ramda](https://www.npmjs.com/package/@types/ramda) | `^0.32.0` | 0.32.0 | 0.32.0 | 已最新 | 08, 30 |
| [@types/react](https://www.npmjs.com/package/@types/react) | `^19.2.17` | 19.2.17 | 19.3.0 | 范围内 | 03, 06 |
| [@types/react-dom](https://www.npmjs.com/package/@types/react-dom) | `^19.2.3` | 19.2.4 | 19.3.0 | 范围内 | 03 |
| [@types/react-syntax-highlighter](https://www.npmjs.com/package/@types/react-syntax-highlighter) | `^15.5.13` | 15.5.13 | 15.5.13 | 已最新 | 03 |
| [@types/semver](https://www.npmjs.com/package/@types/semver) | `^7.7.1` | 7.7.1 | 7.8.0 | 范围内 | 02 |
| [@types/tapable](https://www.npmjs.com/package/@types/tapable) | `^2.3.0` | 2.3.0 | 2.3.0 | 已最新 | 38 |
| [@types/yargs](https://www.npmjs.com/package/@types/yargs) | `^17.0.35` | 17.0.35 | 17.0.35 | 已最新 | 13, 23 |
| [@typescript/native](https://www.npmjs.com/package/typescript) | `npm:typescript@^7.0.2` | 7.0.2 | 7.0.2 | 已最新 | 01 |
| [@vitejs/plugin-react](https://www.npmjs.com/package/@vitejs/plugin-react) | `^6.0.3` | 6.0.3 | 6.1.2 | 范围内 | 03 |
| [adm-zip](https://www.npmjs.com/package/adm-zip) | `^0.5.18` | 0.5.18 | 0.6.1 | 0.x 超范围 | 02, 03 |
| [ahooks](https://www.npmjs.com/package/ahooks) | `^3.9.7` | 3.9.7 | 3.10.0 | 范围内 | 03 |
| [antd](https://www.npmjs.com/package/antd) | `^6.5.0` | 6.5.0 | 6.6.7 | 范围内 | 03 |
| [autoprefixer](https://www.npmjs.com/package/autoprefixer) | `^10.5.2` | 10.5.2 | 10.6.1 | 范围内 | 03 |
| [axios](https://www.npmjs.com/package/axios) | `^1.18.1` | 1.18.1 | 1.20.0 | 范围内 | 02, 03, 37, 39, 40 |
| [c12](https://www.npmjs.com/package/c12) | `4.0.0-beta.5` | 4.0.0-beta.5 | 4.0.0-rc.2 | 预发布 | 05, 39, 44 |
| [chalk](https://www.npmjs.com/package/chalk) | `^5.6.2` | 5.6.2 | 6.0.1 | 跨主版本 | 05, 08, 28, 39 |
| [change-case](https://www.npmjs.com/package/change-case) | `^5.4.4` | 5.4.4 | 5.4.4 | 已最新 | 06, 38, 39 |
| [cheerio](https://www.npmjs.com/package/cheerio) | `^1.2.0` | 1.2.0 | 1.2.0 | 已最新 | 02 |
| [class-variance-authority](https://www.npmjs.com/package/class-variance-authority) | `^0.7.1` | 0.7.1 | 0.7.1 | 已最新 | 03 |
| [clsx](https://www.npmjs.com/package/clsx) | `^2.1.1` | 2.1.1 | 2.1.1 | 已最新 | 03, 06 |
| [cmdk](https://www.npmjs.com/package/cmdk) | `^1.1.1` | 1.1.1 | 1.1.1 | 已最新 | 03 |
| [commander](https://www.npmjs.com/package/commander) | `^15.0.0` | 15.0.0 | 15.0.0 | 已最新 | 02, 05, 08, 28, 44 |
| [compression](https://www.npmjs.com/package/compression) | `^1.8.1` | 1.8.1 | 1.8.2 | 范围内 | 39 |
| [consola](https://www.npmjs.com/package/consola) | `^3.4.2` | 3.4.2 | 3.4.2 | 已最新 | 05, 06, 44 |
| [cookie-parser](https://www.npmjs.com/package/cookie-parser) | `^1.4.7` | 1.4.7 | 1.4.7 | 已最新 | 39 |
| [cross-env](https://www.npmjs.com/package/cross-env) | `^10.1.0` | 10.1.0 | 10.1.0 | 已最新 | 02, 03, 08, 39 |
| [crypto-js](https://www.npmjs.com/package/crypto-js) | `^4.2.0` | 4.2.0 | 4.2.0 | 已最新；停维护/弃用，需处理 | 41, 42 |
| [date-fns](https://www.npmjs.com/package/date-fns) | `^4.4.0` | 4.4.0 | 4.4.0 | 已最新 | 03 |
| [dayjs](https://www.npmjs.com/package/dayjs) | `^1.11.21` | 1.11.21 | 1.11.23 | 范围内 | 02, 03, 06, 39, 41, 42 |
| [defu](https://www.npmjs.com/package/defu) | `^6.1.7` | 6.1.7 | 6.1.7 | 已最新 | 05, 44 |
| [doctrine](https://www.npmjs.com/package/doctrine) | `^3.0.0` | 3.0.0 | 3.0.0 | 已最新 | 02 |
| [docxtemplater](https://www.npmjs.com/package/docxtemplater) | `^3.69.0` | 3.69.0 | 3.71.1 | 范围内 | 08 |
| [dotenv](https://www.npmjs.com/package/dotenv) | `^17.4.2` | 17.4.2 | 18.0.8 | 跨主版本 | 01, 02, 03, 25, 39 |
| [echarts](https://www.npmjs.com/package/echarts) | `^6.1.0` | 6.1.0 | 6.1.0 | 已最新 | 03 |
| [embla-carousel-react](https://www.npmjs.com/package/embla-carousel-react) | `^8.6.0` | 8.6.0 | 8.6.0 | 已最新 | 03 |
| [eventemitter3](https://www.npmjs.com/package/eventemitter3) | `^5.0.4` | 5.0.4 | 5.0.4 | 已最新 | 03, 41 |
| [exceljs](https://www.npmjs.com/package/exceljs) | `^4.4.0` | 4.4.0 | 4.4.0 | 已最新 | 39, 42 |
| [express](https://www.npmjs.com/package/express) | `^5.2.1` | 5.2.1 | 5.3.0 | 范围内 | 39, 41 |
| [figlet](https://www.npmjs.com/package/figlet) | `^1.11.0` | 1.11.0 | 1.12.0 | 范围内 | 01, 02, 42, 44 |
| [fs-extra](https://www.npmjs.com/package/fs-extra) | `^11.3.6` | 11.3.6 | 11.4.1 | 范围内 | 02, 28, 38, 39, 42, 44 |
| [git-cz](https://www.npmjs.com/package/git-cz) | `^4.9.0` | 4.9.0 | 4.9.0 | 已最新 | 01 |
| [github-markdown-css](https://www.npmjs.com/package/github-markdown-css) | `^5.9.0` | 5.9.0 | 5.9.0 | 已最新 | 03 |
| [globals](https://www.npmjs.com/package/globals) | `^17.7.0` | 17.7.0 | 17.13.0 | 范围内 | 03 |
| [handlebars](https://www.npmjs.com/package/handlebars) | `^4.7.9` | 4.7.9 | 4.7.10 | 范围内 | 44 |
| [highlight.js](https://www.npmjs.com/package/highlight.js) | `^11.11.1` | 11.11.1 | 11.12.0 | 范围内 | 03 |
| [html2canvas](https://www.npmjs.com/package/html2canvas) | `^1.4.1` | 1.4.1 | 1.4.1 | 已最新 | 03 |
| [html2canvas-pro](https://www.npmjs.com/package/html2canvas-pro) | `^2.2.3` | 2.2.3 | 2.5.2 | 范围内 | 03 |
| [immer](https://www.npmjs.com/package/immer) | `^11.1.11` | 11.1.11 | 11.1.23 | 范围内 | 03, 41 |
| [input-otp](https://www.npmjs.com/package/input-otp) | `^1.4.2` | 1.4.2 | 1.5.0 | 范围内 | 03 |
| [inquirer](https://www.npmjs.com/package/inquirer) | `^14.0.2` | 14.0.2 | 14.2.4 | 范围内 | 02 |
| [jotai](https://www.npmjs.com/package/jotai) | `^2.20.1` | 2.20.1 | 3.0.1 | 跨主版本 | 03 |
| [jsdom](https://www.npmjs.com/package/jsdom) | `^29.1.1` | 29.1.1 | 30.1.3 | 跨主版本 | 02 |
| [jspdf](https://www.npmjs.com/package/jspdf) | `^4.2.1` | 4.2.1 | 4.2.1 | 已最新 | 03 |
| [katex](https://www.npmjs.com/package/katex) | `^0.17.0` | 0.17.0 | 0.19.0 | 0.x 超范围 | 03 |
| [less](https://www.npmjs.com/package/less) | `^4.6.7` | 4.6.7 | 4.9.1 | 范围内 | 03, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24 |
| [lodash](https://www.npmjs.com/package/lodash) | `^4.18.1` | 4.18.1 | 4.18.1 | 已最新 | 02, 03, 04, 10, 25, 28, 29, 39, 44 |
| [lodash-es](https://www.npmjs.com/package/lodash-es) | `^4.18.1` | 4.18.1 | 4.18.1 | 已最新 | 38 |
| [lodash.merge](https://www.npmjs.com/package/lodash.merge) | `^4.6.2` | 4.6.2 | 4.6.2 | 已最新 | 23 |
| [lucide-react](https://www.npmjs.com/package/lucide-react) | `^1.24.0` | 1.24.0 | 1.60.0 | 范围内 | 03 |
| [marked](https://www.npmjs.com/package/marked) | `^18.0.6` | 18.0.6 | 18.1.1 | 范围内 | 25, 39 |
| [marked-directive](https://www.npmjs.com/package/marked-directive) | `^1.0.7` | 1.0.7 | 1.0.7 | 已最新 | 25 |
| [minimist](https://www.npmjs.com/package/minimist) | `^1.2.8` | 1.2.8 | 1.2.8 | 已最新 | 02 |
| [monaco-editor](https://www.npmjs.com/package/monaco-editor) | `^0.55.1` | 0.55.1 | 0.57.0 | 0.x 超范围 | 03 |
| [mustache](https://www.npmjs.com/package/mustache) | `^4.2.0` | 4.2.0 | 4.2.0 | 已最新 | 44 |
| [nanoid](https://www.npmjs.com/package/nanoid) | `^5.1.16` | 5.1.16 | 6.0.2 | 跨主版本 | 03, 41 |
| [nest-winston](https://www.npmjs.com/package/nest-winston) | `^2.0.0` | 2.0.0 | 2.0.0 | 已最新 | 39 |
| [nestjs-cls](https://www.npmjs.com/package/nestjs-cls) | `^7.0.1` | 7.0.1 | 7.0.1 | 已最新 | 39 |
| [next-themes](https://www.npmjs.com/package/next-themes) | `^0.4.6` | 0.4.6 | 0.4.6 | 已最新 | 03 |
| [nodemailer](https://www.npmjs.com/package/nodemailer) | `^9.0.3` | 9.0.3 | 10.1.7 | 跨主版本 | 39 |
| [ora](https://www.npmjs.com/package/ora) | `^9.4.1` | 9.4.1 | 9.4.1 | 已最新 | 02, 05 |
| [oxfmt](https://www.npmjs.com/package/oxfmt) | `^0.58.0` | 0.58.0 | 0.74.0 | 0.x 超范围 | 01 |
| [oxlint](https://www.npmjs.com/package/oxlint) | `^1.73.0` | 1.73.0 | 1.89.0 | 范围内 | 01, 03, 39 |
| [oxlint-tsgolint](https://www.npmjs.com/package/oxlint-tsgolint) | `^0.24.0` | 0.24.0 | 7.0.2004 | 跨主版本 | 01, 39 |
| [p-queue](https://www.npmjs.com/package/p-queue) | `^9.3.1` | 9.3.1 | 10.0.0 | 跨主版本 | 30 |
| [pg](https://www.npmjs.com/package/pg) | `^8.22.0` | 8.22.0 | 8.23.1 | 范围内 | 39 |
| [pixi.js](https://www.npmjs.com/package/pixi.js) | `^8.19.0` | 8.19.0 | 8.22.0 | 范围内 | 03 |
| [pizzip](https://www.npmjs.com/package/pizzip) | `^3.2.0` | 3.2.0 | 3.3.0 | 范围内 | 08 |
| [playwright](https://www.npmjs.com/package/playwright) | `^1.61.1` | 1.61.1 | 1.64.1 | 范围内 | 05 |
| [protobufjs](https://www.npmjs.com/package/protobufjs) | `^8.7.0` | 8.7.0 | 8.8.1 | 范围内 | 38, 44 |
| [ramda](https://www.npmjs.com/package/ramda) | `^0.32.0` | 0.32.0 | 0.32.0 | 已最新 | 08, 30 |
| [rc-resize-observer](https://www.npmjs.com/package/rc-resize-observer) | `^1.4.3` | 1.4.3 | 1.4.3 | 已最新 | 03 |
| [react](https://www.npmjs.com/package/react) | `^19.2.7` | 19.2.7 | 19.3.1 | 范围内 | 03, 06 |
| [react-day-picker](https://www.npmjs.com/package/react-day-picker) | `^10.0.1` | 10.0.1 | 10.0.2 | 范围内 | 03 |
| [react-dom](https://www.npmjs.com/package/react-dom) | `^19.2.7` | 19.2.7 | 19.3.1 | 范围内 | 03 |
| [react-hook-form](https://www.npmjs.com/package/react-hook-form) | `^7.81.0` | 7.81.0 | 7.90.0 | 范围内 | 03 |
| [react-resizable-panels](https://www.npmjs.com/package/react-resizable-panels) | `^4.12.1` | 4.12.1 | 4.14.7 | 范围内 | 03 |
| [react-router](https://www.npmjs.com/package/react-router) | `^8.2.0` | 8.2.0 | 8.5.0 | 范围内 | 03 |
| [react-syntax-highlighter](https://www.npmjs.com/package/react-syntax-highlighter) | `^16.1.1` | 16.1.1 | 16.1.2 | 范围内 | 03 |
| [recharts](https://www.npmjs.com/package/recharts) | `^3.9.2` | 3.9.2 | 3.10.1 | 范围内 | 03 |
| [reflect-metadata](https://www.npmjs.com/package/reflect-metadata) | `^0.2.2` | 0.2.2 | 0.2.2 | 已最新 | 39 |
| [rehype-katex](https://www.npmjs.com/package/rehype-katex) | `^7.0.1` | 7.0.1 | 7.0.1 | 已最新 | 03 |
| [remark-directive](https://www.npmjs.com/package/remark-directive) | `^4.0.0` | 4.0.0 | 4.0.0 | 已最新 | 03 |
| [remark-frontmatter](https://www.npmjs.com/package/remark-frontmatter) | `^5.0.0` | 5.0.0 | 5.0.0 | 已最新 | 03 |
| [remark-gfm](https://www.npmjs.com/package/remark-gfm) | `^4.0.1` | 4.0.1 | 4.0.1 | 已最新 | 03 |
| [remark-math](https://www.npmjs.com/package/remark-math) | `^6.0.0` | 6.0.0 | 6.0.0 | 已最新 | 03 |
| [remark-toc](https://www.npmjs.com/package/remark-toc) | `^9.0.0` | 9.0.0 | 9.0.0 | 已最新 | 03 |
| [rimraf](https://www.npmjs.com/package/rimraf) | `^6.1.3` | 6.1.3 | 6.1.3 | 已最新 | 02, 05, 06, 08, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 25, 28, 30, 32, 33, 34, 35, 36, 38, 40, 41, 42, 44 |
| [rollup-plugin-visualizer](https://www.npmjs.com/package/rollup-plugin-visualizer) | `^7.0.1` | 7.0.1 | 7.1.1 | 范围内 | 03 |
| [rxjs](https://www.npmjs.com/package/rxjs) | `^7.8.2` | 7.8.2 | 7.8.2 | 已最新 | 39, 41 |
| [semver](https://www.npmjs.com/package/semver) | `^7.8.5` | 7.8.5 | 7.8.5 | 已最新 | 01, 02 |
| [shadcn](https://www.npmjs.com/package/shadcn) | `^4.13.0` | 4.13.0 | 4.22.1 | 范围内 | 03 |
| [shadcn-ui](https://www.npmjs.com/package/shadcn-ui) | `^0.9.5` | 0.9.5 | 0.9.5 | 已最新；停维护/弃用，需处理 | 03 |
| [sonner](https://www.npmjs.com/package/sonner) | `^2.0.7` | 2.0.7 | 2.0.8 | 范围内 | 03 |
| [source-map-support](https://www.npmjs.com/package/source-map-support) | `^0.5.21` | 0.5.21 | 0.5.21 | 已最新 | 39 |
| [supertest](https://www.npmjs.com/package/supertest) | `^7.2.2` | 7.2.2 | 7.3.1 | 范围内 | 39 |
| [tailwind-merge](https://www.npmjs.com/package/tailwind-merge) | `^3.6.0` | 3.6.0 | 3.7.0 | 范围内 | 03 |
| [tailwindcss](https://www.npmjs.com/package/tailwindcss) | `^4.3.2` | 4.3.2 | 4.3.3 | 范围内 | 03 |
| [tapable](https://www.npmjs.com/package/tapable) | `^2.3.3` | 2.3.3 | 2.3.3 | 已最新 | 03, 25, 30, 38, 40, 44 |
| [ts-node](https://www.npmjs.com/package/ts-node) | `^10.9.2` | 10.9.2 | 10.9.2 | 已最新 | 39 |
| [tsconfig-paths](https://www.npmjs.com/package/tsconfig-paths) | `^4.2.0` | 4.2.0 | 4.2.0 | 已最新 | 39 |
| [tsconfig-paths-webpack-plugin](https://www.npmjs.com/package/tsconfig-paths-webpack-plugin) | `^4.2.0` | 4.2.0 | 4.2.0 | 已最新 | 39 |
| [tslib](https://www.npmjs.com/package/tslib) | `^2.8.1` | 2.8.1 | 2.8.1 | 已最新 | 28 |
| [tsx](https://www.npmjs.com/package/tsx) | `^4.23.0` | 4.23.0 | 4.23.15 | 范围内 | 05, 37, 39 |
| [tw-animate-css](https://www.npmjs.com/package/tw-animate-css) | `^1.4.0` | 1.4.0 | 1.4.0 | 已最新 | 03 |
| [typedoc](https://www.npmjs.com/package/typedoc) | `^0.28.20` | 0.28.20 | 0.28.20 | 已最新 | 41 |
| [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) | `^4.12.0` | 4.12.0 | 4.14.1 | 范围内 | 41 |
| [typeorm](https://www.npmjs.com/package/typeorm) | `^1.0.0` | 1.0.0 | 1.1.2 | 范围内 | 39 |
| [typescript](https://www.npmjs.com/package/@typescript/typescript6) | `npm:@typescript/typescript6@^6.0.2` | 6.0.2 | 6.0.2 | 已最新 | 01, 02, 03, 05, 06, 07, 08, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 28, 30, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 44 |
| [unbuild](https://www.npmjs.com/package/unbuild) | `^3.6.1` | 3.6.1 | 3.6.1 | 已最新 | 02, 05, 06, 07, 08, 10, 25, 28, 30, 32, 33, 34, 35, 36, 38, 40, 41, 42, 44 |
| [vaul](https://www.npmjs.com/package/vaul) | `^1.1.2` | 1.1.2 | 1.1.2 | 已最新 | 03 |
| [vite](https://www.npmjs.com/package/vite) | `^8.1.4` | 8.1.4 | 8.3.4 | 范围内 | 03, 10 |
| [vite-plugin-compression](https://www.npmjs.com/package/vite-plugin-compression) | `^0.5.1` | 0.5.1 | 0.5.1 | 已最新 | 03 |
| [webpack-node-externals](https://www.npmjs.com/package/webpack-node-externals) | `^3.0.0` | 3.0.0 | 3.0.0 | 已最新 | 39 |
| [winston](https://www.npmjs.com/package/winston) | `^3.19.0` | 3.19.0 | 3.19.0 | 已最新 | 02, 39 |
| [winston-daily-rotate-file](https://www.npmjs.com/package/winston-daily-rotate-file) | `^5.0.0` | 5.0.0 | 5.0.0 | 已最新 | 39 |
| [xml](https://www.npmjs.com/package/xml) | `^1.0.1` | 1.0.1 | 1.0.1 | 已最新 | 08 |
| [yargs](https://www.npmjs.com/package/yargs) | `^18.0.0` | 18.0.0 | 18.2.0 | 范围内 | 13, 23 |
| [zod](https://www.npmjs.com/package/zod) | `^4.4.3` | 4.4.3 | 4.6.7 | 范围内 | 02, 03, 05, 39, 41, 42 |
| [zx](https://www.npmjs.com/package/zx) | `^8.8.5` | 8.8.5 | 8.8.5 | 已最新 | 01, 02, 03, 06, 08, 25, 28, 29 |

## 逐包升级重点

| 范围 | 主要升级点 | 核心验收 |
| --- | --- | --- |
| 根目录 | Changesets、commitlint、Oxc 工具组、figlet、dotenv；Node 类型对齐 | lint/类型检查、格式差异、生成发布计划 |
| @bestlyg/cli | adm-zip/jsdom 与类型、axios、figlet、inquirer、dotenv、fs-extra | CLI 命令及 vendor 再导出、ZIP 和 DOM 功能 |
| @bestlyg/client | 70 项有更新；React/UI、Vite/Tailwind、表单、路由、状态、编辑器 | 构建、首页/登录/路由 E2E、交互及渲染 |
| @bestlyg/server | 21 项有更新；HTTP 安全链、邮件、TypeORM/pg、c12、日志依赖 | 构建产物启动、HTTP/SSE、邮件、数据库和配置 |
| @bestlyg/e2e | Playwright、tsx、chalk、c12；类型对齐 | 浏览器安装、配置加载、runner 与报告、E2E |
| @bestlyg/code / icons | dayjs 或图标 SVG 上游、类型更新 | 算法既有测试、图标生成/构建 |
| @bestlyg/input-engine | 直接依赖均已 latest；仍有 unbuild 的 TS peer 不匹配 | 输入编辑核心测试与声明文件输出 |
| shared/core-shared | nanoid、dayjs、less、文档插件及类型；CryptoJS 替换评估 | SSE、trace ID、加密兼容、文档与声明生成 |
| shared/client-shared / server-shared | axios、figlet、dayjs、fs-extra、类型；exceljs 传递链 | 消费端打包、日志/Excel、加密兼容 |
| cscet | chalk、docxtemplater、pizzip、类型及 xmldom 传递链 | 源代码抽取、DOCX 产物、CLI |
| generator-helpers | Vite、@types/node、@types/lodash；esbuild peer | 生成器测试与打包 |
| Less 插件系列 | Less 4.6.7 → 4.9.1 为主，define-var 另有 dayjs/类型更新 | 全部插件现有测试、编译产物 CSS 语义 |
| md2resume | marked、dotenv、dayjs、less、类型 | Markdown 到简历渲染及部署配置 |
| package-json-extension | chalk、yargs、Node 类型 | JSON 合并、CLI 与公开导出 |
| best-uploader | p-queue 10 行为迁移；可先留 9.3.5 | 任务错误、取消/clear、事件和公开 tasks API |
| packages/npm/xidl/packages/* | Node 类型；shared 的 protobufjs、类型；playground 的 axios | 代码生成及 TS/Python 目标输出，ESM/CJS/声明 |
| @bestlyg/xidl | handlebars 安全补丁、protobufjs、figlet、c12、fs-extra、类型 | 模板与 proto 加载、配置、生成文件快照 |
| metadata-file / template | 直接依赖无新版本 | 随公共工具链变动做现有测试/构建 |
| dipeak / module-checker / xidl 父包 / static | 无直接依赖 | 无需独立依赖升级 |
