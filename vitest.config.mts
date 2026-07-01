import {
  defineWorkersConfig,
  readD1Migrations,
} from "@cloudflare/vitest-pool-workers/config";

const migrations = await readD1Migrations("./migrations");

export default defineWorkersConfig({
  test: {
    include: ["tests/**/*.test.ts", "tests/**/*.spec.ts"],
    poolOptions: {
      workers: {
        wrangler: { configPath: "./wrangler.jsonc" },
        miniflare: {
          d1Databases: ["DB"],
          bindings: {
            TEST_MIGRATIONS: migrations,
          },
        },
      },
    },
  },
});
