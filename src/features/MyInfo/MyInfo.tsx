import React from 'react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import MyInfoDetail from './MyInfoDetail';
import MyToken from './MyToken';
import { Flex } from '@chakra-ui/react';
import Button from '@/common/components/Button/Button';
import { useRouter } from 'next/router';

const MyInfo = () => {
  const router = useRouter();

  return (
    <Flex direction="column" gap="8px" w="100%" h="100%">
      <MyInfoDetail />
      <MyToken />
      <Button onClick={() => router.push('/logIn')} height="56px" backgroundColor={theme.colors[3]} padding="16px" margin="auto 0 0">
        <Text>로그아웃</Text>
      </Button>
    </Flex>
  );
};

export default MyInfo;

const Text = styled.div`
  color: ${theme.colors.white};
  font-family: 'Pretendard Bold';
  font-size: 18px;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: -0.36px;
`;
