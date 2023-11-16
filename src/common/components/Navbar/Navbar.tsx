import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Flex, VStack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import IconWrapper from '../IconWrapper/IconWrapper';
import Home from '../../../../public/images/icons/home.svg';
import Map from '../../../../public/images/icons/map.svg';
import Imagesmode from '../../../../public/images/icons/imagesmode.svg';
import Video from '../../../../public/images/icons/video.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

interface Props {
  datas: { icon: ReactNode; text: string; route: string; path: string }[];
}

const Navbar = (props: Props) => {
  const router = useRouter();

  const disasterAccptFlag = useSelector((state: RootState) => state.disaster.disasterAcceptFlag);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>, path: string) => {
    if (!disasterAccptFlag) {
      event.preventDefault(); // 재난 승인이 false일 때 이동 방지
      if(!path.includes("/home")){
        alert("동원 요청에 승인하지 않으면 사용할 수 없는 메뉴입니다.")
        return;
      }
    }
    router.push(path); // 재난 승인이 true일 때 해당 경로로 이동
  };

  return (
    <Container>
      <Flex justifyContent="space-between">
        {props?.datas.map((data, index) => {
          const isSelected = router.asPath.startsWith(data.route);
          return (
            <div key={index} onClick={(e) => handleClick(e, data.path)}>
              <VStack w="52px" gap="4px">
                <IconWrapper height="24px" width="24px" color={isSelected ? theme.colors.orange : theme.colors[2]}>
                  {data.icon}
                </IconWrapper>
                <Text isSelected={isSelected}>{data.text}</Text>
              </VStack>
            </div>
          );
        })}
      </Flex>
    </Container>
  );
};

Navbar.defaultProps = {
  datas: [
    { icon: <Home />, text: '홈', route: '/home', path: '/home?menu=mobilization' },
    { icon: <Map />, text: '지도', route: '/map', path: '/map' },
    { icon: <Imagesmode />, text: '사진', route: '/photo', path: '/photo' },
    { icon: <Video />, text: '영상', route: '/video', path: '/video' },
  ],
};
export default Navbar;

const Container = styled.div`
  padding: 16px 20px;
  border-top: 1px solid ${theme.colors[2]};
  background: ${theme.colors.white};
  width: 100%;
  position: fixed;
  bottom: 0;
`;

const Text = styled.div<{ isSelected: boolean }>`
  color: ${props => (props.isSelected ? theme.colors.orange : theme.colors[2])};
  font-family: 'Pretendard Bold';
  font-size: 16px;
  font-style: normal;
  line-height: 20px;
  letter-spacing: -0.32px;
`;
