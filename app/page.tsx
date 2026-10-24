"use client";

import { useEffect, useState } from "react";

type Info = {
  ok: boolean;
  message: string;
  env: string;
  region: string;
  commit: string | null;
  now: string;
};

const ENV_LABEL: Record<string, string> = {
  production: "生产环境",
  preview: "预览环境",
  development: "开发环境",
  local: "本地",
};

export default function Home() {
  const [info, setInfo] = useState<Info | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/hello")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(setInfo)
      .catch((e) => setError(String(e)));
  }, []);

  const items = [
    { label: "运行环境", value: info ? (ENV_LABEL[info.env] ?? info.env) : "加载中" },
    { label: "边缘区域", value: info?.region ?? "加载中" },
    { label: "提交版本", value: info?.commit ?? "—" },
    {
      label: "服务器时间",
      value: info ? new Date(info.now).toLocaleString("zh-CN") : "加载中",
    },
  ];

  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-16 font-sans dark:bg-zinc-950">
      <div className="w-full max-w-2xl">
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            {error ? "接口连接失败" : info ? "部署成功 · 接口正常" : "正在检测接口"}
          </span>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Vercel 部署演示
          </h1>
          <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            本页由 Next.js 渲染，下方数据来自 Serverless 接口
            <code className="mx-1.5 rounded bg-zinc-200/70 px-1.5 py-0.5 font-mono text-[0.85em] text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              /api/hello
            </code>
            的实时响应。
          </p>
        </div>

        <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200 sm:grid-cols-2 dark:border-zinc-800 dark:bg-zinc-800">
          {items.map((item) => (
            <div key={item.label} className="bg-white px-5 py-4 dark:bg-zinc-900">
              <dt className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                {item.label}
              </dt>
              <dd className="mt-1.5 truncate font-mono text-sm text-zinc-900 dark:text-zinc-100">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-8 font-mono text-xs text-zinc-400 dark:text-zinc-600">
          {error ? `error: ${error}` : info?.message ?? "…"}
        </p>
      </div>
    </main>
  );
}
