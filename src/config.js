const isProd = import.meta.env.PROD

export const serverUrl = isProd
  ? import.meta.env.VITE_SERVER_URL
  : import.meta.env.VITE_SERVER_LOCAL
