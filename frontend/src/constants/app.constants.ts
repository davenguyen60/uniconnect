import { type LatLngExpression } from 'leaflet';
import { ENV_CONFIG } from '../config/env';

// Tọa độ mặc định lấy từ Env
export const DEFAULT_POSITION: LatLngExpression = [ENV_CONFIG.DEFAULT_LAT, ENV_CONFIG.DEFAULT_LNG];

export const MAP_SETTINGS = {
  DEFAULT_ZOOM: 13,
  MAX_ZOOM: 18,
  MIN_ZOOM: 5,
};

export const API_ROUTES = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  ACTIVITIES: '/activities',
};

