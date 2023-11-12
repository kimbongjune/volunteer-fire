import React from 'react';
import theme from '@/theme/colors';
import styled from '@emotion/styled';
import Input from '@/common/components/Input/input';
import { VStack } from '@chakra-ui/react';
import Button from '@/common/components/Button/Button';

interface Props {
  phone: string;
}

const ModifyPhoneNumber = (props: Props) => {
  return (
    <VStack gap="16px" w="100%" h="100%">
      <Box>
        <Title>기존</Title>
        <InputBox>{props.phone}</InputBox>
      </Box>
      <Form>
        <Title>변경</Title>
        <InputWrapper>
          <Input fontSize="16px" fontWeight={600} lineHeight="20px" letterSpacing="-0.32px" color={theme.colors[7]} />
        </InputWrapper>
      </Form>
      <Button backgroundColor={theme.colors.orange} height="56px" padding="16px" margin="auto 0 0">
        <ButtonText>변경 신청하기</ButtonText>
      </Button>
    </VStack>
  );
};
ModifyPhoneNumber.defaultProps = {
  phone: '010-1234-5678',
};
export default ModifyPhoneNumber;

const Box = styled.div`
  width: 100%;
`;

const Form = styled.form`
  width: 100%;
`;

const Title = styled.div`
  color: ${theme.colors[6]};
  font-family: 'Pretendard Bold';
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: -0.32px;
  margin-bottom: 8px;
`;

const InputWrapper = styled.div`
  height: 48px;
`;

const InputBox = styled.div`
  width: 100%;
  height: 48px;
  background-color: ${theme.colors.white};
  padding: 16px;
  border-radius: 8px;
  border: 1px solid ${theme.colors[2]};
  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.32px;
  color: ${theme.colors[5]};
  font-family: 'Pretendard SemiBold';
  font-weight: normal;
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
