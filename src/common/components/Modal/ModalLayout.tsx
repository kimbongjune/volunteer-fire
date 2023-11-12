import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import Image from 'next/image';

interface Props {
  icon: string;
  title: string;
  children: ReactNode;
  onClick?: () => void;
}

const ModalLayout = (props: Props) => {
  return (
    <ModalWrapper>
      <Background onClick={props.onClick} />
      <Container>
        <Box>
          <Image width={48} height={48} alt="" src={props.icon} style={{ margin: '0 auto' }} />
          <Title>{props.title}</Title>
          <Content>{props.children}</Content>
        </Box>
      </Container>
    </ModalWrapper>
  );
};

export default ModalLayout;
const ModalWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

const Box = styled.div`
  padding: 32px 16px 16px;
  background-color: ${theme.colors.white};
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 343px;
  border-radius: 12px;
  border: 1px solid ${theme.colors[2]};
`;

const Title = styled.div`
  color: ${theme.colors[7]};
  font-family: 'Pretendard Bold';
  font-size: 20px;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: -0.4px;
  text-align: center;
  margin: 8px 0 16px;
`;

const Content = styled.div``;
