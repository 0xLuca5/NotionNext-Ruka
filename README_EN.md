# NotionNext-Ruka

`NotionNext-Ruka` is a theme repository based on [NotionNext](https://github.com/tangly1024/NotionNext).

[中文](./README.md) | [English](./README_EN.md)

## Please Star

If you find this theme helpful, please consider giving this repo a Star.

## Feature Status

- [x] **Home page**
- [x] **Post page**
- [ ] **Categories**
- [ ] **Tags page**
- [x] **Post word count**
- [x] **Theme color palette**
- [x] **Random posts**
- [ ] **Archive page**

## Preview
![preview](/public/images/preview.png)

## Usage

### Option A: Use it as a theme directory in your NotionNext project

- **[Step 1]** Copy this repo's `themes/ruka` into your NotionNext project as `themes/ruka`
- **[Step 2]** Enable the theme in `blog.config.js`:
  - `THEME: 'ruka'`
- **[Step 3]** Run / build your NotionNext project

### Option B: Fork and develop this repo

You can treat this repo as your NotionNext theme workspace and customize:

- `themes/ruka/components/*`
- `themes/ruka/style.js`
- `themes/ruka/config.js`

## Configuration

Theme configs are read from the Notion config table first. Some options can also fall back to `themes/ruka/config.js`.

### Theme-specific keys (recommended in the Notion config table)

- **`RUKA_LOGO_URI`**
  - Header logo
  - Example: `/logo.png` or `https://example.com/logo.svg`
- **`RUKA_AUTHOR_DESCRIPTION`**
  - Author bio (sidebar/drawer/post meta)
  - Example: `FullStack / Creator / Carbon-based life`

## Deployment

This repository contains theme code. In most cases you deploy your **NotionNext main project** (with this theme integrated).

### Deploy to Vercel

- Notion config table duplicate:
  - https://mixolydian-spinach-174.notion.site/30152c4ca1ae8131ab49ece8ae453e92?v=30152c4ca1ae8170a070000cc2053854
- Installation & deployment guide (NotionNext docs):
  - https://docs.tangly1024.com/article/vercel-deploy-notion-next

- **[Step 1]** Integrate the theme into your NotionNext project (see "Usage")
- **[Step 2]** Push your NotionNext project to GitHub
- **[Step 3]** Import the repo in Vercel
- **[Step 4]** Configure environment variables required by NotionNext
  - `NOTION_PAGE_ID`
- **[Step 5]** Deploy

### Self-host (VPS / Docker)

In your NotionNext project directory:

- Install: `npm i` / `pnpm i`
- Build: `npm run build`
- Start: `npm run start`

## Development

It is recommended to develop and debug in the NotionNext main project.

- **[Step 1]** Put the theme into your NotionNext project: `themes/ruka`
- **[Step 2]** Update `blog.config.js`
  - `THEME: 'ruka'`
  - `NOTION_PAGE_ID: '...'`
- **[Step 3]** Install dependencies
  - `npm i` / `pnpm i`
- **[Step 4]** Run dev server
  - `npm run dev`
- **[Step 5]** Build & start (optional)
  - `npm run build`
  - `npm run start`

## Credits

<a href="https://github.com/cosZone/astro-koharu" title="cosZone/astro-koharu">
  <img src="https://avatars.githubusercontent.com/u/90290079" width="56" height="56" alt="cosZone" />
</a>

## License

MIT
