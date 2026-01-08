import axiosClient from './axiosClient';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface User {
  id: number;
  email: string;
  full_name?: string;
  is_active?: boolean;
}

export const authApi = {
  login: (data: LoginPayload): Promise<LoginResponse> => {
    const formData = new URLSearchParams();
    
    formData.append('username', data.email); 
    formData.append('password', data.password);

    return axiosClient.post('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  },
  
  getMe: (): Promise<any> => {
    return axiosClient.get('/users/me'); 
  }
};