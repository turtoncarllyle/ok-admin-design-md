# ok-admin 2.0_dev 完整性审计与验证记录

[中文首页](../../README.md) | [English manual](../../README.en-US.md) | [DESIGN.md](DESIGN.md) | [中文规范](DESIGN.zh-CN.md)

## English summary

This is a source-derived design specification for ok-admin `v2.0_dev`, not a frontend upgrade or a new revision number. The audit separates custom ok-admin CSS/JavaScript from inherited Layui `2.6.8` and bundled plugin behavior, then marks application additions and runtime items that static inspection cannot prove.

The upstream reference is Gitee commit `247f0f2ee3dce10adcece6261bdc3ef060cbb567`. The local reference snapshot contains 668 files; every local Git blob matched the pinned Gitee tree. The source directory is analysis-only and is ignored by this repository.

## 边界与总体结论

- 目标目录：`E:\github\admin-ui-design-md\ok-admin-md`，仅包含设计规范、审计记录、验证脚本和许可证。
- 参考源码：`ok-admin-v2.0_dev`，对应 Gitee 分支 `v2.0_dev`，固定提交 `247f0f2ee3dce10adcece6261bdc3ef060cbb567`。
- 源码规模：70 个 HTML 页面、29 个 JavaScript 文件、9 个 CSS 文件、11 个一级导航组；完整快照共 668 个文件。
- 实际运行基础：内置 Layui `2.6.8`，而上游 README 中的 Layui `2.5.5` 徽章属于旧元数据，不能作为当前样式版本依据。
- 规范可以支持 AI 生成与修改控制台、列表、表单、会员和系统管理页面，并还原双主题、壳层、标签和锁屏风格。
- 规范不能单独提供业务路由、权限、认证、后端接口、真实数据、生产安全或完整无障碍实现。

## 主要问题与处理

| 优先级 | 问题 | 证据 | 处理方式 |
| --- | --- | --- | --- |
| P1 | 自定义主题、Layui 语义色和第三方颜色容易被混成一套色板 | `css\\okadmin.theme.css`、`css\\okadmin.css`、Layui CSS | 在 `Colors` 中按选择器作用域列出 `#2D8CF0`、`#FF4806`、`#009688`、`#1E9FFF`、`#5FB878` 等，要求保留插件例外 |
| P1 | 侧栏、顶栏、标签带和内容区偏移互相耦合 | `css\\okadmin.css`、`index.html` | 固定记录 220px、49px、40px、`left: 220px`、`top: 50px`、`bottom: 42px`，并说明折叠时必须同步变化 |
| P1 | 菜单/标签生命周期和持久化容易被误当成路由或权限系统 | `js\\okconfig.js`、`js\\okadmin.js`、`js\\okmodules\\okTab.js` | 记录 `openTabNum: 30`、`localStorage`/`sessionStorage` 键和应用边界，不虚构 RBAC 或服务器状态 |
| P1 | 登录、锁屏示例含明文演示密码 | `index.html`、`js\\okadmin.js`、`pages\\login.html` | 明确 `123456` 仅为 fixture，生产必须替换为会话/服务器认证 |
| P1 | 页面覆盖多种插件和表格实现，统一描述会造成错误集成 | `pages\\tripartite\\*`、`pages\\datatable\\*`、`lib\\jquery.bsgrid` | 分离 Layui、bsgrid、DataTables、ECharts、编辑器和 ok-* 扩展的契约与许可 |
| P2 | 响应式规则分散在 970/768/750/548/450px 媒体查询中 | `css\\okadmin.css`、`css\\common.css`、`css\\oksub.css` | 逐断点记录移动侧栏、遮罩、输入宽度和隐藏类，增加 360px 与长文本验收场景 |
| P2 | 原生样式没有完整焦点、ARIA 和减弱动效系统 | Layui CSS 与 ok-admin CSS 静态检查 | 标记为源码限制，把焦点、键盘、对比度和 `prefers-reduced-motion` 作为应用补充 |
| P2 | 上游 README 徽章与嵌入 Layui 版本不一致 | `README.md`、`lib\\layui-v2.6.8\\layui\\layui.js` | 版本依据改为固定提交和实际 `2.6.8` 文件，旧徽章只做审计说明 |
| P2 | 图片、二维码、壁纸和第三方库的许可边界不清晰 | `images\\`、`lib\\`、上游 `LICENSE` | 本仓库不发布源码/图片；原创文档 MIT，上游 ok-admin GPL-3.0，依赖遵守各自许可 |

## 覆盖矩阵

“完整”仅表示规范已经覆盖静态设计范围，不代表应用或浏览器运行验证完成。

| 模块 | 覆盖状态 | 剩余边界 |
| --- | --- | --- |
| 文档目的、双语入口、版本选择 | 完整 | 需要 Agent 按项目实际版本选择目录 |
| 颜色、主题、字体、图标 | 完整 | 对比度和品牌调整需在应用中验证 |
| 220px 壳层、菜单、标签、折叠 | 完整 | iframe、路由和焦点返回待运行验证 |
| 按钮、输入、表单和校验 | 部分 | 异步接口、错误恢复、屏幕阅读器待验证 |
| 搜索、列表、表格、分页、批量操作 | 部分 | 服务端字段、分页契约和长内容待验证 |
| 卡片、进度、图表 | 部分 | ECharts 数据和重绘性能待验证 |
| 弹层、设置抽屉、通知、加载 | 部分 | 层级、遮罩、关闭焦点和网络错误待验证 |
| 登录、注册、找回密码、锁屏 | 部分 | 源码是演示 fixture，真实认证未提供 |
| 响应式和移动端导航 | 部分 | 仅有 CSS/类切换，完整触控和无障碍抽屉待实现 |
| 编辑器、bsgrid、DataTables、第三方插件 | 部分 | 插件 API、资源和许可证需逐项核对 |
| 国际化、日期、数字和状态文案 | 待验证 | 设计文档语言不等于运行时 locale |
| 资源许可、业务路由、RBAC、后端接口 | 不适用 | 不属于设计规范或上游静态模板能力 |

## 文档文件映射

| 文件 | 内容 | 优先级 |
| --- | --- | --- |
| `DESIGN.md` | 英文标准规范、令牌、壳层、组件、状态、响应式、无障碍和 Agent 提示词 | P1 |
| `DESIGN.zh-CN.md` | 与英文章节、技术字面量和来源编号对应的简体中文版 | P1 |
| `README.md` / `README.en-US.md` | 首页入口、版本索引、下载、来源、许可证和验证命令 | P1 |
| `AUDIT.md` | 问题证据、覆盖矩阵、范围和验收边界 | P2 |
| `scripts\\verify-docs.mjs` | 无依赖静态检查与关键源码断言 | P2 |

## 版本与发布策略

这是对既有上游 `v2.0_dev` 的设计文档整理，不创建 `2.0_dev.1` 或其他修订号。两份规范的 front matter 和版本目录均保持 `2.0_dev`；Git 标签和 GitHub Release 使用 `v2.0_dev`。

`main` 保存当前文档，Release 附件保存发布快照。后续更新在同一版本目录中通过 Git 提交追踪；新的上游版本必须新增目录和标签，不覆盖旧版本。参考源码永远作为被忽略的分析输入，不纳入仓库提交。

## 验收标准

### 文档检查

- 两份 `DESIGN` 的 front matter 完整且完全一致。
- 标题层级、代码字面量、颜色值、尺寸值和来源引用在中英文之间对应。
- README 语言切换、版本链接、审计链接、许可证和 Raw 下载链接有效。
- 所有 Markdown 采用 UTF-8，无 `U+FFFD`、NUL 或未闭合代码围栏。

### 源码核对

- 本地 668 个文件与固定 Gitee 提交的 blob ID 一致。
- 验证脚本能检查主题色、壳层尺寸、折叠类、标签上限、Layui `2.6.8` 和演示密码标记。
- `ok-admin-v2.0_dev` 未被 Git 跟踪且被 `.gitignore` 忽略。

### 发布检查

- GitHub 仓库为公开，默认分支为 `main`，提交历史包含一次预定初始文档提交。
- `v2.0_dev` 标签和 Release 存在，Release 含英文和中文 DESIGN.md 附件。
- 远端 README、版本目录、Raw 文件和附件可访问；本地工作区干净。

## 未验证范围

本次文档发布不安装依赖、不启动上游模板、不把静态检查称为 UI 验收。以下内容需要宿主应用单独验证：360px/1440px 视口、iframe 高度、长中英文、标签溢出、弹层层级、真实上传和请求恢复、重复提交、权限拒绝、键盘/焦点、屏幕阅读器、对比度、触控目标、减少动效、locale 切换和生产认证。
