import React from 'react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import { Flex, VStack } from '@chakra-ui/react';
import IconWrapper from '@/common/components/IconWrapper/IconWrapper';
import Refresh from '../../../public/images/icons/refresh.svg';
import Button from '@/common/components/Button/Button';

interface Props {
  token: string;
  newToken: string;
}

const ModifyToken = (props: Props) => {
  return (
    <VStack gap="8px" h="100%">
      <TokenBox>
        <Flex justifyContent="space-between" alignItems="center">
          <Title>등록된 토큰</Title>
          <Token>{props.token}</Token>
        </Flex>
        <TokenButton>
          <Flex gap="8px" justifyContent="center" alignItems="center">
            <IconWrapper width="20px" height="20px" color={theme.colors.white}>
              <Refresh />
            </IconWrapper>
            새로 생성하기
          </Flex>
        </TokenButton>
      </TokenBox>

      <TokenBox>
        <Flex justifyContent="space-between" alignItems="center">
          <Title>새로 생성된 토큰</Title>
          {props.newToken && <NewToken>{props.newToken}</NewToken>}
          {!props.newToken && <NewToken>-</NewToken>}
        </Flex>
      </TokenBox>

      <Button backgroundColor={theme.colors.orange} height="56px" padding="16px" margin="auto 0 0">
        <ButtonText>등록 신청하기</ButtonText>
      </Button>
    </VStack>
  );
};

ModifyToken.defaultProps = {
  token: 'qiuwi-09423-qweiu-vjxck',
  newToken: 'zxciv-30948-kjdjv-jfnbc',
};
export default ModifyToken;

const TokenBox = styled.div`
  width: 100%;
  background-color: ${theme.colors.white};
  border-radius: 8px;
  border: 1px solid ${theme.colors[2]};
  padding: 16px;
`;

const Title = styled.div`
  color: ${theme.colors[7]};
  font-family: 'Pretendard Bold';
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: -0.32px;
`;

const Token = styled.div`
  color: ${theme.colors.gray};
  font-family: 'Pretendard SemiBold';
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: -0.32px;
`;

const TokenButton = styled.button`
  width: 100%;
  border-radius: 4px;
  background-color: ${theme.colors[3]};
  padding: 8px 16px;
  color: ${theme.colors.white};
  font-family: 'Pretendard Bold';
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: -0.32px;
  margin-top: 16px;
`;

const NewToken = styled.div`
  color: ${theme.colors.blue};
  font-family: 'Pretendard SemiBold';
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: -0.32px;
`;

const ButtonText = styled.span`
  color: ${theme.colors.white};
  font-family: 'Pretendard Bold';
  font-size: 18px;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: -0.36px;
`;
