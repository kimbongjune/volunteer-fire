import React from 'react';
import dynamic from 'next/dynamic';
const KakaoMap = dynamic(async () => await import('./KakaoMap'), { ssr: false });

interface Props {
  isClickVehicle: boolean;
  isClickWate: boolean;
  coordinateX:number;
  coordinateY:number;
}

const Map = (props: Props) => {
  return <KakaoMap latitude={props.coordinateX} longitude={props.coordinateY} isClickVehicle={props.isClickVehicle} isClickWate={props.isClickWate} />;
};

export default Map;
