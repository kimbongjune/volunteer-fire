import React from 'react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import { VStack } from '@chakra-ui/react';

const Video = () => {
  return (
    <VStack gap="8px" height="100%" overflowY="auto">
      <CameraSection>영상 1</CameraSection>
      <VideoSection>영상 2</VideoSection>
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
