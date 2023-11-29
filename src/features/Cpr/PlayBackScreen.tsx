import styled from '@emotion/styled';
import { useState } from 'react';
import theme from '@/theme/colors';
import VideoPlayer from '@/common/components/Player/VideoPlayer';

interface Props {
  video: string;
}

const PlayBackScreen = (props: Props) => {
  const [isPlayed, setIsPlayed] = useState(false);
  const [isFullSize, setIsFullSize] = useState(false);
  const [isHorizontal, setIsHorizontal] = useState(false);

  return (
    <Wrapper className="123" isHorizontal={isHorizontal} isFullSize={isFullSize}>
      <VideoSection isHorizontal={isHorizontal} isFullSize={isFullSize}>
        <VideoPlayer onClick={() => setIsFullSize(!isFullSize)} isHorizontal={isHorizontal} />
      </VideoSection>
    </Wrapper>
  );
};

export default PlayBackScreen;

const Wrapper = styled.div<{ isHorizontal?: boolean; isFullSize?: boolean }>`
  top: 0;
  position: absolute;
  background: black;
  width: 100vw;
  height: 100vh;
  z-index: 100;

  display: flex;
  flex-direction: column;
  justify-content: center;

  ${({ isFullSize }) =>
    isFullSize &&
    `
    padding: unset;
  `}
`;

const VideoSection = styled.div<{ isHorizontal?: boolean; isFullSize?: boolean }>`
  background: ${theme.colors[2]};
  width: 100%;

  ${({ isHorizontal }) =>
    isHorizontal &&
    `
    height: 100vh;
    padding-bottom: unset;
    video {
        height: 100%;
        padding: 0 71px;
        object-fit: cover;
        background: black;
      }
  `}

  ${({ isFullSize }) =>
    isFullSize &&
    `
      video {
        height: 100vh !important;
        object-fit: cover;
        padding: unset;
      }
  `}
`;