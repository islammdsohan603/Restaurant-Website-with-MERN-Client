// ─── Token Storage ────────────────────────────────────────────────────────────

const TOKEN_KEY = "saffron_sage_auth_token";
const USER_KEY = "saffron_sage_user";

export const saveToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
};

export const isLoggedIn = (): boolean => {
  return Boolean(getToken());
};

// ─── User Storage ─────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  currentAddress: string;
}

export const saveUser = (user: AuthUser): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

export const getUser = (): AuthUser | null => {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
};

// ─── API Base URL ─────────────────────────────────────────────────────────────

const API_BASE = "http://localhost:5000/api";

// ─── API Helpers ──────────────────────────────────────────────────────────────

export interface ApiError {
  field: string;
  message: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  token?: string;
  user?: AuthUser;
  errors?: ApiError[];
  data?: T;
}

export const signupUser = async (payload: {
  name: string;
  email: string;
  phone: string;
  address: string;
  currentAddress: string;
  password: string;
  confirmPassword: string;
}): Promise<ApiResponse> => {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json() as Promise<ApiResponse>;
};

export const loginUser = async (payload: {
  email: string;
  password: string;
}): Promise<ApiResponse> => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json() as Promise<ApiResponse>;
};
