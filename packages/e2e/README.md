# @bestlyg/e2e

Bestlyg 的 Playwright E2E 工作区。结构参考 AskBI 的 `packages/e2e`，按“项目 + 脚本”的方式组织测试。

## 常用命令

```bash
pnpm --filter @bestlyg/e2e e2e:list
pnpm --filter @bestlyg/e2e e2e:run --project bestlyg --script smoke
pnpm --filter @bestlyg/e2e e2e:run --project bestlyg --script smoke --head
pnpm --filter @bestlyg/e2e e2e:run --project bestlyg --script smoke -- --list
```

根目录也提供了快捷脚本：

```bash
pnpm e2e:list
pnpm e2e:run --project bestlyg --script smoke
```

## 目录约定

- `src/`：E2E CLI、配置加载和 Playwright 配置桥接。
- `common/`：跨项目复用的 fixtures、flows、page objects 和 helper。
- `projects/<project>/`：单个项目的环境配置、fixtures、page objects 和 specs。
- `projects/<project>/specs/`：只放测试用例；公共流程放在 `common/flows` 或项目 page object 中。

默认项目为 `bestlyg`，默认本地目标地址为 `http://localhost:10001`。
