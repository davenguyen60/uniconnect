import React, { useState } from 'react';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import SearchControl from '../components/SearchControl'; // Import component vừa tạo
import L, { type LatLngExpression } from 'leaflet';
import MapContextMenu from '../components/MapContextMenu';
import MapClickHandler from '../components/MapClickHandler';
import CreateActivityModal from '../components/CreateActivityModal';
import { DEFAULT_POSITION, MAP_SETTINGS } from '../constants/app.constants'; // Import hằng số

import Sidebar from '../components/Sidebar';
import MapUpdater from '../components/MapUpdater';

import { useMapInteraction } from '../hooks/useMapInteraction';
import { ACTIVE_TILE_LAYER } from '../constants/map.constants';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const HomePage: React.FC = () => {
  const [tempCoords, setTempCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<LatLngExpression | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Hàm này được gọi khi click vào item bên Sidebar

  const handleMapRightClick = (lat: number, lng: number) => {
    setTempCoords({ lat, lng }); // 1. Lưu tọa độ
    onOpen(); // 2. Mở Modal
  };

  const { 
    menuPosition, 
    isModalOpen, 
    selectedLocation,
    handleContextMenu, 
    handleOpenCreateModal,
    closeMenu,
    closeModal 
  } = useMapInteraction();

  const handleCreateSuccess = () => {
     console.log("Reload activities list...");
  };

  const handleSelectPlace = () => {}; // later use

  return (
    <Flex w="100vw" h="100vh" overflow="hidden">
      {/* Left sidebar */}
      <Sidebar onSelectPlace={handleSelectPlace} />

      {/* Map */}
      <Box flex={1} position="relative">
        <MapContainer 
          center={DEFAULT_POSITION} 
          zoom={MAP_SETTINGS.DEFAULT_ZOOM} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            attribution={ACTIVE_TILE_LAYER.attribution}
            url={ACTIVE_TILE_LAYER.url}
          />

          <MapUpdater center={selectedPosition} />

          <MapClickHandler onContextMenu={handleContextMenu} />
        </MapContainer>

        <MapContextMenu 
          x={menuPosition?.x || 0}
          y={menuPosition?.y || 0}
          lat={menuPosition?.lat || 0}
          lng={menuPosition?.lng || 0}
          visible={!!menuPosition}
          onClose={closeMenu}
          onCreateClick={handleOpenCreateModal}
        />
        
        <CreateActivityModal 
          isOpen={isOpen} 
          onClose={onClose} 
          coordinates={tempCoords}
          onSuccess={handleCreateSuccess}
        />
      </Box>
    </Flex>
  );
};

export default HomePage;