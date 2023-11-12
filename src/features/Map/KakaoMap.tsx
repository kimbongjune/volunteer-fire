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
  const apiKey = process.env.NEXT_PUBLIC_KAKAOMAP_API_KEY;
  const lastBounds = useRef(null);

  useEffect(() => {
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services,clusterer,drawing&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        var container = document.getElementById('map');
        var options = {
          center: new window.kakao.maps.LatLng(props.latitude, props.longitude), // 지도의 중심 좌표
          level: 3, // 지도의 확대 레벨
        };
        // 지도 생성
        var map = new window.kakao.maps.Map(container, options);

        // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
        var bounds = new window.kakao.maps.LatLngBounds();

        // 신고 위치
        let markerPosition = new window.kakao.maps.LatLng(props.latitude, props.longitude);
        let markerSize = new window.kakao.maps.Size(191, 191); // 마커이미지의 크기입니다
        let markerOption = { offset: new window.kakao.maps.Point(191 / 2, 191 / 2) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        let marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: createMarkerImage('/images/icons/makerImage.svg', markerSize, markerOption),
        });

        // 출동 차량마커가 표시될 좌표 배열
        let vehiclePositions = [
          {
            location: new window.kakao.maps.LatLng(37.518195, 127.071881),
            type: '펌프',
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

        // 출동차량 마커 객체를 가지고 있을 배열
        const vehicleMarkers: any = [];

        //소방용수 마커 객체를 가지고 있을 배열
        const waterMarkers: any = [];

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

        // 마커이미지의 주소와, 크기, 옵션으로 마커 이미지를 생성하여 리턴하는 함수입니다
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

        //  출동 차량 마커 생성
        function createVehicleMarkers() {
          for (var i = 0; i < vehiclePositions.length; i++) {
            var imageSize = new window.kakao.maps.Size(48, 48);

            // 마커이미지와 마커를 생성합니다
            var markerImage = createMarkerImage(vehiclePositions[i].type, imageSize, null),
              marker = createMarker(vehiclePositions[i].location, markerImage);

            // 생성된 마커를 편의점 마커 배열에 추가합니다
            vehicleMarkers.push(marker);
          }
        }

        const onChangeVehicleBounds = () => {
          let points = [];
          points = [markerPosition, ...vehiclePositions.map(position => position.location)];
          for (let i = 0; i < points.length; i++) {
            // LatLngBounds 객체에 좌표를 추가합니다
            bounds.extend(points[i]);
            map.setBounds(bounds);
          }
        };

        const onChangeWaterBounds = () => {
          let points = [];

          points = [markerPosition, ...waterPositions.map(position => position.location)];
          for (let i = 0; i < points.length; i++) {
            // LatLngBounds 객체에 좌표를 추가합니다
            bounds.extend(points[i]);
            map.setBounds(bounds);
          }
        };

        //출동차량 마커들의 지도 표시 여부 설정
        function setVehicleMarkers(props: any) {
          for (var i = 0; i < vehicleMarkers.length; i++) {
            vehicleMarkers[i].setMap(props);
          }
          if (props) {
            onChangeVehicleBounds();
            lastBounds.current = bounds;
          }
          if (lastBounds.current) {
            map.setBounds(lastBounds.current);
          }
        }

        // 소방용수 마커 생성
        function createWatersMarkers() {
          for (var i = 0; i < waterPositions.length; i++) {
            var imageSize = new window.kakao.maps.Size(48, 48);

            // 마커이미지와 마커를 생성합니다
            var markerImage = createMarkerImage(waterPositions[i].type, imageSize, null),
              marker = createMarker(waterPositions[i].location, markerImage);

            // 생성된 마커를 편의점 마커 배열에 추가합니다
            waterMarkers.push(marker);
          }
        }

        //소방용수 마커들의 지도 표시 여부 설정
        function setWaterMarkers(props: any) {
          for (var i = 0; i < waterMarkers.length; i++) {
            waterMarkers[i].setMap(props);
          }
          if (props) {
            onChangeWaterBounds();
            lastBounds.current = bounds;
          }
          if (lastBounds.current) {
            map.setBounds(lastBounds.current);
          }
        }

        marker.setMap(map);
        createVehicleMarkers(); // 출동차량 마커를 생성하고 주차장 마커 배열에 추가합니다
        createWatersMarkers(); // 소방용수 마커를 생성하고 주차장 마커 배열에 추가합니다

        if (props.isClickVehicle) setVehicleMarkers(map);
        if (!props.isClickVehicle) setVehicleMarkers(null);

        if (props.isClickWate) setWaterMarkers(map);
        if (!props.isClickWate) setWaterMarkers(null);

        // const points = [markerPosition, ...vehiclePositions, ...waterPositions];
        // for (let i = 0; i < points.length; i++) {
        //   // LatLngBounds 객체에 좌표를 추가합니다
        //   bounds.extend(points[i]);
        // }
        // // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
        // // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다
        // map.setBounds(bounds);
      });
    };
    kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
  }, [props.isClickVehicle, props.isClickWate, props.latitude, props.longitude]);

  return <MapContainer id="map" />;
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
