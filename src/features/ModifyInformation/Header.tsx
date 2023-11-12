import React from 'react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';
import IconWrapper from '@/common/components/IconWrapper/IconWrapper';
import { Flex } from '@chakra-ui/react';
import Link from 'next/link';
import ArrowLeft from '../../../public/images/icons/arrow-left.svg';
import Close from '../../../public/images/icons/close.svg';

const Header = () => {
  const { query } = useRouter();

  return (
    <Container>
      {isEmpty(query.menu) && (
        <>
          <Link href="/home?menu=myInfo" style={{ position: 'absolute', top: '26px', left: '16px' }}>
            <IconWrapper width="24px" height="24px" color={theme.colors[7]}>
              <ArrowLeft />
            </IconWrapper>
          </Link>
          <Flex alignItems="center">
            <Text>내 정보 수정</Text>
          </Flex>
        </>
      )}
      {query.menu === 'phoneNumber' && (
        <Flex alignItems="center">
          <Text>전화번호 변경</Text>
        </Flex>
      )}
      {query.menu === 'address' && (
        <Flex alignItems="center">
          <Text>자택 주소 변경</Text>
        </Flex>
      )}
      {query.menu === 'workAddress' && (
        <Flex alignItems="center">
          <Text>직장 주소 변경</Text>
        </Flex>
      )}
      {query.menu === 'token' && (
        <div>
          <Flex alignItems="center">
            <Text>토큰 정보 변경</Text>
          </Flex>
          <SubText>알림이 오지 않을 때 변경하세요</SubText>
        </div>
      )}
      {!isEmpty(query.menu) && (
        // 토큰 정보 변경 페이지에서 창을 닫으면 홈 - 내정보 페이지로 이동, 그외의 경우에는 내 정보 수정 페이지를 보여준다
        <Link href={query.menu === 'token' ? '/home?menu=myInfo' : '/home/modifyInfo'} style={{ position: 'absolute', top: '26px', right: '16px' }}>
          <IconWrapper width="24px" height="24px" color={theme.colors[7]}>
            <Close />
          </IconWrapper>
        </Link>
      )}
    </Container>
  );
};

export default Header;

const Container = styled.div`
  width: 100%;
  height: 72px;
  background-color: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors[2]};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Text = styled.div`
  color: ${theme.colors[10]};
  font-family: 'Pretendard Bold';
  font-size: 20px;
  font-style: normal;
  font-weight: normal;
  line-height: 28px;
  letter-spacing: -0.4px;
  margin: 0 auto;
`;

const SubText = styled.div`
  color: ${theme.colors[5]};
  font-family: 'Pretendard SemiBold';
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  line-height: 20px;
  letter-spacing: -0.32px;
  text-align: center;
`;
