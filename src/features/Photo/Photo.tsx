import React from 'react';
import theme from '@/theme/colors';
import styled from '@emotion/styled';
import PhotoItem, { PhotoItemTyep } from './PhotoItem';
import { VStack } from '@chakra-ui/react';

interface Props {
  datas: PhotoItemTyep[];
}

const Photo = (props: Props) => {
  return (
    <Container>
      <VStack gap="8px">
        {props?.datas?.map((data, index) => {
          return <PhotoItem key={index} icon={data.icon} text={data.text} />;
        })}
      </VStack>
    </Container>
  );
};

Photo.defaultProps = {
  datas: [
    { icon: '/images/icons/camera.png', text: '사진찍기' },
    { icon: '/images/icons/videoCamera.png', text: '동영상 찍기' },
    { icon: '/images/icons/photoAlbum.png', text: '갤러리 첨부' },
  ],
};
export default Photo;

const Container = styled.div`
  height: 100%;
  padding: 16px;
  overflow-y: auto;
`;
