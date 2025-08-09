import type { ApiResponse } from "../services/types";

export interface AppError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

export class ErrorHandler {
  static handleApiError(response: ApiResponse): AppError {
    if (response.errors && Object.keys(response.errors).length > 0) {
      // Handle validation errors
      const firstError = Object.values(response.errors)[0];
      const message = Array.isArray(firstError)
        ? firstError[0]
        : String(firstError);
      return {
        message,
        code: "VALIDATION_ERROR",
        details: response.errors as Record<string, unknown>,
      };
    }

    return {
      message: response.message || "An unexpected error occurred",
      code: "API_ERROR",
    };
  }

  static handleNetworkError(error: unknown): AppError {
    if (error instanceof TypeError && String(error.message).includes("fetch")) {
      return {
        message: "Network error. Please check your connection.",
        code: "NETWORK_ERROR",
      };
    }

    return {
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
      code: "UNKNOWN_ERROR",
    };
  }

  static isNetworkError(error: unknown): boolean {
    return (
      error instanceof TypeError && String(error.message).includes("fetch")
    );
  }

  static isValidationError(error: AppError): boolean {
    return error.code === "VALIDATION_ERROR";
  }

  static getErrorMessage(error: AppError): string {
    return error.message;
  }

  static getErrorDetails(error: AppError): Record<string, unknown> | undefined {
    return error.details;
  }
}
