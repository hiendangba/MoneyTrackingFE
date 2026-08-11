import { describe, expect, it } from "vitest";
import { getTranslation, resolveTranslation, t, TranslationKey } from ".";

describe("translation fallback", () => {
  it("returns the Vietnamese translation", () => {
    expect(t(TranslationKey.AuthLoginSubmit)).toBe("Đăng nhập");
  });

  it("prefers a non-empty service value", () => {
    expect(resolveTranslation(TranslationKey.AuthLoginSubmit, " Sign in ")).toBe(
      "Sign in",
    );
  });

  it("falls back when no translation endpoint is configured", async () => {
    const previousEndpoint = process.env.NEXT_PUBLIC_TRANSLATION_API_URL;
    delete process.env.NEXT_PUBLIC_TRANSLATION_API_URL;

    await expect(getTranslation(TranslationKey.CommonPassword)).resolves.toBe(
      "Mật khẩu",
    );

    if (previousEndpoint === undefined) {
      delete process.env.NEXT_PUBLIC_TRANSLATION_API_URL;
    } else {
      process.env.NEXT_PUBLIC_TRANSLATION_API_URL = previousEndpoint;
    }
  });
});
