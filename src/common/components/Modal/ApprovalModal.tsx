import React from 'react';
import ModalLayout from './ModalLayout';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import Button from '../Button/Button';
import { Flex } from '@chakra-ui/react';

interface Props {
  text: string;
  isApprovalModalOpen: boolean;
  isApproved?: boolean;
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
  onClickOkButton: () => void;
}

const ApprovalModal = (props: Props) => {
  return (
    <>
      {!props.isApproved && (
        <Button onClick={() => props.onClick(true)} height="48px" backgroundColor={theme.colors.blue} padding="12px 16px" borderRadius="4px">
          <ButtonText>승인</ButtonText>
        </Button>
      )}
      {props.isApprovalModalOpen && (
        <ModalLayout icon="/images/icons/check.png" title="승인" onClick={() => props.onClick(false)}>
          <Text dangerouslySetInnerHTML={{ __html: props.text }}></Text>
          <Flex gap="8px">
            <Button height="56px" padding="16px" borderRadius="8px" backgroundColor={theme.colors[5]} onClick={() => props.onClick(false)}>
              <ButtonText>취소</ButtonText>
            </Button>
            <Button height="56px" padding="16px" borderRadius="8px" backgroundColor={theme.colors.blue} onClick={props.onClickOkButton}>
              <ButtonText>승인하기</ButtonText>
            </Button>
          </Flex>
        </ModalLayout>
      )}
    </>
  );
};

ApprovalModal.defaultProps = {
  text: '신규 동원 요청을 승인합니다<br/> 승인하면 위치정보를 경남소방본부로 전송합니다',
};
export default ApprovalModal;

const Text = styled.div`
  color: ${theme.colors[6]};
  font-family: 'Pretendard Medium';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.32px;
  margin: 0 auto;
  text-align: center;
  white-space: normal;
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
