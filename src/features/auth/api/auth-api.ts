import { apiRequest, getCsrfToken } from "@/shared/api";
import type { MessageResponse } from "@/shared/api";

export type LoginRequest = {
  email: string;
  password: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export async function login(
  request: LoginRequest,
  signal?: AbortSignal,
): Promise<MessageResponse> {
  const csrfToken = await getCsrfToken(signal);

  return apiRequest<MessageResponse>("/api/auth/login", {
    method: "POST",
    json: request,
    csrfToken,
    signal,
  });
}

export async function requestPasswordReset(
  request: ForgotPasswordRequest,
  signal?: AbortSignal,
): Promise<MessageResponse> {
  const csrfToken = await getCsrfToken(signal);

  return apiRequest<MessageResponse>("/api/auth/forgot-password", {
    method: "POST",
    json: request,
    csrfToken,
    signal,
  });
}
