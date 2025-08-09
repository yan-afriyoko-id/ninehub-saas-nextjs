import { useState, useCallback } from "react";
import type { ApiResponse } from "../services/types";

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T, A extends unknown[]> extends UseApiState<T> {
  execute: (...args: A) => Promise<void>;
  reset: () => void;
}

export function useApi<T, A extends unknown[] = []>(
  apiCall: (...args: A) => Promise<ApiResponse<T>>
): UseApiReturn<T, A> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: A) => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const response = await apiCall(...args);

        if (response.success) {
          setState({
            data: (response.data as T) ?? null,
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


