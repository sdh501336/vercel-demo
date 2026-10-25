# vercel-demo

[![CI](https://github.com/sdh501336/vercel-demo/actions/workflows/ci.yml/badge.svg)](https://github.com/sdh501336/vercel-demo/actions/workflows/ci.yml)

一个最小的 Next.js（App Router）演示项目，用来走通「本地开发 → GitHub → Vercel 自动部署」的完整链路。

- 线上地址：https://vercel-demo-neon-tau.vercel.app
- 接口示例：https://vercel-demo-neon-tau.vercel.app/api/hello
- 仓库地址：https://github.com/sdh501336/vercel-demo

## 本地开发

```bash
npm install
npm run dev          # http://localhost:3000
```

改 `app/page.tsx` 保存即热更新。

## 构建与检查

```bash
npm run check        # 一键全跑：lint → typegen+tsc → build（push 前跑这个）
npm run build        # 仅生产构建
npm run lint         # 仅代码检查
npm run typecheck    # 仅类型检查（内部已含 next typegen）
```

每次 push 或开 PR，GitHub Actions 会自动跑 `lint → typegen → tsc → build`，
工作流定义在 `.github/workflows/ci.yml`。红了看日志：`gh run list` / `gh run view --log-failed`。

## 部署

仓库已接入 Vercel：**push 到 `main` 就自动部署生产环境**，其它分支/PR 会生成预览地址。

```bash
git add -A
git commit -m "feat: 你的改动"
git push
```

也可以不用 Git，直接命令行发布本地代码：

```bash
npx vercel@latest deploy --prod --yes
```

首次执行会要求登录：`npx vercel@latest login`（浏览器授权即可）。

## 目录结构

```
app/
  page.tsx              # 首页，调用 /api/hello 展示运行时信息
  api/hello/route.ts    # 最小 Serverless 接口，返回 env / region / commit
```

## 接口

`GET /api/hello`

```json
{
  "ok": true,
  "message": "hello from vercel",
  "env": "production",
  "region": "iad1",
  "commit": "e8445a0",
  "now": "2026-10-24T18:48:33.399Z"
}
```

`env`、`region`、`commit` 来自 Vercel 注入的环境变量，所以访问线上接口就能确认当前跑的是哪一次提交。

## 常用命令速查

| 场景 | 命令 |
| --- | --- |
| 看当前状态 | `git status` |
| 拉取线上最新 | `git pull` |
| 新建分支干活 | `git switch -c feat/xxx` |
| 推送新分支 | `git push -u origin feat/xxx` |
| 本地跑生产构建 | `npm run build && npm start` |
