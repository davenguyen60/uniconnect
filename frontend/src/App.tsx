import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider, useAuth } from './context/AuthContext'; // Import AuthProvider

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

function App() {
  return (
    <ChakraProvider>
      {/* 1. Bọc AuthProvider ở ngoài cùng */}
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Route công khai (Login) - Đã login rồi thì đá về Home */}
            <Route path="/login" element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } />

            {/* Route cần bảo vệ (Home/Map) */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<HomePage />} />
              {/* Sau này thêm Profile, ActivityDetail ở đây */}
            </Route>

            {/* Các đường dẫn linh tinh thì đá về Login */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;