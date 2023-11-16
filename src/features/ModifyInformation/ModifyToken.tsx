import React,{useState} from 'react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import { Flex, VStack } from '@chakra-ui/react';
import IconWrapper from '@/common/components/IconWrapper/IconWrapper';
import Refresh from '../../../public/images/icons/refresh.svg';
import Button from '@/common/components/Button/Button';
import { useRouter } from 'next/router';
import axios from "../../common/components/api/axios"
import { useDispatch } from 'react-redux';
import { saveToken } from '../../features/slice/UserinfoSlice';

const ModifyToken = () => {
  const router = useRouter()
  const query = router.query

  const dispatch = useDispatch()

  const [newToken, setNewToken] = useState("")
  const [token, setToken] = useState(query.param)

  const updateToken = async () => {
    try {
      //앱과 통신하여 새로운 토큰을 받아오고 state에 저장함
      if (window.fireAgency && window.fireAgency.requestUpdateFcmToken) {
        window.fireAgency.requestUpdateFcmToken();
      }
    } catch (error) {
      // 에러 처리
      console.error('Failed to fetch user info status:', error);
    }
  };

  window.updateToken = (token: string) => {
    setNewToken(token)
  };

  const updateUserInfo = async () => {
    try {
      //API 호출 로직
      console.log("유저정보 갱신 콜")
      //const response = await axios.get('/user-info');
      setToken(newToken)
      setNewToken("")
      dispatch(saveToken(newToken))
      router.replace({
        pathname: router.pathname, // 현재 페이지 경로
        query: { ...router.query, param: newToken }, // 나머지 쿼리 유지하며 'param'만 업데이트
      }, undefined, { shallow: true }); // 페이지 전환 없이 URL 업데이트
    } catch (error) {
      // 에러 처리
      console.error('Failed to fetch user info status:', error);
    }
  };

  return (
    <VStack gap="8px" h="100%">
      <TokenBox>
        <Flex justifyContent="space-between" alignItems="center">
          <Title>등록된 토큰</Title>
          <Token>{token}</Token>
        </Flex>
        <TokenButton onClick={updateToken}>
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
          {newToken&& <NewToken>{newToken}</NewToken>}
          {!newToken && <NewToken>-</NewToken>}
        </Flex>
      </TokenBox>

      <Button backgroundColor={theme.colors.orange} height="56px" padding="16px" margin="auto 0 0" onClick={updateUserInfo}>
        <ButtonText>등록 신청하기</ButtonText>
      </Button>
    </VStack>
  );
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
