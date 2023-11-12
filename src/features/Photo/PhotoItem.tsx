import React from 'react';
import theme from '@/theme/colors';
import styled from '@emotion/styled';
import Image from 'next/image';

export type PhotoItemTyep = {
  icon: string;
  text: string;
};

const PhotoItem = (props: PhotoItemTyep) => {
  return (
    <Container>
      <Image width={56} height={56} src={props.icon} alt={props.text} />
      <Text>{props.text}</Text>
    </Container>
  );
};

export default PhotoItem;

const Container = styled.button`
  padding: 24px 36px;
  border-radius: 8px;
  border: 1px solid ${theme.colors[2]};
  background-color: ${theme.colors.white};
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

const Text = styled.div`
  color: ${theme.colors[7]};
  font-family: 'Pretendard Bold';
  font-size: 28px;
  font-style: normal;
  font-weight: normal;
  line-height: 32px;
  letter-spacing: -0.56px;
`;
