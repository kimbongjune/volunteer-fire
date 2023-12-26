import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import CprBox, { CprItemType } from './CprBox';
import { Box, Flex } from '@chakra-ui/react';
import theme from '@/theme/colors';
import AudioPlayer from '@/common/components/Player/AudioPlayer';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import axios from '@/common/components/api/axios';


const CPR = () => {

  const [videos, setVideos] = useState<CprItemType[]>([]);

  const userInfo = useSelector((state: RootState) => state.userReducer.userInformation);

  useEffect(() =>{
    const sendClickStream = async () =>{
      if(userInfo){
        const clickStreamResponse = await axios.post("/api/menu_log/enter",{
          menuId : "2200",
          userId : userInfo.appUserId
        })
        console.log(clickStreamResponse.data)
      }
    }
    sendClickStream()
  }, [userInfo])

  // useEffect(() => {
  //   setVideos([
  //     { title: 'CRP-성인', date: '2023.12.18', playTime: '1분', video: "/videos/cpr_adult.mp4" },
  //     { title: 'CPR-소아', date: '2023.09.09', playTime: '1분 4초', video: "/videos/cpr_child.mp4" },
  //     { title: 'CPR-유아', date: '2023.09.09', playTime: '1분 2초', video: "/videos/cpr_baby.mp4" },
  //     { title: '하임리히-성인', date: '2023.09.09', playTime: '23초', video: "/videos/heimlich_adult.mp4" },
  //     { title: '하임리히-소아', date: '2023.09.09', playTime: '15초', video: "/videos/heimlich_child.mp4" },
  //     { title: '하임리히-영아', date: '2023.09.09', playTime: '17초', video: "/videos/heimlich_baby.mp4"},
  //     { title: '자세변경-호흡곤란', date: '2023.09.09', playTime: '35초', video: "/videos/change_posture_difficulty_breath.mp4"},
  //     { title: '자세변경-복통', date: '2023.09.09', playTime: '30초', video: "/videos/change_posture_stomachache.mp4" },
  //     { title: '자세변경-좌측위', date: '2023.09.09', playTime: '26초', video: "/videos/change_posture_left_up.mp4" },
  //   ]);
  // }, []);

  useEffect(() => {
    setVideos([
      { title: 'AED 사용법', date: '2023.12.18', playTime: '52초', video: "/videos/aed_use.mp4" },
      { title: 'CPR-성인', date: '2023.12.18', playTime: '1분 46초', video: "/videos/cpr_adult.mp4" },
      { title: 'CPR-소아', date: '2023.12.18', playTime: '1분 48초', video: "/videos/cpr_child.mp4" },
      { title: 'CPR-유아', date: '2023.12.18', playTime: '1분 47초', video: "/videos/cpr_baby.mp4" },
      { title: '성인소아-기도폐쇄', date: '2023.12.18', playTime: '48초', video: "/videos/heimlich_adult_child.mp4" },
      { title: '영아-기도폐쇄', date: '2023.12.18', playTime: '1분 30초', video: "/videos/heimlich_baby.mp4"},
      { title: '성인소아-경련중', date: '2023.12.18', playTime: '42초', video: "/videos/convulsions_adult_child.mp4"},
      { title: '영아-경련중', date: '2023.12.18', playTime: '31초', video: "/videos/convulsions_baby.mp4"},
      { title: '성인소아-의식저하', date: '2023.12.18', playTime: '34초', video: "/videos/consciousness_adult_child.mp4" },
      { title: '영아-의식저하', date: '2023.12.18', playTime: '29초', video: "/videos/consciousness_baby.mp4" },
    ]);
  }, []);

  return (
    <Container>
      <Box bg={theme.colors.white} p="16px" border={`1px solid ${theme.colors[2]}`} borderRadius="8px">
        <Flex align="center" gap="8px" p="8px" border={`1px solid ${theme.colors[2]}`} borderRadius="4px" flex={1}>
          <AudioFileName>메트로놈</AudioFileName>
          <Box h="12px" outline={`0.5px solid ${theme.colors[3]}`} m="0 8px" />
          <AudioPlayer url="/audio/CPR_Metronome_110BPM.mp3" />
        </Flex>
      </Box>
      {videos.map((data, index) => {
        {console.log(data)}
        return <CprBox  key={index} title={data.title} date={data.date} playTime={data.playTime} video={data.video}/>;
      })}
    </Container>
  );
};

export default CPR;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AudioFileName = styled.div`
  color: ${theme.colors[8]};
  font-family: Pretendard SemiBold;
  font-size: 12px;
  line-height: 16px; /* 133.333% */
  letter-spacing: -0.24px;
`;