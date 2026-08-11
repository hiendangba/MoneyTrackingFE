import { describe, expect, it } from "vitest";
import { parsePublicEnv } from "./env";

describe("parsePublicEnv", () => {
  it("normalizes trailing slashes from the API base URL", () => {
    expect(
      parsePublicEnv({
        NEXT_PUBLIC_API_BASE_URL: "http://localhost:8080///",
      }),
    ).toEqual({
      NEXT_PUBLIC_API_BASE_URL: "http://localhost:8080",
    });
  });

  it.each([undefined, "not-a-url"])(
    "rejects an invalid API base URL: %s",
    (value) => {
      expect(() =>
        parsePublicEnv({ NEXT_PUBLIC_API_BASE_URL: value }),
      ).toThrow();
    },
  );
});
