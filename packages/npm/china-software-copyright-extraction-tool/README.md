# 中国软件著作权提取工具

## 使用

`npx cscet@latest --glob-path "./src/**/*.ts"`

## 配置项

| 配置名      | 使用方式                                | 是否可选 | 类型     | 默认值          |
| ----------- | --------------------------------------- | -------- | -------- | --------------- |
| output-path | `--output-path ./output.docx`           | 是       | string   | CWD/output.docx |
| glob-path   | `--glob-path ./*.js --glob-path ./*.js` | 是       | string[] | []              |
| ignore-path | `--ignore-path ./dist/**.docx`          | 是       | string[] | []              |
