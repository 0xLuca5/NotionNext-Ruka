# NotionNext-Ruka

`NotionNext-Ruka` 是一个基于 [NotionNext](https://github.com/tangly1024/NotionNext) 的主题仓库。

[中文](./README.md) | [English](./README_EN.md)

## 求个 Star

如果这个主题对你有帮助，欢迎点一个 Star 支持一下～

## 功能进度

- [x] **主页**
- [x] **文章页面**
- [ ] **分类**
- [ ] **标签页面**
- [x] **文章字数计算**
- [x] **主题色板**
- [x] **随机文章**
- [ ] **归档页面**

## Preview
<p align="center">
  <img src="/public/images/preview.png" width="32%" />
  <img src="/public/images/preview1.png" width="32%" />
  <img src="/public/images/preview2.png" width="32%" />
</p>


## 配置

本主题的配置优先从 Notion 配置表读取，其次可从 `themes/ruka/config.js` 读取（部分配置项会显式传入 `CONFIG` 作为兜底）。

### 主题专属配置（建议写到 Notion 配置表）

- **`RUKA_LOGO_URI`**
  - Header Logo
  - 示例：`/logo.png` 或 `https://example.com/logo.svg`
- **`RUKA_AUTHOR_DESCRIPTION`**
  - 作者简介（侧边栏/抽屉/文章页信息区）
  - 示例：`FullStack / 创作者 / 碳基生物`

## 部署

本仓库本身是主题代码，通常会作为 **NotionNext 主项目**的一部分进行部署。

### 部署到 Vercel

- Notion 配置表 Duplicate：
  - https://mixolydian-spinach-174.notion.site/30152c4ca1ae8131ab49ece8ae453e92?v=30152c4ca1ae8170a070000cc2053854
- 安装与部署教程（NotionNext 官方文档）：
  - https://docs.tangly1024.com/article/vercel-deploy-notion-next

- **[步骤 1]** 在你的 NotionNext 主项目中集成本主题（见上文「使用方式」）
- **[步骤 2]** 将 NotionNext 主项目推送到 GitHub
- **[步骤 3]** 在 Vercel 导入该仓库
- **[步骤 4]** 配置环境变量（按 NotionNext 的要求配置）
  - `NOTION_PAGE_ID`
- **[步骤 5]** Deploy

### 自托管（VPS / Docker）

在 NotionNext 主项目目录中：

- 安装依赖：`npm i` / `pnpm i`
- 构建：`npm run build`
- 运行：`npm run start`

同样需要配置 NotionNext 所需的环境变量，并确保 `NEXT_PUBLIC_THEME=ruka`。

## 开发

推荐在 NotionNext 主项目中进行开发调试（本仓库不额外引入新的运行命令）。

- **[步骤 1]** 将本主题放入 NotionNext 项目：`themes/ruka`
- **[步骤 2]** 配置 `blog.config.js`
  - `THEME: 'ruka'`
  - `NOTION_PAGE_ID: '...'`
- **[步骤 3]** 安装依赖
  - `npm i` / `pnpm i`
- **[步骤 4]** 本地开发
  - `npm run dev`
- **[步骤 5]** 构建与运行（可选）
  - `npm run build`
  - `npm run start`

## 鸣谢

<a href="https://github.com/cosZone/astro-koharu" title="cosZone/astro-koharu">
  <img src="https://avatars.githubusercontent.com/u/90290079" width="56" height="56" alt="cosZone" />
</a>

## License

MIT
