import React, { useState } from 'react';
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

const MapPage = () => {
  const [isClickVehicle, setIsClickVehicle] = useState(false);
  const [isClickWater, setIsClickWater] = useState(false);

  return (
    <>
      <Container>
        <MapNav />

        <Flex justifyContent="space-between">
          <ButtonContainer>
            <Button backgroundColor={theme.colors.orange} height="48px" padding="12px 16px" borderRadius="8px" onClick={() => setIsClickVehicle(!isClickVehicle)}>
              <Flex gap="8px">
                <IconWrapper width="24px" height="24px" color={theme.colors.white}>
                  <FireTruck />
                </IconWrapper>
                <ButtonText>출동차량</ButtonText>
              </Flex>
            </Button>
          </ButtonContainer>
          <ButtonContainer>
            <Button backgroundColor={theme.colors.blue} height="48px" padding="12px 16px" borderRadius="8px" onClick={() => setIsClickWater(!isClickWater)}>
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

      <Map isClickVehicle={isClickVehicle} isClickWate={isClickWater} />

      <NavbarWrapper>
        <Navbar />
      </NavbarWrapper>
    </>
  );
};

export default MapPage;

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
