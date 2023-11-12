import React from 'react';
import styled from '@emotion/styled';
import CprBox, { CprItemType } from './CprBox';

interface Props {
  datas: CprItemType[];
}

const CPR = (props: Props) => {
  return (
    <Container>
      {props?.datas?.map((data, index) => {
        return <CprBox key={index} title={data.title} date={data.date} playTime={data.playTime} video={data.video} />;
      })}
    </Container>
  );
};

CPR.defaultProps = {
  datas: [
    { title: '환자 상태 확인', date: '2023.09.08', playTime: '1분 32초', video: '' },
    { title: '도움 요청 - 119 신고', date: '2023.09.09', playTime: '1분 2초', video: '' },
    { title: '환자 상태 확인', date: '2023.09.10', playTime: '1분 10초', video: '' },
    { title: '환자 상태 확인', date: '2023.09.11', playTime: '1분', video: '' },
  ],
};

export default CPR;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
