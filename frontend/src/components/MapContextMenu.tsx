import React from 'react';
import { Box, VStack, Button, Text, Divider, useOutsideClick } from '@chakra-ui/react';
import { AddIcon, CopyIcon, InfoIcon } from '@chakra-ui/icons';

interface Props {
  x: number;
  y: number;
  lat: number; 
  lng: number;
  visible: boolean;
  onClose: () => void;
  onCreateClick: (lat: number, lng: number) => void;
}

const MapContextMenu: React.FC<Props> = ({ x, y, lat, lng, visible, onClose, onCreateClick }) => {
  const ref = React.useRef(null);
  
  // Click ra ngoài thì đóng menu
  useOutsideClick({
    ref: ref,
    handler: onClose,
  });

  if (!visible) return null;

  return (
    <Box
      ref={ref}
      position="fixed"
      top={y}
      left={x}
      bg="white"
      boxShadow="xl"
      borderRadius="md"
      zIndex={2000}
      minW="200px"
      py={2}
      border="1px solid"
      borderColor="gray.100"
    >
      <VStack align="stretch" spacing={0}>
        <Button 
          variant="ghost" 
          justifyContent="flex-start" 
          leftIcon={<AddIcon color="blue.500" />}
          onClick={() => { 
            onCreateClick(lat, lng); 
            onClose(); 
          }}
          size="sm"
          borderRadius={0}
        >
          Tạo hoạt động tại đây
        </Button>
        
        <Divider my={1} />
        
        <Button 
          variant="ghost" 
          justifyContent="flex-start" 
          leftIcon={<CopyIcon />}
          size="sm"
          borderRadius={0}
          isDisabled // Tính năng làm sau
        >
          Sao chép tọa độ
        </Button>

         <Button 
          variant="ghost" 
          justifyContent="flex-start" 
          leftIcon={<InfoIcon />}
          size="sm"
          borderRadius={0}
          isDisabled // Tính năng làm sau
        >
          Xem thông tin khu vực
        </Button>
      </VStack>
    </Box>
  );
};

export default MapContextMenu;