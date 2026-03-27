// If in development mode (Vite dev server), always point to the backend port 5001 on the same hostname
// If loaded from ngrok (public), point to the ngrok backend
const isDev = import.meta.env.DEV;

export const API_BASE_URL = isDev
    ? `http://${window.location.hostname}:5002`
    : import.meta.env.VITE_API_URL || window.location.origin; // Dynamically resolve ngrok origin
