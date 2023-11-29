import React,{useEffect, useState} from 'react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import MyInfoDetail from './MyInfoDetail';
import MyToken from './MyToken';
import { Flex } from '@chakra-ui/react';
import Button from '@/common/components/Button/Button';
import { useRouter } from 'next/router';
import axios from "../../common/components/api/axios"
import { useSelector } from 'react-redux';
import { RootState, persistor } from '../../app/store';
import { useDispatch } from 'react-redux';
import { saveTag, saveName, saveAddress, saveWorkAddress, saveGroup, savePhone, saveToken, saveMobilizationTotalCount, saveMobilizationAcceptCount, saveMobilizationDenyCount, saveLogedInStatus } from '../../features/slice/UserinfoSlice';

const MyInfo = () => {
  const router = useRouter();
  const dispatch = useDispatch()

  const tag = useSelector((state: RootState) => state.userReducer.tag);
  const group = useSelector((state: RootState) => state.userReducer.group);
  const name = useSelector((state: RootState) => state.userReducer.name);
  const address = useSelector((state: RootState) => state.userReducer.address);
  const workAddress = useSelector((state: RootState) => state.userReducer.workAddress);
  const phone = useSelector((state: RootState) => state.userReducer.phone);
  const savedToken = useSelector((state: RootState) => state.userReducer.token);

  const [token, setToken] = useState(savedToken)

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        //API 호출 로직
        console.log("유저정보 api 콜")
        //const response = await axios.get('/user-info');
        //유저정보를 state에 저장
        //setTag("직책")
        //setName("이름")
        //setGroup("소속")
        //setPhone("전화번호")
        //setAddress("실 거주지 주소")
        //setWorkAddress("직장 주소")
        //setToken("fcm 토큰")
        if (window.fireAgency && window.fireAgency.requestGetToken) {
          window.fireAgency.requestGetToken();
        }
        //setMobilizationTotalCount("동원 총 개수")
        //setMobilizationAcceptCount("동원 수락 개수")
        //setMobilizationDenyCount("동원 거절 개수")
      } catch (error) {
        // 에러 처리
        console.error('Failed to fetch user info status:', error);
      }
    };

    fetchUserInfo()
  });

  window.updateToken = (token: string) => {
    setToken(token)
    dispatch(saveToken(token));
  };

  const logOut =() =>{
    persistor.purge();
    if (window.fireAgency && window.fireAgency.logout) {
      window.fireAgency.logout();
    }
    if (window.fireAgency && window.fireAgency.stopLocationService) {
      window.fireAgency.stopLocationService();
    }
    dispatch(saveLogedInStatus(false))
    router.push('/logIn')
  }

  return (
    <Flex direction="column" gap="8px" w="100%" h="100%">
      <MyInfoDetail 
        tag={tag}
        name={name}
        group={group}
        phone={phone}
        address={address}
        workAddress={workAddress}
      />
      <MyToken token={token} />
      <Button onClick={() => logOut()} height="56px" backgroundColor={theme.colors[3]} padding="16px" margin="auto 0 0">
        <Text>로그아웃</Text>
      </Button>
    </Flex>
  );
};

export default MyInfo;

const Text = styled.div`
  color: ${theme.colors.white};
  font-family: 'Pretendard Bold';
  font-size: 18px;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: -0.36px;
`;
