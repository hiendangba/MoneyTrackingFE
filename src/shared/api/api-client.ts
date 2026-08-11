import { getPublicEnv } from "../config/env";
import { createApiError } from "./api-error";

export type ApiRequestOptions = Omit<RequestInit, "body"> & {
  json?: unknown;
  csrfToken?: string;
};

function buildApiUrl(path: string) {
  if (!path.startsWith("/")) {
    throw new TypeError("API path must start with '/'");
  }

  return new URL(path, `${getPublicEnv().NEXT_PUBLIC_API_BASE_URL}/`);
}

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const { json, csrfToken, headers: initialHeaders, ...requestInit } = options;
  const headers = new Headers(initialHeaders);

  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  let body: BodyInit | undefined;

  if (json !== undefined) {
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    body = JSON.stringify(json);
  }

  if (csrfToken) {
    headers.set("X-CSRF-Token", csrfToken);
  }

  const response = await fetch(buildApiUrl(path), {
    ...requestInit,
    body,
    credentials: requestInit.credentials ?? "include",
    headers,
  });

  if (!response.ok) {
    throw await createApiError(response);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();

  if (!text) {
    return undefined as T;
  }

  return JSON.parse(text) as T;
}
