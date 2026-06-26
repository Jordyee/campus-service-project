import { env, SELF } from "cloudflare:test";
import { describe, expect, it } from "vitest";

describe("health endpoint", () => {
  it("returns ok status", async () => {
    const response = await SELF.fetch("https://example.com/api/health");
    const body = (await response.json()) as { status: string };

    expect(response.status).toBe(200);
    expect(body.status).toBe("ok");
    expect(env).toBeDefined();
  });
});
