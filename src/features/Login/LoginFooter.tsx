import React from 'react';
import styled from '@emotion/styled';
import { Flex } from '@chakra-ui/react';
import theme from '@/theme/colors';

interface Props {
  version?: string;
  phone?: string;
}

const LoginFooter = (props: Props) => {
  return (
    <Container>
      <Flex gap="2px" marginBottom="4px">
        <Title>앱 버전 </Title>
        <Text>{props?.version}</Text>
      </Flex>
      <Flex gap="2px">
        <Title>유지관리 사업단 </Title>
        <a href={`tel:${props.phone}`}>
          <Text>{props.phone}</Text>
        </a>
      </Flex>
      <Link href="">오픈소스 라이선스 안내</Link>
    </Container>
  );
};

LoginFooter.defaultProps = {
  version: '1.0.0',
  phone: '055-211-3007',
};
export default LoginFooter;

const Container = styled.div`
  padding: 24px 0;
  margin-top: auto;
`;

const Title = styled.div`
  color: ${theme.colors.gray};
  font-family: 'Pretendard Medium';
  font-size: 12px;
  font-style: normal;
  line-height: 14px;
  letter-spacing: -0.24px;
`;

const Text = styled.div`
  color: ${theme.colors.gray};
  font-size: 12px;
  font-style: normal;
  line-height: 14px;
  letter-spacing: -0.24px;
  font-family: 'Pretendard Bold';
`;

const Link = styled.a`
  display: block;
  margin-top: 12px;
  color: ${theme.colors.blue};
  font-family: 'Pretendard SemiBold';
  font-size: 12px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.24px;
  text-decoration-line: underline;
`;
