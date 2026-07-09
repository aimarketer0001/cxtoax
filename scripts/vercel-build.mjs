import { spawnSync } from "node:child_process";

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

const commands = [
  ["npx", ["prisma", "generate", "--schema", "prisma/schema.free.prisma"]],
  ["npx", ["prisma", "db", "push", "--schema", "prisma/schema.free.prisma"]],
  ["npx", ["prisma", "db", "seed", "--schema", "prisma/schema.free.prisma"]],
  ["npx", ["next", "build"]],
];

for (const [command, args] of commands) {
  const result = spawnSync(command, args, {
    env,
    shell: process.platform === "win32",
    stdio: "inherit",
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
