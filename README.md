# ok-admin-design-md

[简体中文](README.md) | [English](README.en-US.md)

[![ok-admin](https://img.shields.io/badge/ok--admin-2.0__dev-2D8CF0)](https://gitee.com/wudibo/ok-admin/tree/v2.0_dev)
[![DESIGN.md](https://img.shields.io/badge/DESIGN.md-AI%20ready-16b777)](https://stitch.withgoogle.com/docs/design-md/overview/)
[![License](https://img.shields.io/badge/license-MIT-2f363c)](LICENSE)

面向 AI 编码 Agent 的 ok-admin 版本化设计系统文档，专注于基于 Layui 的扁平化后台管理界面。

`DESIGN.md` 是 Google Stitch 提出的纯文本设计系统格式。它把视觉结果、组件组合、交互状态和响应式规则写成 AI Agent 可以直接读取的约束，帮助不同页面保持一致的 ok-admin 风格。它不替代 ok-admin 的业务接口、权限模型或 Layui API 文档。

## 目的与适用场景

本仓库从 ok-admin `v2.0_dev` 源码提取颜色、字体、尺寸、间距、圆角、阴影、布局和交互状态，并按版本保存。规范用于：

- 创建或修改基于 ok-admin 的后台页面
- 设计控制台、数据列表、会员管理、系统设置和表单流程
- 约束侧栏、顶栏、标签页、锁屏和主题切换的一致行为
- 在代码审查和 UI 验收时提供可核对的视觉基线

它不是可运行的后台模板，也不提供真实认证、路由、RBAC、后端数据或生产安全保证。

## 支持版本

| ok-admin 版本 | 英文规范 | 简体中文规范 | GitHub Release |
| --- | --- | --- | --- |
| `2.0_dev` | [DESIGN.md](versions/2.0_dev/DESIGN.md) | [DESIGN.zh-CN.md](versions/2.0_dev/DESIGN.zh-CN.md) | [v2.0_dev](https://github.com/turtoncarllyle/ok-admin-design-md/releases/tag/v2.0_dev) |

英文 `DESIGN.md` 是默认生态入口，中文规范保持相同章节、令牌和技术字面量。版本目录中的文件代表 `main` 上的当前文档；Release 附件是发布时的快照。

审计记录：[2.0_dev 完整性审计与验证边界](versions/2.0_dev/AUDIT.md)。

## 使用方法

1. 确认项目实际使用的是 ok-admin v2.0_dev，并盘点项目自己的主题、路由、权限和数据接口。
2. 读取 [英文 DESIGN.md](versions/2.0_dev/DESIGN.md) 或 [简体中文 DESIGN.md](versions/2.0_dev/DESIGN.zh-CN.md)。已有项目规范时先合并，再补充本项目规则。
3. 要求 AI Agent 先读取规范，再查看真实页面和接口；区分源码事实、Layui/插件继承行为、应用补充和待验证内容。
4. 按规范检查加载、空数据、校验失败、请求失败、重试、成功反馈、窄屏和键盘焦点。

下载英文规范：

```powershell
Invoke-WebRequest `
  -Uri "https://raw.githubusercontent.com/turtoncarllyle/ok-admin-design-md/main/versions/2.0_dev/DESIGN.md" `
  -OutFile ".\DESIGN.md"
```

下载简体中文规范：

```powershell
Invoke-WebRequest `
  -Uri "https://raw.githubusercontent.com/turtoncarllyle/ok-admin-design-md/main/versions/2.0_dev/DESIGN.zh-CN.md" `
  -OutFile ".\DESIGN.md"
```

示例提示词：

```text
请先读取项目根目录的 DESIGN.md，再按 ok-admin 2.0_dev 设计规范修改这个后台页面。
识别现有的 220px 侧栏、49px 顶栏、40px 标签页、主题和 Layui 2.6.8 组件。
保留项目路由、权限、接口字段和组件家族，不把示例密码或演示数据带入生产。
实现加载、空数据、校验失败、请求失败、重试和成功反馈，并分别报告静态检查、
实际页面验证和未验证范围。把应用补充规则与源码已有行为分开说明。
```

## 覆盖范围

- 颜色角色、双主题、字体、图标、间距、圆角、边框、阴影和动效
- 后台壳层、侧栏菜单、多级导航、标签页、标签页右键菜单和设置抽屉
- 按钮、输入框、表单、搜索筛选、表格、分页、卡片、进度、弹层和通知
- 登录、注册、找回密码、锁屏、控制台、图表、会员管理、系统管理、错误页和编辑器
- Layui 2.6.8 继承能力，以及 okTab、okLayer、okUtils、okToastr、okNprogress、okLayx 等扩展
- 响应式、长文本、国际化、键盘焦点、对比度、减弱动效和资源许可边界

## 来源与版本策略

规范固定对应 Gitee 分支 `v2.0_dev` 的提交 [`247f0f2`](https://gitee.com/wudibo/ok-admin/commit/247f0f2ee3dce10adcece6261bdc3ef060cbb567)。本地参考快照与该提交的 668 个文件 Git blob 已核对一致。

本仓库只发布原创设计文档和验证脚本，不复制 ok-admin 源码或图片。ok-admin 上游项目采用 GPL-3.0；本仓库原创文档采用 MIT License，第三方依赖仍遵守各自许可。

当前版本只维护 `2.0_dev`，不会把文档补充改成新的修订号。后续上游版本使用新的 `versions\\<版本>` 目录、front matter、标签和 Release；当前目录的更新由 Git 提交记录追踪。

## 文档验证

```powershell
node .\scripts\verify-docs.mjs
node .\scripts\verify-docs.mjs --source .\ok-admin-v2.0_dev
git diff --check
```

脚本检查 UTF-8、双语结构、元数据、相对链接、固定来源引用、关键源码令牌和源码忽略状态。静态检查不等于浏览器 UI、真实接口或辅助技术验收。

## 许可

原创文档使用 [MIT License](LICENSE)。引用 ok-admin 时请遵守上游 [GPL-3.0 许可](https://gitee.com/wudibo/ok-admin/blob/v2.0_dev/LICENSE)。本项目与 ok-admin 作者无隶属或官方背书关系。
