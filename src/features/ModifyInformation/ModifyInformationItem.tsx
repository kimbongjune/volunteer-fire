import React, { ReactNode } from 'react';
import theme from '@/theme/colors';
import styled from '@emotion/styled';
import IconWrapper from '@/common/components/IconWrapper/IconWrapper';
import ArrowRight from '../../../public/images/icons/arrow-right.svg';

export type ModifyInformationItemType = {
  icon?: ReactNode;
  text?: string;
  description?: string;
  query?: string;
  onClick: (query?: string) => void;
};

const ModifyInformationItem = (props: ModifyInformationItemType) => {
  return (
    <Container onClick={() => props.onClick(props.query)}>
      <IconContainer>
        <IconWrapper width="24px" height="24px" color={theme.colors.blue}>
          {props?.icon}
        </IconWrapper>
      </IconContainer>
      <div>
        <Text>{props.text}</Text>
        <Description>{props.description}</Description>
      </div>
      <IconWrapper width="16px" height="16px" color={theme.colors[3]} margin="0 0 0 auto">
        <ArrowRight />
      </IconWrapper>
    </Container>
  );
};

export default ModifyInformationItem;

const Container = styled.div`
  padding: 16px;
  border-radius: 8px;
  border: 1px solid ${theme.colors[2]};
  display: flex;
  align-items: center;
  width: 100%;
  background-color: ${theme.colors.white};
`;

const IconContainer = styled.div`
  width: 32px;
  height: 32px;
  padding: 4px;
  border-radius: 4px;
  background: rgba(121, 158, 255, 0.15);
  margin-right: 16px;
`;

const Text = styled.span`
  display: block;
  color: ${theme.colors[7]};
  font-family: 'Pretendard Bold';
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: -0.32px;
`;

const Description = styled.span`
  display: block;
  color: ${theme.colors[3]};
  font-family: 'Pretendard Bold';
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  line-height: 20px;
  letter-spacing: -0.28px;
`;
