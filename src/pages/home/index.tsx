import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import CPR from '@/features/Cpr/CPR';
import HomeMenu from '@/features/Home/HomeMenu';
import Layout from '@/common/components/Layout/Layout';
import Mobilization from '@/features/Mobilization/Mobilization';
import MyInfo from '@/features/MyInfo/MyInfo';
import { useRouter } from 'next/router';
import axios from "../../common/components/api/axios"
import { useDispatch } from 'react-redux';
import { setDisasterNumber } from '../../features/slice/disasterSlice';

const HomePage = () => {
  const { query } = useRouter();
  const router = useRouter();
  const menu = query.menu;
  // 동원상태를 관리하기위한 임시쿼리스트링 (동원요청알림을 받아 승인을 눌렀을때)
  const [isRequest, setIsRequest] = useState(false);
  const [hasRead, setHasRead] = useState(false); // 추가된 상태
  const [isApproved, setIsApproved] = useState(false); // 승인 상태 초기화
  const [mobilizationStatus, setMobilizationStatus] = useState(false);

  console.log("mobilizationStatus",mobilizationStatus)

  const dispatch = useDispatch();

  useEffect(() => {
    // API 호출을 수행하는 함수
    const fetchMobilizationStatus = async () => {
      try {
        //API 호출 로직
        console.log("동원 api 콜")
        //const response = await axios.get('/mobilization-status');
        //동원 응답이 있으면 true 없으면 false
        setIsRequest(true)
        //전역 재난번호 저장
        dispatch(setDisasterNumber("test"));
        //재난이 없어질 경우 재난번호 초기화
        //dispatch(setDisasterNumber(''));
        //동원 응답 을 읽었으면(모달 클릭) true 안 읽었으면 false
        //TODO
        //중간에 재난이 바뀔 경우를 대비해 동원 응답이 false가 도달하면 모든 state값을 초기화
      } catch (error) {
        // 에러 처리
        console.error('Failed to fetch mobilization status:', error);
      }
    };

    // 컴포넌트가 마운트될 때 첫 번째 API 호출을 수행
    fetchMobilizationStatus();

    // setInterval을 사용하여 주기적으로 API를 호출
    const interval = setInterval(fetchMobilizationStatus, 10000); // 10초마다 호출

    // 컴포넌트가 언마운트될 때 인터벌을 정리
    return () => {
      console.log("동원 api 콜 해제")
      clearInterval(interval)
    };
  }, []); // 의존성 배열을 비워서 마운트시에만 실행되도록 함

  // Modal을 닫을 때 호출되는 함수
  const handleModalClose = () => {
    setHasRead(true); // 모달을 읽었다는 정보를 true로 설정
  };

  const handleApprovalChange  = (approvalStatus:React.SetStateAction<boolean>) => {
    setIsApproved(approvalStatus); //재난정보 수신 여부 변경
    console.log("approvalStatus@@@@@@@@@@@@@@@@@@@@@@@@@@@@@: " + approvalStatus)
    //재난 참여 안할시 저장 재난번호 초기화
    if(!approvalStatus){
      dispatch(setDisasterNumber(""));
    }
    //router.replace(`/home?menu=mobilization&status=${approvalStatus}`)
  };

  //TODO 특정 상황에 하위 페이지 이동 금지
  return (
    <Layout>
      <Container>
        <HomeMenu />
        <Children>
          {/* 홈 - 동원 */}
          {menu === 'mobilization' && <Mobilization mobilizationStatus={mobilizationStatus} onMobilizationStatusChange={setMobilizationStatus} isRequest={isRequest} hasRead={hasRead} onModalClose={handleModalClose} isApproved={isApproved} onApprovalChange={handleApprovalChange} />}
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
