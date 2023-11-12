import React from 'react';
import ModalLayout from './ModalLayout';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import Button from '../Button/Button';
import { Flex } from '@chakra-ui/react';

interface Props {
  text: string;
  isRejectedModalOpen: boolean;
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
  onClickCancelButton: () => void;
}

const RejectedModal = (props: Props) => {
  return (
    <>
      <Button onClick={() => props.onClick(true)} height="48px" backgroundColor={theme.colors[5]} padding="12px 16px" borderRadius="4px">
        <ButtonText>거절</ButtonText>
      </Button>
      {props.isRejectedModalOpen && (
        <ModalLayout icon="/images/icons/warning.png" title="거절" onClick={() => props.onClick(false)}>
          <Text dangerouslySetInnerHTML={{ __html: props.text }}></Text>
          <Flex gap="8px">
            <Button height="56px" padding="16px" borderRadius="8px" backgroundColor={theme.colors[5]} onClick={() => props.onClick(false)}>
              <ButtonText>취소</ButtonText>
            </Button>
            <Button height="56px" padding="16px" borderRadius="8px" backgroundColor={theme.colors.orange} onClick={props.onClickCancelButton}>
              <ButtonText>거절하기</ButtonText>
            </Button>
          </Flex>
        </ModalLayout>
      )}
    </>
  );
};

RejectedModal.defaultProps = {
  text: '신규 동원 요청을 거절하시겠습니까?<br/>거절하시면 동원요청 알림은 삭제됩니다',
};
export default RejectedModal;

const Text = styled.div`
  color: ${theme.colors[6]};
  font-family: 'Pretendard Medium';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.32px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  border-radius: 8px;
  background-color: ${theme.colors[1]};
  padding: 12px 0px;
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
`;
