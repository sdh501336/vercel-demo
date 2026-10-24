"use client";

import { useState } from "react";

const DEPLOY_CMD = `cd "/Users/sdh/Desktop/未命名文件夹/vercel-demo"
VERCEL_TOKEN=<桌面文件里的 token> \\
  /tmp/vercel-cli/node_modules/.bin/vercel deploy --prod --yes`;

const STEPS = [
  {
    n: "01",
    title: "打开 Codex",
    body: "Dock 或菜单栏里的 Codex 图标，点开就是对话框。",
  },
  {
    n: "02",
    title: "回到这个会话",
    body: "侧边栏已置顶，标题带「AKAK」的那一条。",
  },
  {
    n: "03",
    title: "直接说要什么",
    body: "「帮我部署」「改一下首页文案」「这个报错怎么回事」。",
  },
];

const PROMPTS = [
  { k: "部署", v: "帮我部署一下，用桌面的 token" },
  { k: "改文案", v: "把首页标题改成 XXX，然后重新部署" },
  { k: "排错", v: "构建失败了，日志在下面：……" },
  { k: "加功能", v: "加一个 /api/contact 接口，收表单" },
];

function Copy({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setDone(true);
        setTimeout(() => setDone(false), 1500);
      }}
      className="shrink-0 rounded-md border border-zinc-300 px-2.5 py-1 text-xs font-medium text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-100"
    >
      {done ? "已复制" : "复制"}
    </button>
  );
}

export default function Home() {
  return (
    <main className="flex-1 bg-zinc-50 px-6 py-14 font-sans dark:bg-zinc-950">
      <div className="mx-auto w-full max-w-3xl">
        <header>
          <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            在线 · 生产环境
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            我的工作台
          </h1>
          <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            这个页面部署在 Vercel 上，随时可访问。忘了怎么用，就打开它。
          </p>
        </header>

        <section className="mt-12">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
            怎么找到我
          </h2>
          <div className="mt-4 grid gap-px overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200 sm:grid-cols-3 dark:border-zinc-800 dark:bg-zinc-800">
            {STEPS.map((s) => (
              <div key={s.n} className="bg-white p-5 dark:bg-zinc-900">
                <span className="font-mono text-xs text-zinc-400">{s.n}</span>
                <h3 className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
            照着说就行
          </h2>
          <ul className="mt-4 divide-y divide-zinc-200 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
            {PROMPTS.map((p) => (
              <li key={p.k} className="flex items-center gap-4 px-5 py-3.5">
                <span className="w-14 shrink-0 text-xs font-medium text-zinc-400">
                  {p.k}
                </span>
                <span className="flex-1 text-sm text-zinc-800 dark:text-zinc-200">
                  {p.v}
                </span>
                <Copy text={p.v} />
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
            重新部署
          </h2>
          <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-2.5 dark:border-zinc-800">
              <span className="font-mono text-xs text-zinc-500">terminal</span>
              <Copy text={DEPLOY_CMD} />
            </div>
            <pre className="overflow-x-auto px-5 py-4 font-mono text-xs leading-6 text-zinc-700 dark:text-zinc-300">
              {DEPLOY_CMD}
            </pre>
          </div>
        </section>

        <footer className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-zinc-200 pt-6 text-xs text-zinc-500 dark:border-zinc-800">
          <span>
            项目 <code className="font-mono">vercel-demo</code>
          </span>
          <span>
            接口{" "}
            <a
              href="/api/hello"
              className="font-mono text-zinc-700 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-500 dark:text-zinc-300"
            >
              /api/hello
            </a>
          </span>
          <span>账号 sdh501336-7837</span>
        </footer>
      </div>
    </main>
  );
}
