import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import CPR from '@/features/Cpr/CPR';
import HomeMenu from '@/features/Home/HomeMenu';
import Layout from '@/common/components/Layout/Layout';
import Mobilization from '@/features/Mobilization/Mobilization';
import MyInfo from '@/features/MyInfo/MyInfo';
import { useRouter } from 'next/router';
import axios,{setAuthToken} from "../../common/components/api/axios"
import { useSelector } from 'react-redux';
import { setDisasterNumber, setDisasterCoordinateX, setDisasterCoordinateY, setDisasterAccptFlag, setDisasterClsCd, setDisasterKndCd } from '../../features/slice/disasterSlice';
import { saveLogedInStatus,saveUserInformation } from '../../features/slice/UserinfoSlice';
import { RootState } from '../../app/store';
import { useDispatch } from 'react-redux';
import { MobilizationResponseDto, UserDto, apiPostResponse } from '@/features/types/types';
import { jwtDecode } from 'jwt-decode'
import dayjs from 'dayjs';
import proj4 from 'proj4';
import 'dayjs/locale/ko'; // 한국어 지원
dayjs.locale('ko'); 

const formatDateTime = (dateTimeString: string): string => {
  return dayjs(dateTimeString).format('YYYY년 M월 D일 A h시 mm분');
}

const getIconnByKndCd = (code: string): string => {
  switch (code) {
    case "0040001": return "/images/icons/fire.png";
    case "0040002": return "/images/icons/ambulance.svg";
    case "0040003": return "/images/icons/medicalService.svg";
    default: return "/images/icons/omit.svg";
  }
}

const getCodeDescriptionByClsCd = (code: string): string => {
  switch (code) {
      case "0040067": return "동물구조";
      case "0790052": return "고층건물(3층이상,아파트)";
      case "0790158": return "기타화재";
      case "1710210": return "대형화재(시장,공장)";
      case "1710211": return "일반화재(주택)";
      case "1710212": return "지하화재";
      case "1710213": return "특수화재(선박,위험물)";
      case "1710665": return "산불";
      case "0040006": return "붕괴사고";
      case "0040007": return "산악사고";
      case "0040008": return "수난사고";
      case "0040009": return "교통사고";
      case "0040010": return "기계사고";
      case "0040011": return "E/V사고";
      case "0040012": return "추락사고";
      case "0040013": return "약물사고";
      case "0040017": return "폭발사고";
      case "0040022": return "항공구조(항공사고)";
      case "0040023": return "항공구조(훈련상황)";
      case "0040024": return "항공구조(수색구조)";
      case "0040031": return "자연재해";
      case "0040044": return "시건개방";
      case "0040045": return "기타안전사고";
      case "3200001": return "벌집제거";
      case "0060039": return "구급예약";
      case "0060078": return "약물중독";
      case "0060079": return "가스중독";
      case "0060081": return "무선페이징";
      case "0060170": return "화상";
      case "0060204": return "부상";
      case "0060205": return "질병";
      case "0060206": return "임산부";
      case "0060211": return "행려병자";
      case "1710595": return "U안심폰대상자";
      case "1710619": return "질병외";
      case "1710620": return "사고부상";
      case "1710621": return "구급기타";
      case "0040032": return "산사태";
      case "0040063": return "지원출동(전기)";
      case "0040064": return "지원출동(가스)";
      case "0040065": return "지원출동(환경)";
      case "0040066": return "민원출동";
      case "0060004": return "훈련출동";
      case "0060005": return "응원출동";
      case "0060012": return "지원출동(재해)";
      case "0060013": return "지원출동(풍수해)";
      case "0060014": return "지원출동(배수)";
      case "0060015": return "지원출동(급수)";
      case "0060016": return "지원출동(청소)";
      case "0060017": return "지원출동(한해)";
      case "0060018": return "지원출동(기타)";
      case "0060019": return "지원출동(경호)";
      case "0060020": return "지원출동(데모시위)";
      case "0060021": return "지원출동(행사지원)";
      case "0060022": return "지원출동(근접배치)";
      case "0060023": return "지원출동(행락철)";
      case "0060024": return "지원출동(추석)";
      case "0060025": return "지원출동(설)";
      case "0060026": return "지원출동(도로세척)";
      case "0060027": return "지원출동(가옥정리)";
      case "0060028": return "순찰출동";
      case "0060029": return "상황출동";
      case "0060037": return "예방경계";
      case "0060044": return "대민지원";
      case "0060200": return "업무운행";
      case "0060212": return "기타출동";
      case "1710676": return "일반화재(차량)";
      case "0060072": return "자살";
      case "0060218": return "실종자";
      case "1712101": return "기타화재(속보설비)";
      case "1712102": return "사회적약자시설(요양원,장애인시설)";
      case "0500026": return "심정지";
      case "0062301": return "구급차소독";
      case "0042301": return "화학사고";
      case "1712301": return "전기차화재";
      case "0060030": return "화재확인출동";
      case "1710677": return "흉통";
      case "1710678": return "아나필락시스";
      case "1710679": return "응급신경증상(뇌졸중)";
      default: return "알 수 없는 코드";
  }
}

const epsg5181: string = '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs';

const convertCoordinateSystem = (x:number, y:number):[number, number] => {
  return proj4(epsg5181, 'EPSG:4326', [x,y]);
}

const HomePage = () => {
  const { query } = useRouter();
  const menu = query.menu;
  // 동원상태를 관리하기위한 임시쿼리스트링 (동원요청알림을 받아 승인을 눌렀을때)
 
  const [isRequest, setIsRequest] = useState(false);
  const [hasRead, setHasRead] = useState(false); // 추가된 상태
  const [isApproved, setIsApproved] = useState(false); // 승인 상태 초기화
  const [mobilizationStatus, setMobilizationStatus] = useState(false);
  const [dsrSeq, setDsrSeq] = useState("");
  const [disasterAddress, setDisasterAddress] = useState("");

  const [titleIcon, setTitleIcon] = useState("");

  const [userInfo, setUserInfo] = useState<UserDto>();

  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")

  //console.log("mobilizationStatus",mobilizationStatus)

  const dispatch = useDispatch();

  window.updateToken = async (token: string) => {
    console.log("token" , token, userInfo)
    if(userInfo){
      try{
        const userUpdateResponse = await axios.put<apiPostResponse>("/api/user/info", {
          fcmToken: token,
          userId : userInfo.sub,
          userType : userInfo.type,
        })
        if(userUpdateResponse.data.responseCode === 200){
          console.log(userInfo)
          const fetchUserData = await axios.post("/api/user/login/auth",{
              userId : userInfo.appUserId,
              userPassword : userInfo.appUserPw
          })
          if(fetchUserData.data.responseCode === 200){
            localStorage.setItem("token", fetchUserData.headers['authorization']);
            setAuthToken(fetchUserData.headers['authorization'])
          }
          if (window.fireAgency && window.fireAgency.saveJwtToken) {
            window.fireAgency.saveJwtToken(userInfo.appUserId, fetchUserData.headers['authorization']);
          }
          dispatch(saveUserInformation(jwtDecode<UserDto>(fetchUserData.headers['authorization'])))
        }else{
          alert("유저 정보 갱신 실패")
        }
      }catch(error){
        console.error(error)
      }
    }
    
  };

  const parsingJwt = (token: string) => {
    const userData = jwtDecode<UserDto>(token)
    //console.log(userData)
    setUserInfo(userData)
  }

  useEffect(() => {

    if (window.fireAgency && window.fireAgency.getUserData) {
      window.fireAgency.getUserData();
    }

    window.getSavedUserToken = (userdata:userData) => {
      console.log(userdata)
      if(userdata !== null){
        dispatch(saveLogedInStatus(true))
        parsingJwt(userdata.jwtToken)
        localStorage.setItem("token", userdata.jwtToken);
        setAuthToken(userdata.jwtToken)
      }
    };
    
  }, []); // 의존성 배열을 비워서 마운트시에만 실행되도록 함

  useEffect(() =>{
    // API 호출을 수행하는 함수

    const fetchMobilizationStatus = async () => {
      if(userInfo){
        if (window.fireAgency && window.fireAgency.requestGetToken) {
          window.fireAgency.requestGetToken();
        }
        try {
          //API 호출 로직
          console.log("동원 api 콜")
          const mobilizationResponse = await axios.get<MobilizationResponseDto>('/api/mobilize/',{
            params :{
              userId : userInfo.sub
            }
          });

          console.log(mobilizationResponse.data)

          if(mobilizationResponse.data.responseCode == 200 && mobilizationResponse.data.result){
            const result = mobilizationResponse.data.result
            setIsRequest(result.statEndDtime.trim().length == 0)
            if(result.statEndDtime.trim().length > 1){
              dispatch(setDisasterCoordinateX(0.0));
              dispatch(setDisasterCoordinateY(0.0));
              dispatch(setDisasterNumber(""))
              dispatch(setDisasterClsCd(""))
              dispatch(setDisasterKndCd(""))
              console.log("재난 종결")
            }
            setHasRead(result.colChkYn == 'Y')
            setMobilizationStatus(result.accTimeCount == '1' || result.dnyTimeCount == '1')
            setIsApproved(result.accTimeCount == '1' && result.dnyTimeCount != '1')
            setDsrSeq(result.dsrSeq)
            if (window.fireAgency && window.fireAgency.saveDisasterNumber) {
              window.fireAgency.saveDisasterNumber(result.dsrSeq);
            }
            dispatch(setDisasterNumber(result.dsrSeq))
            dispatch(setDisasterClsCd(result.dsrClsCd))
            dispatch(setDisasterKndCd(result.dsrKndCd))
            setDisasterAddress(result.lawAddr)
            setTime(formatDateTime(result.regDtime))
            setTitle(getCodeDescriptionByClsCd(result.dsrClsCd))
            setTitleIcon(getIconnByKndCd(result.dsrKndCd))
            const gisData = convertCoordinateSystem(result.dsrGisX, result.dsrGisY)
            dispatch(setDisasterCoordinateX(gisData[1]));
            dispatch(setDisasterCoordinateY(gisData[0]));
          }else{
            setIsRequest(false)
          }
          //동원 응답이 있으면 true 없으면 false
          //전역 재난번호 저장
          //재난 좌표 저장
          //재난이 없어질 경우 재난번호 초기화
          //dispatch(setDisasterNumber(''));
          //동원 응답 을 읽었으면(모달 클릭) true 안 읽었으면 false
          //TODO
          //중간에 재난이 바뀔 경우를 대비해 동원 응답이 false가 도달하면 모든 state값을 초기화
        } catch (error) {
          // 에러 처리
          console.error('Failed to fetch mobilization status:', error);
        }
      }
    };

    // 컴포넌트가 마운트될 때 첫 번째 API 호출을 수행
    fetchMobilizationStatus();

    // setInterval을 사용하여 주기적으로 API를 호출
    const interval = setInterval(fetchMobilizationStatus, 60000); // 10초마다 호출

    // 컴포넌트가 언마운트될 때 인터벌을 정리
    return () => {
      console.log("동원 api 콜 해제")
      clearInterval(interval)
    };
  },[userInfo, isApproved])

  useEffect(() =>{
    const sendClickStream = async () =>{
      if(userInfo){
        const clickStreamResponse = await axios.post("/api/menu_log/enter",{
          menuId : "2100",
          userId : userInfo.appUserId
        })
        console.log(clickStreamResponse.data)
      }
    }
    sendClickStream()
  }, [userInfo])

  // Modal을 닫을 때 호출되는 함수
  const handleModalClose = async () => {
    //api로 모달 확인 api 송신
    const mobilizationCheckResponse = await axios.post<apiPostResponse>("/api/mobilize/check", {
      colChkYn : "Y",
      dsrSeq : dsrSeq,
      userId : userInfo?.sub
    })
    if(mobilizationCheckResponse.data.responseCode === 200) {
      setHasRead(true);
    }
  };

  const handleApprovalChange = async (approvalStatus:React.SetStateAction<boolean>) => {
    
    console.log("approvalStatus@@@@@@@@@@@@@@@@@@@@@@@@@@@@@: " + approvalStatus)
    console.log("isApproved@@@@@@@@@@@@@@@@@@@@@@@@@@@@@: " + isApproved)
    //재난 참여 안할시 저장 재난번호 초기화
    const approvedFlag = approvalStatus ? "Y" : "N"
    const approveResponse = await axios.post<apiPostResponse>("/api/mobilize/mob",{
      dsrSeq : dsrSeq,
      flag : approvedFlag,
      userId : userInfo?.appUserId
    })

    if(approveResponse.data.responseCode === 200) {
      setIsApproved(approvalStatus); //재난정보 수신 여부 변경
    }
  };

  useEffect(() => {
    console.log("@@@@@@@@@@@@@@@@@@@",isApproved)
    dispatch(setDisasterAccptFlag(isApproved))
    if(!isApproved){
      if (window.fireAgency && window.fireAgency.stopLocationService) {
        window.fireAgency.stopLocationService();
      }
    }else{
      if (window.fireAgency && window.fireAgency.startLocationService) {
        window.fireAgency.startLocationService();
      }
      if (window.fireAgency && window.fireAgency.deleteDisasterNumber) {
        window.fireAgency.deleteDisasterNumber();
      }
    }
  },[isApproved])

  //TODO 특정 상황에 하위 페이지 이동 금지
  return (
    <Layout>
      <Container>
        <HomeMenu />
        <Children>
          {/* 홈 - 동원 */}
          {menu === 'mobilization' && <Mobilization titleIcon={titleIcon} time={time} address={disasterAddress} title={title} mobilizationStatus={mobilizationStatus} onMobilizationStatusChange={setMobilizationStatus} isRequest={isRequest} hasRead={hasRead} onModalClose={handleModalClose} isApproved={isApproved} onApprovalChange={handleApprovalChange} />}
          {/* 홈 - CPR */}
          {menu === 'cpr' && <CPR />}
          {/* 홈 - 내정보 */}
          {menu === 'myInfo' && <MyInfo />}
        </Children>
      </Container>
    </Layout>
  );
};

export default HomePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: linear-gradient(#ff8a3a 0%, #ff8a3a 192px, #f8f9fa 128px, #f8f9fa 100%);
`;

const Children = styled.div`
  position: relative;
  padding: 0 16px 16px;
  flex: 1;
  overflow-y: auto;
`;
