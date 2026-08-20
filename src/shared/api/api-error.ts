import { z } from "zod";

const apiErrorResponseSchema = z.object({
  status: z.number().int(),
  code: z.number().int(),
  message: z.string(),
});

export type ApiErrorResponse = z.infer<typeof apiErrorResponseSchema>;

export class ApiError extends Error {
  readonly status: number;
  readonly code: number;
  readonly response?: ApiErrorResponse;

  constructor(status: number, code: number, message: string, response?: ApiErrorResponse) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.response = response;
  }
}

export async function createApiError(response: Response): Promise<ApiError> {
  try {
    const parsed = apiErrorResponseSchema.safeParse(await response.json());
    if (parsed.success) {
      return new ApiError(response.status, parsed.data.code, parsed.data.message, parsed.data);
    }
  } catch {
    // Use the HTTP status when the backend does not return valid JSON.
  }

  return new ApiError(response.status, 0, `Request failed with status ${response.status}`);
}
