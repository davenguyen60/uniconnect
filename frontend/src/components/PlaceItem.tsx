import React from 'react';
import { Card, CardBody, Text, Icon, Flex } from '@chakra-ui/react';
import { type SearchResult } from '../types/map.types';
import { MdLocationOn } from 'react-icons/md'; 

interface PlaceItemProps {
  data: SearchResult;
  onClick: (lat: number, lon: number) => void;
}

// Dùng React.memo để tối ưu hiệu năng (chỉ render lại khi props đổi)
const PlaceItem: React.FC<PlaceItemProps> = React.memo(({ data, onClick }) => {
  
  // Xử lý display_name dài dòng thành ngắn gọn
  const [mainName, ...subName] = data.display_name.split(',');

  return (
    <Card 
      cursor="pointer" 
      _hover={{ bg: 'blue.50', transform: 'translateY(-2px)', transition: 'all 0.2s' }}
      onClick={() => onClick(parseFloat(data.lat), parseFloat(data.lon))}
      size="sm"
      variant="outline"
      mb={2}
    >
      <CardBody py={3}>
        <Flex align="center" gap={3}>
          <Icon as={MdLocationOn} color="red.500" boxSize={5} />

          <Flex direction="column">
            <Text fontSize="sm" fontWeight="bold" noOfLines={1}>
              {mainName}
            </Text>
          
            <Text fontSize="xs" color="gray.500" noOfLines={1}>
              {subName.join(',')}
            </Text>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
});

export default PlaceItem;