import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface Props {
  latitude?: number; //위도
  longitude?: number; //경도
  isClickVehicle: boolean;
  isClickWate: boolean;
}

const KakaoMap = (props: Props) => {
  const { latitude, longitude, isClickVehicle, isClickWate } = props;
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>();
  const vehicleMarkers = useRef<any[]>([]);
  const waterMarkers = useRef<any[]>([]);

  function changeImage(src: string) {
    let imgSrc = src;
    // 소방용수
    if (src === '지상') return (imgSrc = '/images/icons/groundWater.svg');
    if (src === '지하') return (imgSrc = '/images/icons/underGroundWater.svg');
    if (src === '비상') return (imgSrc = '/images/icons/emergency.svg');
    // 차량
    if (src === '펌프') return (imgSrc = '/images/icons/pumpVehicle.svg');
    if (src === '탱크') return (imgSrc = '/images/icons/tankVehicle.svg');
    if (src === '화학') return (imgSrc = '/images/icons/chemistryVehicle.svg');
    if (src === '기타') return (imgSrc = '/images/icons/etcVehicle.svg');
    if (src === '구조') return (imgSrc = '/images/icons/rescueVehicle.svg');
    if (src === '구급') return (imgSrc = '/images/icons/firstAidVehicle.svg');
    return imgSrc;
  }

  function createMarkerImage(src: any, size: any, options: any) {
    let imgSrc = changeImage(src);
    var markerImage = new window.kakao.maps.MarkerImage(imgSrc, size, options);
    return markerImage;
  }

  // 좌표와 마커이미지를 받아 마커를 생성하여 리턴하는 함수입니다
  function createMarker(position: any, image: any) {
    var marker = new window.kakao.maps.Marker({
      position: position,
      image: image,
    });

    return marker;
  }

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_API_KEY}&libraries=services,clusterer,drawing&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 3,
        };
        const map = new window.kakao.maps.Map(mapContainer.current, options);
        mapInstance.current = map; // 지도 인스턴스 저장
        let markerPosition = new window.kakao.maps.LatLng(props.latitude, props.longitude);
        let markerSize = new window.kakao.maps.Size(191, 191); // 마커이미지의 크기입니다
        let markerOption = { offset: new window.kakao.maps.Point(191 / 2, 191 / 2) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        let marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: createMarkerImage('/images/icons/makerImage.svg', markerSize, markerOption),
        });
        marker.setMap(mapInstance.current);
        // 마커 초기화
        initializeMarkers();
      });
    };

    return () => {
      script.remove(); // 컴포넌트 언마운트 시 스크립트 제거
    };
  }, []);

  // 마커 초기화 함수
  const initializeMarkers = () => {

    let vehiclePositions = [
      {
        location: new window.kakao.maps.LatLng(37.518195, 127.071881),
        type: '탱크',
      },
    ];
    
    // 소방 용수마커가 표시될 좌표 배열
    let waterPositions = [
      {
        location: new window.kakao.maps.LatLng(37.516386, 127.079452),
        type: '지상',
      },
      {
        location: new window.kakao.maps.LatLng(37.515658, 127.077578),
        type: '지하',
      },
    ];

    function createWatersMarkers() {
      for (var i = 0; i < waterPositions.length; i++) {
        var imageSize = new window.kakao.maps.Size(48, 48);

        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(waterPositions[i].type, imageSize, null),
          marker = createMarker(waterPositions[i].location, markerImage);

        // 생성된 마커를 편의점 마커 배열에 추가합니다
        waterMarkers.current.push(marker);
      }
    }

    function createVehicleMarkers() {
      for (var i = 0; i < vehiclePositions.length; i++) {
        var imageSize = new window.kakao.maps.Size(48, 48);

        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(vehiclePositions[i].type, imageSize, null),
          marker = createMarker(vehiclePositions[i].location, markerImage);

        // 생성된 마커를 편의점 마커 배열에 추가합니다
        vehicleMarkers.current.push(marker);
      }
    }

    createWatersMarkers()
    createVehicleMarkers()
  
    // 마커를 지도에 표시하거나 제거하는 기능
    toggleMarkers();
  };

  // 마커 표시 상태를 업데이트하는 함수
  const toggleMarkers = () => {
    vehicleMarkers.current.forEach((marker) => {
      marker.setMap(isClickVehicle ? mapInstance.current : null);
    });
    waterMarkers.current.forEach((marker) => {
      marker.setMap(isClickWate ? mapInstance.current : null);
    });
  };

  // isClickVehicle 또는 isClickWate 상태가 변경될 때마다 마커를 업데이트합니다.
  useEffect(() => {
    if (mapInstance.current) {
      toggleMarkers();
    }
  }, [isClickVehicle, isClickWate]);

  return <MapContainer ref={mapContainer} />;
};

KakaoMap.defaultProps = {
  latitude: 33.450701,
  longitude: 126.570667,
};
export default KakaoMap;

const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
`;
