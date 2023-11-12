import React from 'react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import ModalLayout from './ModalLayout';
import { Flex } from '@chakra-ui/react';
import Image from 'next/image';
import Button from '../Button/Button';
import axios from "../api/axios"

interface Props {
  icon: string;
  title: string;
  text: string;
  onClickButton: () => void; 
}

const RequestModal = (props: Props) => {

  const handleButtonClick = async () => {
    props.onClickButton()
    console.log("clickResponse")
    // 서버에 동원 요청 확인 플래그를 전송
    try {
      // API를 호출하여 서버에 플래그 전송 (실제 사용할 API 경로로 교체 필요)
      //await axios.get("/api/mobilize-response");
      console.log("동원 요청 확인 플래그가 서버에 전송되었습니다.");
    } catch (error) {
      console.error("동원 요청 확인 플래그 전송에 실패했습니다: ", error);
    }
  };

  return (
    <ModalLayout icon="/images/icons/bell.png" title="동원 요청 알림">
      <Content>
        <Flex gap="8px" width="100%" alignItems="center">
          <Image width={24} height={24} src={props.icon} alt="icon" />
          <div>
            <Title>{props.title}</Title>
            <Text>{props.text}</Text>
          </div>
        </Flex>
      </Content>
      <Button height="56px" padding="16px" borderRadius="8px" backgroundColor={theme.colors.orange} onClick={handleButtonClick}>
        <ButtonText>확인</ButtonText>
      </Button>
    </ModalLayout>
  );
};

RequestModal.defaultProps = {
  icon: '/images/icons/fire.png',
  title: '공장화재',
  text: '신규 동원 요청이 발생했습니다',
};
export default RequestModal;

const Title = styled.div`
  color: ${theme.colors[7]};
  font-family: 'Pretendard Bold';
  font-size: 18px;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: -0.36px;
  margin-bottom: 2px;
`;

const Text = styled.div`
  color: ${theme.colors[6]};
  font-family: 'Pretendard Medium';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.32px;
`;

const Content = styled.div`
  width: 100%;
  border-radius: 8px;
  background-color: ${theme.colors[1]};
  padding: 12px 16px;
  margin-bottom: 16px;
`;

const ButtonText = styled.div`
  color: ${theme.colors.white};
  font-family: 'Pretendard Bold';
  font-size: 18px;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: -0.36px;
  text-align: center;
`;
