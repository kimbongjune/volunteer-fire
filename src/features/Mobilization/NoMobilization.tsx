import React from 'react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import { Flex, Tooltip, VStack } from '@chakra-ui/react';
import IconWrapper from '@/common/components/IconWrapper/IconWrapper';
import ChatError from '../../../public/images/icons/chatError.svg';
import Info from '../../../public/images/icons/info.svg';

const TooltipLabel = () => {
  return (
    <Flex gap="10px" alignItems="center">
      <IconWrapper width="16px" height="16px" color={theme.colors.white}>
        <Info />
      </IconWrapper>
      <TooltipText dangerouslySetInnerHTML={{ __html: '동원 요청이 없는 경우<br/>지도·사진·영상은 이용이 불가합니다' }} />
    </Flex>
  );
};

const NoMobilization = () => {
  return (
    <Container>
      <VStack gap="8px">
        <IconWrapper width="80px" height="80px" color="#DEE2E6">
          <ChatError />
        </IconWrapper>
        <Text>동원(소집) 요청이 없습니다</Text>
      </VStack>
      <Tooltip hasArrow label={<TooltipLabel />} isOpen placement="top-start" borderRadius="2px" padding="10px" bg={theme.colors[5]}>
        <TooltipButton />
      </Tooltip>
    </Container>
  );
};

export default NoMobilization;

const Container = styled.div`
  width: 100%;
  padding: 48px 24px;
  border-radius: 8px;
  border: 1px solid ${theme.colors[2]};
  background-color: ${theme.colors.white};
  min-height: 208px;
`;

const Text = styled.div`
  color: ${theme.colors[4]};
  font-family: 'Pretendard SemiBold';
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: -0.32px;
`;

const TooltipButton = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  bottom: 0px;
  right: 16px;
`;

const TooltipText = styled.div`
  color: ${theme.colors.white};
  font-family: 'Pretendard SemiBold';
  font-size: 12px;
  font-style: normal;
  font-weight: normal;
  line-height: 16px;
  letter-spacing: -0.24px;
`;
