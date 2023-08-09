import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import Plane from '../../images/plane.png';
import PlaneLarge from '../../images/plane-large.png';
import { useSearchParams } from 'next/navigation';

type Props = {
  mapType: 'flight' | 'airport';
};

const Map = ({ mapType }: Props) => {
  const searchParams = useSearchParams();

  const latitude = parseFloat(searchParams.get('latitude') || '0');

  const longitude = parseFloat(searchParams.get('longitude') || '0');

  const position: [number, number] = [latitude, longitude];

  const customMarkerIcon = new Icon({
    iconUrl: mapType === 'flight' ? Plane.src : '/leaflet/marker-icon.png',
    iconRetinaUrl:
      mapType === 'flight' ? PlaneLarge.src : '/leaflet/marker-icon-2x.png',
    shadowUrl: '/leaflet/marker-shadow.png',

    iconSize: mapType === 'flight' ? [75, 75] : [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
  });

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: '500px', width: '100%', marginBottom: 100 }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={customMarkerIcon}>
        <Popup>
          latitude {position[0]}, longitude {position[1]}.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
