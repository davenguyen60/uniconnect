import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type User, authApi } from '../api/authApi';
import { Spinner, Center } from '@chakra-ui/react';

// Định nghĩa kiểu dữ liệu cho Context
interface AuthContextType {
  user: User | null;          // Thông tin user (null = chưa login)
  isAuthenticated: boolean;   // Đã đăng nhập chưa?
  isLoading: boolean;         // Đang tải user info?
  login: (token: string) => void; // Hàm hỗ trợ login
  logout: () => void;         // Hàm hỗ trợ logout
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Hàm load user từ server về
  const fetchUser = async () => {
    try {
      const userData = await authApi.getMe();
      setUser(userData);
    } catch (error) {
      console.error("Lỗi lấy thông tin user:", error);
      logout(); // Lỗi token thì logout luôn
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      fetchUser(); // Có token thì gọi API check
    } else {
      setIsLoading(false); // Không có token thì thôi
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('access_token', token);
    setIsLoading(true); // Bật loading để fetch user
    fetchUser();
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
  };

  // Hiển thị màn hình Loading trong lúc đang check user (Tránh nháy trang Login)
  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="blue.500" thickness="4px" />
      </Center>
    );
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, // Có user -> true
      isLoading, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook để dùng nhanh ở các component khác
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};