// Allow injecting properties during runtime.
// The index.html loads a special env.js before the application boots.

declare const window: CustomWindow

export const BACKEND_URL = window.BACKEND_URL
