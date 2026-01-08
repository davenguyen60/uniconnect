import React, { useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, FormControl, FormLabel, Input, Textarea, VStack, useToast, FormHelperText
} from '@chakra-ui/react';
import { activityApi } from '../api/activityApi';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  coordinates: { lat: number; lng: number } | null;
  onSuccess: () => void; // Hàm callback để báo cho Map biết là tạo xong rồi
}

const CreateActivityModal: React.FC<Props> = ({ isOpen, onClose, coordinates, onSuccess }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    if (!coordinates) return;
    
    // Validate cơ bản
    if (!name || !startTime) {
      toast({ status: 'warning', title: 'Thiếu thông tin', description: 'Vui lòng nhập tên và thời gian.' });
      return;
    }

    setIsLoading(true);
    try {
      await activityApi.create({
        name,
        description,
        start_time: new Date(startTime).toISOString(), // Chuyển sang chuẩn ISO
        lat: coordinates.lat,
        lng: coordinates.lng,
      });

      toast({ status: 'success', title: 'Tạo thành công!', description: 'Hoạt động đã được ghim lên bản đồ.' });
      
      // Reset form
      setName('');
      setDescription('');
      setStartTime('');
      
      onSuccess(); // Báo cho cha biết để reload map
      onClose();   // Đóng modal

    } catch (error) {
      console.error(error);
      toast({ status: 'error', title: 'Lỗi', description: 'Không thể tạo hoạt động lúc này.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tạo hoạt động mới ⚽️</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Tên hoạt động</FormLabel>
              <Input 
                placeholder="VD: Học nhóm Giải tích 2, Đá bóng 7v7, Đi dạo cuối tuần..." 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                autoFocus
              />
            </FormControl>

            <FormControl>
              <FormLabel>Thời gian bắt đầu</FormLabel>
              <Input 
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Mô tả chi tiết</FormLabel>
              <Textarea 
                placeholder="VD: Luyện đề, mục tiêu A+, nhóm hiện có 3 K25" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <FormControl isDisabled>
              <FormLabel>Vị trí ghim</FormLabel>
              <Input value={`${coordinates?.lat.toFixed(4)}, ${coordinates?.lng.toFixed(4)}`} size="sm" />
              <FormHelperText>Tọa độ lấy từ điểm bạn click trên bản đồ.</FormHelperText>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>Hủy</Button>
          <Button colorScheme="blue" onClick={handleSubmit} isLoading={isLoading}>
            Tạo ngay
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateActivityModal;