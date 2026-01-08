import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { type LatLngExpression } from 'leaflet';

interface MapUpdaterProps {
  center: LatLngExpression | null; // Tọa độ cần bay tới
}

const MapUpdater: React.FC<MapUpdaterProps> = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      // Bay tới đó với hiệu ứng mượt mà
      map.flyTo(center, 16, {
        duration: 1.5, // Bay trong 1.5 giây
      });
    }
  }, [center, map]);

  return null; // Component này không vẽ gì cả, chỉ xử lý logic
};

export default MapUpdater;