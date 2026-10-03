// Small helper so mock data survives a page refresh during the demo,
// without every service needing to repeat JSON parsing/error handling.

export function loadState(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function saveState(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage unavailable (e.g. private browsing) — fail silently for the prototype.
  }
}
