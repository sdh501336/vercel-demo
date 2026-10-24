// 一个最小的 Serverless 接口：GET /api/hello
export async function GET() {
  return Response.json({
    ok: true,
    message: "hello from vercel",
    env: process.env.VERCEL_ENV ?? "local",
    region: process.env.VERCEL_REGION ?? "local",
    commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? null,
    now: new Date().toISOString(),
  });
}
