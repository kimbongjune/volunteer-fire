import React from 'react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import { Flex } from '@chakra-ui/react';

export type CprItemType = {
  title: string;
  date: string;
  playTime: string;
  video: string;
  poster: string;
};

const CprBox = (props: CprItemType) => {
  return (
    <Container>
      <StyledVideo controls poster={props.poster}>
          <source src={props.video} type="video/mp4"/>
        </StyledVideo>
      <DescriptionSection>
        <Title>{props.title}</Title>
        <Flex justifyContent="space-between">
          <Date>{props.date}</Date>
          <PlayTime>{props.playTime}</PlayTime>
        </Flex>
      </DescriptionSection>
    </Container>
  );
};

export default CprBox;

const Container = styled.div`
  width: 100%;
  padding: 16px;
  background-color: ${theme.colors.white};
  border-radius: 8px;
  border: 1px solid ${theme.colors[2]};
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit:contain;
  border-radius: 4px;
`

const DescriptionSection = styled.div``;

const Title = styled.div`
  color: ${theme.colors[7]};
  font-family: 'Pretendard Bold';
  font-size: 20px;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: -0.4px;
  margin-bottom: 8px;
`;

const Date = styled.div`
  color: #909aa4;
  font-family: 'Pretendard Medium';
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  line-height: 20px;
  letter-spacing: -0.32px;
`;

const PlayTime = styled.div`
  color: #909aa4;
  font-family: 'Pretendard Medium';
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  line-height: 20px;
  letter-spacing: -0.32px;
`;
