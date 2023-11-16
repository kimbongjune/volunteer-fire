import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import CprBox, { CprItemType } from './CprBox';

const CPR = () => {

  const [videos, setVideos] = useState<CprItemType[]>([]);

  useEffect(() => {
    setVideos([
      { title: 'CRP-성인', date: '2023.09.08', playTime: '1분', video: "/videos/cpr_adult.mp4", poster : "/images/poster/cpr_adult_poster.png" },
      { title: 'CPR-소아', date: '2023.09.09', playTime: '1분 4초', video: "/videos/cpr_child.mp4", poster : "/images/poster/cpr_child_poster.png" },
      { title: 'CPR-유아', date: '2023.09.09', playTime: '1분 2초', video: "/videos/cpr_baby.mp4", poster : "/images/poster/cpr_baby_poster.png" },
      { title: '하임리히-성인', date: '2023.09.09', playTime: '23초', video: "/videos/heimlich_adult.mp4", poster : "/images/poster/heimlich_adult_poster.png" },
      { title: '하임리히-소아', date: '2023.09.09', playTime: '15초', video: "/videos/heimlich_child.mp4", poster : "/images/poster/heimlich_child_poster.png" },
      { title: '하임리히-영아', date: '2023.09.09', playTime: '17초', video: "/videos/heimlich_baby.mp4", poster : "/images/poster/heimlich_baby_poster.png" },
      { title: '자세변경-호흡곤란', date: '2023.09.09', playTime: '35초', video: "/videos/change_posture_difficulty_breath.mp4", poster : "/images/poster/change_posture_difficulty_breath_poster.png" },
      { title: '자세변경-복통', date: '2023.09.09', playTime: '30초', video: "/videos/change_posture_stomachache.mp4", poster : "/images/poster/change_posture_stomachache_poster.png" },
      { title: '자세변경-좌측위', date: '2023.09.09', playTime: '26초', video: "/videos/change_posture_left_up.mp4", poster : "/images/poster/change_posture_left_up_poster.png" },
    ]);
  }, []);

  return (
    <Container>
      {videos?.map((data, index) => {
        return <CprBox poster={data.poster} key={index} title={data.title} date={data.date} playTime={data.playTime} video={data.video} />;
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
