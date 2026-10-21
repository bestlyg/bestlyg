# ESM 迁移记录（2026-10-21）

按本次范围，PM2 配置保留 CommonJS，metadata-file、module-checker、前端应用产物不迁移。其他可构建库和服务端统一生成 ESM `.mjs`。Node.js 继续固定为 24.22.0，pnpm 为 12.14.0；本次不切换到 Node 26。

## 修改范围

- 原有 18 个 Rslib 库取消 CJS 构建，清理 `require` 条件及 `.cjs` / `.d.cts` 入口。保留原来的 ESM 入口和类型导出。`main` 同步指向 `.mjs`。
- 13 个 Less 插件包由 tsc + CommonJS 包装器改为 Rslib ESM 构建，输出目录统一为 `dist`。访问器显式接收当前 Less 编译器，移除全局加载桥接。自定义函数采用明确的注册键，避免构建器删除函数名后注册失效。
- icons 使用 Rslib bundleless 构建，所有图标的独立导出路径保留，JavaScript 后缀改为 `.mjs`。
- 服务端输出 `main.mjs` 和 `.mjs` 分块；外部依赖通过原生 ESM 导入。Express 的类型导入显式标为 `import type`，Lodash omit 使用默认导入，Nodemailer 使用默认导入。
- Nest CLI 12 仍用扩展名缺省的路径启动应用，`scripts/start-esm.mjs` 将该入口转为 `.mjs` 并转发 Node 调试参数、退出状态和终止信号。PM2 的配置格式不变，仅将 script 路径调整到 `main.mjs`。
- cscet、package-json-extension 的命令包装器改为 `.mjs`，同步 bin 路径与测试。
- `@bestlyg/cli` 原有 best bin 指向不存在的 `dist/esm/index.js` 和已删除的 `Cli` 类，因此移除这个失效命令。现有 `best` / `_best` 库导出及 `@bestlyg/cli/globals` 保留；本次未新增命令功能。
- `@xidl/playground` 只执行 TS 源码，移除从未生成的旧 dist 发布入口。`@bestlyg/xidl/plugins` 显式声明构建产物已有的三个辅助函数导出，保证运行时与类型一致。
- 根目录 webhook 与 Commitlint 配置改为 `.mjs`。旧自定义提交选项保存在 `.cz-config.json`；当前 git-cz 使用自己的默认配置，没有依赖该旧 JS 文件。

## 兼容边界

这是模块格式及旧文件路径的不兼容调整，发布时需要按各包版本策略处理，不应作为无兼容影响的补丁发布。第三方依赖自身包含的 CommonJS 继续保留。

Less 的 `@plugin` / `lessc --plugin` 加载器会把插件文本当作 CommonJS 执行，不能直接加载本次 ESM 入口。仓库夹具已改用 `less.render(source, { plugins })` 对应的 JavaScript API，接入示例见 [Less README](../packages/npm/less-plugins/README.md)。旧全局 `LESS_PLUGINS` 和 `loadPlugin()` 不再提供。

PM2 配置仍通过 `require('@bestlyg/server-shared')` 获取工具函数。在仓库固定的 Node 24.22.0 下，Node 可以同步加载该 ESM 依赖图；本次验证覆盖了配置读取和脚本存在性，没有运行实际 PM2 守护进程或部署。

前端应用继续输出原有 `.js` 资源。TS/TSX 源码、声明、CSS、JSON、protoc 可执行文件等保留各自格式。

## 验证

- `pnpm -r build`：全仓构建通过；32 个 Rslib 库的 JS 产物均为 `.mjs`，服务端入口和分块均为 `.mjs`。
- `pnpm typecheck`：TS 7.0.2 检查 79/79 份配置通过。
- `pnpm test`：58 个测试文件、414 项测试全部通过，包含 12 份 Less CSS 基线对比、真实 PostgreSQL 生产启动与 watch 模式、浏览器登录和 Monaco worker。
- `pnpm lint`：0 错误，18 条已有前端 React 警告。
- 32 个库、35 个公开入口：原生 Node ESM 加载成功，1291 个运行时符号通过 NodeNext 类型消费检查，原有公开符号未丢失。
- 32 个包 `npm pack --dry-run`：声明、入口、命令文件均包含在发布文件中。
- e2e、xidl、cscet、package-json-extension：4 个命令可直接执行 `--help`；cscet 的 Word 文件生成测试通过。
- `pnpm install --frozen-lockfile`：全部工作区锁文件验证通过。
- 根项目和 32 个库的依赖审计：33 个项目均为 0 漏洞。
- PM2 配置在 Node 24.22.0 下读取成功，目标脚本存在；未运行实际 PM2 守护进程。
- Commitlint 的 ESM 配置加载通过。历史 webhook 仅做语法检查，没有启动监听或触发部署。
- 对迁移前排除部分做文件散列核对：metadata-file、module-checker、前端源码和配置没有变更；PM2 配置仅更新 `main.mjs` 路径。仓库自有 CJS 文件仅剩这几个明确排除项。

中间检查发现并修复了 Express 类型误当作运行时导入、Lodash 命名导入导致登录失败、Less 自定义函数名被构建器删除、夹具工作目录变化、旧 CLI 文件后缀引用及 xidl 插件声明不匹配。上述验证使用修复后的代码完成。

## 参考

- [Less JavaScript API](https://lesscss.org/usage/#programmatic-usage)
- [Rslib bundleless 模式](https://rslib.rs/config/lib/bundle)
