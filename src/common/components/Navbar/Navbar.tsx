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

interface Props {
  datas: { icon: ReactNode; text: string; route: string; path: string }[];
}

const Navbar = (props: Props) => {
  const router = useRouter();

  return (
    <Container>
      <Flex justifyContent="space-between">
        {props?.datas.map((data, index) => {
          const isSelected = router.asPath.startsWith(data.route);
          return (
            <Link href={data.path} key={index}>
              <VStack w="52px" gap="4px">
                <IconWrapper height="24px" width="24px" color={isSelected ? theme.colors.orange : theme.colors[2]}>
                  {data.icon}
                </IconWrapper>
                <Text isSelected={isSelected}>{data.text}</Text>
              </VStack>
            </Link>
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
