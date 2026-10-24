<p align="center">
  <a href="https://www.bestlyg.com">
    <img width="200" src="https://www.bestlyg.com/static/logo.png">
  </a>
</p>

<h1 align="center">Best Lyg</h1>

<div align="center">李逸港的个人仓库。</div>

[![BestLyg's GitHub stats](https://github-readme-stats.vercel.app/api?username=bestlyg)](https://github.com/bestlyg/bestlyg)

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=bestlyg)](https://github.com/bestlyg/bestlyg)

## Development

项目固定使用 pnpm 12.14.0 和 Node.js 24.22.1。首次安装 pnpm 后，在仓库内运行命令会自动使用 `packageManager` 指定的版本；pnpm 会按 `devEngines.runtime` 下载并使用指定的 Node.js。

`@bestlyg/server` 使用 NestJS 12。Node.js 24 满足 Nest CLI 生成器和统一测试工具链的要求。

服务端通过 Rspack 2.2.9 和内置 SWC loader 构建，配置在 `packages/server/rspack.config.mts`。开发构建启用持久化缓存，类型检查使用 `pnpm typecheck`，代码检查使用 `pnpm lint`。

请求校验使用 NestJS 12 内置的 `StandardSchemaValidationPipe`，在 `@Body`、`@Query`、`@Param` 上显式声明 `schema`，例如 `@Body({ schema: UserCreateRequestSchema })`。请求和响应 DTO 均采用 schema + type：`XxxSchema` 是运行时校验器，`XxxDto` 仅作为 `z.output<typeof XxxSchema>` 类型导出；构造数据使用 `XxxSchema.parse(data)`。XLSX 上传由共享文件校验函数检查。

独立的模型能力通过 `ZodModel.withSchema(schema)` 提供，保留模型校验、复制、序列化等 API；`createZodModel` 工厂已删除。

主编译器为 TypeScript 7.0.2。`pnpm typecheck` 使用根目录的 TS 7 检查全部工作区配置。Nest CLI 和 TypeDoc 仍依赖旧编译器 API，因此 `server`、`core-shared` 的构建工具使用 `compilerApi` catalog 中的 TS 6.0.3。升级范围、兼容处理和验证结果见[依赖升级报告](./docs/dependency-upgrade-result-2026-10-21.md)。

32 个库包使用 Rslib 1.0.3 构建，JavaScript 产物统一为 ESM `.mjs`，类型声明由原生 TS 7 生成。共享配置在 `scripts/rslib-config.ts`；图标包采用 bundleless 模式保留 SVG 子路径。服务端通过 Rspack 输出 `dist/main.mjs`。PM2 配置、metadata-file、module-checker 和前端应用产物维持原模块格式。详见 [ESM 迁移记录](./docs/esm-migration-2026-10-21.md) 和 [Less 插件用法](./packages/npm/less-plugins/README.md)。

所有测试统一使用 Rstest 0.12.4。`pnpm test` 运行全部工作区的单元、Less、服务端集成和浏览器测试；`pnpm test:unit` 只运行单元和 Less 测试。每个有测试的包均可单独执行 `pnpm --filter <package> test`，`test:watch` 启用 Rstest watch 模式。

`pnpm --filter @bestlyg/server test:cov` 生成服务端覆盖率。`pnpm --filter @bestlyg/server test:dist` 通过 Rstest 分别验证生产产物和 `nest start --watch`，需要 PATH 中的 PostgreSQL `initdb` / `pg_ctl`（也可用 `PG_BINDIR` 指定目录），会创建并清理临时数据库、配置和日志。运行全部测试前先执行 `pnpm build` 和 `pnpm e2e:install`。

E2E 使用 `@rstest/playwright` fixtures 和 `playwright` 浏览器驱动，可自动启动本地客户端预览服务。`pnpm e2e:run --project bestlyg --script smoke` 保留项目、脚本、环境覆盖、文件/名称筛选和并发控制。HTML 测试报告写入 `packages/e2e/rstest-report/index.html`，失败截图和浏览器 trace 写入 `packages/e2e/test-results`。

```sh
npm install --global pnpm@12.14.0
pnpm install --frozen-lockfile
pnpm build
pnpm typecheck
pnpm lint
```

工作区包的类型声明由构建生成，因此首次运行类型检查前需要先执行 `pnpm build`。pnpm 配置集中在 `pnpm-workspace.yaml`，`.npmrc` 仅保留 registry 配置。

## 可复用模块

从 ask-bi 本地 main 迁入的 [输入引擎内核](./packages/input-engine/core/README.md) 已作为独立工作区包提供；其他候选模块、依赖和迁移边界见 [复用评估](./docs/ask-bi-reuse.md)。

## Contact Me

- Phone : 13958696909
- Wechat : bestlyg
- Email : bestlyg@foxmail.com / 1057966749@qq.com
- Website : https://www.bestlyg.com
