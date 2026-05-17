const DEFAULT_API_BASE_URL = "https://jagannatha-temple-agency-6mtl.onrender.com";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;

export const apiUrl = (path: string) => {
  if (/^https?:\/\//i.test(path)) return path;

  const base = API_BASE_URL.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${base}${normalizedPath}`;
};

export const apiFetch = (path: string, init: RequestInit = {}) => {
  return fetch(apiUrl(path), {
    credentials: "include",
    ...init,
  });
};
