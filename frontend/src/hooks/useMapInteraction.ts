import { useState, useCallback } from 'react';

interface MenuPosition {
  x: number;
  y: number;
  lat: number;
  lng: number;
}

export const useMapInteraction = () => {
  const [menuPosition, setMenuPosition] = useState<MenuPosition | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number} | null>(null);

  const handleContextMenu = useCallback((event: any) => {
    const { originalEvent, latlng } = event;
    
    originalEvent.preventDefault();

    setMenuPosition({
      x: originalEvent.clientX,
      y: originalEvent.clientY,
      lat: latlng.lat,
      lng: latlng.lng
    });
  }, []);

  // Xử lý khi chọn "Tạo hoạt động" từ menu
  const handleOpenCreateModal = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
    setIsModalOpen(true);
  };

  const closeMenu = () => setMenuPosition(null);
  const closeModal = () => setIsModalOpen(false);

  return {
    menuPosition,
    isModalOpen,
    selectedLocation,
    handleContextMenu, // Gắn vào Map Events
    handleOpenCreateModal, // Gắn vào nút trong Menu
    closeMenu,
    closeModal
  };
};