
:::div{.resume-block .resume-block-header}

# 李逸港 - WEB 前端工程师

26 岁 | 本科 | 男 | 浙江温岭

[:icon[HomeOutlined]{title="website!"} https://bestlyg.com](https://bestlyg.com)

[:icon[GithubOutlined]{title="github!"} https://github.com/bestlyg](https://github.com/bestlyg)

[:icon[MailOutlined]{title="email!"} 1057966749@qq.com](mailto:1057966749@qq.com)

:icon[WechatOutlined]{title="wechat!"}  bestlyg

:icon[PhoneOutlined]{title="phone!"}  139586969091

:::

:::div{.resume-block .resume-block-item}

## 介绍

为这些开源项目贡献过 PR：`ArcoDesign` `LessJS` `Next.JS` `Parcel` `ModernJS` `AntDesign`

在职期间主要参与前端组件库的开发和维护，大约 50+组件，100+使用人数，以及大型前端项目的技术升级改造，改造期间能够对于各种历史遗留问题从源码角度进行分析和排查，高效的发现问题点并提出可行的解决方案，深入理解如何正确的构建一个组件，同时对于 LessJS 有深入源码研究，对其了解运行原理进行 Debug 并且能够编写插件，曾为组件提供渐进式样式隔离方案并落地。

本人能够熟练运用 react，掌握运行原理，能够在紧张的项目工作中保持高质量高效率的工作状，曾在大型前端项目中开发过需求，能够很好的适应高强度的编码工作，对于业务中遇到的 bug 也能够从源码角度分析，深入框架源码进行 debug 了解出错原因，模拟制作 demo 并整理成文档作为过程资产。

有过硬的前端技术能力并受同事的认可，兴趣导向性写代码，追求高质量代码，坚持每天刷 leetcode 每日一题，连续一千一百多天打卡每日一题，竞赛分 2000+knight，工作之外也喜欢多去体验不同的计算机语言，周末会花精力去学习非前端相关计算机知识来辅助学习前端，也自学过 rust 去尝试辅助前端开发。


:::

:::div{.resume-block .resume-block-item}

## 工作

### 杭州科之锐人力资源有限公司 （2022.5-至今）

-   M4B 组件库 `React` `ArcoDesign` `Node` `Cli` `组件库` `工程化` `基建搭建`

    -   M4B 是 MPUX 团队与 GEC 前端团队共同推出的设计系统，支持 b 端系列全球电商产品。
    -   维护组件库的持续迭代，组件问题修复。
    -   适配新版 TikTokPulse 样式规范。
    -   组件库官网搭建。
    -   设计组件库样式隔离解决方案，并成功落地。
    -   设计组件库搭建 CLI 工具，快速生成组件。
    -   维护 M4BWebpackPlugin，提供组件库样式前缀替换，主题包替换等能力。
    -   维护期间提供多个改进和问题修复 PR 给 ArcoDesign。

-   样式隔离解决方案 `LessJS` `CSS` `webpack`

    -   对于组件样式提供一种渐进式的隔离解决方案，保证多版本之间样式不冲突。
    -   对老版本代码无权重增加，确保组件升级后能原有样式覆盖依旧生效。
    -   编写 Less 样式处理器的 Plugin，结合 hash 函数实现基于版本的 hash 值动态计算。
    -   利用 WebpackDefinePlugin 对代码中的常亮进行替换。

-   TTP-SYNC 代码同步 CLI 工具 `Cli` `CI/CD` `GitlabAPI`

    -   利用代码仓库的同步能力结合 Pipeline，把 CNBnpm 上的包，快速的同步到 TTPBnpm 上。
    -   使用 unpkg 的能力结合 curl 动态拉取最新版本的 shell，并进行本地调用。
    -   使用 Cli 工具后可以从前期的每次发包需要半小时至一小时，缩短至五分钟内，提升效率。
    -   利用 GitlibAPI 快速对仓库进行分支、文件等处理。
    -   利用 Pipeline 的编排能力对流程进行定制化。

-   前端大型项目管理平台 `React` `微前端` `Zustand` `项目管理`
    -   维护前端大型项目管理平台的各类需求，持续迭代。
    -   据 PMBook 和组织内部文档进行裁剪融合。
    -   使用 Zustand 对项目中的数据进行统一管理和响应更新。

### 杭州洪普科技有限公司 （2020.11-2022.5）

-   洪普智哨智慧工地后台管理系统 `React` `AntDesign` `蜂鸟视图`

    -   智慧工地项目，通过公司自主研发的智能安全帽，使得当前工地上管理人员能够智能管控员工，通过低功耗蓝牙配合蓝牙网关、GPS 信息采集、视频工地安全帽解决了目前工地上管理难的痛点。
    -   使用 Umi 作为整体前端框架搭建。
    -   使用 Webhook 实现代码 push 后自动部署到测试环境。
    -   使用 AntDesignPro 搭建后台管理页面。
    -   使用 WebSocket 实时展示工人信息在页面上。

-   洪普智哨小程序 `微信小程序` `TaroJS`

    -   使用 TaroJS 搭建整体小程序框架。
    -   使用 Scss 对小程序的样式进行维护。
    -   编写自定义头部导航栏和底部导航栏。
    -   使用利用手机蓝牙功能使手机可以充当蓝牙网关与工地安全帽的低功耗蓝牙进行交互，并传输数据给后端。

-   大文件上传解决方案 `Upload` `FileUpload`
    -   解决了在后台管理系统中上传大体积视频时需要长时间连接，并且容易断连导致传输失败的问题。
    -   使用 Worker 在非主线程中计算文件的哈希值。
    -   使用 Blob 分片对文件进行分片上传并与后端对齐校验头。
    -   使用 AsyncPool 技术动态保证同时上传的文件数。

:::

:::div{.resume-block .resume-block-item}

## 教育经历

### 浙江大学宁波理工学院 （2018.9-2020.9）

`软件工程` `本科`

### 绍兴职业技术学院 （2015.9-2018.6）

`软件技术` `专科`

:::