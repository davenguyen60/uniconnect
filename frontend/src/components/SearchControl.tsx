import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
// Đổi provider từ OSM sang LocationIQ
import { GeoSearchControl, LocationIQProvider } from 'leaflet-geosearch'; 
import 'leaflet-geosearch/dist/geosearch.css';

const SearchControl = () => {
  const map = useMap();

  useEffect(() => {
    // Dùng LocationIQ thay vì OpenStreetMapProvider
    // Thay 'YOUR_API_KEY_HERE' bằng key bạn vừa lấy
    const provider = new LocationIQProvider({
      params: {
        key: 'YOUR_API_KEY_HERE', 
        countrycodes: 'vn', // Chỉ tìm ở Việt Nam cho nhanh và chuẩn
      },
    });

    // @ts-expect-error: Ignore type checking for external lib
    const searchControl = new GeoSearchControl({
      provider: provider,
      style: 'bar',
      showMarker: true,
      searchLabel: 'Tìm địa điểm (Nhanh hơn)...',
    });

    map.addControl(searchControl);

    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  return null;
};

export default SearchControl;