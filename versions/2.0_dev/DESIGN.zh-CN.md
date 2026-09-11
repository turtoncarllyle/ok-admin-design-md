---
version: "2.0_dev"
name: "ok-admin-design-system"
description: >-
  A source-derived ok-admin v2.0_dev design specification for AI coding agents
  building compact, flat admin management interfaces. It separates source
  facts, inherited Layui and plugin behavior, application additions, and
  unverified runtime behavior.
colors:
  primary-blue: "#2D8CF0"
  primary-orange: "#FF4806"
  layui-teal: "#009688"
  layui-info: "#1E9FFF"
  layui-success: "#5FB878"
  layui-warning: "#FFB800"
  layui-danger: "#FF5722"
  nav-brand: "#20222A"
  nav-surface: "#001529"
  nav-hover: "#4E5465"
  header: "#FFFFFF"
  content: "#F1F2F7"
  tab-surface: "#F5F7F9"
  border: "#EEEEEE"
  border-strong: "#D2D2D2"
  text: "rgba(0,0,0,.85)"
  text-secondary: "#666666"
  text-muted: "#999999"
  on-dark: "#FFFFFF"
typography:
  body:
    fontFamily: "Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
  logo:
    fontSize: "16px"
    fontWeight: 300
    lineHeight: "49px"
  card-title:
    fontSize: "16px"
    fontWeight: 700
  metric:
    fontSize: "24px"
    fontWeight: 400
  small:
    fontSize: "12px"
    fontWeight: 400
---

# ok-admin v2.0_dev 设计系统

## Overview

这是面向 AI 编码 Agent 的 ok-admin v2.0_dev 后台界面简体中文设计规范。文档描述固定源码中可见的视觉结果、布局契约、组件组合、交互状态和集成边界。它是设计上下文文件，不是可运行模板、完整 API 手册、认证系统、路由器、RBAC 模型或后端契约。

ok-admin 的特征是紧凑、扁平和面向工作。使用白色及浅灰内容表面、深色导航栏、14px 操作文本、小圆角、细边框、克制阴影和彩色操作。页面应服务于扫描、筛选、编辑、重复表格操作和清晰反馈，不要把它改造成营销页面或宽松的卡片画廊。

### Evidence and precedence

- **Source** 表示固定 ok-admin 文件中直接可见的事实，最终效果由选择器作用域和优先级决定。
- **Inherited** 表示内置 Layui `2.6.8` 或第三方模块提供的行为。
- **Addition** 表示本文建议的应用规则，必须单独实现和测试，并非原生保证。
- **Unverified** 表示静态检查无法证明的行为，例如浏览器布局、辅助技术、真实请求或部署配置。

参考来源是 Gitee 分支 `v2.0_dev`、提交 `247f0f2ee3dce10adcece6261bdc3ef060cbb567`。本地快照包含 668 个文件，与该提交的 Git blob ID 一致。源码 README 仍保留 Layui `2.5.5` 等旧徽章；视觉依据应使用 `lib\\layui-v2.6.8\\layui\\layui.js` 的实际版本和 `css\\` 中的选择器。 [S01] [S02] [S03] [S04] [S05] [S06] [S07] [S08] [S09] [S10] [S11] [S18]

保留宿主应用的路由、权限检查、接口字段、数据转换和现有组件家族。修改集成前先读取对应源码模块。本文记录设计表面和部分生命周期契约，不允许把演示数据、密码、图片或第三方代码直接复制到生产项目。

## Design principles

1. **操作密度。** 让筛选器、命令、表格行和反馈靠近，支持重复工作。明确使用 `10px`、`15px`、`20px` 和 `30px` 间距，不在每个控件之间添加装饰性空白。
2. **扁平层级。** 使用一个页面表面、清晰标题、分隔线和少量层级。卡片用于分组数据，不要把所有控件都嵌套在阴影容器中。
3. **深色导航、浅色工作区。** 保持导航栏和 Logo 深色，顶栏、标签带和内容区使用易读浅色表面。
4. **单一语义操作。** 蓝色和橙色是可选主题，不是两个互不相关的品牌。信息、成功、警告、危险和插件反馈继续使用 Layui 语义色。
5. **状态优先。** 加载、空数据、校验、失败、重试、禁用和成功状态必须清晰，即使不依赖颜色也能理解。

## Colors

### Theme roles

| 角色 | 值 | 源码作用域与用途 |
| --- | --- | --- |
| 蓝色主题 | `#2D8CF0` | `blue_theme` 的激活菜单、菜单条和激活标签文字 |
| 橙色主题 | `#FF4806` | `orange_theme` 的激活菜单、菜单条和激活标签文字 |
| 导航品牌色 | `#20222A` | Logo 区、顶栏标记和用户栏强调 |
| 导航表面 | `#001529` | `.layui-side-menu` 和侧栏背景 |
| 导航悬停 | `#4E5465` | 侧栏链接悬停 |
| 顶栏 | `#FFFFFF` | 49px 顶栏和用户菜单表面 |
| 内容背景 | `#F1F2F7` | `childrenBody` 页面画布和内容底色 |
| 标签表面 | `#F5F7F9` | `.ok-tab`、标签控制按钮和溢出菜单 |
| Layui 青色 | `#009688` | 标签控制悬停、自定义反馈和登录阴影强调 |
| 信息蓝 | `#1E9FFF` | Layui 继承的普通按钮/弹层操作 |
| 成功绿 | `#5FB878` | Layui 继承的成功状态和穿梭框操作 |
| 警告色 | `#FFB800` | Layui 继承的警告/评分语义 |
| 危险色 | `#FF5722` | 删除/危险操作和登录选择色 |
| 边框 | `#EEEEEE` | 默认分隔线和控件边框 |
| 强边框 | `#D2D2D2` | 悬停控件和溢出菜单边框 |
| 文本 | `rgba(0,0,0,.85)` | Layui 正文和输入文字 |
| 次要文本 | `#666666` | 指标、表格文案和辅助文本 |
| 弱化文本 | `#999999` | 空状态提示和次要元数据 |

激活主题色用于选中导航和 ok-admin 当前标签。除非应用明确选择 `orange_theme`，否则保留默认 `blue_theme`。不要把所有 Layui 组件都替换成主题色：弹层、进度、评分和第三方模块有各自的继承令牌。 [S04] [S05] [S11] [S12]

彩色按钮通常使用白色文字。这是还原值，不是无障碍认证；饱和绿/青色上的白字或白底上的小号弱化文字可能不满足普通文本对比度，应为重要信息增加有范围的可访问颜色或文字处理。 [S11]

## Typography and iconography

使用原生字体栈 `Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif`。正文为 `14px`、行高 `1.6`。控件继承正文字体，但固定高度的 Layui 控件有自己的行高。ok-admin Logo 使用 `16px`、字重 `300`、行高 `49px`；卡片标题使用 `16px` 和粗体；控制台指标使用 `24px`。辅助文字和状态文字可使用 `12px`。 [S01] [S03] [S06]

使用内置 `.layui-icon` 和 `.ok-icon` 字体及其匹配文件。ok-admin 图标字体在 `lib\\fonts\\iconfont.css` 中定义，并提供 `eot`、`woff2`、`woff`、`ttf` 和 `svg`。菜单、刷新、全屏、锁屏、通知和退出等纯图标按钮必须保留可理解的文字标签或无障碍名称。 [S16]

避免全大写标题、负字间距、超大的仪表盘数字，以及抢过表格内容的标题。中英文标签保持相同字号；使用换行、带完整值入口的截断或响应式布局解决溢出，不要缩小重要文本。

## Layout

### Application shell

| 区域 | 源码行为 |
| --- | --- |
| Logo 区 | 固定在导航栏顶部，`220px × 49px`，背景 `#20222A` |
| 顶栏 | 高 `49px`、白色、底边框 `#f6f6f6` |
| 侧栏 | 宽 `220px`、深色、高层级，嵌套链接高度 `40px` |
| 侧栏滚动容器 | 宽 `240px`，为滚动条预留空间 |
| 用户区 | 宽 `220px`；桌面头像 `80px`，移动头像 `50px` |
| 标签带 | 高 `40px`、浅色 `#F5F7F9`，标签高 `32px`、右间隔 `15px` |
| 内容主体 | 绝对定位，`left: 220px`、`top: 50px`、`bottom: 42px`，隐藏溢出 |
| 页脚 | 固定底部，与内容偏移对齐 |

源码壳层使用 `layui-layout-admin`、固定左栏、iframe 标签内容区和固定页脚，标签项中的 iframe 需要填满高度。如果宿主应用移除页脚或调整顶栏高度，必须同步修改所有对应偏移。 [S01] [S06]

侧栏依次包含深色 Logo、头像和问候语，再渲染 `data\\navs.json` 中的递归菜单组。一级链接使用 `padding-left: 45px`，更深层级约为 `65px`、`90px` 和 `115px`。箭头、图标、文字和激活背景需要保持对齐。 [S01] [S10]

### Grid and page surfaces

优先使用 Layui 栅格以及已有的 `ok-body`/`childrenBody` 约定，再引入其他布局系统。源码示例使用 `layui-row`、`layui-col-md*`、`layui-col-xs6` 和 `layui-col-space15`。`childrenBody` 提供 `15px` 内边距和 `#F1F2F7`，`ok-card-body` 提供 `20px` 内边距。栅格已经提供子元素内边距时不要重复增加页面间距。 [S02] [S03] [S17]

普通页面应让筛选行、命令行、数据区和分页保持连续的视觉流。卡片可以包含图表、指标、表单或表格，但不要为每个控件再套一层阴影卡片。

## Shape, borders, elevation, and motion

- 主要使用 `2px` 至 `5px` 圆角。原生 Layui 控件和弹层使用 `2px`；ok-admin 卡片和登录表面使用 `5px`；头像和锁屏肖像使用 `50%`/`100%`。
- 默认边框是 `1px solid #eee`；悬停和溢出菜单使用 `#d2d2d2`。不要为了扁平化而移除密集表格或输入框的边框。
- ok-admin 卡片使用 `0 0 20px rgba(0,0,0,.08)`。Layui 弹层使用 `1px 1px 50px rgba(0,0,0,.3)`，其中 `50px` 是模糊半径而不是扩散半径。溢出菜单使用 `0 2px 4px rgba(0,0,0,.12)`。 [S02] [S03] [S12]
- ok-admin 常规过渡为 `.3s`，壳层移动或插件效果常用 `.5s`。侧栏和内容偏移使用 `.5s`；标签控制和输入标签使用 `.3s`；锁屏图片/时钟是更长的装饰动画。 [S01] [S03] [S08]
- 在应用 CSS 中遵守 `prefers-reduced-motion`。移除变换、雪花或自动播放时仍要保留最终状态和进度含义。

## Navigation, tabs, and shell behavior

### Menu and themes

`js\\okconfig.js` 默认值为 `theme: "blue_theme"`、`menuArrow: "ok-arrow2"`、`isTabMenu: true` 和 `isTabRefresh: false`。设置页将配置对象写入 `localStorage` 的 `okConfig`，加载时把主题类应用到 `.layui-layout-admin`。这些设置属于应用持久化，不是服务器偏好或权限系统。 [S07] [S08]

`data\\navs.json` 是递归菜单注册表，包含控制台、仪表盘、会员、系统、常用页面、图表、编辑器、数据表格、多级外部导航、第三方库和框架帮助等 11 个一级组。`okTab` 负责渲染 `lay-id`、`data-url`、图标字体和层级。`_blank` 等外部目标必须显式保留，并遵守宿主安全策略。 [S09] [S10]

### Tabs

初始标签是不可关闭的控制台。`okTab` 最多打开 `30` 个标签（`openTabNum: 30`）；启用 `isTabMenu` 时把标签标题和内容存入 `sessionStorage`，`isTabRefresh` 为 true 时可在切换时刷新。左右按钮移动标签带，溢出菜单提供关闭当前、关闭其他和关闭全部。右键菜单提供定位、关闭当前、关闭其他和关闭全部。 [S06] [S07] [S08] [S09]

标签在 `40px` 标签带中高 `32px`，白色、圆角 `3px`、右间隔 `15px`。激活标签保留白色表面并使用当前主题色；ok-admin 样式会隐藏原生底部指示线。标签移动和关闭需要提供等价的键盘路径。 [S01] [S09]

### Collapse and mobile rail

点击 `.ok-menu` 会切换 `ok-left-hide`。桌面端将侧栏和 Logo 移到 `left: -220px`，顶栏左侧控件移到 `left: -20px`，内容和页脚移到 `left: 0`。在 `max-width: 768px` 时，侧栏从画布外开始，侧栏和菜单宽度变为 `180px`，`.ok-make` 显示 `rgba(0,0,0,.5)` 遮罩；点击菜单项或遮罩恢复打开状态。在 `max-width: 970px` 时，`ok-hide-md` 隐藏标记元素。 [S01] [S08]

源码只实现类切换和过渡，没有完整的可访问抽屉模式。**Addition：** 模态抽屉打开时才限制焦点，提供菜单按钮名称和展开状态，关闭后把焦点返回触发器，并在适当场景支持 Escape 关闭；确保 360px 宽度仍能访问内容。不要隐藏必需操作而不给替代路径。

## Components and page patterns

### Buttons, forms, and validation

按操作层级使用 Layui 按钮变体（`layui-btn`、`layui-btn-primary`、`layui-btn-normal`、`layui-btn-warm`、`layui-btn-danger`、`layui-btn-disabled`）和尺寸（`layui-btn-sm`、`layui-btn-xs`）。危险操作应保持明显区别，并在不可逆操作前确认。源码页面使用 `layui-form`、`layui-form-item`、`layui-form-label`、`layui-input-block`、`layui-input-inline`、`layui-form-pane` 和 `layui-form-text`。 [S11] [S17]

筛选器使用 `ok-search` 或 `ok-search-form`；共享 CSS 在桌面保持紧凑，并在约 `768px` 时将输入改为全宽。表单页使用 `ok-form`，通常距离父级内容 `10px`。标签必须与字段关联，placeholder 不能替代标签。 [S02]

原生校验使用 `lay-verify` 和表单事件。**Addition：** 异步请求期间禁用或保护提交操作，失败时保留输入，在字段级显示错误，提供重试入口，并把焦点还给第一个无效字段。客户端回调成功不代表服务器已经提交成功。

### Tables, lists, and cards

会员和常用页面组合筛选表单、命令条、表格、状态徽章和行操作。批量操作应紧邻选中数量，并区分空数据和无匹配。Layui 表格必须遵守其数据与渲染生命周期；bsgrid 和 DataTables 是独立集成，不能混入同一契约。 [S10] [S11] [S17]

卡片使用白色表面、`20px` 内容内边距、`16px` 粗体标题和 ok-admin 阴影。控制台指标卡使用 `24px` 数值、弱化辅助文字和可选 `60px` 图片。进度行使用 `50px` 头像和弹性数据列。控制台图表区域约为 `360px` 高，并使用内置 ECharts 主题。 [S03]

### Layers, notifications, and loading

使用 Layui `layer` 实现对话框、确认、提示输入、图片查看、标签、tips 和 iframe 页面。设置抽屉是 iframe 弹层，参数为 `area: ['340px', '100%']`、右侧偏移、无关闭按钮和 `ok-setting` 皮肤；源 CSS 提供白色表面、`2px` 圆角和阴影。 [S08] [S12]

使用 `okLayer` 进行确认封装，使用 `okToastr`/Toastr 发送非阻塞通知，使用 `okNprogress` 展示路由/请求进度。请求结束前保持可见加载状态；区分超时、传输失败、无权访问、校验失败和空数据。错误后必须释放加载状态，通知中不能显示原始服务器堆栈。 [S13] [S14]

### Login, lock screen, and feedback

登录页使用居中的 `300px` 白色表单、`20px` 水平内边距、`5px` 圆角、`0 0 50px #009688` 青色阴影，以及带 `5px` 白边和青色光晕的 `100px` 圆形头像。源码包含演示密码 `123456` 和示例校验；这些是 fixture，绝不能用于生产认证。 [S03] [S17]

锁屏覆盖整个视口，包含轮换壁纸、时钟、蓝色 `#4690FF` 时间强调、动画头像、雪花画布和密码表单。源码的本地解锁检查也使用 `123456`。**Addition：** 用服务器/会话认证替换 fixture，按安全策略保护敏感内容，提供可访问的解锁错误路径，并决定锁定状态的持久化范围。 [S01] [S08]

### Page composition map

| 页面族 | 源码示例 | 组合建议 |
| --- | --- | --- |
| 控制台/仪表盘 | `pages\\console.html`、`pages\\console1.html` | 指标卡、图表、进度和近期活动；保持图表色彩与密度克制 |
| 会员 CRUD | `pages\\member\\user-list.html`、`user-insert.html`、`user-update.html`、`role-*`、`permission-list.html` | 搜索/筛选、表格、批量操作、校验、确认、成功/失败恢复 |
| 系统管理 | `pages\\system\\setup.html`、`log.html`、`shield.html`、`setting.html` | 紧凑表单或列表、设置持久化、状态反馈、明确权限 |
| 常用内容 | `pages\\often\\article.html`、`product.html`、`task.html`、`image.html`、`bbs.html` | 列表/详情/编辑、筛选、操作、分页和截断规则 |
| 认证与异常 | `pages\\login.html`、`register.html`、`forget.html`、`pages\\system\\403.html`、`404.html`、`500.html` | 状态专属文案、安全恢复、禁止原始堆栈和演示凭据 |
| 图表与编辑器 | `pages\\chart\\*`、`pages\\txtedit\\*` | 将 ECharts/编辑器生命周期和外部资源作为独立集成 |
| 第三方 | `pages\\tripartite\\*`、`pages\\datatable\\*` | 保留插件皮肤、许可、API 边界和失败行为 |

## Responsive behavior

源码包含 `max-width: 970px`、`max-width: 768px`、`max-width: 750px`、`max-width: 548px` 和 `max-width: 450px` 的规则。在 `768px` 时侧栏变成画布外的 `180px` 抽屉，搜索输入根据选择器变窄或全宽；在 `450px` 时地址字段不再使用桌面的 `23%` 宽度；在 `750px` 和 `548px` 时，`ok-in-hide-md`、`ok-in-hide-xs` 或 `[ok-pc-in-show]` 会隐藏标记控件。这些是选择器级规则，不能保证每个页面都自动堆叠。 [S01] [S02] [S03]

**Addition：** 测试 `360px`、`449px`、`450px`、`548px`、`750px`、`768px`、`970px` 和宽屏桌面。确保菜单触发器、当前路由、表格操作、错误文字和表单标签可访问。宽表格应在自身区域滚动，弹层应留在视口内，长中英文值应有复制或详情入口。不要通过静默删除必需列或操作来解决溢出。

## Interaction states and content

每个页面模式都要定义默认、悬停、激活/选中、焦点、禁用、加载、空/无匹配、校验失败、请求失败、重试、成功和无权限状态。配合文字和图标传达状态，不能只依赖颜色。按钮文案使用动词；危险操作确认前解释后果；禁止暴露密码、令牌、内部堆栈或原始 SQL。

日期、数字、货币、时区、空值和状态文字遵循宿主应用的 locale 与数据契约。`DESIGN.md` 的语言不会自动配置运行时 i18n。**Addition：** 在渲染生成控件前加载 locale 配置，翻译插件消息和页面标签，并验证切换语言后已有实例能够重新渲染。

## Accessibility and resources

静态检查发现输入框有自定义焦点样式，但没有完整的全局 `:focus-visible`、ARIA、焦点陷阱或 `prefers-reduced-motion` 系统。Layui 和插件只提供部分键盘行为，不能据此宣称完整无障碍。 [S01] [S11] [S12]

**Addition：** 使用语义化按钮和链接、关联标签、纯图标控件名称、可见焦点、合理 Tab 顺序、弹层 Escape 处理、关闭后的焦点返回，以及带完整值入口的省略文本。目标为 WCAG AA（普通文字 `4.5:1`、大文字 `3:1`、非文本边界 `3:1`），并在宿主应用中测试键盘、缩放、屏幕阅读器、触控目标和减弱动效。

保留内置图标字体路径及缓存查询参数。头像、壁纸、登录背景、二维码和捐赠资源是示例资源，有独立版权和许可义务。参考源码采用 GPL-3.0；内置 Layui、jQuery、ECharts、bsgrid、Animate.css、Toastr、Layx、编辑器及其他模块遵守各自许可证。 [S16] [S18]

## Do and don't

### Do

- 保留深色侧栏、白色顶栏、浅色内容画布、紧凑控件和克制层级。
- 统一使用 `blue_theme` 或 `orange_theme`，同时保留 Layui/插件的语义例外。
- 同步维护菜单、标签、iframe、页脚、遮罩和折叠偏移。
- 实现相关的加载、空数据、校验、失败、重试、成功、禁用和无权限状态。
- 保留路由、数据映射、权限和模块生命周期，并单独报告应用补充。

### Don't

- 不要把演示密码 `123456`、演示用户 `bobi`、二维码图片或 fixture 数据带入生产。
- 不要在一个激活状态混用两种主题色，不要把所有插件令牌替换为青色，也不要添加重渐变。
- 不要建立多层卡片阴影、巨大营销标题、过多胶囊圆角或无理由留白。
- 不要声称类切换就提供了可访问抽屉，不要把静态检查称为 UI 正确性，也不要把设计文档当作认证/RBAC。
- 不要隐藏移动端必需操作、吞掉请求错误或只用颜色传达状态。

## Agent prompt guide

```text
Read the selected ok-admin 2.0_dev DESIGN.md before editing this admin UI.
Identify the existing 220px sidebar, 49px header, 40px tabs, theme, Layui 2.6.8
components, okTab lifecycle, and real routes, permissions, and API mappings.
Keep compact 14px density, #20222A/#001529 navigation, #F1F2F7 content,
#F5F7F9 tabs, and one consistent #2D8CF0 or #FF4806 active theme.
Preserve Layui/plugin color exceptions and do not copy the sample password 123456.
Implement loading, empty, validation, request failure, retry, success, disabled,
permission-denied, responsive, focus, and reduced-motion states as applicable.
Do not invent APIs, routes, authentication, or accessibility guarantees.
Report source facts, inherited behavior, application additions, static checks,
actual page verification, and unverified scope separately.
```

## Known gaps

- 这是独立的源码整理规范，不是 ok-admin 官方文档或背书。
- 文档描述固定的静态源码；浏览器布局、iframe 尺寸、插件层级、键盘/焦点、屏幕阅读器、真实请求、语言切换和生产认证仍待验证。
- 源码包含演示凭据、示例用户、外部链接、图片和第三方库，生产项目必须替换或单独审计。
- 版本保持 `2.0_dev`；本目录的更新是文档提交，未来上游版本使用新目录和标签。详见 [审计](AUDIT.md) 与 [仓库版本策略](../../README.md)。

## Pinned source index

| ID | 文件或主题 |
| --- | --- |
| [S01] | `css\\okadmin.css`：壳层、菜单、标签、折叠、锁屏和响应式规则 |
| [S02] | `css\\common.css`：页面辅助类、搜索/表单间距、卡片、滚动条和响应式规则 |
| [S03] | `css\\oksub.css`：控制台、登录、用户表单和插件响应式规则 |
| [S04] | `css\\okadmin.theme.css`：蓝/橙主题选择器 |
| [S05] | `css\\okadmin.theme.scss`：主题源文件和箭头变体 |
| [S06] | `index.html`：壳层标记、49px 顶栏、220px 侧栏、标签、页脚和锁屏 |
| [S07] | `js\\okconfig.js`：主题、箭头、标签持久化和刷新默认值 |
| [S08] | `js\\okadmin.js`：菜单折叠、标签、设置、全屏、锁屏和反馈 |
| [S09] | `js\\okmodules\\okTab.js`：递归菜单、30 标签上限和 session 持久化 |
| [S10] | `data\\navs.json`：11 个一级导航组和页面注册表 |
| [S11] | `lib\\layui-v2.6.8\\layui\\layui.js` 与 `css\\layui.css`：Layui 继承模块和令牌 |
| [S12] | `lib\\layui-v2.6.8\\layui\\css\\modules\\layer\\default\\layer.css`：弹层表面和阴影 |
| [S13] | `css\\okmodules\\nprogress.css`：路由/请求进度条 |
| [S14] | `css\\okmodules\\toastr.min.css`：Toastr 通知表面 |
| [S15] | `css\\okmodules\\layx.min.css`：Layx 窗口和过渡 |
| [S16] | `lib\\fonts\\iconfont.css`：ok-icon 字体资源 |
| [S17] | `pages\\`：70 个认证、控制台、会员、系统、图表、编辑器和插件示例页面 |
| [S18] | `README.md` 与 `LICENSE`：上游项目范围和 GPL-3.0 声明 |
| [S19] | 固定上游提交 `247f0f2ee3dce10adcece6261bdc3ef060cbb567` |

[S01]: https://gitee.com/wudibo/ok-admin/blob/247f0f2ee3dce10adcece6261bdc3ef060cbb567/css/okadmin.css
[S02]: https://gitee.com/wudibo/ok-admin/blob/247f0f2ee3dce10adcece6261bdc3ef060cbb567/css/common.css
[S03]: https://gitee.com/wudibo/ok-admin/blob/247f0f2ee3dce10adcece6261bdc3ef060cbb567/css/oksub.css
[S04]: https://gitee.com/wudibo/ok-admin/blob/247f0f2ee3dce10adcece6261bdc3ef060cbb567/css/okadmin.theme.css
[S05]: https://gitee.com/wudibo/ok-admin/blob/247f0f2ee3dce10adcece6261bdc3ef060cbb567/css/okadmin.theme.scss
[S06]: https://gitee.com/wudibo/ok-admin/blob/247f0f2ee3dce10adcece6261bdc3ef060cbb567/index.html
[S07]: https://gitee.com/wudibo/ok-admin/blob/247f0f2ee3dce10adcece6261bdc3ef060cbb567/js/okconfig.js
[S08]: https://gitee.com/wudibo/ok-admin/blob/247f0f2ee3dce10adcece6261bdc3ef060cbb567/js/okadmin.js
[S09]: https://gitee.com/wudibo/ok-admin/blob/247f0f2ee3dce10adcece6261bdc3ef060cbb567/js/okmodules/okTab.js
[S10]: https://gitee.com/wudibo/ok-admin/blob/247f0f2ee3dce10adcece6261bdc3ef060cbb567/data/navs.json
[S11]: https://gitee.com/wudibo/ok-admin/tree/247f0f2ee3dce10adcece6261bdc3ef060cbb567/lib/layui-v2.6.8/layui
[S12]: https://gitee.com/wudibo/ok-admin/blob/247f0f2ee3dce10adcece6261bdc3ef060cbb567/lib/layui-v2.6.8/layui/css/modules/layer/default/layer.css
[S13]: https://gitee.com/wudibo/ok-admin/blob/247f0f2ee3dce10adcece6261bdc3ef060cbb567/css/okmodules/nprogress.css
[S14]: https://gitee.com/wudibo/ok-admin/blob/247f0f2ee3dce10adcece6261bdc3ef060cbb567/css/okmodules/toastr.min.css
[S15]: https://gitee.com/wudibo/ok-admin/blob/247f0f2ee3dce10adcece6261bdc3ef060cbb567/css/okmodules/layx.min.css
[S16]: https://gitee.com/wudibo/ok-admin/blob/247f0f2ee3dce10adcece6261bdc3ef060cbb567/lib/fonts/iconfont.css
[S17]: https://gitee.com/wudibo/ok-admin/tree/247f0f2ee3dce10adcece6261bdc3ef060cbb567/pages
[S18]: https://gitee.com/wudibo/ok-admin/blob/247f0f2ee3dce10adcece6261bdc3ef060cbb567/README.md
[S19]: https://gitee.com/wudibo/ok-admin/commit/247f0f2ee3dce10adcece6261bdc3ef060cbb567
