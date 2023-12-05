import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import Navbar from '@/common/components/Navbar/Navbar';
import Map from '@/features/Map/Map';
import MapNav from '@/features/Map/MapNav';
import Button from '@/common/components/Button/Button';
import { Flex } from '@chakra-ui/react';
import IconWrapper from '@/common/components/IconWrapper/IconWrapper';
import FireTruck from '../../public/images/icons/fireTruck.svg';
import WaterDrop from '../../public/images/icons/waterDrop.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import Satellite from '../../public/images/icons/satellite.svg';
import { useDispatch } from 'react-redux';
import { setDisasterWaterMakrerShowFlag, setDisasterVehicleMarkerShowFlag } from '../features/slice/disasterSlice';

const MapPage = () => {

  const dispatch = useDispatch()

  const disasterWaterMakrerShowFlag =  useSelector((state: RootState) => state.disaster.disasterWaterMarkerShowFlag);
  const disasterVehicleMarkerShowFlag =  useSelector((state: RootState) => state.disaster.disasterVehicleMarkerShowFlag);
  const gpsStatusDbHzAverage = useSelector((state: RootState) => state.userReducer.gpsStatusDbHzAverage);

  const [isClickVehicle, setIsClickVehicle] = useState(disasterWaterMakrerShowFlag);
  const [isClickWater, setIsClickWater] = useState(disasterVehicleMarkerShowFlag);
  const [isReceivingGPS, setIsReceivingGPS] = useState(true);

  useEffect(() => {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@",gpsStatusDbHzAverage)
    if(gpsStatusDbHzAverage >= 30){
      setIsReceivingGPS(true);
    }else{
      setIsReceivingGPS(false);
    }
  }, [gpsStatusDbHzAverage]);

  dispatch(setDisasterWaterMakrerShowFlag(isClickWater))
  dispatch(setDisasterVehicleMarkerShowFlag(isClickVehicle))

  const disasterCoordinateX = useSelector((state: RootState) => state.disaster.disasterCoordinateX);
  const disasterCoordinateY = useSelector((state: RootState) => state.disaster.disasterCoordinateY);

  return (
    <>
      <Container>
        <MapNav />

        <Flex justifyContent="space-between">
          <ButtonContainer>
            <Button backgroundColor={!isClickVehicle ? theme.colors.gray: theme.colors.orange} height="48px" padding="12px 16px" borderRadius="8px" onClick={() => setIsClickVehicle(!isClickVehicle)}>
              <Flex gap="8px">
                <IconWrapper width="24px" height="24px" color={theme.colors.white}>
                  <FireTruck />
                </IconWrapper>
                <ButtonText>출동차량</ButtonText>
              </Flex>
            </Button>
          </ButtonContainer>
          <ButtonContainer>
            <Button backgroundColor={!isClickWater ? theme.colors.gray: theme.colors.orange} height="48px" padding="12px 16px" borderRadius="8px" onClick={() => setIsClickWater(!isClickWater)}>
              <Flex gap="8px">
                <IconWrapper width="24px" height="24px" color={theme.colors.white}>
                  <WaterDrop />
                </IconWrapper>
                <ButtonText>소방용수</ButtonText>
              </Flex>
            </Button>
          </ButtonContainer>
        </Flex>
      </Container>

      <Map isClickVehicle={isClickVehicle} isClickWate={isClickWater} coordinateX={disasterCoordinateX} coordinateY={disasterCoordinateY} />
      <GPSWrapper isActive={isReceivingGPS}>
        <IconWrapper width="24px" height="24px" color={theme.colors.white}>
          <Satellite />
        </IconWrapper>
      </GPSWrapper>
      <NavbarWrapper>
        <Navbar />
      </NavbarWrapper>
    </>
  );
};

export default MapPage;

const GPSWrapper = styled.div<{ isActive?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 16px;
  bottom: 97px;
  z-index: 1;
  padding: 16px;
  border-radius: 44px;
  background: ${theme.colors.orange};
  box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.25);
  ${({ isActive }) =>
    isActive &&
    `
    background: ${theme.colors.green};
  `}
`;

const Container = styled.div`
  position: fixed;
  top: 24px;
  left: 16px;
  right: 16px;
  z-index: 99;
`;

const NavbarWrapper = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0px;
  z-index: 99;
  width: 100%;
`;

const ButtonContainer = styled.div`
  max-width: 128px;
  margin-top: 16px;
`;

const ButtonText = styled.div`
  color: ${theme.colors.white};
  font-family: 'Pretendard Bold';
  font-size: 18px;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: -0.36px;
`;
