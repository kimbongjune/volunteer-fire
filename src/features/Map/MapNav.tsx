import React from 'react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import { Flex } from '@chakra-ui/react';
import Button from '@/common/components/Button/Button';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const MapNav = () => {

  const disasterAddress = useSelector((state: RootState) => state.disaster.disasterAddress);
  const disasterCoordinateX = useSelector((state: RootState) => state.disaster.disasterCoordinateX);
  const disasterCoordinateY = useSelector((state: RootState) => state.disaster.disasterCoordinateY);

  const copyClipboard = () =>{
    if (window.fireAgency && window.fireAgency.copyClipboard) {
      window.fireAgency.copyClipboard(disasterAddress);
    }
  }

  const openThirdPartyMapApplication = (mapType:string) =>{
    if (window.fireAgency && window.fireAgency.openThirdPartyMapApplication) {
      console.log(disasterCoordinateX, disasterCoordinateY)
      if(mapType == 'onenavi'){
        window.fireAgency.openThirdPartyMapApplication(mapType, disasterCoordinateX.toString(), disasterCoordinateY.toString(), disasterAddress);
      }else{
        window.fireAgency.openThirdPartyMapApplication(mapType, disasterCoordinateY.toString(), disasterCoordinateX.toString(), disasterAddress);
      }
      
    }
  }

  return (
    <Container>
      <Flex gap="12px">
        <Image width={36} height={36} src="/images/icons/naverMap.png" alt="네이버지도앱" onClick={() => openThirdPartyMapApplication("naver")}/>
        <Image width={36} height={36} src="/images/icons/Tmap.png" alt="티맵" onClick={() => openThirdPartyMapApplication("tmap")}/>
        <Image width={36} height={36} src="/images/icons/kakaoMap.png" alt="카카오지도앱" onClick={() => openThirdPartyMapApplication("kakao")}/>
        <Image width={36} height={36} src="/images/icons/map.png" alt="지도앱" onClick={() => openThirdPartyMapApplication("onenavi")}/>
      </Flex>
      <ButtonWrapper onClick={copyClipboard}>
        <Button backgroundColor={theme.colors[6]} height="36px" padding="8px 16px" borderRadius="4px"  onClick={copyClipboard}>
          <ButtonText>주소복사</ButtonText>
        </Button>
      </ButtonWrapper>
    </Container>
  );
};

export default MapNav;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: 8px;
  background-color: ${theme.colors.white};
  backdrop-filter: blur(8px);
`;

const ButtonWrapper = styled.div`
  max-width: 107px;
`;

const ButtonText = styled.div`
  color: ${theme.colors.white};
  font-family: 'Pretendard Bold';
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  line-height: 20px;
  letter-spacing: -0.28px;
`;
