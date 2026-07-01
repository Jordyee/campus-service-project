import { SELF } from "cloudflare:test";
import { describe, expect, it } from "vitest";

describe("new report form", () => {
  it("renders reporter request fields and field-error targets", async () => {
    const response = await SELF.fetch("https://example.com/");
    const html = await response.text();

    expect(response.status).toBe(200);
    for (const field of [
      "title",
      "description",
      "location",
      "category",
      "reporterName",
      "reporterContact",
    ]) {
      expect(html).toContain(`name="${field}"`);
      expect(html).toContain(`data-error-for="${field}"`);
    }

    expect(html).toContain('fetch("/api/requests"');
    expect(html).toContain("id=\"report-filters\"");
    expect(html).toContain("No reports match the current filters.");
    expect(html).toContain("No reports yet.");
    expect(html).toContain("clear-filters");
    expect(html).toContain('"x-actor-role": actorRole.value');
  });
});
