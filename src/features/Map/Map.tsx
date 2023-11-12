import React from 'react';
import dynamic from 'next/dynamic';
const KakaoMap = dynamic(() => import('./KakaoMap'), { ssr: false });

interface Props {
  isClickVehicle: boolean;
  isClickWate: boolean;
}

const Map = (props: Props) => {
  return <KakaoMap latitude={37.516633} longitude={127.077374} isClickVehicle={props.isClickVehicle} isClickWate={props.isClickWate} />;
};

export default Map;
