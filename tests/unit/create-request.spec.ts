import { describe, expect, it } from "vitest";
import { validateCreateRequestInput } from "../../worker/requests";

const validInput = {
  title: "Projector issue",
  description: "Projector does not turn on.",
  location: "Gedung A Ruang 301",
  category: "PERALATAN_KELAS",
  reporterName: "Demo Reporter",
  reporterContact: "reporter@example.edu",
};

describe("create request validation", () => {
  it("accepts the approved reporter request fields", () => {
    expect(validateCreateRequestInput(validInput)).toEqual({
      ok: true,
      data: validInput,
    });
  });

  it("trims text fields before persistence", () => {
    expect(
      validateCreateRequestInput({
        ...validInput,
        title: "  Projector issue  ",
      }),
    ).toEqual({
      ok: true,
      data: validInput,
    });
  });

  it("returns field errors for required fields and invalid category", () => {
    expect(
      validateCreateRequestInput({
        title: "",
        description: "",
        location: "",
        category: "PHOTO_UPLOAD",
        reporterName: "",
        reporterContact: "",
      }),
    ).toEqual({
      ok: false,
      errors: [
        { field: "title", message: "Title is required." },
        { field: "description", message: "Description is required." },
        { field: "location", message: "Location is required." },
        { field: "reporterName", message: "Reporter name is required." },
        { field: "reporterContact", message: "Reporter contact is required." },
        { field: "category", message: "Category is invalid." },
      ],
    });
  });
});
