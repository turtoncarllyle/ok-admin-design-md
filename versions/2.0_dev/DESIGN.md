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

# ok-admin v2.0_dev Design System

## Overview

This is the canonical English design specification for AI coding agents working on an ok-admin v2.0_dev admin interface. It describes the visual result, layout contracts, component composition, interaction states, and integration boundaries visible in the pinned source. It is a design context file, not a runnable template, complete API manual, authentication system, router, RBAC model, or backend contract.

ok-admin is compact, flat, and work-focused. Use white and light-gray content surfaces, a dark navigation rail, 14px operational text, small radii, thin borders, restrained shadows, and colored actions. Optimize for scanning, filtering, editing, repeated table operations, and clear feedback. Do not turn the layout into a marketing page or a spacious card gallery.

### Evidence and precedence

- **Source** is a fact directly visible in the pinned ok-admin files. Selector scope and specificity decide the result.
- **Inherited** is behavior supplied by the bundled Layui `2.6.8` or a bundled third-party module.
- **Addition** is an application rule recommended by this document. Implement and test it explicitly; it is not a native guarantee.
- **Unverified** is behavior that static inspection cannot establish, such as browser layout, assistive technology, real requests, or deployment configuration.

The reference is Gitee branch `v2.0_dev`, commit `247f0f2ee3dce10adcece6261bdc3ef060cbb567`. The local snapshot contains 668 files and its Git blob IDs match that pinned tree. The source README still carries older badges such as Layui `2.5.5`; use the embedded `lib\\layui-v2.6.8\\layui\\layui.js` version and the selectors in `css\\` as the visual authority. [S01] [S02] [S03] [S04] [S05] [S06] [S07] [S08] [S09] [S10] [S11] [S18]

Preserve the host application's routes, permission checks, API fields, data transformations, and existing component family. Read the relevant source module before changing an integration. This document records the design surface and selected lifecycle contracts; it does not grant permission to copy demo data, passwords, images, or third-party code.

## Design principles

1. **Operational density.** Keep filters, commands, table rows, and feedback close enough to support repeated work. Use `10px`, `15px`, `20px`, and `30px` spacing deliberately; do not add decorative whitespace between every control.
2. **Flat hierarchy.** Prefer one page surface with clear headers, dividers, and a small elevation step. Cards group data; they do not become nested containers everywhere.
3. **Dark navigation, light work area.** Keep the rail and logo dark while the header, tab strip, and content remain readable light surfaces.
4. **One semantic action.** Blue and orange are selectable themes, not two unrelated product brands. Keep Layui semantic colors for information, success, warning, danger, and plugin-specific feedback.
5. **State before decoration.** Loading, empty, validation, failure, retry, disabled, and success states must remain understandable without relying on color alone.

## Colors

### Theme roles

| Role | Value | Source scope and use |
| --- | --- | --- |
| Blue theme | `#2D8CF0` | `blue_theme` active menu, menu bar, and active tab text |
| Orange theme | `#FF4806` | `orange_theme` active menu, menu bar, and active tab text |
| Navigation brand | `#20222A` | Logo block, header marker, user rail accents |
| Navigation surface | `#001529` | `.layui-side-menu`, side menu background |
| Navigation hover | `#4E5465` | Side-menu link hover |
| Header | `#FFFFFF` | 49px top header and user menu surface |
| Content background | `#F1F2F7` | `childrenBody` page canvas and content backing |
| Tab surface | `#F5F7F9` | `.ok-tab`, tab controls, overflow menu |
| Layui teal | `#009688` | Tab-control hover, custom feedback, login shadow accent |
| Info blue | `#1E9FFF` | Inherited Layui normal button/layer action |
| Success green | `#5FB878` | Inherited success state and transfer action |
| Warning | `#FFB800` | Inherited warning/rating semantics |
| Danger | `#FF5722` | Delete/danger actions and login selection color |
| Border | `#EEEEEE` | Default separators and control borders |
| Strong border | `#D2D2D2` | Hovered controls and overflow menu border |
| Text | `rgba(0,0,0,.85)` | Layui body and input text |
| Secondary text | `#666666` | Metrics, table copy, helper text |
| Muted text | `#999999` | Empty hints and secondary metadata |

The active theme color applies to selected navigation and the active ok-admin tab. Keep the default `blue_theme` unless the application explicitly selects `orange_theme`. Do not replace every Layui component color with the theme color: layers, progress, ratings, and third-party modules have their own inherited tokens. [S04] [S05] [S11] [S12]

Colored buttons normally use white labels. This is a fidelity value, not an accessibility certification. White on saturated green/teal or small muted text on white may fail normal-text contrast; add a scoped accessible color or text treatment when the message is essential. [S11]

## Typography and iconography

Use the native stack `Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif`. Body text is `14px` with line-height `1.6`. Controls inherit the body family but fixed-height Layui controls use their own line-height. The ok-admin logo is `16px`, weight `300`, line-height `49px`; card titles use `16px` and a bold weight; console metrics use `24px`. Small helper and status copy may use `12px`. [S01] [S03] [S06]

Use the bundled `.layui-icon` and `.ok-icon` font families with their matching files. The ok-admin icon font is defined in `lib\\fonts\\iconfont.css` and includes `eot`, `woff2`, `woff`, `ttf`, and `svg` sources. Preserve a meaningful text label or accessible name for an icon-only control such as menu, refresh, full screen, lock, notice, or logout. [S16]

Avoid all-caps headings, negative letter spacing, oversized dashboard numerals, and headings that compete with table content. Keep Chinese and English labels at the same size; solve overflow with wrapping, truncation plus a full-value path, or a responsive layout rather than shrinking essential text.

## Layout

### Application shell

| Region | Source behavior |
| --- | --- |
| Logo block | Fixed at the top of the rail, `220px × 49px`, background `#20222A` |
| Header | `49px` high, white, bottom border `#f6f6f6` |
| Sidebar | `220px` wide, dark, high stacking order, nested links at `40px` height |
| Side scroll wrapper | `240px` wide to accommodate the rail scrollbar |
| User block | `220px` wide; desktop avatar `80px`, mobile avatar `50px` |
| Tab strip | `40px` high, light `#F5F7F9`, tabs `32px` high with `15px` right gap |
| Content body | Absolute region with `left: 220px`, `top: 50px`, `bottom: 42px`; overflow hidden |
| Footer | Fixed bottom region aligned to the content offset |

The source shell uses `layui-layout-admin`, a fixed left rail, an iframe-backed tab content area, and a fixed footer. The content iframe is expected to fill its tab item height. If the host application removes the footer or changes the header height, update every corresponding offset together. [S01] [S06]

The rail has a dark logo, avatar and greeting, then recursive menu groups from `data\\navs.json`. First-level links use `padding-left: 45px`; deeper levels use approximately `65px`, `90px`, and `115px`. Keep the arrow, icon, label, and active background aligned. [S01] [S10]

### Grid and page surfaces

Use Layui grid classes and the existing `ok-body`/`childrenBody` conventions before introducing another layout system. The source examples use `layui-row`, `layui-col-md*`, `layui-col-xs6`, and `layui-col-space15`. `childrenBody` provides `15px` padding and `#F1F2F7`; `ok-card-body` provides `20px` padding. Avoid double gutters when a grid already supplies child padding. [S02] [S03] [S17]

Routine pages should keep the filter row, command row, data region, and pagination in one visual flow. A card may contain a chart, metric group, form, or table; do not wrap every control in its own shadowed card.

## Shape, borders, elevation, and motion

- Use predominantly `2px` to `5px` radii. Native Layui controls and layers use `2px`; ok-admin cards and login surfaces use `5px`; circular avatars and lock-screen portraits use `50%`/`100%`.
- Default borders are `1px solid #eee`; hover and overflow-menu borders use `#d2d2d2`. Do not remove borders from dense tables or inputs just to make a flat region.
- ok-admin cards use `0 0 20px rgba(0,0,0,.08)`. Layui layers use `1px 1px 50px rgba(0,0,0,.3)`; the `50px` value is blur, not spread. Overflow menus use `0 2px 4px rgba(0,0,0,.12)`. [S02] [S03] [S12]
- Standard ok-admin transitions are `.3s` for controls and `.5s` for shell movement or selected plugin effects. Sidebar and content offsets animate over `.5s`; tab controls and input labels use `.3s`; lock-screen image/clock effects are longer decorative animations. [S01] [S03] [S08]
- Honor `prefers-reduced-motion` in application CSS. Preserve the final state and progress meaning when removing transforms, snowflakes, or autoplay.

## Navigation, tabs, and shell behavior

### Menu and themes

`js\\okconfig.js` defaults to `theme: "blue_theme"`, `menuArrow: "ok-arrow2"`, `isTabMenu: true`, and `isTabRefresh: false`. Settings write the selected object to `localStorage` under `okConfig`; loading applies the theme class to `.layui-layout-admin`. Treat these settings as application persistence, not a server preference or permission system. [S07] [S08]

`data\\navs.json` is a recursive menu registry. It contains 11 top-level groups covering console, dashboard, members, system, common pages, charts, editors, data tables, nested external navigation, third-party libraries, and framework help. `okTab` renders `lay-id`, `data-url`, icon family, and nested levels. External targets such as `_blank` must remain explicit and must not bypass the host security policy. [S09] [S10]

### Tabs

The initial tab is the console and cannot be closed. `okTab` opens up to `30` tabs (`openTabNum: 30`), stores the tab title/content in `sessionStorage` when `isTabMenu` is enabled, and optionally refreshes on switch when `isTabRefresh` is true. Left/right controls move the tab strip; the overflow menu offers close current, close other, and close all. A context menu adds locate, close current, close other, and close all actions. [S06] [S07] [S08] [S09]

Tabs are `32px` high inside a `40px` strip, white, with `3px` radius and `15px` right spacing. The active tab keeps the white surface and receives the current theme color; the ok-admin style intentionally hides the native bottom indicator. Keep the strip horizontally clipped and expose an equivalent keyboard path for tab movement and closing. [S01] [S09]

### Collapse and mobile rail

Clicking `.ok-menu` toggles `ok-left-hide`. Desktop moves the rail and logo to `left: -220px`, moves the header-left control to `left: -20px`, and moves content/footer to `left: 0`. At `max-width: 768px`, the rail starts off-canvas, the rail and nav width become `180px`, `.ok-make` displays a `rgba(0,0,0,.5)` overlay, and selecting a menu or the overlay restores the open state. At `max-width: 970px`, `ok-hide-md` hides marked items. [S01] [S08]

The source implements class toggles and transitions, not a full accessible drawer pattern. **Addition:** trap focus only while a modal drawer is open, expose the menu button name and expanded state, return focus to the trigger, close on Escape where appropriate, and ensure content remains reachable at 360px. Do not hide a required action without an alternate path.

## Components and page patterns

### Buttons, forms, and validation

Use Layui button variants (`layui-btn`, `layui-btn-primary`, `layui-btn-normal`, `layui-btn-warm`, `layui-btn-danger`, `layui-btn-disabled`) and sizes (`layui-btn-sm`, `layui-btn-xs`) according to action hierarchy. Keep destructive actions visually distinct and require confirmation for irreversible changes. The source pages use `layui-form`, `layui-form-item`, `layui-form-label`, `layui-input-block`, `layui-input-inline`, `layui-form-pane`, and `layui-form-text`. [S11] [S17]

Filters use `ok-search` or `ok-search-form`; inline controls are compact on desktop and become full-width around `768px` in the shared CSS. Form pages use `ok-form`, usually `10px` from the parent body. Labels remain associated with fields; placeholder text is not a replacement for a label. [S02]

Native validation is `lay-verify` plus form events. **Addition:** disable or guard the submit action while an async request is in flight, preserve entered values on failure, show field-level errors where possible, provide a retry path, and restore focus to the first invalid field. Do not treat a successful client callback as proof that the server committed the change.

### Tables, lists, and cards

Member and common pages combine filter forms, command bars, tables, status badges, and row actions. Keep bulk actions adjacent to the selection count and provide a clear empty/no-match distinction. Use the inherited Layui table for its documented data and rendering lifecycle; bsgrid and DataTables pages are separate integrations and must not be mixed into the same contract. [S10] [S11] [S17]

Cards use white surfaces, `20px` body padding, a `16px` bold title, and the ok-admin shadow. Console metric cards pair a `24px` value with muted supporting text and optional `60px` imagery. Progress rows use a `50px` avatar and a flexible data column. Charts in the console occupy approximately `360px` map bodies and use the bundled ECharts themes. [S03]

### Layers, notifications, and loading

Use Layui `layer` for dialogs, confirmations, prompts, image views, tabs, tips, and iframe pages. The settings drawer is an iframe layer with `area: ['340px', '100%']`, right offset, no close button, and the `ok-setting` skin; source layer CSS supplies the base white surface, `2px` radius, and shadow. [S08] [S12]

Use `okLayer` for confirmation wrappers, `okToastr`/Toastr for non-blocking notices, and `okNprogress` for route/request progress. Keep a visible loading state until the request resolves; distinguish timeout, transport failure, authorization denial, validation failure, and empty data. Do not leave a spinner active after an error or show raw server traces in a toast. [S13] [S14]

### Login, lock screen, and feedback

The login page uses a `300px` centered white form, `20px` horizontal padding, `5px` radius, a teal `0 0 50px #009688` shadow, and a `100px` circular portrait with a `5px` white border and teal glow. The source contains a demo password `123456` and sample validation; these are fixtures and must never be copied into production authentication. [S03] [S17]

The lock screen covers the viewport with a rotating wallpaper set, clock text, blue `#4690FF` time accents, an animated portrait, snowflake canvas, and a password form. Its local unlock check also uses `123456`. **Addition:** replace the fixture with server/session authentication, protect sensitive content from screenshots where required, provide an accessible unlock/error path, and ensure lock state survives only according to the host security policy. [S01] [S08]

### Page composition map

| Page family | Source examples | Composition guidance |
| --- | --- | --- |
| Console / dashboard | `pages\\console.html`, `pages\\console1.html` | Metric cards, charts, progress, recent activity; keep chart color and density restrained |
| Member CRUD | `pages\\member\\user-list.html`, `user-insert.html`, `user-update.html`, `role-*`, `permission-list.html` | Search/filter, table, bulk actions, validation, confirmation, success/error recovery |
| System | `pages\\system\\setup.html`, `log.html`, `shield.html`, `setting.html` | Dense forms or lists, settings persistence, status feedback, explicit permissions |
| Common content | `pages\\often\\article.html`, `product.html`, `task.html`, `image.html`, `bbs.html` | List/detail/edit patterns with filters, actions, pagination, and truncation rules |
| Auth and errors | `pages\\login.html`, `register.html`, `forget.html`, `pages\\system\\403.html`, `404.html`, `500.html` | State-specific copy, safe recovery, no demo credentials or raw traces |
| Charts and editors | `pages\\chart\\*`, `pages\\txtedit\\*` | Treat ECharts/editor lifecycle and external assets as separate integrations |
| Third-party | `pages\\tripartite\\*`, `pages\\datatable\\*` | Preserve plugin-specific skins, licenses, API boundaries, and failure behavior |

## Responsive behavior

The source has custom rules at `max-width: 970px`, `max-width: 768px`, `max-width: 750px`, `max-width: 548px`, and `max-width: 450px`. At `768px` the rail becomes an off-canvas `180px` drawer and search inputs become narrow/full-width depending on the selector. At `450px`, address fields stop using the desktop `23%` width. At `750px` and `548px`, marked inline controls are hidden by `ok-in-hide-md`, `ok-in-hide-xs`, or `[ok-pc-in-show]`. These are selector-specific rules, not a guarantee that every page stacks correctly. [S01] [S02] [S03]

**Addition:** test `360px`, `449px`, `450px`, `548px`, `750px`, `768px`, `970px`, and a wide desktop. Keep the menu trigger, active route, table actions, error text, and form labels reachable. Allow wide tables to scroll within their region, keep dialogs inside the viewport, and give long Chinese/English values a copy or details path. Do not solve overflow by silently dropping required columns or controls.

## Interaction states and content

Every page pattern must define default, hover, active/selected, focus, disabled, loading, empty/no-match, validation failure, request failure, retry, success, and permission-denied states. Use text and icons with color so status remains understandable for color-vision differences. Keep button labels as verbs, explain destructive consequences before confirmation, and avoid exposing passwords, tokens, internal stack traces, or raw SQL.

For dates, numbers, currencies, time zones, null values, and status labels, use the host application's locale and data contract. `DESIGN.md` language does not automatically configure runtime i18n. **Addition:** load locale configuration before rendering generated controls, translate plugin messages as well as page labels, and verify that a language switch re-renders existing instances.

## Accessibility and resources

Static inspection found custom focus styling for inputs but no complete global `:focus-visible`, ARIA, focus trap, or `prefers-reduced-motion` system. Layui and plugins provide partial keyboard behavior; this is not a complete accessibility claim. [S01] [S11] [S12]

**Addition:** use semantic buttons and links, associated labels, names for icon-only controls, visible focus, logical Tab order, Escape handling for layers, focus return after close, and a full-value alternative for ellipsized content. Aim for WCAG AA contrast (`4.5:1` normal text, `3:1` large text, `3:1` non-text boundaries). Test keyboard, zoom, screen readers, touch targets, and reduced motion in the host application.

Preserve the bundled icon font paths and cache query. Images such as avatars, wallpapers, login backgrounds, QR codes, and donation assets are example resources with independent copyright and license obligations. The reference source is GPL-3.0; bundled Layui, jQuery, ECharts, bsgrid, Animate.css, Toastr, Layx, editors, and other modules retain their own licenses. [S16] [S18]

## Do and don't

### Do

- Keep the dark rail, white header, light content canvas, compact controls, and restrained elevation.
- Use `blue_theme` or `orange_theme` consistently, then preserve Layui/plugin semantic exceptions.
- Keep menu, tab, iframe, footer, overlay, and collapse offsets synchronized.
- Implement all relevant loading, empty, validation, failure, retry, success, disabled, and permission states.
- Preserve routes, data mappings, permissions, and module lifecycles; report application additions separately.

### Don't

- Do not ship the sample password `123456`, demo user `bobi`, QR images, or fixture data as production behavior.
- Do not mix the two theme colors on one active state, replace every plugin token with teal, or add heavy gradients.
- Do not create nested card shadows, giant marketing headlines, excessive rounded pills, or unexplained blank space.
- Do not claim that class toggles provide an accessible drawer, that static checks prove UI correctness, or that a design document supplies authentication/RBAC.
- Do not hide required mobile actions, swallow request errors, or use color as the only status signal.

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

- This is an independent source-derived design specification, not official ok-admin documentation or endorsement.
- It describes the pinned static source. Browser layout, iframe sizing, plugin stacking, keyboard/focus behavior, screen-reader output, real requests, locale switching, and production authentication remain unverified.
- The source contains demo credentials, sample users, external links, images, and third-party libraries. Projects must replace or audit them before production use.
- The version remains `2.0_dev`; updates to this directory are documentation commits, while future upstream versions receive new directories and tags. See the [audit](AUDIT.md) and the [repository version policy](../../README.en-US.md).

## Pinned source index

| ID | File or subject |
| --- | --- |
| [S01] | `css\\okadmin.css`: shell, menu, tabs, collapse, lock screen, responsive rules |
| [S02] | `css\\common.css`: body helpers, search/form spacing, cards, scrollbar, responsive rules |
| [S03] | `css\\oksub.css`: console, login, user forms, plugin responsive rules |
| [S04] | `css\\okadmin.theme.css`: blue/orange theme selectors |
| [S05] | `css\\okadmin.theme.scss`: theme source and arrow variants |
| [S06] | `index.html`: shell markup, 49px header, 220px rail, tabs, footer, lock markup |
| [S07] | `js\\okconfig.js`: defaults for theme, arrows, tab persistence, refresh |
| [S08] | `js\\okadmin.js`: menu collapse, tabs, settings, full screen, lock, feedback |
| [S09] | `js\\okmodules\\okTab.js`: recursive menu, 30-tab limit, session persistence |
| [S10] | `data\\navs.json`: 11 top-level navigation groups and page registry |
| [S11] | `lib\\layui-v2.6.8\\layui\\layui.js` and `css\\layui.css`: inherited Layui modules and tokens |
| [S12] | `lib\\layui-v2.6.8\\layui\\css\\modules\\layer\\default\\layer.css`: layer surfaces and shadows |
| [S13] | `css\\okmodules\\nprogress.css`: route/request progress indicator |
| [S14] | `css\\okmodules\\toastr.min.css`: Toastr notification surfaces |
| [S15] | `css\\okmodules\\layx.min.css`: Layx windows and transitions |
| [S16] | `lib\\fonts\\iconfont.css`: ok-icon font resources |
| [S17] | `pages\\`: 70 HTML examples covering auth, console, member, system, charts, editors, and plugins |
| [S18] | `README.md` and `LICENSE`: upstream project scope and GPL-3.0 notice |
| [S19] | Pinned upstream commit `247f0f2ee3dce10adcece6261bdc3ef060cbb567` |

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
