> 后续变更：库包已切换为 ESM-only，Less 与 icons 也采用 Rslib。当前入口和验证结果以 [ESM 迁移记录](./esm-migration-2026-10-21.md) 为准；下文保留本次初始迁移记录。

# Rslib 库构建迁移记录

日期：2026-10-21。范围为此前使用 unbuild 构建的 18 个 package；保留当前工作区已有修改。

## 最终实现

- 使用 `@rslib/core@1.0.3`，共用 `scripts/rslib-config.ts`；每个库通过自己的 `rslib.config.ts` 显式声明入口。
- JavaScript 由 SWC 构建；声明由根 TypeScript 7.0.2 原生编译器生成，保留模块结构，不再使用声明合并工具。所有包均有独立 `tsconfig.build.json`，排除测试及构建配置。
- 保留 `.mjs` / `.cjs` 和原有 `.d.ts` / `.d.mts` / `.d.cts` 入口。ESM 专用的 e2e、xidl 继续使用 ESM。原始 `.d.ts` 声明只生成一次，构建完成后复制入口别名；内部声明的相对导入由 Rslib 补齐扩展名。
- 依赖保持外置，构建统一清理 `dist`；`dev` 使用 `rslib build --watch`。
- 移除 19 处 unbuild 依赖、9 个旧构建配置、unbuild 的 TS peer 允许规则和 rollup-plugin-dts 专用 TS 6 扩展，同时移除 16 处构建脚本已不需要的 rimraf 依赖。
- `icons` 的实际构建一直使用 tsc，本次仅删除其 unbuild 残留。客户端 Vite 和服务端 Rspack 构建继续保留。
- `.rstack/` 声明缓存加入 `.gitignore`；验证证据保存在已忽略的 `.codex_tmp/rslib-migration-2026-10-21/`。

## 迁移时修正的问题

- 基线产物加载发现 uploader 默认导入 Ramda，但该包没有默认导出；改为命名空间导入。
- package-json-extension 的 ESM 产物使用未定义的 `require` / `__dirname`；改用 `createRequire` 和 `fileURLToPath`。CLI 入口纳入构建，其 wrapper 与发布清单更新为 `dist`。
- md2resume 的图标 helper 导入缺少 `.js` 扩展名；补齐扩展名，同时修正遗漏产物的发布清单。
- xidl 原先依赖生成 chunk 所在目录层级来定位 package.json；改为向上寻找包目录，兼容源码运行和新打包布局。
- e2e / xidl 直接发布 `dist/cli.mjs`；构建完成后根据 package.json 的 bin 自动补齐 Node 执行头和可执行权限，并以直接执行方式验证帮助命令。
- 构建配置统一纳入根 TS 配置检查，避免 xidl 将跨目录构建 helper 当作 `rootDir` 内源码。

## 声明策略的验证与选择

最初测试了 API Extractor 声明合并。简单库可通过，但第三方命名空间再导出、Node 26 类型和 zx 的复杂声明暴露出上游分析限制。该工具还通过旧 argparse 引入未修复的 sprintf-js 开发依赖告警（[GHSA-hp3w-g68c-fv3c](https://github.com/advisories/GHSA-hp3w-g68c-fv3c)）。最终改为 Rslib 原生 TS 7 的分文件声明输出，并删除 API Extractor 直接依赖，显式排除 Rslib 及其声明插件中不使用的可选 API Extractor peer，防止锁文件继续保留它。参见 [Rslib 声明配置](https://rslib.rs/config/lib/dts)。

Nest CLI / TypeDoc 所需的 TS 6 工作区兼容版本仍保留；CLI 导出的显式 TS 6 API 和服务端动态 TS 执行依赖也仍需要。它们与本次已移除的 unbuild 声明生成兼容层用途不同。

## 迁移包清单

| Package                   | 路径                                                    | 模块格式  |
| ------------------------- | ------------------------------------------------------- | --------- |
| `@bestlyg/cli`            | `packages/cli`                                          | ESM + CJS |
| `@bestlyg/client-shared`  | `packages/shared/client-shared`                         | ESM + CJS |
| `@bestlyg/core-shared`    | `packages/shared/core-shared`                           | ESM + CJS |
| `@bestlyg/e2e`            | `packages/e2e`                                          | ESM       |
| `@bestlyg/input-engine`   | `packages/input-engine/core`                            | ESM + CJS |
| `@bestlyg/server-shared`  | `packages/shared/server-shared`                         | ESM + CJS |
| `@bestlyg/xidl`           | `packages/xidl`                                         | ESM       |
| `@xidl/core`              | `packages/npm/xidl/packages/core`                       | ESM + CJS |
| `@xidl/python-core`       | `packages/npm/xidl/packages/language/python/core`       | ESM + CJS |
| `@xidl/shared`            | `packages/npm/xidl/packages/shared`                     | ESM + CJS |
| `@xidl/typescript-client` | `packages/npm/xidl/packages/language/typescript/client` | ESM + CJS |
| `@xidl/typescript-core`   | `packages/npm/xidl/packages/language/typescript/core`   | ESM + CJS |
| `@xidl/typescript-server` | `packages/npm/xidl/packages/language/typescript/server` | ESM + CJS |
| `best-uploader`           | `packages/npm/uploader`                                 | ESM + CJS |
| `cscet`                   | `packages/npm/china-software-copyright-extraction-tool` | ESM + CJS |
| `generator-helpers`       | `packages/npm/generator-helpers`                        | ESM + CJS |
| `md2resume`               | `packages/npm/md2resume`                                | ESM + CJS |
| `package-json-extension`  | `packages/npm/package-json-extension`                   | ESM + CJS |

## 验证

| 验证               | 结果                                                                                     |
| ------------------ | ---------------------------------------------------------------------------------------- |
| `pnpm build`       | 全仓递归构建通过；两个直接发布的 CLI 入口另行验证构建输出                                |
| `pnpm typecheck`   | TypeScript 7 检查 65/65 配置通过；CLI 执行头处理添加后，根构建配置检查再次通过           |
| `pnpm test`        | 58 文件、414 项通过，包含浏览器和 PostgreSQL 生产包 / Nest watch 集成测试                |
| `pnpm lint`        | 0 error，18 条现有 React warning                                                         |
| 产物加载           | 37 组 ESM / CJS 入口加载成功；迁移前已能加载入口的导出名无缺失                           |
| 产物类型消费       | NodeNext 模式下，20 组 ESM、17 组 CJS 入口的原有公开符号检查通过                         |
| npm 发布清单       | 18 个 package dry-run 通过；所有入口、JS chunk、声明文件及 bin 均包含在发布文件中        |
| CLI                | e2e、xidl 直接执行 `--help` 通过；cscet、package-json-extension wrapper 的 `--help` 通过 |
| Rslib watch        | 初次构建、源码变更、JS / 声明别名更新、源码还原均通过                                    |
| 冻结安装           | 44 个工作区的独立锁文件通过                                                              |
| 依赖一致性         | 无缺失直接依赖、无安装 / 锁文件版本漂移、无 peer 版本冲突                                |
| 新工具链安全审计   | 根项目及 18 个迁移包共 19 项审计通过，0 告警；未重新覆盖其他包的既有审计结果             |
| `git diff --check` | 通过                                                                                     |

最终验证日志与基线备份位于上述临时目录。验证环境为本机 macOS / Node 24.22.0；未执行发布或部署。

另外发现 `@bestlyg/cli/bin/best.js` 在迁移前已引用不存在的 `dist/esm/index.js` 和 `Cli` 类。这是遗留命令入口问题；本次验证覆盖该包的库导出及 globals 入口，没有为这个旧命令另行设计新功能。
