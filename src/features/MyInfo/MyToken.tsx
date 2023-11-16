import React from 'react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import { Flex } from '@chakra-ui/react';
import IconWrapper from '@/common/components/IconWrapper/IconWrapper';
import Copy from '../../../public/images/icons/copy.svg';
import { useRouter } from 'next/router';

interface Props {
  token?: string;
}

const MyToken = (props: Props) => {
  const router = useRouter();

  return (
    <Container onClick={() => router.push(`/home/modifyInfo?menu=token&param=${props.token}`)}>
      <Title>토큰 정보</Title>
      <Flex justifyContent="space-between" gap="31px">
        <SubTitle>등록된 토큰</SubTitle>
        <Flex gap="4px" alignItems="center" overflow="hidden">
          <Token>{props?.token}</Token>
          <IconWrapper width="16px" height="16px" color={theme.colors[3]}>
            <Copy />
          </IconWrapper>
        </Flex>
      </Flex>
    </Container>
  );
};

MyToken.defaultProps = {
  token: 'qiuwi-09423-qweiu-vjxck',
};
export default MyToken;

const Container = styled.div`
  width: 100%;
  padding: 16px;
  background-color: ${theme.colors.white};
  border-radius: 8px;
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
  margin-bottom: 16px;
`;

const SubTitle = styled.div`
  color: ${theme.colors[7]};
  font-family: 'Pretendard Bold';
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: -0.32px;
  flex-shrink: 0;
`;

const Token = styled.div`
  color: ${theme.colors[3]};
  font-family: 'Pretendard SemiBold';
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: -0.32px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex: 1;
`;