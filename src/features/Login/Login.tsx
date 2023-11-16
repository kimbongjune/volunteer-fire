import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import Input from '@/common/components/Input/input';
import { Flex } from '@chakra-ui/react';
import Switch from 'react-switch';
import Button from '@/common/components/Button/Button';
import Info from '../../../public/images/icons/info.svg';
import IconWrapper from '@/common/components/IconWrapper/IconWrapper';
import LoginFooter from './LoginFooter';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from "../../common/components/api/axios"

const Login = () => {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [loginError, setLoginError] = useState('');

  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 폼 제출 기본 이벤트를 방지
    if (username === null || username ==="") {
      setLoginError('아이디를 입력해주세요.'); // 아이디 입력값이 없을 경우 오류 메시지
      usernameInputRef.current?.focus();
      return; // 입력값이 없으면 여기서 실행중단
    }

    if (password === null || password ==="") {
      setLoginError('비밀번호를 입력해주세요.'); // 비밀번호 입력값이 없을 경우 오류 메시지
      passwordInputRef.current?.focus();
      return; // 입력값이 없으면 여기서 실행중단
    }

    //TODO 모든 입력이 제대로 되었다면 서버에 로그인 요청 및 네이티브의 vpn 로그인 같이 진행
    try {
      // const response = await axios.post('/login', {
      //   username,
      //   password,
      // });
      //TODO 성공적으로 로그인되면 JWT 토큰을 앱의 roomdb에 저장
      if (window.fireAgency && window.fireAgency.saveUserData) {
        window.fireAgency.saveUserData(username, password, checked, "test_token");
      }
      router.replace('/home?menu=mobilization');
    } catch (error) {
      // 오류가 발생했을 경우 오류 메시지를 설정
      setLoginError('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
      return;
    }
  };

  return (
    <Container>
      <Image width={204} height={32} src="/images/logo/logo-black.png" alt="경상남도 소방본부" style={{ margin: '64px auto 0' }} />
      <Title>
        의용소방대·생명지킴이 <br />
        <strong>
          <span>활동지원</span>서비스
        </strong>
      </Title>
      <form onSubmit={handleLogin}>
        <Flex direction="column" gap="16px">
          <div>
            <FormTitle>아이디</FormTitle>
            <Input ref={usernameInputRef} fontSize="16px" lineHeight="20px" fontWeight={600} letterSpacing="-0.32px" color={theme.colors[5]} placeholder="이름생년월일" onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <div>
            <FormTitle>비밀번호</FormTitle>
            <Input ref={passwordInputRef} fontSize="16px" lineHeight="20px" fontWeight={600} letterSpacing="-0.32px" color={theme.colors[5]} placeholder="지정된 비밀번호" onChange={(e) => setPassword(e.target.value)}/>
          </div>
        </Flex>
        <Flex gap="8px" marginTop="16px" marginBottom="24px">
          <Switch onChange={e => setChecked(e)} checked={checked} onColor={theme.colors.blue} offColor={theme.colors[4]} width={34} height={18} handleDiameter={12} uncheckedIcon={false} checkedIcon={false} />
          <AutoLogin>자동 로그인</AutoLogin>
          {loginError && <FailLogin>{loginError}</FailLogin>}
        </Flex>
        <Button height="52px" padding="16px 10px" backgroundColor={theme.colors.orange}>
          {' '}
          <LogInText>로그인</LogInText>
        </Button>
      </form>
      <Flex gap="4px" marginTop="12px" justifyContent="center" alignItems="center">
        <IconWrapper width="16px" height="16px" color={theme.colors[6]}>
          <Info />
        </IconWrapper>
        <InfoText>인가된 사용자만 사용할 수 있습니다</InfoText>
      </Flex>
      <LoginFooter />
    </Container>
  );
};

export default Login;

const Container = styled.div`
  padding: 16px;
  background: ${theme.colors[1]};
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  color: ${theme.colors[8]};
  font-family: 'Pretendard SemiBold';
  font-size: 20px;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: -0.4px;
  width: fit-content;
  margin: 36px auto 32px;
  text-align: center;
  > strong {
    font-size: 28px;
    font-family: 'Pretendard Bold';
    font-style: normal;
    line-height: 32px;
    letter-spacing: -0.56px;
    > span {
      color: ${theme.colors.orange};
    }
  }
`;

const FormTitle = styled.div`
  font-size: 16px;
  font-family: 'Pretendard Bold';
  line-height: 24px;
  letter-spacing: -0.32px;
  color: ${theme.colors[6]};
  margin-bottom: 8px;
`;

const AutoLogin = styled.div`
  color: ${theme.colors[6]};
  font-family: 'Pretendard SemiBold';
  font-size: 14px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.28px;
`;

const FailLogin = styled.div`
  color: ${theme.colors.red};
  font-family: 'Pretendard SemiBold';
  font-size: 14px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.28px;
  margin-left: auto;
`;

const InfoText = styled.div`
  color: ${theme.colors[6]};
  font-family: 'Pretendard SemiBold';
  font-size: 12px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.24px;
`;

const LogInText = styled.div`
  color: ${theme.colors.white};
  font-family: 'Pretendard Bold';
  font-size: 18px;
  font-style: normal;
  font-weight: normal;
  line-height: 20px;
  letter-spacing: -0.36px;
`;
