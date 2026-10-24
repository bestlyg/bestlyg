# Node.js 24.22.1 全工作区运行验证

日期：2026-10-24（Asia/Shanghai）。环境：本机 macOS、Node.js 24.22.1、pnpm 12.14.0。范围：根项目与 43 个子工作区，共 44 个 package。

## 结果

44 个 package 已逐包核查。具有运行入口的包通过下表列出的构建、测试或实际调用；4 个占位、聚合及静态资源包标明为无独立入口。此结果覆盖已执行的本地路径，不代表全部业务场景、生产部署或跨平台验证。

| 检查 | 结果 |
| --- | --- |
| 全包 Node 版本 | 44/44 均为 v24.22.1 |
| 冻结锁文件安装 | 全部工作区通过，修复后的测试依赖锁文件再次通过 |
| 全量构建 | 32 个 Rslib 库、客户端 Vite、服务端 Rspack 通过；playground 的占位 build 之外另外实际执行代码生成 |
| 完整测试 | 60 个文件、427 项测试通过 |
| 类型检查 | TypeScript 7.0.2，79/79 配置通过 |
| Lint | 退出码 0、0 错误、18 条既有前端 React 警告 |
| 库与命令入口 | 34 个库、37 个显式公开入口加载通过；4 个 CLI --help 通过 |
| 补充实际调用 | Markdown 渲染、两套 XIDL 生成流程、模块格式判断、模板生成、E2E CLI list、PM2 配置加载通过 |
| 修改文件格式 | 6 个修改/新增代码文件的 oxfmt 检查通过；git diff --check 通过 |

完整测试的客户端预览服务使用临时空闲端口；服务端测试创建并清理临时 PostgreSQL，覆盖生产启动及 watch 模式。浏览器测试覆盖首页、登录密码加密和状态持久化、Monaco worker，登录 API 使用测试响应。

## 发现与修复

1. **module-checker CommonJS 入口**：调用 isESM() 会抛出 ReferenceError，因为命名函数表达式 isCJS 的名称只在自身函数体内可见。改为模块内函数声明并导出，在 metadata-file 的原生 ESM/CJS 夹具中同时断言两个判断函数。
2. **XIDL playground 示例与失败状态**：mobius-event.proto 声明 proto3 却使用 required 字段，当前 protobufjs 拒绝解析；异常又被捕获并仅打印，命令错误地返回 0。示例统一为 proto2，保留 required 字段并给其余单值字段标记 optional；捕获异常时设退出码 1。新增两项 Rstest 回归，验证四套输出生成、required 类型保留及缺失输入的失败退出。该配置文件仅被 playground 的示例入口导入。

上述问题来自本次检查前已有的代码，本次验证未将其归因为 Node 补丁版本变化。初次与构建并行的 Lint 曾报 XIDL 声明缺失；构建结束后以及修复后再次执行均通过。

## 逐包结果

所有行均已确认 pnpm 使用 Node.js v24.22.1。表中的“入口”指显式声明的 JavaScript 导出；通配符子路径未逐一穷举。

| Package | 路径 | 结果 | 已执行验证 |
| --- | --- | --- | --- |
| `bestlyg` | `.` | 通过 | 冻结锁文件安装；44 包 Node 版本；全量构建、60 文件 / 427 测试、79 份类型配置与 Lint |
| `@bestlyg/cli` | `packages/cli` | 通过 | 构建通过；2 个入口加载通过 |
| `@bestlyg/client` | `packages/client` | 通过 | 构建通过；3 项测试通过；Vite 生产构建；浏览器首页、登录加密/Jotai 持久化、Monaco TypeScript worker |
| `@bestlyg/code` | `packages/code` | 通过 | 286 项测试通过 |
| `@bestlyg/e2e` | `packages/e2e` | 通过 | 构建通过；1 个入口加载通过；3 项测试通过；1 个 CLI --help 通过；产物 CLI 的 --help / list；实际执行 3 项 Chromium 浏览器测试 |
| `@bestlyg/icons` | `packages/icons` | 通过 | 构建通过；2 个入口加载通过 |
| `@bestlyg/input-engine` | `packages/input-engine/core` | 通过 | 构建通过；1 个入口加载通过；8 项测试通过 |
| `cscet` | `packages/npm/china-software-copyright-extraction-tool` | 通过 | 构建通过；1 个入口加载通过；2 项测试通过；1 个 CLI --help 通过 |
| `dipeak` | `packages/npm/dipeak` | 无独立入口，相关检查通过 | 仅 package.json 占位包；安装与清单有效，无独立运行入口 |
| `generator-helpers` | `packages/npm/generator-helpers` | 通过 | 构建通过；1 个入口加载通过；10 项测试通过 |
| `less-plugins` | `packages/npm/less-plugins` | 无独立入口，相关检查通过 | 聚合包；13 个子包构建、入口加载，12 组 Less 测试通过，无独立运行入口 |
| `@less-plugins/css-logical` | `packages/npm/less-plugins/packages/css-logical` | 通过 | 构建通过；1 个入口加载通过；1 项测试通过 |
| `less-plugin-define-var` | `packages/npm/less-plugins/packages/define-var` | 通过 | 构建通过；1 个入口加载通过；1 项测试通过 |
| `@less-plugins/get-current-package-name` | `packages/npm/less-plugins/packages/get-current-package-name` | 通过 | 构建通过；1 个入口加载通过；1 项测试通过 |
| `@less-plugins/get-current-package-scope` | `packages/npm/less-plugins/packages/get-current-package-scope` | 通过 | 构建通过；1 个入口加载通过；1 项测试通过 |
| `@less-plugins/get-env` | `packages/npm/less-plugins/packages/get-env` | 通过 | 构建通过；1 个入口加载通过；1 项测试通过 |
| `@less-plugins/get-hashed-version` | `packages/npm/less-plugins/packages/get-hashed-version` | 通过 | 构建通过；1 个入口加载通过；1 项测试通过 |
| `@less-plugins/get-package-info` | `packages/npm/less-plugins/packages/get-package-info` | 通过 | 构建通过；1 个入口加载通过；1 项测试通过 |
| `@less-plugins/get-package-json-field` | `packages/npm/less-plugins/packages/get-package-json-field` | 通过 | 构建通过；1 个入口加载通过；1 项测试通过 |
| `@less-plugins/playground` | `packages/npm/less-plugins/packages/playground` | 通过 | 构建通过；1 个入口加载通过；1 项测试通过 |
| `@less-plugins/replace-properties` | `packages/npm/less-plugins/packages/replace-properties` | 通过 | 构建通过；1 个入口加载通过；1 项测试通过 |
| `@less-plugins/rtl` | `packages/npm/less-plugins/packages/rtl` | 通过 | 构建通过；1 个入口加载通过；1 项测试通过 |
| `@less-plugins/shared` | `packages/npm/less-plugins/packages/shared` | 通过 | 构建通过；1 个入口加载通过 |
| `@less-plugins/template` | `packages/npm/less-plugins/packages/template` | 通过 | 构建通过；1 个入口加载通过；1 项测试通过 |
| `md2resume` | `packages/npm/md2resume` | 通过 | 构建通过；1 个入口加载通过；真实 Markdown → HTML 渲染，包含标题、加粗和中文 |
| `metadata-file` | `packages/npm/metadata-file` | 通过 | 1 个入口加载通过；2 项测试通过；原生 ESM / CommonJS 文件名和目录解析；同时覆盖 module-checker |
| `module-checker` | `packages/npm/module-checker` | 通过 | 1 个入口加载通过；原生 ESM / CommonJS 导入并调用 isCJS、isESM；通过 metadata-file 夹具回归 |
| `package-json-extension` | `packages/npm/package-json-extension` | 通过 | 构建通过；1 个入口加载通过；1 项测试通过；1 个 CLI --help 通过 |
| `template` | `packages/npm/template` | 通过 | 在隔离目录执行 fork 脚本并生成 package.json；publish 命令由记录参数的替身替代 |
| `best-uploader` | `packages/npm/uploader` | 通过 | 构建通过；1 个入口加载通过；2 项测试通过 |
| `xidl` | `packages/npm/xidl` | 无独立入口，相关检查通过 | 元数据/聚合包；下属生成器和 playground 已运行，无独立运行入口 |
| `@xidl/core` | `packages/npm/xidl/packages/core` | 通过 | 构建通过；1 个入口加载通过；通过 playground 的四套生成器实际调用 |
| `@xidl/python-core` | `packages/npm/xidl/packages/language/python/core` | 通过 | 构建通过；1 个入口加载通过；实际生成 Python 文件；本次验证生成流程，未运行生成的 Python 程序 |
| `@xidl/typescript-client` | `packages/npm/xidl/packages/language/typescript/client` | 通过 | 构建通过；1 个入口加载通过；实际生成 TypeScript client 文件 |
| `@xidl/typescript-core` | `packages/npm/xidl/packages/language/typescript/core` | 通过 | 构建通过；1 个入口加载通过；实际生成 TypeScript core 文件 |
| `@xidl/typescript-server` | `packages/npm/xidl/packages/language/typescript/server` | 通过 | 构建通过；1 个入口加载通过；实际生成 TypeScript server 文件 |
| `@xidl/playground` | `packages/npm/xidl/packages/playground` | 通过 | 2 项测试通过；实际生成 client / server / core / py-core 四套输出；缺少 proto 输入返回退出码 1 |
| `@xidl/shared` | `packages/npm/xidl/packages/shared` | 通过 | 构建通过；1 个入口加载通过；通过 playground 的四套生成器实际调用 |
| `@bestlyg/server` | `packages/server` | 通过 | 构建通过；35 项测试通过；生产包与 Nest watch 启动；临时 PostgreSQL、JWT、CLS、DTO、SSE、静态资源、错误退出；PM2 配置加载 |
| `@bestlyg/client-shared` | `packages/shared/client-shared` | 通过 | 构建通过；1 个入口加载通过 |
| `@bestlyg/core-shared` | `packages/shared/core-shared` | 通过 | 构建通过；1 个入口加载通过；41 项测试通过 |
| `@bestlyg/server-shared` | `packages/shared/server-shared` | 通过 | 构建通过；1 个入口加载通过；20 项测试通过 |
| `@bestlyg/static` | `packages/static` | 无独立入口，相关检查通过 | 静态资源包；由客户端构建及浏览器首页流程消费，无独立运行入口 |
| `@bestlyg/xidl` | `packages/xidl` | 通过 | 构建通过；2 个入口加载通过；1 个 CLI --help 通过；产物 CLI --help；在隔离目录使用现有示例配置生成 3 个 TypeScript 文件 |

## 复验与日志

主要命令：

```sh
pnpm install --frozen-lockfile --no-progress
pnpm build
pnpm typecheck
pnpm test
pnpm lint
pnpm exec rstest run --project metadata-file --project xidl-playground
pnpm --filter @xidl/playground start
```

本次运行日志与额外调用脚本保存在本机临时目录：

- [构建日志](/tmp/bestlyg-node-24.22.1-validation/build.log)
- [最终测试日志](/tmp/bestlyg-node-24.22.1-validation/test-final.log)
- [最终类型检查](/tmp/bestlyg-node-24.22.1-validation/typecheck-final.log)
- [最终 Lint](/tmp/bestlyg-node-24.22.1-validation/lint-final.log)
- [逐包入口结果](/tmp/bestlyg-node-24.22.1-validation/package-smoke.json)
- [补充运行结果](/tmp/bestlyg-node-24.22.1-validation/extra-smoke.json)
- [入口检查脚本](/tmp/bestlyg-node-24.22.1-validation/package-smoke.mjs)
- [补充检查脚本](/tmp/bestlyg-node-24.22.1-validation/extra-smoke.mjs)

临时目录可能被系统清理。未执行发布、部署或真实 PM2 守护进程；模板中的发布调用使用替身。
