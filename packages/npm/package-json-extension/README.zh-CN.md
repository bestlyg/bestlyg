# Package Json Extension

一个关于`package.json`的继承方案。

## 命令行工具

```shell
extend-package-json
extend-package-json -p a-path-of-package-json.
extend-package-json --path a-path-of-package-json.
```

| Args | Shortcut | Value                     | Description                |
| ---- | -------- | ------------------------- | -------------------------- |
| path | p        | 一个`package.json`的路径. | 更新`package.json`的数据。 |

## 模块化导入

```js
const { requireJson } = require('package-json-extension');
const path = "a-path-of-package-json".;
const json = requireJson(path);
console.log(json);
```

### 类型定义

```ts
interface RequireJsonOptions {
    fieldName: string;
}
function requireJson<R = any>(path: string, options: RequireJsonOptions): R;
```
