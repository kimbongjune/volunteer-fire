import theme from '@/theme/colors';
import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect, useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import PauseIcon from '../../../../public/images/icons/pause.svg';
import FullScreen from '../../../../public/images/icons/fullScrenn.svg';

interface Props {
  url: string;
  isHorizontal?: boolean;
  onClick?: () => void;
}

const VideoPlayer = (props: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const playerRef = useRef<ReactPlayer | null>(null);

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const handleProgress = ({ playedSeconds }: { playedSeconds: number }) => {
    setCurrentTime(Math.round(playedSeconds));
    setProgress(Math.round(playedSeconds));
  };

  const handleDuration = (duration: number) => {
    setDuration(duration); // 총 시간 업데이트
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleProgressBarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = event.currentTarget;
    const clickPosition = event.clientX - progressBar.getBoundingClientRect().left;
    const percentage = (clickPosition / progressBar.clientWidth) * 100;
    const seekTime = (percentage / 100) * duration;

    if (playerRef.current) {
      playerRef.current.seekTo(seekTime);
    }
  };

  return (
    <Wrapper onClick={togglePlay}>
      {!isPlaying && (
        <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" p="4px" bg="rgba(0, 0, 0, 0.60)" borderRadius="4px" zIndex={100}>
          <PauseIcon width="32px" height="32px" color="white"/>
        </Box>
      )}
      <Box h="100%" position={props.isHorizontal ? "static" : "relative"}>
        <ReactPlayer ref={playerRef} url={props.url} width={'100%'} height={'100%'} playing={isPlaying} onProgress={handleProgress} onDuration={handleDuration}/>
        <Controller isHorizontal={props.isHorizontal}>
          <PassedTime className="passed-time">{formatTime(Number(currentTime.toFixed(0)))}</PassedTime>
          <ProgressBar className="progress-bar" onClick={handleProgressBarClick}>{duration > 0 && <CurrentBar className="current-progress" progress style={{ width: `${(progress / Math.round(duration)) * 100}%` }} />}</ProgressBar>
          <TotalTime className="total-time">{formatTime(Number(duration.toFixed(0)))}</TotalTime>
          <FullScreen width="20px" height="20px" color="white" onClick={props.onClick}/>
        </Controller>
      </Box>
    </Wrapper>
  );
};

export default VideoPlayer;

VideoPlayer.defaultProps = {
  url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: black;

  // video::-webkit-media-controls-panel {
  //   display: none;
  // }

  z-index: 100000;
`;

const PlayButton = styled.button``;

const ProgressBar = styled.div`
  position: relative;
  width: 100%;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 4px;
`;

const CurrentBar = styled.div<any>`
  z-index: 2;
  left: 0;
  top: 0;
  height: 100%;
  background-color: ${theme.colors.white};
  position: relative;

  &::after {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 25px;
    background: ${theme.colors.white};
    position: absolute;
    top: -2.6px;
    right: -3px;
  }
`;

const PassedTime = styled.div`
  color: ${theme.colors.white};
  font-family: Pretendard SemiBold;
  font-size: 12px;
  line-height: 14px; /* 116.667% */
  letter-spacing: -0.24px;
`;

const TotalTime = styled.div`
  color: #909AA4;
  font-family: Pretendard SemiBold;
  font-size: 12px;
  line-height: 14px; /* 116.667% */
  letter-spacing: -0.24px;
`;

const Controller = styled.div<{isHorizontal?: boolean}>`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  gap: 20px;

  padding: 0 16px;
  margin-bottom: 8px;

  ${({isHorizontal}) => isHorizontal && `
    padding: 0 40px;
  `}
`