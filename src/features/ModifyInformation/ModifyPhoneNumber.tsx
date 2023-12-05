import React,{useState, useRef} from 'react';
import theme from '@/theme/colors';
import styled from '@emotion/styled';
import Input from '@/common/components/Input/input';
import { VStack } from '@chakra-ui/react';
import Button from '@/common/components/Button/Button';
import { useRouter } from 'next/router';
import axios from "../../common/components/api/axios"
import { useDispatch } from 'react-redux';
import { saveUserInformation } from '../../features/slice/UserinfoSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { UserDto, apiPostResponse } from '../types/types';
import { jwtDecode } from 'jwt-decode'

const ModifyPhoneNumber = () => {

  const phoneRef = useRef<HTMLInputElement>(null);

  const userInfo = useSelector((state: RootState) => state.userReducer.userInformation);

  const dispatch = useDispatch();

  const router = useRouter();
  const query = router.query;

  const [phone, setPhone] = useState(query.param)
  const [newPhone, setNewPhone] = useState('');

  const updateUserInfo = async () => {
    try {
      //API 호출 로직
      console.log("유저정보 갱신 콜")
      //const response = await axios.get('/user-info');
      //텍스트의 전화번호를 서버에 전송하여 전화번호 갱신
      //유저정보를 state에 저장
      if(newPhone === "" || newPhone === null){
        phoneRef.current?.focus()
        return alert("빈칸 입력은 불가능합니다.")
      }

      //API 호출 후
      //saveUserInformation({...userInfo, userTel : newPhone})
      try{
        const userUpdateResponse = await axios.put<apiPostResponse>("/api/user/info", {
          userId : userInfo.sub,
          userType : userInfo.type,
          userTel : newPhone
        })
        if(userUpdateResponse.data.responseCode === 200){
          const fetchUserData = await axios.post("/api/user/login/auth",{
            userId : userInfo.appUserId,
            userPassword : userInfo.appUserPw
          })
          if(fetchUserData.data.responseCode === 200){
            localStorage.setItem("token", fetchUserData.headers['authorization']);
            if (window.fireAgency && window.fireAgency.updateUser) {
              window.fireAgency.updateUser(userInfo.appUserId, fetchUserData.headers['authorization']);
            }
            dispatch(saveUserInformation(jwtDecode<UserDto>(fetchUserData.headers['authorization'])))
            setPhone(newPhone)
            //완료되면 인풋 밸류 초기화
            setNewPhone("")
            router.replace({
              pathname: router.pathname, // 현재 페이지 경로
              query: { ...router.query, param: newPhone }, // 나머지 쿼리 유지하며 'param'만 업데이트
            }, undefined, { shallow: true }); // 페이지 전환 없이 URL 업데이트
          }
        }else{
          alert("유저 정보 갱신 실패")
        }
      }catch(error){
        console.error(error)
      }
    } catch (error) {
      // 에러 처리
      console.error('Failed to fetch user info status:', error);
    }
  };

  // Input 값 변경 핸들러
  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setNewPhone(e.target.value); // 사용자 입력에 따라 newPhone state 업데이트
  };

  return (
    <VStack gap="16px" w="100%" h="100%">
      <Box>
        <Title>기존</Title>
        <InputBox>{phone}</InputBox>
      </Box>
      <Form>
        <Title>변경</Title>
        <InputWrapper>
          <Input ref={phoneRef} fontSize="16px" value={newPhone} fontWeight={600} lineHeight="20px" letterSpacing="-0.32px" color={theme.colors[7]} onChange={handleInputChange} />
        </InputWrapper>
      </Form>
      <Button backgroundColor={theme.colors.orange} height="56px" padding="16px" margin="auto 0 0" onClick={updateUserInfo}>
        <ButtonText>변경 신청하기</ButtonText>
      </Button>
    </VStack>
  );
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
