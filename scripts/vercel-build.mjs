import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

function normalizeDatabaseUrl(value) {
  if (!value) return value;
  let next = value.trim();
  if (
    (next.startsWith('"') && next.endsWith('"')) ||
    (next.startsWith("'") && next.endsWith("'"))
  ) {
    next = next.slice(1, -1).trim();
  }
  if (next.startsWith("DATABASE_URL=")) {
    next = next.slice("DATABASE_URL=".length).trim();
  }
  if (
    (next.startsWith('"') && next.endsWith('"')) ||
    (next.startsWith("'") && next.endsWith("'"))
  ) {
    next = next.slice(1, -1).trim();
  }
  return next;
}

const normalizedDatabaseUrl = normalizeDatabaseUrl(process.env.DATABASE_URL);
const env = {
  ...process.env,
  DATABASE_URL: normalizedDatabaseUrl,
};

if (!normalizedDatabaseUrl?.startsWith("postgresql://") && !normalizedDatabaseUrl?.startsWith("postgres://")) {
  console.error(
    "DATABASE_URL must start with postgresql:// or postgres://. Check the Vercel Environment Variables value."
  );
  process.exit(1);
}

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const commands = [
  [
    process.execPath,
    [path.join(rootDir, "node_modules/prisma/build/index.js"), "generate", "--schema", "prisma/schema.free.prisma"],
  ],
  [process.execPath, [path.join(rootDir, "node_modules/next/dist/bin/next"), "build"]],
];

for (const [command, args] of commands) {
  const result = spawnSync(command, args, {
    env,
    shell: false,
    stdio: "inherit",
  });
  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }
  if (result.status !== 0) process.exit(result.status ?? 1);
}
