import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  VStack,
  Text,
  Button,
  Divider,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { SearchIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { useSearchPlaces } from "../hooks/useSearchPlaces";
import useDebounce from "../hooks/useDebounce"; // Import Hook
import PlaceItem from "./PlaceItem";

import {
  UI_DIMENSIONS,
  UI_Z_INDEX,
  SEARCH_CONFIG,
  CUSTOM_SCROLLBAR_STYLE,
} from "../constants/ui.constants";

interface SidebarProps {
  onSelectPlace: (lat: number, lon: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectPlace }) => {
  const [query, setQuery] = useState("");

  // Áp dụng khoản chờ khi typing
  const debouncedQuery = useDebounce(query, SEARCH_CONFIG.DEBOUNCE_DELAY);

  const { results, isLoading, handleSearch, clearResults } = useSearchPlaces();

  // 2. TỰ ĐỘNG TÌM KHI DEBOUNCED QUERY THAY ĐỔI
  useEffect(() => {
    // Chỉ tìm khi từ khóa có nội dung thực sự (tránh tìm chuỗi rỗng)
    if (debouncedQuery.trim().length >= SEARCH_CONFIG.MIN_CHARS_TO_SEARCH) {
      handleSearch(debouncedQuery);
    } else {
      clearResults();
    }
  }, [debouncedQuery]); // Chạy lại mỗi khi giá trị debounce thay đổi

  // Hàm xóa nhanh input
  const handleClear = () => {
    setQuery("");
    clearResults();
  };

  return (
    <Box
      // 3. Dùng constant cho kích thước và z-index
      w={UI_DIMENSIONS.SIDEBAR_WIDTH}
      h="100%"
      bg="white"
      boxShadow="xl"
      zIndex={UI_Z_INDEX.SIDEBAR}
      p={5}
      display="flex"
      flexDirection="column"
      borderRight="1px"
      borderColor="gray.200"
    >
      <Text fontSize="2xl" fontWeight="800" mb={1} color="blue.600">
        UniConnect
      </Text>
      <Text fontSize="xs" color="gray.500" mb={6}>
        Khám phá hoạt động quanh bạn
      </Text>

      {/* Ô tìm kiếm */}
      <Flex gap={2} mb={4} align="center" position="relative">
        <Input
          placeholder="Tìm địa điểm..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          bg="gray.50"
          _focus={{ bg: "white", borderColor: "blue.500" }}
          pr="40px" // Chừa chỗ cho nút xóa hoặc loading
        />

        {/* Hiển thị Loading ngay trong ô input cho Pro */}
        <Box position="absolute" right={3} zIndex={2}>
          {isLoading ? (
            <Spinner size="sm" color="blue.500" />
          ) : (
            query && (
              <SmallCloseIcon
                cursor="pointer"
                onClick={handleClear}
                color="gray.400"
              />
            )
          )}
        </Box>
      </Flex>

      <Divider mb={4} />

      {/* Danh sách kết quả */}
      <VStack
        align="stretch"
        spacing={0}
        overflowY="auto"
        flex={1}
        css={CUSTOM_SCROLLBAR_STYLE}
      >
        {/* Gợi ý khi chưa tìm gì */}
        {results.length === 0 && !isLoading && query === "" && (
          <Text fontSize="sm" color="gray.400" textAlign="center" mt={4}>
            Gõ tên địa điểm để tìm kiếm...
          </Text>
        )}

        {/* Thông báo không tìm thấy */}
        {results.length === 0 &&
          !isLoading &&
          query !== "" &&
          debouncedQuery !== "" && (
            <Text fontSize="sm" color="gray.400" textAlign="center" mt={4}>
              Không tìm thấy kết quả nào.
            </Text>
          )}

        {results.map((place) => (
          <PlaceItem
            key={place.place_id}
            data={place}
            onClick={onSelectPlace}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
