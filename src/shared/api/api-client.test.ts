import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ApiError, apiRequest, getCsrfToken } from ".";

describe("apiRequest", () => {
  const fetchMock = vi.fn<typeof fetch>();

  beforeEach(() => {
    process.env.NEXT_PUBLIC_API_BASE_URL = "http://localhost:8080/";
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllGlobals();
  });

  it("sends a GET request with JSON headers and cookie credentials", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ message: "ok" }), { status: 200 }),
    );

    await expect(apiRequest<{ message: string }>("/health")).resolves.toEqual({
      message: "ok",
    });

    const [url, init] = fetchMock.mock.calls[0];
    const headers = new Headers(init?.headers);

    expect(url).toEqual(new URL("http://localhost:8080/health"));
    expect(init?.credentials).toBe("include");
    expect(headers.get("Accept")).toBe("application/json");
  });

  it("serializes a JSON body and adds a CSRF token", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ message: "created" }), { status: 201 }),
    );

    await apiRequest("/api/groups", {
      method: "POST",
      json: { name: "Trip" },
      csrfToken: "csrf-token",
    });

    const [, init] = fetchMock.mock.calls[0];
    const headers = new Headers(init?.headers);

    expect(init?.body).toBe(JSON.stringify({ name: "Trip" }));
    expect(headers.get("Content-Type")).toBe("application/json");
    expect(headers.get("X-CSRF-Token")).toBe("csrf-token");
  });

  it("forwards an AbortSignal", async () => {
    const controller = new AbortController();
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ message: "ok" }), { status: 200 }),
    );

    await apiRequest("/health", { signal: controller.signal });

    expect(fetchMock.mock.calls[0][1]?.signal).toBe(controller.signal);
  });

  it("returns undefined for a 204 response", async () => {
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 204 }));

    await expect(apiRequest<void>("/api/auth/logout")).resolves.toBeUndefined();
  });

  it("normalizes the backend error contract", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(
        JSON.stringify({ status: 401, code: 16, message: "unauthenticated" }),
        { status: 401 },
      ),
    );

    await expect(apiRequest("/api/auth/me")).rejects.toMatchObject({
      name: "ApiError",
      status: 401,
      code: 16,
      message: "unauthenticated",
    } satisfies Partial<ApiError>);
  });

  it("falls back safely when an error response is not JSON", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response("upstream unavailable", { status: 502 }),
    );

    await expect(apiRequest("/health")).rejects.toMatchObject({
      status: 502,
      code: 0,
      message: "Request failed with status 502",
    } satisfies Partial<ApiError>);
  });

  it("fetches and validates a CSRF token", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ csrf_token: "csrf-token" }), { status: 200 }),
    );

    await expect(getCsrfToken()).resolves.toBe("csrf-token");
    expect(fetchMock.mock.calls[0][0]).toEqual(
      new URL("http://localhost:8080/api/auth/csrf"),
    );
  });
});
