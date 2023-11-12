import React from 'react';
import theme from '@/theme/colors';
import styled from '@emotion/styled';
import Image from 'next/image';

const Loading = () => {
  return (
    <Container>
      <Image width={255} height={40} src="/images/logo/logo.png" alt="경상남도소방본부" style={{ margin: '0 auto 24px' }} />
      <Title>의용소방대·생명지킴이</Title>
      <MainTitle>
        <strong>활동지원</strong>서비스
      </MainTitle>
    </Container>
  );
};

export default Loading;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${theme.colors[8]};
  padding-top: 220px;
`;

const Title = styled.span`
  display: block;
  color: ${theme.colors.white};
  font-family: 'Pretendard SemiBold';
  font-size: 20px;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: -0.4px;
  text-align: center;
`;

const MainTitle = styled.span`
  display: block;
  color: ${theme.colors.white};
  font-family: 'Pretendard Bold';
  font-size: 32px;
  font-style: normal;
  font-weight: normal;
  line-height: 48px;
  letter-spacing: -0.64px;
  text-align: center;
  > strong {
    color: ${theme.colors.orange};
  }
`;
