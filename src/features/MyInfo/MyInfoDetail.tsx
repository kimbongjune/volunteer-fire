import React from 'react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface Props {
  tag?: string;
  name?: string;
  group?: string;
  phone?: string;
  address?: string;
  workAddress?: string;
  type:string
}

const MyInfoDetail = (props: Props) => {
  const router = useRouter();

  return (
    <Container onClick={() => router.push('/home/modifyInfo')}>
      <Flex justifyContent="space-between" marginBottom="16px">
        <Flex gap="8px" alignItems="center">
          <Tag>{props?.tag}</Tag>
          <Name>{props?.name}</Name>
        </Flex>
        <Group>{props?.group}</Group>
      </Flex>

      <DetailBox>
        <Flex gap="16px">
          <Title>전화번호</Title>
          <Text>{props?.phone}</Text>
        </Flex>
        <Flex gap="16px">
          <Title>실거주지</Title>
          <Text>{props?.address}</Text>
        </Flex>
        {props?.type == '3' && <Flex gap="16px">
          <Title>근무지</Title>
          <Text>{props?.workAddress}</Text>
        </Flex>}
      </DetailBox>
    </Container>
  );
};

MyInfoDetail.defaultProps = {
  tag: '부대장',
  name: '홍길동',
  group: '장유 남성의용소방대',
  phone: '010-1234-5678',
  address: '장유시 율하 도로명 123-456', //실거주지
  workAddress: '장유시 율하 도로명 123-456', // 근무지
};
export default MyInfoDetail;

const Container = styled.div`
  width: 100%;
  padding: 16px;
  background-color: ${theme.colors.white};
  border-radius: 8px;
  border: 1px solid ${theme.colors[2]};
`;

const Tag = styled.div`
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${theme.colors.blue};
  color: ${theme.colors.white};
  font-family: 'Pretendard Bold';
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  line-height: 16px;
  letter-spacing: -0.28px;
`;

const Name = styled.div`
  color: ${theme.colors[7]};
  font-family: 'Pretendard Bold';
  font-size: 20px;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: -0.4px;
`;

const Group = styled.div`
  color: ${theme.colors[3]};
  font-family: 'Pretendard Bold';
  font-size: 18px;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: -0.36px;
`;

const DetailBox = styled.div`
  padding: 16px;
  border-radius: 4px;
  background-color: ${theme.colors[1]};
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.div`
  color: ${theme.colors[3]};
  font-family: 'Pretendard Medium';
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  line-height: 20px;
  letter-spacing: -0.32px;
  min-width: 55px;
`;

const Text = styled.div`
  color: ${theme.colors[7]};
  font-family: 'Pretendard Bold';
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  line-height: 20px;
  letter-spacing: -0.32px;
`;
