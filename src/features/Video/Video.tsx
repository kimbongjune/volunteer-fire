import React from 'react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import { VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

const Video = () => {
  const disasterNumber = useSelector((state: RootState) => state.disaster.disasterNumber);
  return (
    <VStack gap="8px" height="100%" overflowY="auto">
      <iframe allow='camera; microphone' src={`https://info.gnfire.go.kr/ERSS_P_T/video2.do?dsr_seq=${disasterNumber}`} width="100%" height="100%"></iframe>
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
