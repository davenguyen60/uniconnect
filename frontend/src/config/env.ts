export const ENV_CONFIG = {
  API_URL: import.meta.env.VITE_API_BASE_URL as string,
  MAP_KEY: import.meta.env.VITE_MAP_API_KEY as string,
  DEFAULT_LAT: parseFloat(import.meta.env.VITE_DEFAULT_LAT),
  DEFAULT_LNG: parseFloat(import.meta.env.VITE_DEFAULT_LNG),
};