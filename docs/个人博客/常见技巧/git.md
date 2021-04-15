---
title: Git相关
nav:
  title: 个人博客
  path: /blogs
  order: 1
group:
  title: 常见技巧
  path: /skills
  order: 1
---

# Git 相关

## 开启大小写区分

默认情况下 git 是忽略区分大小写的，多人合作的情况下不规范很容易造成问题，所以开启区分大小写。

- 全局开启`git config --global core.ignorecase false`
- 可以通过`git config --list`查看配置中是否包含`core.ignorecase=false`来确认是否开启

## 撤销 commit

在 commit 后想撤回

- 撤回最新一次 commit`git reset --soft HEAD^`
- 撤回最新 N 次 commit`git reset --soft HEAD~N`
- 不删除工作空间改动代码，撤销 commit，不撤销 git add . `--soft`
- 删除工作空间改动代码，撤销 commit，撤销 git add . `--hard`
- 只修改注释`git commit --amend`
