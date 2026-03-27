// If in development mode (Vite dev server), always point to the backend port 5001 on the same hostname
// If loaded from ngrok (public), point to the ngrok backend
const isDev = import.meta.env.DEV;

// Use relative paths to rely on Vite proxy locally and Vercel rewrites in production.
export const API_BASE_URL = '';
