# 全工作区依赖升级与验证报告

> 后续变更：库构建已迁移到 Rslib，unbuild 及其专用兼容层已移除。本文保留依赖升级完成时的记录，当前构建方案见 [Rslib 迁移记录](./rslib-migration-2026-10-21.md)。

日期：2026-10-21（Asia/Shanghai）。范围：根项目及全部 43 个子工作区，共 44 个 package。基线取自升级开始时的工作区，保留此前已有的未提交修改。

## 结果

- 外部直接依赖从 204 个名称整理为 193 个：104 项升级、87 项原本已是最新；新增 2 项替代/兼容依赖，移除 13 项旧依赖。当前共有 441 条外部依赖声明。
- npm `latest` 最终核对时间为 **2026-10-21 01:58:16 +08:00**。除下述兼容例外，所有保留的直接依赖均对齐该次核对的最新版本；收尾时补齐了 Immer 11.2.3。
- 主 TypeScript 升至 **7.0.2**。Nest CLI、TypeDoc 所在工作区保留 **6.0.3** 编译器 API 兼容例外；统一源码检查仍使用根目录 TS 7。
- 保持 pnpm **12.14.0**、Node.js **24.22.0**。npm 包 registry 统一到官方源，避免镜像缺少 Immer 新版本导致命令启动时重新安装失败。
- 全量构建、全部类型配置、单元/集成/浏览器测试及冻结锁文件安装通过。完整安全审计仍有 **1 条开发依赖高危告警**，生产依赖告警为 **0**。

## 实际失败与回退记录

| 项目                     | 尝试版本                       | 实际失败                                                                                           | 最终处理及验证                                                                                                    |
| ------------------------ | ------------------------------ | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| TypeScript / 声明生成    | 7.0.2                          | `rollup-plugin-dts` 无法获得 `createProgram` 等旧 API                                              | 保留 TS 7，按新版工具支持的方式添加 `@typescript/typescript6@6.0.2` API fallback；全部库的声明构建通过            |
| `server` 的 Nest CLI     | TypeScript 7.0.2               | CLI 从工作区加载编译器，明确拒绝缺少 `getParsedCommandLineOfConfigFile` 的 TS 7                    | 该工作区使用 `catalog:compilerApi` → TS 6.0.3；生产构建、watch、真实数据库测试通过；源码通过 TS 7 检查            |
| `core-shared` 的 TypeDoc | TypeScript 7.0.2               | `typedoc --version` 即因 `SyntaxKind.PropertyDeclaration` 缺失而崩溃；依赖隔离尝试未解决 peer 解析 | 该工作区使用同一 `compilerApi` catalog → TS 6.0.3；TypeDoc 0.28.20 成功生成 Markdown 文档；源码通过 TS 7 检查     |
| 远程 TS 函数的原生替代   | Node 24 `stripTypeScriptTypes` | 装饰器代码经原生转换后无法执行，旧 `ts.transpile` 可正确执行                                       | 撤回原生替代，使用显式 `@typescript/typescript6@6.0.2` 生产依赖，保留原转译选项；装饰器及其他 TS 语法回归测试通过 |
| `@types/node` 临时回退   | 26.6.5 → 24.19.2 → 26.6.5      | 原生 RPC 方案使用的 transform 选项与 Node 26 类型不兼容                                            | 原生方案撤回后恢复最新 **26.6.5**；47 个 TypeScript 配置全部通过，最终没有保留此版本回退                          |

TS 7 缺少兼容的旧编译器 API 是上游已说明的迁移边界，兼容包方案参见 [TypeScript 7 官方说明](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/)。未把全部项目退回 TS 6；主编译器及统一类型检查保持 TS 7。CLI 对外的 `ts` 编译器 API 导出及服务端远程函数转译均显式使用 `@typescript/typescript6`。

## 兼容修正与旧依赖清理

| 原依赖/行为                 | 最终实现                                                                                                                                                                                 | 一致性验证                                                                                         |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| CryptoJS 4.2.0              | 服务端 `node:crypto`；跨端同步 AES 使用 `@noble/ciphers@2.4.0`；Base64 使用平台 API                                                                                                      | 15 组升级前固定密文，覆盖 AES-128/192/256、中文、emoji、空串、块边界；双端互解；登录浏览器测试通过 |
| 远程函数调用 `ts.transpile` | 显式 TS 6 API 兼容包，保留原转译行为                                                                                                                                                     | 类型标注、enum、参数属性、async、装饰器执行与非法语法验证通过；原生替代因装饰器不兼容撤回          |
| `vite-plugin-compression`   | Node 原生 gzip/Brotli + Vite 插件                                                                                                                                                        | 小文件/非目标格式排除测试，以及全部压缩产物解压还原校验通过                                        |
| `shadcn-ui`                 | 删除旧 CLI，保留现有新版 `shadcn@4.22.1`                                                                                                                                                 | 应用构建及浏览器测试通过                                                                           |
| `html2canvas`               | 删除未使用的旧包，现有代码继续使用 `html2canvas-pro@2.5.2`                                                                                                                               | 客户端构建通过                                                                                     |
| ExcelJS 的 `uuid@8`         | 可复现补丁改用 `node:crypto.randomUUID`，删除该依赖边                                                                                                                                    | 扩展条件格式 XLSX 往返、现有导入/导出测试通过                                                      |
| Monaco 0.57 导出变化        | worker 改为公开子路径，语言配置改用 `monaco.typescript`，删除旧 `any` 转换与 `editor.all` 引用                                                                                           | 浏览器成功创建 TypeScript worker 并编辑代码                                                        |
| KaTeX CSS 与渲染版本分离    | `rehype-katex` 和 `micromark-extension-math` 的 KaTeX 均对齐 **0.19.0**                                                                                                                  | 真实 MDX 链的行内、块级、错误公式渲染及版本一致性测试通过                                          |
| 重复类型/运行器依赖         | 删除 `@types/adm-zip`、`@types/figlet`、`@types/inquirer`、`@types/nodemailer`、`@types/tapable`、`@types/crypto-js`、重复 `@typescript/native`、未使用 `ts-node` / `source-map-support` | 全量声明构建和 TS 7 类型检查通过                                                                   |
| 旧配置与测试残留            | 删除 `ignoreDeprecations: "6.0"`、无执行逻辑的 `.pnpmfile.cjs`、generator-helpers 中未使用的 Vite；新版本例外集中到根工作区配置                                                          | 冻结安装与工作区一致性检查通过                                                                     |

选择同步的 [noble-ciphers](https://github.com/paulmillr/noble-ciphers) 是为保留现有同步调用契约；浏览器原生 Web Crypto 为异步接口。服务端加密使用 [Node 原生 Crypto API](https://nodejs.org/api/crypto.html)。

有效字符串输入的同步返回、AES-CBC/PKCS7 与 Base64 密文格式保持一致。公开类型不再接受 CryptoJS 的 `WordArray` / `CipherParams` 对象，原始字节输入使用 `Uint8Array`；仓库中的现有调用均为字符串。无效 key/IV、解密后的无效 UTF-8 会明确报错。此处保持现有加密协议，未改变密文协议格式。

p-queue 10 的公开事件接口是 `EventTarget`；仓库内暂停、启动、并发、清空、完成事件测试通过。仓库外若有使用 `uploader.tasks.on(...)` 的插件，需要改为 `addEventListener(...)`，事件数据取 `event.detail`。

ExcelJS 官方最新版本仍为 4.4.0。Node 没有原生 XLSX 读写替代；可评估维护中的 [@protobi/exceljs 分支](https://github.com/protobi/exceljs)（查询到 4.4.0-protobi.10），本次保留已验证的官方 ExcelJS 并替换其 UUID 调用。整库替换需要额外验证样式、公式和流读写；`fstream`、`glob@7`、`inflight`、`lodash.isequal`、`rimraf@2` 五个 deprecated 间接依赖仍随该工具链保留，已在审计中覆盖。

## 验证结果

| 检查                             | 最终结果                                                                                       |
| -------------------------------- | ---------------------------------------------------------------------------------------------- |
| `pnpm build`                     | 全工作区递归构建通过，包含前端 Vite、服务端 Rspack、各库与声明文件                             |
| `pnpm typecheck`                 | 根 TS 7.0.2 检查 **47/47** 个 TypeScript 配置通过                                              |
| `pnpm test`                      | **58 文件 / 414 测试通过**；升级前单元测试为 47 文件 / 365 项                                  |
| 服务端集成                       | 临时 PostgreSQL、JWT、CLS、DTO 校验、SSE、静态资源、错误启动退出码；生产包与 Nest watch 均通过 |
| 浏览器                           | Playwright 1.64.1 Chromium；首页、登录加密与 Jotai 持久化、Monaco TypeScript worker 均通过     |
| `pnpm lint`                      | 退出码 0；新规则对现有 React 代码报告 18 条 warning，0 error                                   |
| TypeDoc                          | Markdown 文档生成通过，0 error、9 条文档注释/引用 warning                                      |
| `pnpm install --frozen-lockfile` | 全部 44 个独立锁文件安装通过                                                                   |
| 压缩产物                         | **151** 个源文件对应的 **302** 个 gzip/Brotli 文件，逐一解压后与源字节相同                     |
| 依赖一致性                       | 0 缺失直接依赖、0 安装/锁文件版本漂移                                                          |
| `git diff --check`               | 通过                                                                                           |

`unbuild@3.6.1` 的可选 TS peer 元数据仍写为 `^5.9.2`。对本仓库实测通过的 **6.0.3 / 7.0.2** 配置了精确允许规则，声明生成使用前述 API fallback；没有扩大到任意未来版本。独立锁文件使无 ExcelJS 的工作区会提示补丁未使用，因此允许未引用的补丁；实际依赖 ExcelJS 的两个工作区已应用补丁并通过测试。

其他非阻断提示包括现有 bundle 大小、CLI 混合导出，以及 Less 4.9 对 `@plugin` 指令的弃用提示。验证环境为本机 macOS / Node 24.22.0，未实际运行其他操作系统或生产部署。

新增 `pnpm typecheck` 可重复执行全仓库 TS 7 检查。建议复验顺序：

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm typecheck
pnpm e2e:install
pnpm test
pnpm lint
```

完整测试需要 PostgreSQL `initdb` / `pg_ctl` 可用。测试使用临时数据库；邮件使用 JSON transport，登录测试拦截 API 响应。

## 安全审计

分别对 44 个 package 执行完整及 `--prod` 审计，共 88 次，并按 GHSA 去重：

| 范围                 | 升级前唯一告警 | 升级后唯一告警 |
| -------------------- | -------------: | -------------: |
| 全依赖（含开发工具） |            190 |              1 |
| 生产依赖             |            127 |              0 |

剩余 **GHSA-vfj7-8cjw-p6xm / braces ≤3.0.3，高危**，路径为 `@bestlyg/client → shadcn → fast-glob → micromatch → braces`，仅存在于开发依赖。深层嵌套 brace 模式可能耗尽调用栈；截至核对时间，上游没有修复版本。参见 [GitHub Advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)。回退旧版本不能解决这一问题，因此保留最新 shadcn 并明确记录；完整 `pnpm audit` 仍会返回非零，生产依赖审计通过。告警为当前依赖数据库结果，不代表对所有业务逻辑的安全证明。

## 全部 package 范围

以下统计为直接依赖的实际安装版本变化；新增/移除按包名计，包含根项目。全部包的锁文件均已验证。

| Package                                   | 路径                                                           | 当前外部声明数 | 版本变化 / 新增 / 移除 |
| ----------------------------------------- | -------------------------------------------------------------- | -------------: | ---------------------- |
| `bestlyg`                                 | `.`                                                            |             17 | 11 / 0 / 1             |
| `@bestlyg/cli`                            | `packages/cli`                                                 |             31 | 14 / 1 / 3             |
| `@bestlyg/client`                         | `packages/client`                                              |            100 | 71 / 1 / 3             |
| `@bestlyg/code`                           | `packages/code`                                                |              4 | 2 / 0 / 0              |
| `@bestlyg/e2e`                            | `packages/e2e`                                                 |             15 | 7 / 0 / 0              |
| `@bestlyg/icons`                          | `packages/icons`                                               |             11 | 5 / 0 / 0              |
| `@bestlyg/input-engine`                   | `packages/input-engine/core`                                   |              4 | 1 / 0 / 0              |
| `cscet`                                   | `packages/npm/china-software-copyright-extraction-tool`        |             14 | 5 / 0 / 0              |
| `dipeak`                                  | `packages/npm/dipeak`                                          |              0 | 0 / 0 / 0              |
| `generator-helpers`                       | `packages/npm/generator-helpers`                               |              7 | 3 / 0 / 1              |
| `less-plugins`                            | `packages/npm/less-plugins`                                    |              3 | 2 / 0 / 0              |
| `@less-plugins/css-logical`               | `packages/npm/less-plugins/packages/css-logical`               |              4 | 2 / 0 / 0              |
| `less-plugin-define-var`                  | `packages/npm/less-plugins/packages/define-var`                |              8 | 4 / 0 / 0              |
| `@less-plugins/get-current-package-name`  | `packages/npm/less-plugins/packages/get-current-package-name`  |              4 | 2 / 0 / 0              |
| `@less-plugins/get-current-package-scope` | `packages/npm/less-plugins/packages/get-current-package-scope` |              4 | 2 / 0 / 0              |
| `@less-plugins/get-env`                   | `packages/npm/less-plugins/packages/get-env`                   |              4 | 2 / 0 / 0              |
| `@less-plugins/get-hashed-version`        | `packages/npm/less-plugins/packages/get-hashed-version`        |              6 | 2 / 0 / 0              |
| `@less-plugins/get-package-info`          | `packages/npm/less-plugins/packages/get-package-info`          |              5 | 2 / 0 / 0              |
| `@less-plugins/get-package-json-field`    | `packages/npm/less-plugins/packages/get-package-json-field`    |              4 | 2 / 0 / 0              |
| `@less-plugins/playground`                | `packages/npm/less-plugins/packages/playground`                |              4 | 2 / 0 / 0              |
| `@less-plugins/replace-properties`        | `packages/npm/less-plugins/packages/replace-properties`        |              4 | 2 / 0 / 0              |
| `@less-plugins/rtl`                       | `packages/npm/less-plugins/packages/rtl`                       |              4 | 2 / 0 / 0              |
| `@less-plugins/shared`                    | `packages/npm/less-plugins/packages/shared`                    |              4 | 2 / 0 / 0              |
| `@less-plugins/template`                  | `packages/npm/less-plugins/packages/template`                  |              4 | 2 / 0 / 0              |
| `md2resume`                               | `packages/npm/md2resume`                                       |             12 | 6 / 0 / 0              |
| `metadata-file`                           | `packages/npm/metadata-file`                                   |              1 | 0 / 0 / 0              |
| `module-checker`                          | `packages/npm/module-checker`                                  |              0 | 0 / 0 / 0              |
| `package-json-extension`                  | `packages/npm/package-json-extension`                          |             11 | 4 / 0 / 0              |
| `template`                                | `packages/npm/template`                                        |              2 | 0 / 0 / 0              |
| `best-uploader`                           | `packages/npm/uploader`                                        |              9 | 3 / 1 / 0              |
| `xidl`                                    | `packages/npm/xidl`                                            |              0 | 0 / 0 / 0              |
| `@xidl/core`                              | `packages/npm/xidl/packages/core`                              |              4 | 2 / 0 / 0              |
| `@xidl/python-core`                       | `packages/npm/xidl/packages/language/python/core`              |              4 | 2 / 0 / 0              |
| `@xidl/typescript-client`                 | `packages/npm/xidl/packages/language/typescript/client`        |              4 | 2 / 0 / 0              |
| `@xidl/typescript-core`                   | `packages/npm/xidl/packages/language/typescript/core`          |              4 | 2 / 0 / 0              |
| `@xidl/typescript-server`                 | `packages/npm/xidl/packages/language/typescript/server`        |              4 | 2 / 0 / 0              |
| `@xidl/playground`                        | `packages/npm/xidl/packages/playground`                        |              4 | 4 / 0 / 0              |
| `@xidl/shared`                            | `packages/npm/xidl/packages/shared`                            |             11 | 4 / 0 / 1              |
| `@bestlyg/server`                         | `packages/server`                                              |             54 | 21 / 1 / 3             |
| `@bestlyg/client-shared`                  | `packages/shared/client-shared`                                |              6 | 3 / 0 / 0              |
| `@bestlyg/core-shared`                    | `packages/shared/core-shared`                                  |             16 | 8 / 1 / 2              |
| `@bestlyg/server-shared`                  | `packages/shared/server-shared`                                |             11 | 6 / 0 / 3              |
| `@bestlyg/static`                         | `packages/static`                                              |              0 | 0 / 0 / 0              |
| `@bestlyg/xidl`                           | `packages/xidl`                                                |             18 | 8 / 0 / 0              |

## 完整直接依赖版本清单

同一名称在多个工作区中的版本合并显示。TS 6.0.3 仅为前述工具兼容例外；其余保留依赖的最新版本以本报告记录的 npm 核对时间为准。

| 依赖                              | 升级前实际版本 | 最终实际版本 | 状态                           |
| --------------------------------- | -------------- | ------------ | ------------------------------ |
| `@ant-design/cssinjs`             | 2.1.2          | 2.1.2        | 已是最新                       |
| `@ant-design/icons-svg`           | 4.5.0          | 4.6.0        | 升级                           |
| `@changesets/cli`                 | 2.31.0         | 3.0.3        | 升级                           |
| `@changesets/get-release-plan`    | 4.0.16         | 5.0.2        | 升级                           |
| `@changesets/types`               | 6.1.0          | 7.0.0        | 升级                           |
| `@commitlint/cli`                 | 21.2.1         | 21.2.4       | 升级                           |
| `@commitlint/config-conventional` | 21.2.0         | 21.2.4       | 升级                           |
| `@emotion/hash`                   | 0.9.2          | 0.9.2        | 已是最新                       |
| `@hookform/resolvers`             | 5.4.0          | 6.0.0        | 升级                           |
| `@manypkg/get-packages`           | 3.1.0          | 3.1.0        | 已是最新                       |
| `@mdx-js/mdx`                     | 3.1.1          | 3.1.1        | 已是最新                       |
| `@microsoft/fetch-event-source`   | 2.0.1          | 2.0.1        | 已是最新                       |
| `@nestjs/cli`                     | 12.0.9         | 12.0.9       | 已是最新                       |
| `@nestjs/common`                  | 12.2.0         | 12.2.0       | 已是最新                       |
| `@nestjs/config`                  | 12.0.1         | 12.0.1       | 已是最新                       |
| `@nestjs/core`                    | 12.2.0         | 12.2.0       | 已是最新                       |
| `@nestjs/jwt`                     | 12.0.3         | 12.0.3       | 已是最新                       |
| `@nestjs/platform-express`        | 12.2.0         | 12.2.0       | 已是最新                       |
| `@nestjs/schedule`                | 12.0.2         | 12.0.2       | 已是最新                       |
| `@nestjs/schematics`              | 12.0.9         | 12.0.9       | 已是最新                       |
| `@nestjs/serve-static`            | 12.0.0         | 12.0.0       | 已是最新                       |
| `@nestjs/testing`                 | 12.2.0         | 12.2.0       | 已是最新                       |
| `@nestjs/typeorm`                 | 12.0.2         | 12.0.2       | 已是最新                       |
| `@noble/ciphers`                  | —              | 2.4.0        | 新增替代/兼容                  |
| `@pixi/sound`                     | 6.0.1          | 6.0.1        | 已是最新                       |
| `@radix-ui/react-accordion`       | 1.2.16         | 1.3.1        | 升级                           |
| `@radix-ui/react-alert-dialog`    | 1.1.19         | 1.2.1        | 升级                           |
| `@radix-ui/react-aspect-ratio`    | 1.1.11         | 1.2.0        | 升级                           |
| `@radix-ui/react-avatar`          | 1.2.2          | 1.3.1        | 升级                           |
| `@radix-ui/react-checkbox`        | 1.3.7          | 1.4.1        | 升级                           |
| `@radix-ui/react-collapsible`     | 1.1.16         | 1.2.1        | 升级                           |
| `@radix-ui/react-context-menu`    | 2.3.3          | 2.4.1        | 升级                           |
| `@radix-ui/react-dialog`          | 1.1.19         | 1.3.1        | 升级                           |
| `@radix-ui/react-dropdown-menu`   | 2.1.20         | 2.2.1        | 升级                           |
| `@radix-ui/react-hover-card`      | 1.1.19         | 1.2.1        | 升级                           |
| `@radix-ui/react-label`           | 2.1.11         | 2.1.17       | 升级                           |
| `@radix-ui/react-menubar`         | 1.1.20         | 1.2.1        | 升级                           |
| `@radix-ui/react-navigation-menu` | 1.2.18         | 1.4.1        | 升级                           |
| `@radix-ui/react-popover`         | 1.1.19         | 1.3.1        | 升级                           |
| `@radix-ui/react-progress`        | 1.1.12         | 1.2.1        | 升级                           |
| `@radix-ui/react-radio-group`     | 1.4.3          | 1.5.1        | 升级                           |
| `@radix-ui/react-scroll-area`     | 1.2.14         | 1.4.0        | 升级                           |
| `@radix-ui/react-select`          | 2.3.3          | 2.4.1        | 升级                           |
| `@radix-ui/react-separator`       | 1.1.11         | 1.2.0        | 升级                           |
| `@radix-ui/react-slider`          | 1.4.3          | 1.6.1        | 升级                           |
| `@radix-ui/react-slot`            | 1.3.0          | 1.5.0        | 升级                           |
| `@radix-ui/react-switch`          | 1.3.3          | 1.4.1        | 升级                           |
| `@radix-ui/react-tabs`            | 1.1.17         | 1.2.1        | 升级                           |
| `@radix-ui/react-toast`           | 1.2.19         | 1.3.1        | 升级                           |
| `@radix-ui/react-toggle`          | 1.1.14         | 1.2.1        | 升级                           |
| `@radix-ui/react-toggle-group`    | 1.1.15         | 1.2.1        | 升级                           |
| `@radix-ui/react-tooltip`         | 1.2.12         | 1.4.1        | 升级                           |
| `@rspack/core`                    | 2.2.9          | 2.2.9        | 已是最新                       |
| `@rstest/core`                    | 0.12.4         | 0.12.4       | 已是最新                       |
| `@rstest/coverage-v8`             | 0.12.4         | 0.12.4       | 已是最新                       |
| `@rstest/playwright`              | 0.12.4         | 0.12.4       | 已是最新                       |
| `@tailwindcss/postcss`            | 4.3.2          | 4.3.3        | 升级                           |
| `@tailwindcss/vite`               | 4.3.2          | 4.3.3        | 升级                           |
| `@types/adm-zip`                  | 0.5.8          | —            | 移除                           |
| `@types/compression`              | 1.8.1          | 1.8.1        | 已是最新                       |
| `@types/cookie-parser`            | 1.4.10         | 1.4.10       | 已是最新                       |
| `@types/crypto-js`                | 4.2.2          | —            | 移除                           |
| `@types/doctrine`                 | 0.0.9          | 0.0.9        | 已是最新                       |
| `@types/express`                  | 5.0.6          | 5.0.6        | 已是最新                       |
| `@types/figlet`                   | 1.7.0          | —            | 移除                           |
| `@types/fs-extra`                 | 11.0.4         | 11.0.4       | 已是最新                       |
| `@types/inquirer`                 | 9.0.10         | —            | 移除                           |
| `@types/jsdom`                    | 28.0.3         | 30.0.0       | 升级                           |
| `@types/less`                     | 3.0.8          | 3.0.8        | 已是最新                       |
| `@types/lodash`                   | 4.17.24        | 4.17.26      | 升级                           |
| `@types/lodash-es`                | 4.17.12        | 4.17.12      | 已是最新                       |
| `@types/minimist`                 | 1.2.5          | 1.2.5        | 已是最新                       |
| `@types/multer`                   | 2.2.0          | 2.3.0        | 升级                           |
| `@types/mustache`                 | 4.2.6          | 4.2.6        | 已是最新                       |
| `@types/node`                     | 26.1.1, 26.6.5 | 26.6.5       | 升级                           |
| `@types/nodemailer`               | 8.0.1          | —            | 移除                           |
| `@types/ramda`                    | 0.32.0         | 0.32.0       | 已是最新                       |
| `@types/react`                    | 19.2.17        | 19.3.0       | 升级                           |
| `@types/react-dom`                | 19.2.4         | 19.3.0       | 升级                           |
| `@types/react-syntax-highlighter` | 15.5.13        | 15.5.13      | 已是最新                       |
| `@types/semver`                   | 7.7.1          | 7.8.0        | 升级                           |
| `@types/tapable`                  | 2.3.0          | —            | 移除                           |
| `@types/yargs`                    | 17.0.35        | 17.0.35      | 已是最新                       |
| `@typescript/native`              | 7.0.2          | —            | 移除                           |
| `@typescript/typescript6`         | —              | 6.0.2        | 新增替代/兼容                  |
| `@vitejs/plugin-react`            | 6.0.3          | 6.1.2        | 升级                           |
| `adm-zip`                         | 0.5.18         | 0.6.1        | 升级                           |
| `ahooks`                          | 3.9.7          | 3.10.0       | 升级                           |
| `antd`                            | 6.5.0          | 6.6.7        | 升级                           |
| `autoprefixer`                    | 10.5.2         | 10.6.1       | 升级                           |
| `axios`                           | 1.18.1         | 1.20.0       | 升级                           |
| `c12`                             | 4.0.0-beta.5   | 4.0.0-rc.2   | 升级                           |
| `chalk`                           | 5.6.2          | 6.0.1        | 升级                           |
| `change-case`                     | 5.4.4          | 5.4.4        | 已是最新                       |
| `cheerio`                         | 1.2.0          | 1.2.0        | 已是最新                       |
| `class-variance-authority`        | 0.7.1          | 0.7.1        | 已是最新                       |
| `clsx`                            | 2.1.1          | 2.1.1        | 已是最新                       |
| `cmdk`                            | 1.1.1          | 1.1.1        | 已是最新                       |
| `commander`                       | 15.0.0         | 15.0.0       | 已是最新                       |
| `compression`                     | 1.8.1          | 1.8.2        | 升级                           |
| `consola`                         | 3.4.2          | 3.4.2        | 已是最新                       |
| `cookie-parser`                   | 1.4.7          | 1.4.7        | 已是最新                       |
| `cross-env`                       | 10.1.0         | 10.1.0       | 已是最新                       |
| `crypto-js`                       | 4.2.0          | —            | 移除                           |
| `date-fns`                        | 4.4.0          | 4.4.0        | 已是最新                       |
| `dayjs`                           | 1.11.21        | 1.11.23      | 升级                           |
| `defu`                            | 6.1.7          | 6.1.7        | 已是最新                       |
| `doctrine`                        | 3.0.0          | 3.0.0        | 已是最新                       |
| `docxtemplater`                   | 3.69.0         | 3.71.1       | 升级                           |
| `dotenv`                          | 17.4.2         | 18.0.8       | 升级                           |
| `echarts`                         | 6.1.0          | 6.1.0        | 已是最新                       |
| `embla-carousel-react`            | 8.6.0          | 8.6.0        | 已是最新                       |
| `eventemitter3`                   | 5.0.4          | 5.0.4        | 已是最新                       |
| `exceljs`                         | 4.4.0          | 4.4.0        | 已是最新                       |
| `express`                         | 5.2.1          | 5.3.0        | 升级                           |
| `figlet`                          | 1.11.0         | 1.12.0       | 升级                           |
| `fs-extra`                        | 11.3.6         | 11.4.1       | 升级                           |
| `git-cz`                          | 4.9.0          | 4.9.0        | 已是最新                       |
| `github-markdown-css`             | 5.9.0          | 5.9.0        | 已是最新                       |
| `globals`                         | 17.7.0         | 17.13.0      | 升级                           |
| `handlebars`                      | 4.7.9          | 4.7.10       | 升级                           |
| `highlight.js`                    | 11.11.1        | 11.12.0      | 升级                           |
| `html2canvas`                     | 1.4.1          | —            | 移除                           |
| `html2canvas-pro`                 | 2.2.3          | 2.5.2        | 升级                           |
| `immer`                           | 11.1.11        | 11.2.3       | 升级                           |
| `input-otp`                       | 1.4.2          | 1.5.0        | 升级                           |
| `inquirer`                        | 14.0.2         | 14.2.4       | 升级                           |
| `jotai`                           | 2.20.1         | 3.0.1        | 升级                           |
| `jsdom`                           | 29.1.1         | 30.1.3       | 升级                           |
| `jspdf`                           | 4.2.1          | 4.2.1        | 已是最新                       |
| `katex`                           | 0.17.0         | 0.19.0       | 升级                           |
| `less`                            | 4.6.7          | 4.9.1        | 升级                           |
| `lodash`                          | 4.18.1         | 4.18.1       | 已是最新                       |
| `lodash-es`                       | 4.18.1         | 4.18.1       | 已是最新                       |
| `lodash.merge`                    | 4.6.2          | 4.6.2        | 已是最新                       |
| `lucide-react`                    | 1.24.0         | 1.60.0       | 升级                           |
| `marked`                          | 18.0.6         | 18.1.1       | 升级                           |
| `marked-directive`                | 1.0.7          | 1.0.7        | 已是最新                       |
| `minimist`                        | 1.2.8          | 1.2.8        | 已是最新                       |
| `monaco-editor`                   | 0.55.1         | 0.57.0       | 升级                           |
| `mustache`                        | 4.2.0          | 4.2.0        | 已是最新                       |
| `nanoid`                          | 5.1.16         | 6.0.2        | 升级                           |
| `nest-winston`                    | 2.0.0          | 2.0.0        | 已是最新                       |
| `nestjs-cls`                      | 7.0.1          | 7.0.1        | 已是最新                       |
| `next-themes`                     | 0.4.6          | 0.4.6        | 已是最新                       |
| `nodemailer`                      | 9.0.3          | 10.1.7       | 升级                           |
| `ora`                             | 9.4.1          | 9.4.1        | 已是最新                       |
| `oxfmt`                           | 0.58.0         | 0.74.0       | 升级                           |
| `oxlint`                          | 1.73.0         | 1.89.0       | 升级                           |
| `oxlint-tsgolint`                 | 0.24.0         | 7.0.2004     | 升级                           |
| `p-queue`                         | 9.3.1          | 10.0.0       | 升级                           |
| `pg`                              | 8.22.0         | 8.23.1       | 升级                           |
| `pixi.js`                         | 8.19.0         | 8.22.0       | 升级                           |
| `pizzip`                          | 3.2.0          | 3.3.0        | 升级                           |
| `playwright`                      | 1.61.1         | 1.64.1       | 升级                           |
| `protobufjs`                      | 8.7.0          | 8.8.1        | 升级                           |
| `ramda`                           | 0.32.0         | 0.32.0       | 已是最新                       |
| `rc-resize-observer`              | 1.4.3          | 1.4.3        | 已是最新                       |
| `react`                           | 19.2.7         | 19.3.1       | 升级                           |
| `react-day-picker`                | 10.0.1         | 10.0.2       | 升级                           |
| `react-dom`                       | 19.2.7         | 19.3.1       | 升级                           |
| `react-hook-form`                 | 7.81.0         | 7.90.0       | 升级                           |
| `react-resizable-panels`          | 4.12.1         | 4.14.7       | 升级                           |
| `react-router`                    | 8.2.0          | 8.5.0        | 升级                           |
| `react-syntax-highlighter`        | 16.1.1         | 16.1.2       | 升级                           |
| `recharts`                        | 3.9.2          | 3.10.1       | 升级                           |
| `reflect-metadata`                | 0.2.2          | 0.2.2        | 已是最新                       |
| `rehype-katex`                    | 7.0.1          | 7.0.1        | 已是最新                       |
| `remark-directive`                | 4.0.0          | 4.0.0        | 已是最新                       |
| `remark-frontmatter`              | 5.0.0          | 5.0.0        | 已是最新                       |
| `remark-gfm`                      | 4.0.1          | 4.0.1        | 已是最新                       |
| `remark-math`                     | 6.0.0          | 6.0.0        | 已是最新                       |
| `remark-toc`                      | 9.0.0          | 9.0.0        | 已是最新                       |
| `rimraf`                          | 6.1.3          | 6.1.3        | 已是最新                       |
| `rollup-plugin-visualizer`        | 7.0.1          | 7.1.1        | 升级                           |
| `rxjs`                            | 7.8.2          | 7.8.2        | 已是最新                       |
| `semver`                          | 7.8.5          | 7.8.5        | 已是最新                       |
| `shadcn`                          | 4.13.0         | 4.22.1       | 升级                           |
| `shadcn-ui`                       | 0.9.5          | —            | 移除                           |
| `sonner`                          | 2.0.7          | 2.0.8        | 升级                           |
| `source-map-support`              | 0.5.21         | —            | 移除                           |
| `supertest`                       | 7.2.2          | 7.3.1        | 升级                           |
| `tailwind-merge`                  | 3.6.0          | 3.7.0        | 升级                           |
| `tailwindcss`                     | 4.3.2          | 4.3.3        | 升级                           |
| `tapable`                         | 2.3.3          | 2.3.3        | 已是最新                       |
| `ts-node`                         | 10.9.2         | —            | 移除                           |
| `tsconfig-paths`                  | 4.2.0          | 4.2.0        | 已是最新                       |
| `tsconfig-paths-webpack-plugin`   | 4.2.0          | 4.2.0        | 已是最新                       |
| `tslib`                           | 2.8.1          | 2.8.1        | 已是最新                       |
| `tsx`                             | 4.23.0         | 4.23.15      | 升级                           |
| `tw-animate-css`                  | 1.4.0          | 1.4.0        | 已是最新                       |
| `typedoc`                         | 0.28.20        | 0.28.20      | 已是最新                       |
| `typedoc-plugin-markdown`         | 4.12.0         | 4.14.1       | 升级                           |
| `typeorm`                         | 1.0.0          | 1.1.2        | 升级                           |
| `typescript`                      | 6.0.2          | 6.0.3, 7.0.2 | 主版本 7；两个工具工作区兼容 6 |
| `unbuild`                         | 3.6.1          | 3.6.1        | 已是最新                       |
| `vaul`                            | 1.1.2          | 1.1.2        | 已是最新                       |
| `vite`                            | 8.1.4          | 8.3.4        | 升级                           |
| `vite-plugin-compression`         | 0.5.1          | —            | 移除                           |
| `webpack-node-externals`          | 3.0.0          | 3.0.0        | 已是最新                       |
| `winston`                         | 3.19.0         | 3.19.0       | 已是最新                       |
| `winston-daily-rotate-file`       | 5.0.0          | 5.0.0        | 已是最新                       |
| `xml`                             | 1.0.1          | 1.0.1        | 已是最新                       |
| `yargs`                           | 18.0.0         | 18.2.0       | 升级                           |
| `zod`                             | 4.4.3          | 4.6.7        | 升级                           |
| `zx`                              | 8.8.5          | 8.8.5        | 已是最新                       |

## 证据与后续维护

- 原始分析：[依赖升级分析](./dependency-upgrade-analysis-2026-10-20.md)。
- 本次逐次构建、类型、测试、冻结安装、88 份审计结果、回退记录和基线备份保存在 `.codex_tmp/dependency-upgrade-2026-10-20/`；最终验证日志以 `logs/final-` 开头。
- 根 `pnpm-workspace.yaml` 保存所有版本、精确新发布版本例外、工具兼容 catalog、KaTeX/DOMPurify 修复版本和 ExcelJS 补丁声明。
- 待 Nest CLI / TypeDoc 支持新编译器 API 后，可删除两个 `compilerApi` 例外；待声明生成工具完全支持 TS 7 API 后再删除其 API fallback。
- 待上游 shadcn/braces 发布修复后更新并重新审计；ExcelJS 的整库替代单独评估已有 XLSX 功能覆盖。
