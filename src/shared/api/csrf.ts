import { z } from "zod";
import { apiRequest } from "./api-client";

const csrfResponseSchema = z.object({
  csrf_token: z.string().min(1),
});

export async function getCsrfToken(signal?: AbortSignal): Promise<string> {
  const response = await apiRequest<unknown>("/api/auth/csrf", { signal });

  return csrfResponseSchema.parse(response).csrf_token;
}
