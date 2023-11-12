import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from '@/theme/colors';
import IconWrapper from '@/common/components/IconWrapper/IconWrapper';

interface Props {
  color: string;
  icon: ReactNode;
  marginBottom?: string;
  statusText: string;
}

const MobilizationStatusItem = (props: Props) => {
  return (
    <Container color={props.color} marginBottom={props?.marginBottom}>
      <IconWrapper width="56px" height="56px" color={props.color}>
        {props.icon}
      </IconWrapper>
      <StatusText color={props.color}>{props.statusText}</StatusText>
    </Container>
  );
};

export default MobilizationStatusItem;

const Container = styled.button<{ color: string; marginBottom?: string }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0 16px;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid ${props => props.color};
  margin-bottom: ${props => props.marginBottom};
  ${props =>
    props.color === '#FF8A3A' &&
    css`
      background: linear-gradient(0deg, rgba(255, 138, 58, 0.15) 0%, rgba(255, 138, 58, 0.15) 100%), #fff;
    `}
  ${props =>
    props.color === '#799EFF' &&
    css`
      background: linear-gradient(0deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.2) 100%), rgba(121, 158, 255, 0.15);
    `}
      ${props =>
    props.color === '#495057' &&
    css`
      background: ${theme.colors[2]};
    `}
`;

const StatusText = styled.div<{ color: string }>`
  color: ${props => props.color};
  font-family: 'Pretendard Bold';
  font-size: 28px;
  font-style: normal;
  font-weight: normal;
  line-height: 32px;
  letter-spacing: -0.56px;
`;
