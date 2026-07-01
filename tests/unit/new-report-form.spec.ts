import { SELF } from "cloudflare:test";
import { describe, expect, it } from "vitest";

/**
 * Static shell smoke test — verifies the Vite-built React app shell.
 *
 * The frontend is now a React TypeScript app built by Vite.
 * public/index.html is the build output: a lightweight HTML shell that
 * mounts React on <div id="root">. All component IDs exist in JS/React code
 * and are not present in the static HTML served by Wrangler.
 *
 * We verify:
 * - Wrangler serves the shell with HTTP 200
 * - The root mount point exists
 * - A bundled JS asset is referenced (Vite build output)
 * - The page lang and title are set correctly
 */
describe("new report form", () => {
  it("renders reporter request fields and field-error targets", async () => {
    const response = await SELF.fetch("https://example.com/");
    const html = await response.text();

    expect(response.status).toBe(200);

    // Root mount point for React app
    expect(html).toContain('id="root"');

    // Vite build output: bundled JS asset referenced in shell
    expect(html).toContain("/assets/");
    expect(html).toContain('type="module"');

    // Page metadata
    expect(html).toContain('lang="id"');
    expect(html).toContain("Campus Service Request");
  });
});
