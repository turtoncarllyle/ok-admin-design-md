# ok-admin-md

[简体中文](README.md) | [English](README.en-US.md)

[![ok-admin](https://img.shields.io/badge/ok--admin-2.0__dev-2D8CF0)](https://gitee.com/wudibo/ok-admin/tree/v2.0_dev)
[![DESIGN.md](https://img.shields.io/badge/DESIGN.md-AI%20ready-16b777)](https://stitch.withgoogle.com/docs/design-md/overview/)
[![License](https://img.shields.io/badge/license-MIT-2f363c)](LICENSE)

A versioned ok-admin design-system specification for AI coding agents, focused on flat, compact admin interfaces built on Layui.

`DESIGN.md` is the plain-text design-system format introduced by Google Stitch. It records visual outcomes, component composition, interaction states, and responsive rules that an AI agent can read directly. It does not replace ok-admin business APIs, authorization, or the Layui API reference.

## Purpose and scope

This repository extracts colors, typography, dimensions, spacing, radii, shadows, layout, and interaction states from the ok-admin `v2.0_dev` source and keeps them under an explicit version directory. Use it to:

- Create or update ok-admin admin pages
- Compose dashboards, data lists, member management, settings, and forms
- Keep the sidebar, header, tabs, lock screen, and theme switching coherent
- Provide a checkable visual baseline for review and UI acceptance

It is not a runnable admin application and does not provide real authentication, routing, RBAC, backend data, or production security guarantees.

## Supported versions

| ok-admin version | Canonical English | Simplified Chinese | GitHub Release |
| --- | --- | --- | --- |
| `2.0_dev` | [DESIGN.md](versions/2.0_dev/DESIGN.md) | [DESIGN.zh-CN.md](versions/2.0_dev/DESIGN.zh-CN.md) | [v2.0_dev](https://github.com/turtoncarllyle/ok-admin-md/releases/tag/v2.0_dev) |

The English `DESIGN.md` is the ecosystem entry point. The Chinese edition keeps the same sections, tokens, and technical literals. Version-directory files are the current documents on `main`; Release assets are publication snapshots.

Audit record: [2.0_dev completeness audit and verification limits](versions/2.0_dev/AUDIT.md).

## Usage

1. Confirm that the project uses ok-admin v2.0_dev, then inventory its own theme, routes, permissions, and data interfaces.
2. Read the [English DESIGN.md](versions/2.0_dev/DESIGN.md) or [Simplified Chinese edition](versions/2.0_dev/DESIGN.zh-CN.md). Merge with an existing project specification before adding local rules.
3. Ask the AI agent to read the specification before inspecting real pages and interfaces. Separate source facts, inherited Layui/plugin behavior, application additions, and unverified items.
4. Check loading, empty, validation failure, request failure, retry, success, narrow-screen, and keyboard-focus behavior against the specification.

Download the English specification:

```powershell
Invoke-WebRequest `
  -Uri "https://raw.githubusercontent.com/turtoncarllyle/ok-admin-md/main/versions/2.0_dev/DESIGN.md" `
  -OutFile ".\DESIGN.md"
```

Download the Simplified Chinese specification:

```powershell
Invoke-WebRequest `
  -Uri "https://raw.githubusercontent.com/turtoncarllyle/ok-admin-md/main/versions/2.0_dev/DESIGN.zh-CN.md" `
  -OutFile ".\DESIGN.md"
```

Example prompt:

```text
Read DESIGN.md in the project root before modifying this ok-admin 2.0_dev admin page.
Identify the existing 220px sidebar, 49px header, 40px tabs, theme, and Layui 2.6.8 widgets.
Preserve routes, permissions, API fields, and the existing component family; never ship the
sample password or demo data. Implement loading, empty, validation failure, request failure,
retry, and success feedback. Report static checks, actual page verification, and unverified
scope separately, and label application additions apart from source behavior.
```

## Coverage

- Color roles, dual themes, typography, icons, spacing, radii, borders, elevation, and motion
- Admin shell, sidebar menus, nested navigation, tabs, tab context actions, and settings drawer
- Buttons, inputs, forms, search filters, tables, pagination, cards, progress, layers, and notices
- Login, registration, password recovery, lock screen, consoles, charts, member/system/error pages, and editors
- Layui 2.6.8 inherited behavior plus okTab, okLayer, okUtils, okToastr, okNprogress, and okLayx extensions
- Responsive behavior, long text, localization, keyboard focus, contrast, reduced motion, and asset-license boundaries

## Source and version policy

The specification is pinned to Gitee branch `v2.0_dev`, commit [`247f0f2`](https://gitee.com/wudibo/ok-admin/commit/247f0f2ee3dce10adcece6261bdc3ef060cbb567). The local reference snapshot was compared against all 668 Git blobs from that commit.

This repository publishes original design documents and verification scripts only. It does not copy the ok-admin source or images. The upstream ok-admin project is GPL-3.0; original documents here use the MIT License, while third-party dependencies retain their own licenses.

Only `2.0_dev` is maintained for this publication; documentation improvements do not become a new revision number. Future upstream versions use a new `versions\\<version>` directory, front matter, tag, and Release. Git history tracks updates within the current directory.

## Verification

```powershell
node .\scripts\verify-docs.mjs
node .\scripts\verify-docs.mjs --source .\ok-admin-v2.0_dev
git diff --check
```

The script checks UTF-8, bilingual structure, metadata, relative links, pinned source references, key source tokens, and source-ignore status. Static checks are not browser UI, real API, or assistive-technology acceptance.

## License

Original documents are released under the [MIT License](LICENSE). When using ok-admin material, follow the upstream [GPL-3.0 license](https://gitee.com/wudibo/ok-admin/blob/v2.0_dev/LICENSE). This repository is independent and is not endorsed by the ok-admin authors.
