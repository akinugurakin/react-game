import { refreshAccessToken } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface FetchOptions extends RequestInit {
  token?: string;
  skipRefresh?: boolean;
}

async function fetchAPI<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { token, skipRefresh, headers, ...rest } = options;

  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...rest,
  });

  // 401 → token refresh dene, sonra tekrar iste
  if (res.status === 401 && !skipRefresh) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      const { useAuthStore } = await import("@/lib/auth");
      const newToken = useAuthStore.getState().accessToken;
      return fetchAPI<T>(endpoint, { ...options, token: newToken ?? undefined, skipRefresh: true });
    }
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Bir hata oluştu" }));
    throw new Error(error.detail || `HTTP ${res.status}`);
  }

  if (res.status === 204) return undefined as T;

  return res.json();
}

export const api = {
  get: <T>(endpoint: string, token?: string) =>
    fetchAPI<T>(endpoint, { method: "GET", token }),

  post: <T>(endpoint: string, body: unknown, token?: string) =>
    fetchAPI<T>(endpoint, { method: "POST", body: JSON.stringify(body), token }),

  patch: <T>(endpoint: string, body: unknown, token?: string) =>
    fetchAPI<T>(endpoint, { method: "PATCH", body: JSON.stringify(body), token }),

  put: <T>(endpoint: string, body: unknown, token?: string) =>
    fetchAPI<T>(endpoint, { method: "PUT", body: JSON.stringify(body), token }),

  delete: <T>(endpoint: string, token?: string) =>
    fetchAPI<T>(endpoint, { method: "DELETE", token }),
};
