import { useState, useCallback } from "react";
import type { ApiResponse } from "../services/types";

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (...args: any[]) => Promise<void>;
  reset: () => void;
}

export function useApi<T = any>(
  apiCall: (...args: any[]) => Promise<ApiResponse<T>>
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]) => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const response = await apiCall(...args);

        if (response.success) {
          setState({
            data: response.data as T,
            loading: false,
            error: null,
          });
        } else {
          setState({
            data: null,
            loading: false,
            error: response.message || "An error occurred",
          });
        }
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : "An error occurred",
        });
      }
    },
    [apiCall]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}
