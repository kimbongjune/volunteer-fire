import React,{useState, useEffect, useRef} from 'react';
import theme from '@/theme/colors';
import styled from '@emotion/styled';
import Input from '@/common/components/Input/input';
import { VStack } from '@chakra-ui/react';
import Button from '@/common/components/Button/Button';
import Search from '../../../public/images/icons/search.svg';
import IconWrapper from '@/common/components/IconWrapper/IconWrapper';
import { useRouter } from 'next/router';
import axios from "../../common/components/api/axios"
import { useDispatch } from 'react-redux';
import { saveAddress, saveWorkAddress } from '../../features/slice/UserinfoSlice';

declare global {
  interface Window {
    daum: any;
  }
}

interface daumSearchData {
  zonecode:number;
  address:string;
  addressEnglish:string;
  addressType:string;
  userSelectedType:string;
  noSelected:string;
  userLanguageType:string;
  roadAddress:string;
  roadAddressEnglish:string;
  jibunAddress:string;
  jibunAddressEnglish:string;
  autoRoadAddress:string;
  autoRoadAddressEnglish:string;
  autoJibunAddress:string;
  autoJibunAddressEnglish:string;
  buildingCode:number;
  buildingName:string;
  apartment:string;
  sido:string;
  sidoEnglish:string;
  sigungu:string;
  sigunguEnglish:string;
  sigunguCode:number;
  roadnameCode:number;
  bcode:number;
  roadname:string;
  roadnameEnglish:string;
  bname:string;
  bnameEnglish:string;
  bname1:string;
  bname1English:string;
  bname2:string;
  bname2English:string;
  hname:string;
  query:string;
}

const ModifyAddress = () => {

  const addressRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("?????????@@@@@@@@@@@@@@")
    const script = document.createElement('script');
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
    
  }, []);

  const dispatch = useDispatch();

  const router = useRouter();
  const query = router.query;

  const [address, setAddress] = useState(query.param)
  const [newAddress, setNewAddress] = useState('');
  const [newDetailAddress, setNewDetailAddress] = useState('');
  
  const openAddressPopup = () => {
    new window.daum.Postcode({
      oncomplete: function(data:daumSearchData) {
        setNewAddress(data.address)
      }
    }).open();
  }

  const updateUserInfo = async () => {
    try {
      //API 호출 로직
      console.log("유저정보 갱신 콜")
      //const response = await axios.get('/user-info');
      //텍스트의 전화번호를 서버에 전송하여 전화번호 갱신
      //유저정보를 state에 저장
      if(newAddress === "" || newAddress === null){
        addressRef.current?.focus()
        return alert("빈칸 안돼")
      }
      const changedAddress = newDetailAddress === null || newDetailAddress === "" ? `${newAddress}` : `${newAddress} ${newDetailAddress}`
      if(query.menu === "address"){
        dispatch(saveAddress(changedAddress))
      }else{
        dispatch(saveWorkAddress(changedAddress))
      }
      setAddress(changedAddress)
      //완료되면 인풋 밸류 초기화
      console.log(changedAddress)
      setNewAddress("")
      setNewDetailAddress("")
      router.replace({
        pathname: router.pathname, // 현재 페이지 경로
        query: { ...router.query, param: changedAddress }, // 나머지 쿼리 유지하며 'param'만 업데이트
      }, undefined, { shallow: true }); // 페이지 전환 없이 URL 업데이트
    } catch (error) {
      // 에러 처리
      console.error('Failed to fetch user info status:', error);
    }
  };
  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setNewDetailAddress(e.target.value); // 사용자 입력에 따라 newPhone state 업데이트
  };

  return (
    <VStack gap="16px" w="100%" h="100%">
      <Box>
        <Title>기존</Title>
        <InputBox>{address}</InputBox>
      </Box>
      <Form>
        <Title>변경</Title>
        <InputWrapper>
          <Input ref={addressRef} value={newAddress} fontSize="16px" fontWeight={600} lineHeight="20px" letterSpacing="-0.32px" color={theme.colors[7]} readOnly={true} onClick={openAddressPopup}/>
          <IconWrapper width="24px" height="24px" color={theme.colors.blue} position="absolute" top="12px" right="16px">
            <Search />
          </IconWrapper>
        </InputWrapper>
        <InputWrapper>
          <Input fontSize="16px" value={newDetailAddress} fontWeight={600} lineHeight="20px" letterSpacing="-0.32px" color={theme.colors[7]} placeholder="(상세주소)" onChange={handleInputChange}/>
        </InputWrapper>
      </Form>
      <Button backgroundColor={theme.colors.orange} height="56px" padding="16px" margin="auto 0 0" onClick={updateUserInfo}>
        <ButtonText>변경 신청하기</ButtonText>
      </Button>
    </VStack>
  );
};
export default ModifyAddress;

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

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 8px;
  height: 48px;
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
