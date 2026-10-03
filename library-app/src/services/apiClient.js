// Central API configuration for the Stackwell frontend.
//
// The backend URL comes from the VITE_API_BASE_URL environment variable
// (see .env.example). It is defined ONCE here — service files should import
// from this module instead of hardcoding a URL.
//
// Nothing imports this file yet: the service files still use their existing
// localStorage-backed data until the real backend endpoints are wired in.

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '')

// Thin wrapper around fetch(): prefixes the base URL, sends/parses JSON,
// and throws an Error (with .status and .data) on non-2xx responses.
export async function apiRequest(path, { method = 'GET', body, headers = {}, ...rest } = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    ...rest,
  })

  const text = await response.text()
  const data = text ? safeParse(text) : null

  if (!response.ok) {
    const error = new Error((data && data.message) || `Request failed with status ${response.status}`)
    error.status = response.status
    error.data = data
    throw error
  }
  return data
}

function safeParse(text) {
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}
