import React,{useState} from 'react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import { Flex } from '@chakra-ui/react';
import Button from '@/common/components/Button/Button';
import IconWrapper from '@/common/components/IconWrapper/IconWrapper';
import Refresh from '../../../public/images/icons/refresh.svg';
import axios from "../../common/components/api/axios"
import { useDispatch } from 'react-redux';
import { saveMobilizationTotalCount, saveMobilizationAcceptCount, saveMobilizationDenyCount } from '../../features/slice/UserinfoSlice';

interface Props {
  mobilizationTotalCount? :number;
  mobilizationAcceptCount? :number;
  mobilizationDenyCount? :number;
}

const MobilizationRequestHistory = (props:Props) => {
  const dispatch = useDispatch();

  const [mobilizationTotalCount, setMobilizationTotalCount] = useState(props.mobilizationTotalCount)
  const [mobilizationAcceptCount, setMobilizationAcceptCount] = useState(props.mobilizationAcceptCount)
  const [mobilizationDenyCount, setMobilizationDenyCount] = useState(props.mobilizationDenyCount)

  const formatNumber = (number:number) =>{
    return String(number).padStart(3, '0');
  }

  const fetchMobilizationStatus = async () =>{
    //const response = await axios.get('/user-info');
    setMobilizationTotalCount(5)
    dispatch(saveMobilizationTotalCount(5))
    setMobilizationAcceptCount(12)
    dispatch(saveMobilizationAcceptCount(12))
    setMobilizationDenyCount(322)
    dispatch(saveMobilizationDenyCount(322))
  }

  return (
    <Container>
      <Flex gap="4px" alignItems="flex-end">
        <Title>동원요청 이력</Title>
        <SubTitle>(최근 1년 간)</SubTitle>
      </Flex>
      <Box>
        <Flex justifyContent="space-between" marginBottom="8px">
          <Text>동원(소집)요청 횟수</Text>
          <Count>{formatNumber(mobilizationTotalCount!!)}</Count>
        </Flex>
        <Flex justifyContent="space-between" marginBottom="8px">
          <Text>요청 승인 횟수</Text>
          <Count>{formatNumber(mobilizationAcceptCount!!)}</Count>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>요청 거절 횟수</Text>
          <Count>{formatNumber(mobilizationDenyCount!!)}</Count>
        </Flex>
      </Box>
      {/* <Button padding="8px" backgroundColor={theme.colors[3]} height="40px" onClick={fetchMobilizationStatus}>
        <Flex justifyContent="center" gap="8px" alignItems="center">
          <IconWrapper width="20px" height="20px" color={theme.colors.white}>
            <Refresh />
          </IconWrapper>
          <ButtonText>정보 갱신하기</ButtonText>
        </Flex>
      </Button> */}
    </Container>
  );
};


MobilizationRequestHistory.defaultProps = {
  mobilizationTotalCount : 10,
  mobilizationAcceptCount : 5,
  mobilizationDenyCount : 150
};

export default MobilizationRequestHistory;

const Container = styled.div`
  width: 100%;
  padding: 16px;
  background-color: ${theme.colors.white};
  border-radius: 8px;
  border: 1px solid ${theme.colors[2]};
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

const SubTitle = styled.div`
  color: ${theme.colors[3]};
  font-family: 'Pretendard Bold';
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: -0.32px;
`;

const Box = styled.div`
  padding: 16px;
  border-radius: 4px;
  background-color: ${theme.colors[1]};
  margin: 16px 0 12px;
`;

const Text = styled.div`
  color: ${theme.colors[3]};
  font-family: 'Pretendard Medium';
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  line-height: 20px;
  letter-spacing: -0.32px;
`;

const Count = styled.div`
  color: ${theme.colors[7]};
  font-family: 'Pretendard Bold';
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  line-height: 20px;
  letter-spacing: -0.32px;
`;

const ButtonText = styled.div`
  color: ${theme.colors.white};
  font-family: 'Pretendard Bold';
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: -0.32px;
`;
