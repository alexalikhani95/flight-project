'use client';

import Map from '@/app/components/map';

type Props = {
  params: {
    slug: string;
  };
};

const MapPage = ({ params }: Props) => {
  const urlString = params.slug;

  const decodedUrlString = decodeURIComponent(urlString);

  const [latitudeStr, longitudeStr] = decodedUrlString.split('&');

  const latitude = parseFloat(latitudeStr.split('=')[1]);
  const longitude = parseFloat(longitudeStr.split('=')[1]);

  return (
    <div>
      <Map latitude={latitude} longitude={longitude} flight={true} />
    </div>
  );
};

export default MapPage;
