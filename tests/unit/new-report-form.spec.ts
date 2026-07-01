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
    expect(html).toContain("id=\"detail-card\"");
    expect(html).toContain("id=\"detail-lifecycle\"");
    expect(html).toContain("Status History");
    expect(html).toContain("Lifecycle");
    expect(html).toContain("id=\"admin-review-form\"");
    expect(html).toContain("id=\"admin-review-button\"");
    expect(html).toContain("/review");
    expect(html).toContain("/classification");
    expect(html).toContain("No comments or notes yet.");
    expect(html).toContain("id=\"comment-form\"");
    expect(html).toContain("name=\"commentType\"");
    expect(html).toContain("data-comment-error-for=\"body\"");
    expect(html).toContain("/comments");
    expect(html).toContain("/api/requests/${encodeURIComponent(id)}");
    expect(html).toContain('"x-actor-role": actorRole.value');
  });
});
