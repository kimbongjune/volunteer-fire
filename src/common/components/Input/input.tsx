import { Input as ChakraInput } from '@chakra-ui/react';
import React, { forwardRef } from 'react';

interface Props {
  fontSize: string;
  fontWeight: number;
  lineHeight: string;
  letterSpacing: string;
  color: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onClick?:(e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; //onChange 함수를 정의
}

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <ChakraInput
      ref={ref} // ChakraInput에 ref를 전달
      w="100%"
      h="100%"
      border="1px solid #E9ECEF"
      padding="14px 16px"
      borderRadius={8}
      fontSize={props.fontSize}
      fontWeight={props.fontWeight}
      lineHeight={props.lineHeight}
      letterSpacing={props.letterSpacing}
      color={props.color}
      placeholder={props.placeholder}
      backgroundColor="#fff"
      value={props.value}
      disabled={props.disabled}
      readOnly={props.readOnly}
      onClick={props.onClick}
      onChange={props.onChange} // ChakraInput에 onChange를 전달
    />
  );
});

Input.displayName = 'Input'; // 개발 도구에서 컴포넌트의 이름을 표시하기 위해 설정합니다.

export default Input;