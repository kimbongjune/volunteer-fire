import React, { useState } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import { Flex } from '@chakra-ui/react';
import IconWrapper from '@/common/components/IconWrapper/IconWrapper';
import Layout from '@/common/components/Layout/Layout';
import MobilizationStatusItem from './MobilizationStatusItem';
import Close from '../../../public/images/icons/close.svg';
import Distance from '../../../public/images/icons/distance.svg';
import Room from '../../../public/images/icons/room.svg';
import Warning from '../../../public/images/icons/warning.svg';
import { useDispatch } from 'react-redux';
import { setDisasterAccptFlag } from '../../features/slice/disasterSlice';
import axios from "../../common/components/api/axios"
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState, persistor } from '@/app/store';
import { apiPostResponse } from '../types/types';

const MobilizationStatus = () => {
  const dispatch = useDispatch()
  const router = useRouter(); 

  const disasterNumber = useSelector((state: RootState) => state.disaster.disasterNumber);
  const userInfo = useSelector((state: RootState) => state.userReducer.userInformation);

  console.log(userInfo)

  const arrivalClick = async () => {
    //현장 도착 API 발송
    const approveResponse = await axios.post<apiPostResponse>("/api/mobilize/site",{
      dsrSeq : disasterNumber,
      flag : "Y",
      userId : userInfo?.appUserId
    })
    // if (window.fireAgency && window.fireAgency.stopLocationService) {
    //   window.fireAgency.stopLocationService();
    // }

    console.log(approveResponse.data)
  }

  const withdrawalClick = async () => {
    //현장 철수 API 발송
    const approveResponse = await axios.post<apiPostResponse>("/api/mobilize/site",{
      dsrSeq : disasterNumber,
      flag : "N",
      userId : userInfo?.appUserId
    })
    // if (window.fireAgency && window.fireAgency.stopLocationService) {
    //   window.fireAgency.stopLocationService();
    // }

    console.log(approveResponse.data)
  }

  const cancelMobilization = async () => {
    //동원 취소 API 발송
    console.log("동원 취소");
    persistor.purge();
    const approveResponse = await axios.post<apiPostResponse>("/api/mobilize/mob",{
      dsrSeq : disasterNumber,
      flag : "N",
      userId : userInfo?.appUserId
    })
    if(approveResponse.data.responseCode === 200){
      dispatch(setDisasterAccptFlag(false))
      router.replace('/home?menu=mobilization');
      if (window.fireAgency && window.fireAgency.stopLocationService) {
        window.fireAgency.stopLocationService();
      }
    }
    
  }

  return (
    <Layout>
      <Container>
        <Header>
          <div>
            <Flex alignItems="center">
              <Text>동원 승인 상태</Text>
            </Flex>
            <SubText>아래 버튼을 눌러주세요</SubText>
          </div>
          <Link href={'/home?menu=mobilization'} style={{ position: 'absolute', top: '26px', right: '16px' }}>
            <IconWrapper width="24px" height="24px" color={theme.colors[7]}>
              <Close />
            </IconWrapper>
          </Link>
        </Header>
        <Body>
          <MobilizationStatusItem color={theme.colors.orange} icon={<Distance />} marginBottom="16px" statusText="현장 도착" onClick={arrivalClick} />
          <MobilizationStatusItem color={theme.colors.blue} icon={<Room />} marginBottom="136px" statusText="현장 철수" onClick={withdrawalClick} />
          <MobilizationStatusItem color={theme.colors[7]} icon={<Warning />} statusText="동원 취소" onClick={cancelMobilization} />
        </Body>
      </Container>
    </Layout>
  );
};

export default MobilizationStatus;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  background-color: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors[2]};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 14px 0 10px;
`;

const Text = styled.div`
  color: ${theme.colors[10]};
  font-family: 'Pretendard Bold';
  font-size: 20px;
  font-style: normal;
  font-weight: normal;
  line-height: 28px;
  letter-spacing: -0.4px;
  margin: 0 auto;
`;

const SubText = styled.div`
  color: ${theme.colors[5]};
  font-family: 'Pretendard SemiBold';
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  line-height: 20px;
  letter-spacing: -0.32px;
  text-align: center;
`;

const Body = styled.div`
  height: 100%;
  padding: 16px;
  overflow-y: auto;
  flex: 1;
`;
