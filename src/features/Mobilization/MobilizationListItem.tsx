import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import { Flex, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import IconWrapper from '@/common/components/IconWrapper/IconWrapper';
import RejectedModal from '@/common/components/Modal/RejectedModal';
import ApprovalModal from '@/common/components/Modal/ApprovalModal';
import Find from '../../../public/images/icons/find.svg';
import Time from '../../../public/images/icons/time.svg';
import Button from '../../common/components/Button/Button';

interface Props {
  titleIcon: string;
  title: string;
  address: string;
  time: string;
  mobilizationStatus: boolean;
  isApproved:boolean
  onMobilizationStatusChange: (isApproved:React.SetStateAction<boolean>) => void;
  onApprovalChange: (isApproved:React.SetStateAction<boolean>) => void;
}

const MobilizationListItem = (props: Props) => {
  const router = useRouter();
  const [isApproved, setIsApproved] = useState(props.isApproved);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [isRejectedModalOpen, setIsRejectedModalOpen] = useState(false);

  console.log("isApproved", isApproved)
  // 동원 거절 시 호출
  const handleClickCancelButton = () => {
    setIsApproved(false)
    setIsRejectedModalOpen(false);
    props.onApprovalChange(false)
    props.onMobilizationStatusChange(true)
  };

  // 신규 동원 요청 시 호출
  const handleClickOkButton = () => {
    setIsApproved(true);
    //router.push('/mobilizationStatus');
    setIsApprovalModalOpen(false)
    props.onApprovalChange(true)
    props.onMobilizationStatusChange(true)
  };

  console.log("props.mobilizationStatus && !isApproved", props.mobilizationStatus ,!isApproved)

  return (
    <Container>
      <Flex alignItems="center" marginBottom="20px">
        <Image width={24} height={24} src={props.titleIcon} alt={props.title} />
        <Title>{props.title}</Title>
      </Flex>

      <VStack gap="8px">
        <Box>
          <Flex gap="16px">
            <IconWrapper width="28px" height="28px" color={theme.colors.orange}>
              <Find />
            </IconWrapper>

            <Text>{props.address}</Text>
          </Flex>
        </Box>

        <Box>
          <Flex gap="16px">
            <IconWrapper width="28px" height="28px" color={theme.colors.orange}>
              <Time />
            </IconWrapper>
            <Text>{props.time}</Text>
          </Flex>
        </Box>
      </VStack>

      <Flex gap="8px" marginTop="auto">
        {!props.mobilizationStatus && !isApproved && <RejectedModal isRejectedModalOpen={isRejectedModalOpen} onClick={setIsRejectedModalOpen} onClickCancelButton={handleClickCancelButton} />}
        {!props.mobilizationStatus && <ApprovalModal isApprovalModalOpen={isApprovalModalOpen} onClick={setIsApprovalModalOpen} onClickOkButton={handleClickOkButton} isApproved={isApproved} />}
        {props.mobilizationStatus && isApproved &&(
          <Button onClick={() => router.push('/mobilizationStatus')} height="48px" backgroundColor={theme.colors.blue} padding="12px 16px" borderRadius="4px">
            <ButtonText>동태 확인</ButtonText>
          </Button>
        )}
      </Flex>
    </Container>
  );
};

MobilizationListItem.defaultProps = {
  titleIcon: '/images/icons/fire.png',
  title: '공장화재',
  address: '진주시 진주대로 345-13, 203호',
  time: '2023년 9월 9일 오후 11시 09분',
};
export default MobilizationListItem;

const Container = styled.div`
  height: 100%;
  background-color: ${theme.colors.white};
  padding: 20px 16px;
  border-radius: 8px;
  border: 1px solid ${theme.colors[2]};
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  color: ${theme.colors[7]};
  font-family: 'Pretendard Bold';
  font-size: 20px;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: -0.4px;
`;

const Box = styled.div`
  width: 100%;
  padding: 16px 20px;
  border-radius: 4px;
  background-color: ${theme.colors[1]};
`;

const Text = styled.div`
  color: ${theme.colors[10]};
  font-family: 'Pretendard Bold';
  font-size: 20px;
  font-style: normal;
  font-weight: normal;
  line-height: 28px;
  letter-spacing: -0.4px;
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
