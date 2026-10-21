# Less plugins（ESM）

这些插件现在由 Rslib 构建，仅发布 `dist/*.mjs` 和 TypeScript 声明。使用 Node.js 24.22.0 开发、构建和测试。

通过 Less JavaScript API 显式安装插件：

```js
import { readFile, writeFile } from 'node:fs/promises';
import less from 'less';
import CssLogical from '@less-plugins/css-logical';
import Rtl from '@less-plugins/rtl';

const filename = new URL('./styles.less', import.meta.url);
const rtl = new Rtl();
rtl.setOptions('--selector "html[data-rtl] &"');

const { css } = await less.render(await readFile(filename, 'utf8'), {
    filename: filename.pathname,
    plugins: [new CssLogical(), rtl],
});
await writeFile(new URL('./styles.css', import.meta.url), css);
```

其他插件采用相同方式，例如 `import DefineVar from 'less-plugin-define-var'`。需要选项时，先调用实例的 `setOptions()`，再传给 `plugins`。每次编译创建新的插件实例，避免选项或访问器状态跨编译复用。

这是一次不兼容的模块格式调整。Less 的 `@plugin` / `lessc --plugin` 使用 CommonJS 加载器，不能直接执行这些 ESM 入口。请删除 Less 源文件中的旧 `@plugin` 指令，改为上述 `plugins` 配置；旧 `index.js` 包装器和 `lib/index.js` 路径已移除。Vite 等工具可在 Less 的预处理器选项中传入同样的插件实例。

原有全局 `LESS_PLUGINS`、`loadPlugin()` 加载桥接已删除。访问器从 `install(less, ...)` 接收当前编译器，不再依赖全局注入。

`pnpm --filter '@less-plugins/*' build` 构建插件；`pnpm --filter '@less-plugins/*' test` 验证现有 Less 夹具。`less-plugin-define-var` 单独通过 `pnpm --filter less-plugin-define-var build` / `test` 检查。12 份 CSS 期望文件来自迁移前的编译结果。
