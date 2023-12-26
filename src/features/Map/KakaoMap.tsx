import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import axios from "../../common/components/api/axios"
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { CarApiResponse, WarterApiResponse } from '../types/types';
import proj4 from 'proj4';
declare global {
  interface Window {
    kakao: any;
  }
}

interface Props {
  latitude: number; //위도
  longitude: number; //경도
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

const kndCdMappingTable = (kndCd:string):string =>{
  switch(kndCd){
    case "0040001" :return 'P00301'
    case "0040002" :return 'P00302'
    case "0040003" :return 'P00303'
    default : return 'P00304'
  }
}

const epsg5181: string = '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs';

const convertCoordinateSystem4326To5181 = (x:number, y:number):[number, number] => {
  return proj4('EPSG:4326', epsg5181, [x,y]);
}

const convertCoordinateSystem5181To4326 = (x:number, y:number):[number, number] => {
  return proj4(epsg5181, 'EPSG:4326', [x,y]);
}

const KakaoMap = (props: Props) => {
  const { latitude, longitude, isClickVehicle, isClickWate } = props;
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>();
  const vehicleMarkers = useRef<any[]>([]);
  const waterMarkers = useRef<any[]>([]);
  const userLocationMarker = useRef<any>(null);
  const apiIntervalRef = useRef<NodeJS.Timer | null>(null);

  const userLocationX = useSelector((state: RootState) => state.userReducer.userLocationX);
  const disasterNumber = useSelector((state: RootState) => state.disaster.disasterNumber);
  const disasterClsCd = useSelector((state: RootState) => state.disaster.dsrClsCd);
  const disasterKndCd = useSelector((state: RootState) => state.disaster.dsrKndCd);
  const disasterCoordinateX = useSelector((state: RootState) => state.disaster.disasterCoordinateX);
  const disasterCoordinateY = useSelector((state: RootState) => state.disaster.disasterCoordinateY);
  const userLocationY = useSelector((state: RootState) => state.userReducer.userLocationY);

  const [carMarkers, setCarMarkers] = useState<Markers[]>([])

  function changeImage(src: string) {
    let imgSrc = src;
    // 소방용수
    if (src.includes('지상')) return (imgSrc = '/images/icons/groundWater.svg');
    if (src.includes('지하')) return (imgSrc = '/images/icons/underGroundWater.svg');
    if (src.includes('비상')) return (imgSrc = '/images/icons/emergency.svg');
    // 차량
    if (src.includes('펌프')) return (imgSrc = '/images/icons/pumpVehicle.svg');
    if (src.includes('탱크')) return (imgSrc = '/images/icons/tankVehicle.svg');
    if (src.includes('화학')) return (imgSrc = '/images/icons/chemistryVehicle.svg');
    if (src.includes('기타')) return (imgSrc = '/images/icons/etcVehicle.svg');
    if (src.includes('구조')) return (imgSrc = '/images/icons/rescueVehicle.svg');
    if (src.includes('구급')) return (imgSrc = '/images/icons/firstAidVehicle.svg');
    if(!imgSrc.includes("images")){
      imgSrc = '/images/icons/flag.svg'
    }
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
    //TODO 지도 로딩 확인
    script.async = false;
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
        setUserLocationMarker()
        apiIntervalRef.current = setInterval(updateVehicleMarkers, 10000);

        // 마커 초기화
        //initializeMarkers();
        //toggleMarkers();
      });
    };

    return () => {
      script.remove(); // 컴포넌트 언마운트 시 스크립트 제거
      if(apiIntervalRef.current){
        clearInterval(apiIntervalRef.current)
      }
    };
  }, []);

  const setUserLocationMarker = () => {
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
      const markerImage = createMarkerImage('/images/icons/Ripple-3.1s-354px.gif', imageSize, imageOption);
      const marker = createMarker(position, markerImage);
  
      // 새로운 마커를 지도에 추가하고, 참조를 업데이트합니다.
      marker.setMap(mapInstance.current);
      userLocationMarker.current = marker;
      // 여기서 마커 생성 로직을 실행
    } else {
      console.log("사용자 위치가 유효하지 않습니다.");
    }
  }

  // useEffect(() => {
  //   console.log("Effect 실행됨", userLocationX, userLocationY, mapInstance.current);
  
  //   if (!window.kakao || !window.kakao.maps) {
  //     console.log("카카오 맵 객체가 없습니다.");
  //     return;
  //   }
  
  //   if (mapInstance.current) {
  //     console.log("지도 인스턴스 존재함", mapInstance.current);
  //   } else {
  //     console.log("지도 인스턴스가 준비되지 않았습니다.");
  //     return;
  //   }
  
  //   if (userLocationX && userLocationY) {
  //     console.log("?????")
  //     const position = new window.kakao.maps.LatLng(userLocationX, userLocationY);
  //     const imageSize = new window.kakao.maps.Size(24, 35); // 마커의 크기 설정
  //     const imageOption = { offset: new window.kakao.maps.Point(12, 35) }; // 마커의 옵션 설정
  //     const markerImage = createMarkerImage('/images/icons/flag.svg', imageSize, imageOption);
  //     const marker = createMarker(position, markerImage);
  
  //     // 새로운 마커를 지도에 추가하고, 참조를 업데이트합니다.
  //     marker.setMap(mapInstance.current);
  //     userLocationMarker.current = marker;
  //     // 여기서 마커 생성 로직을 실행
  //   } else {
  //     console.log("사용자 위치가 유효하지 않습니다.");
  //   }
  // }, [userLocationX, userLocationY]);

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
    console.log("fetchWaterSources")
    try {
      const coordinate = convertCoordinateSystem4326To5181(props.longitude, props.latitude)
      const result = await axios.get<WarterApiResponse>("/api/firewater/",{
        params : {
          dsrSeq : disasterNumber,
          dsrClsCd : disasterClsCd,
          dsrKndCd : kndCdMappingTable(disasterKndCd),
          gisX : coordinate[0],
          gisY : coordinate[1]
        }
      });
      console.log(result.data)
      if(result.data.responseCode == 200 && result.data.result && result.data.result.dataList.length > 0){
        const data = result.data;
        return data.result.dataList.map(item => ({
          location: new window.kakao.maps.LatLng(convertCoordinateSystem5181To4326(item.gis_x_5181, item.gis_y_5181)[1], convertCoordinateSystem5181To4326(item.gis_x_5181, item.gis_y_5181)[0]),
          type: item.form_cd_nm,
          id : item.hyd_id
        }));
      }else{
        return []
      }
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
      const result = await axios.get<CarApiResponse>("/api/dispatch/",{
        params : {
          dsrSeq : disasterNumber
        }
      });
      if(result.data.responseCode == 200 && result.data.result && result.data.result.length > 0){
        const data = result.data;
        return data.result.map(item => ({
          location: new window.kakao.maps.LatLng(parseFloat(item.trCarGisY), parseFloat(item.trCarGisX)),
          type: item.radioCallsing,
          id : item.carId
        }));
      }else{
        return []
      }
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