import { useState } from 'react';
import { searchPlaces } from '../api/mapApi'; // Hàm gọi API cũ
import { type SearchResult } from '../types/map.types';
import { useToast } from '@chakra-ui/react'; // Dùng Toast để báo lỗi cho xịn

// Hook response
interface UseSearchPlacesReturn {
  results: SearchResult[];
  isLoading: boolean;
  handleSearch: (query: string) => Promise<void>;
  clearResults: () => void;
}

export const useSearchPlaces = (): UseSearchPlacesReturn => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSearch = async (query: string) => {
    // Not empty query
    if (!query.trim()) {
      toast({
        title: 'Vui lòng nhập từ khóa',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      const data = await searchPlaces(query);
      // Empty result
      if (data.length === 0) {
        toast({
          title: 'Không tìm thấy địa điểm nào',
          description: 'Thử từ khóa khác xem sao (VD: Ha Noi, BK...)',
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
      }
      
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: 'Lỗi hệ thống',
        description: 'Không thể kết nối đến dịch vụ bản đồ.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => setResults([]);

  return { results, isLoading, handleSearch, clearResults };
};