import { apiRequest, getCsrfToken } from "@/shared/api";
import type { MessageResponse } from "@/shared/api";

export type LoginRequest = {
  email: string;
  password: string;
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
