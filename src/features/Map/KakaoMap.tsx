import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import axios from "../../common/components/api/axios"
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
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

interface Location {
  lat: string;
  lon: string;
  type: string;
  id: string;
}

interface Markers {
  location:any;
  type: string;
  id: string;
}

let northwardShift = 0; 

const KakaoMap = (props: Props) => {
  const { latitude, longitude, isClickVehicle, isClickWate } = props;
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>();
  const vehicleMarkers = useRef<any[]>([]);
  const waterMarkers = useRef<any[]>([]);
  const userLocationMarker = useRef<any>(null);

  const userLocationX = useSelector((state: RootState) => state.userReducer.userLocationX);
  const userLocationY = useSelector((state: RootState) => state.userReducer.userLocationY);

  console.log("userLocationX", userLocationX)
  console.log("userLocationY", userLocationY)

  if (userLocationX && userLocationY) {
    console.log("?????")
    const position = new window.kakao.maps.LatLng(userLocationX, userLocationY);
    const imageSize = new window.kakao.maps.Size(24, 35); // 마커의 크기 설정
    const imageOption = { offset: new window.kakao.maps.Point(12, 35) }; // 마커의 옵션 설정
    const markerImage = createMarkerImage('/images/icons/flag.svg', imageSize, imageOption);
    const marker = createMarker(position, markerImage);

    marker.setMap(null)

    // 새로운 마커를 지도에 추가하고, 참조를 업데이트합니다.
    marker.setMap(mapInstance.current);
    userLocationMarker.current = marker;
    // 여기서 마커 생성 로직을 실행
  } else {
    console.log("사용자 위치가 유효하지 않습니다.");
  }

  const [carMarkers, setCarMarkers] = useState<Markers[]>([])

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

        let circle = new window.kakao.maps.Circle({
          center : markerPosition,  // 원의 중심좌표 입니다 
          radius: 200, // 미터 단위의 원의 반지름입니다 
          strokeWeight: 2, // 선의 두께입니다 
          strokeColor: '#DE9898', // 선의 색깔입니다
          strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle: 'solid', // 선의 스타일 입니다
          fillColor: '#DE9898', // 채우기 색깔입니다
          fillOpacity: 0.7  // 채우기 불투명도 입니다   
        }); 
        circle.setMap(mapInstance.current);

        const zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.BOTTOMLEFT);

        const mapTypeControl = new window.kakao.maps.MapTypeControl();
        map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.BOTTOMRIGHT);

        fetchWaterSources().then(waterSources => {
          waterSources.forEach(waterSource => {
            var imageSize = new window.kakao.maps.Size(48, 48);
            var markerImage = createMarkerImage(waterSource.type, imageSize, null),
            marker = createMarker(waterSource.location, markerImage);
            waterMarkers.current.push(marker);
            if (isClickWate) marker.setMap(mapInstance.current);
          });
        }).catch(error => {
          return;
        });

        if (window.fireAgency && window.fireAgency.getLastLocation) {
          const location = window.fireAgency.getLastLocation();
          console.log("location", location)
          if(location != ""){
            const [locationX, locationY] = location.split(" ")
            const position = new window.kakao.maps.LatLng(locationX, locationY);
            const imageSize = new window.kakao.maps.Size(100, 100); // 마커의 크기 설정
            const imageOption = { offset: new window.kakao.maps.Point(100/2, 100/2) }; // 마커의 옵션 설정
            const markerImage = createMarkerImage('/images/icons/Ripple-3.1s-354px.gif', imageSize, imageOption);
            const marker = createMarker(position, markerImage);

            marker.setMap(null)

            // 새로운 마커를 지도에 추가하고, 참조를 업데이트합니다.
            marker.setMap(mapInstance.current);
            userLocationMarker.current = marker;
          }
        }

        // 차량 위치 정보 갱신
        const updateVehicleMarkers = () => {
          fetchVehicleLocations().then(vehicleLocations => {
            vehicleMarkers.current.forEach(marker => marker.setMap(null));
            vehicleMarkers.current = []; // 마커 배열 초기화
            setCarMarkers(vehicleLocations)
          }).catch(error => {
            return;
          });
        };

        updateVehicleMarkers();
        const vehicleInterval = setInterval(updateVehicleMarkers, 10000);

        return () => clearInterval(vehicleInterval);
        // 마커 초기화
        //initializeMarkers();
        //toggleMarkers();
      });
    };

    return () => {
      script.remove(); // 컴포넌트 언마운트 시 스크립트 제거
    };
  }, []);

  useEffect(() => {
    console.log("Effect 실행됨", userLocationX, userLocationY, mapInstance.current);
  
    if (!window.kakao || !window.kakao.maps) {
      console.log("카카오 맵 객체가 없습니다.");
      return;
    }
  
    if (mapInstance.current) {
      console.log("지도 인스턴스 존재함", mapInstance.current);
    } else {
      console.log("지도 인스턴스가 준비되지 않았습니다.");
      return;
    }
  
    if (userLocationX && userLocationY) {
      console.log("?????")
      const position = new window.kakao.maps.LatLng(userLocationX, userLocationY);
      const imageSize = new window.kakao.maps.Size(24, 35); // 마커의 크기 설정
      const imageOption = { offset: new window.kakao.maps.Point(12, 35) }; // 마커의 옵션 설정
      const markerImage = createMarkerImage('/images/icons/flag.svg', imageSize, imageOption);
      const marker = createMarker(position, markerImage);
  
      // 새로운 마커를 지도에 추가하고, 참조를 업데이트합니다.
      marker.setMap(mapInstance.current);
      userLocationMarker.current = marker;
      // 여기서 마커 생성 로직을 실행
    } else {
      console.log("사용자 위치가 유효하지 않습니다.");
    }
  }, [userLocationX, userLocationY]);

  useEffect(() => {
    carMarkers.forEach(vehicle => {
      var imageSize = new window.kakao.maps.Size(48, 48);
      var markerImage = createMarkerImage(vehicle.type, imageSize, null),
      marker = createMarker(vehicle.location, markerImage);
      vehicleMarkers.current.push(marker);
      if (isClickVehicle) marker.setMap(mapInstance.current);
    });
  },[carMarkers, isClickVehicle])

  async function fetchWaterSources() {
    // 실제 API 호출 로직
    // 예시로는 가상의 데이터 반환
    try {
      const result = await axios.get<Location[]>("/ab3f21a4-6d88-4ae1-9c1d-c1b4dd1596ca");
      console.log(result.data)
      const data = result.data;
      return data.map(item => ({
        location: new window.kakao.maps.LatLng(parseFloat(item.lat), parseFloat(item.lon)),
        type: item.type,
        id : item.id
      }));
    } catch (error) {
      console.error(error)
      return []
    }
  }
  
  // 차량 위치 정보 API 호출 함수
  async function fetchVehicleLocations() {
    // 실제 API 호출 로직
    // 예시로는 가상의 데이터 반환
    try {
      const result = await axios.get<Location[]>("/c02f9a38-3a97-481c-bb6c-bd5d79179def");
      const data = result.data;
      northwardShift += 0.00009;
      return data.map(item => ({
        location: new window.kakao.maps.LatLng(parseFloat(item.lat) + northwardShift, parseFloat(item.lon)),
        type: item.type,
        id : item.id
      }));
    } catch (error) {
      return []
    }
  }

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
  height: calc(100vh - 81px);
`;