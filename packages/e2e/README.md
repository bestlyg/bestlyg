# @bestlyg/e2e

Bestlyg 的 Rstest E2E 工作区，按“项目 + 脚本”组织测试。`@rstest/playwright` 提供 fixtures 和浏览器断言，`playwright` 仅提供浏览器驱动。

## 常用命令

```bash
pnpm --filter @bestlyg/e2e e2e:list
pnpm --filter @bestlyg/e2e e2e:run --project bestlyg --script smoke
pnpm --filter @bestlyg/e2e e2e:run --project bestlyg --script smoke --head
pnpm --filter @bestlyg/e2e e2e:run --project bestlyg --script smoke -- --list
pnpm --filter @bestlyg/e2e test
```

根目录也提供了快捷脚本：

```bash
pnpm e2e:list
pnpm e2e:run --project bestlyg --script smoke
```

## 目录约定

- `src/`：E2E CLI、Rstest 配置桥接、预览服务生命周期和 HTML reporter。
- `common/`：跨项目复用的 fixtures、flows、page objects 和 helper。
- `projects/<project>/`：单个项目的环境配置、fixtures、page objects 和 specs。
- `projects/<project>/specs/`：只放测试用例；公共流程放在 `common/flows` 或项目 page object 中。

默认项目为 `bestlyg`，默认本地目标地址为 `http://localhost:10001`。

先执行 `pnpm build` 和 `pnpm e2e:install`。本地测试会自动启动并关闭客户端预览服务；也可通过 `BESTLYG_E2E_WEB_SERVER_COMMAND` 和 `BESTLYG_E2E_WEB_SERVER_URL` 指定服务。`playwright.contextOptions` 配置 baseURL、storageState 等浏览器上下文选项，`playwright.launchOptions` 配置浏览器启动参数，`rstest` 配置超时和重试。

HTML 报告位于 `rstest-report/index.html`，失败截图和 trace 位于 `test-results/`。`--spec`、`--test`、`--target-env`、`--env`、`--concurrency` 和 `--head` / `--headless` 继续由 E2E CLI 支持；`--` 后传入 Rstest 参数（例如 `--testNamePattern`），`--list` 会映射到 Rstest 的 list 命令。
