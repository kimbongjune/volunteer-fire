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
import { saveUserInformation } from '../../features/slice/UserinfoSlice';
import Axios from 'axios';
import { KakaoRestApiResponse, UserDto, apiPostResponse } from '../types/types';
import proj4 from 'proj4';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { jwtDecode } from 'jwt-decode'

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

const epsg5181: string = '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs';

const convertCoordinateSystem = (x:number, y:number):[number, number] => {
  return proj4('EPSG:4326', epsg5181, [x,y]);
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

  const userInfo = useSelector((state: RootState) => state.userReducer.userInformation);

  const [address, setAddress] = useState(query.param)
  const [newAddress, setNewAddress] = useState('');
  const [newDoroAddress, setNewDoroAddress] = useState('');
  const [newDetailAddress, setNewDetailAddress] = useState('');
  
  const openAddressPopup = () => {
    new window.daum.Postcode({
      oncomplete: function(data:daumSearchData) {
        console.log(data)
        console.log(data.jibunAddress || data.autoJibunAddress)
        console.log(data.roadAddress)
        setNewAddress(data.jibunAddress || data.autoJibunAddress)
        setNewDoroAddress(data.roadAddress)
        setNewDetailAddress("")
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
        return alert("주소는 빈칸으로 입력할 수 없습니다.")
      }
      
      const changedAddress = newDetailAddress === null || newDetailAddress === "" ? `${newAddress}` : `${newAddress} ${newDetailAddress}`
      const changedDoroAddress = newDetailAddress === null || newDetailAddress === "" ? `${newDoroAddress}` : `${newDoroAddress} ${newDetailAddress}`

      const coordinate = await Axios.get<KakaoRestApiResponse>("https://dapi.kakao.com/v2/local/search/address.json",{
        headers:{
          Authorization : `KakaoAK ${process.env.NEXT_PUBLIC_KAKAOMAP_RESTAPI_KEY}`
        },
        params:{
          query : changedAddress,
          analyze_type:"similar",
          size : 1
        }
      })

      if(coordinate.status == 200){
        if(coordinate.data.meta.total_count > 0){
          console.log(coordinate.data.documents[0])
          const coordinateX = coordinate.data.documents[0].x
          const coordinateY = coordinate.data.documents[0].y

          const convertCoordinate = convertCoordinateSystem(parseFloat(coordinateX), parseFloat(coordinateY))

          const convertCoordinateX = convertCoordinate[0]
          const convertCoordinateY = convertCoordinate[1]

          console.log("epsg 4326 : ", coordinateX, coordinateY)
          console.log("epsg 5181 : ", convertCoordinateX, convertCoordinateY)

          if(query.menu === "address"){
            //자택주소 API
            //API 발송 후 응답값에서 saveUserInformation
            //saveUserInformation({...userInfo, liveBunjiAdress :""})
            const userUpdateResponse = await axios.put<apiPostResponse>("/api/user/info", {
              userId : userInfo.sub,
              userType : userInfo.type,
              liveBunjiAdress : changedAddress,
              liveDoroAdress : changedDoroAddress,
              liveXCrdnt4326 : coordinateX,
              liveYCrdnt4326 : coordinateY,
              liveXCrdnt5181 : convertCoordinateY,
              liveYCrdnt5181 : convertCoordinateX,
              liveLawAddrCd : coordinate.data.documents[0].address.b_code
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
                setAddress(changedAddress)
                //완료되면 인풋 밸류 초기화
                setNewAddress("")
                setNewDetailAddress("")
                setNewDoroAddress("")
                router.replace({
                  pathname: router.pathname, // 현재 페이지 경로
                  query: { ...router.query, param: changedAddress }, // 나머지 쿼리 유지하며 'param'만 업데이트
                }, undefined, { shallow: true }); // 페이지 전환 없이 URL 업데이트
              }
            }
          }else{
            const userUpdateResponse = await axios.put<apiPostResponse>("/api/user/info", {
              userId : userInfo.sub,
              userType : userInfo.type,
              workBunjiAdress : changedAddress,
              workDoroAdress : changedDoroAddress,
              workXCrdnt4326 : coordinateX,
              workYCrdnt4326 : coordinateY,
              workXCrdnt5181 : convertCoordinateY,
              workYCrdnt5181 : convertCoordinateX,
              workLawAddrCd : coordinate.data.documents[0].address.b_code
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
                setAddress(changedAddress)
                //완료되면 인풋 밸류 초기화
                setNewAddress("")
                setNewDetailAddress("")
                setNewDoroAddress("")
                router.replace({
                  pathname: router.pathname, // 현재 페이지 경로
                  query: { ...router.query, param: changedAddress }, // 나머지 쿼리 유지하며 'param'만 업데이트
                }, undefined, { shallow: true }); // 페이지 전환 없이 URL 업데이트
              }
            }
          }
          
        }else{
          alert("좌표변경 api 검색결과가 0건입니다.")  
        }
      }else{
        alert("좌표변경 api 호출 실패")
      }
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
          <Input placeholder='번지 주소(구주소)로 입력됩니다.' ref={addressRef} value={newAddress} fontSize="16px" fontWeight={600} lineHeight="20px" letterSpacing="-0.32px" color={theme.colors[7]} readOnly={true} onClick={openAddressPopup}/>
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
