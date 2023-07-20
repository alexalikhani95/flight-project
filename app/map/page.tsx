'use client';
import { useState } from 'react';
import Map from './map';

const MapPage = () => {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  return <Map latitude={latitude} longitude={longitude} />;
};

export default MapPage;
