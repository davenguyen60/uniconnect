import axiosClient from './axiosClient';
import { type User } from './authApi';

export interface CreateActivityPayload {
  name: string;
  description: string;
  start_time: string; 
  lat: number;
  lng: number; 
  max_participants?: number;
}
export interface Activity {
  id: number;
  name: string;
  description: string;
  start_time: string;
  lat: number;
  lng: number;
  host: User; 
}

export const activityApi = {
  create: (data: CreateActivityPayload): Promise<Activity> => {
    return axiosClient.post('/activities', data);
  },

  getAll: (): Promise<Activity[]> => {
    return axiosClient.get('/activities');
  },
};