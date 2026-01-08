import React, { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { authApi, type LoginPayload } from '../api/authApi'; // Import API vừa viết
import { useAuth } from '../context/AuthContext'; // Import hook

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State loading

  const { login } = useAuth(); // Lấy hàm login từ Context

  const toast = useToast(); // Hook thông báo

  const handleLogin = async () => {
    // Tạm thời log ra console để test giao diện trước
    if (!email || !password) {
      toast({
        title: 'Thiếu thông tin',
        description: 'Vui lòng nhập đầy đủ email và mật khẩu.',
        status: 'warning',
        duration: 3000,
        isClosable: true
      });
      return;
    }
    setIsLoading(true);

    try {
      // 2. Gọi API thật
      const response = await authApi.login({ email, password });
      login(response.access_token);
      // 3. Nếu thành công:
      // - Lưu token vào LocalStorage (Cái chìa khóa để vào nhà)
      localStorage.setItem('access_token', response.access_token);

      toast({
        title: 'Đăng nhập thành công!',
        description: 'Đang chuyển hướng...',
        status: 'success',
        duration: 1000,
      });
    } catch (error: any) {
      console.error(error);
      // Xử lý thông báo lỗi chi tiết
      const message = error.response?.data?.detail || 'Đăng nhập thất bại';
      toast({
        title: 'Lỗi',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Đăng nhập UniConnect</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Kết nối sinh viên - Kết nối tinh hoa đất nước
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          as="form"
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault(); 
            handleLogin();      
          }}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Địa chỉ Email</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Mật khẩu</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                <Text color={'blue.400'}>Quên mật khẩu?</Text>
              </Stack>
              <Button
                type="submit"
                bg={'blue.400'}
                color={'white'}
                _hover={{ bg: 'blue.500' }}
                isLoading={isLoading}
                loadingText="Đang xử lý..."
              >
                  Đăng nhập
              </Button>
            </Stack>
            <Stack pt={6}>
                <Text align={'center'}>
                    Chưa có tài khoản? <Link to="/register" style={{color: '#4299e1'}}>Đăng ký ngay</Link>
                </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}