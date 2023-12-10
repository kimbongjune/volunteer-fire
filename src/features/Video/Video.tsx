import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import { VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import axios from '@/common/components/api/axios';

const Video = () => {
  const disasterNumber = useSelector((state: RootState) => state.disaster.disasterNumber);

  const userInfo = useSelector((state: RootState) => state.userReducer.userInformation);

  useEffect(() =>{
    const sendClickStream = async () =>{
      if(userInfo){
        const clickStreamResponse = await axios.post("/api/menu_log/enter",{
          menuId : "2130",
          userId : userInfo.appUserId
        })
        console.log(clickStreamResponse.data)
      }
    }
    sendClickStream()
  }, [userInfo])
  return (
    <VStack gap="8px" height="100%" overflowY="auto">
      <iframe allow='camera; microphone' src={`https://info.gnfire.go.kr/ERSS_P/video2.do?dsr_seq=${disasterNumber}`} width="100%" height="100%"></iframe>
    </VStack>
  );
};

export default Video;

const CameraSection = styled.div`
  width: 100%;
  height: 383px;
`;

const VideoSection = styled.div`
  width: 100%;
  height: 383px;
`;
