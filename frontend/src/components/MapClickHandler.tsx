import { useMapEvents } from 'react-leaflet';

interface Props {
  onContextMenu: (e: any) => void;
}

const MapClickHandler: React.FC<Props> = ({ onContextMenu }) => {
  useMapEvents({
    contextmenu(e) {
      onContextMenu(e);
    },
  });

  return null; 
};

export default MapClickHandler;