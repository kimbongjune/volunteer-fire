import React from 'react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import { Flex } from '@chakra-ui/react';
import { useQueryParam } from 'use-query-params';

interface Props {
  datas: { title: string; query: string }[];
}

const HomeMenu = (props: Props) => {
  const [query, setQuery] = useQueryParam('menu');

  const onClickMenu = (query: string) => {
    setQuery(query);
  };

  return (
    <Container>
      <Flex gap="16px">
        {props?.datas.map((data, index) => {
          const isSelected = data.query === query;
          return (
            <MenuItem key={index} onClick={() => onClickMenu(data.query)} isSelected={isSelected}>
              {data.title}
            </MenuItem>
          );
        })}
      </Flex>
    </Container>
  );
};

HomeMenu.defaultProps = {
  datas: [{ title: '동원', query: 'mobilization' }, { title: 'CPR', query: 'cpr' }, , { title: '내정보', query: 'myInfo' }],
};
export default HomeMenu;

const Container = styled.div`
  width: 100%;
  background: ${theme.colors.orange};
  padding: 24px 16px;
`;

const MenuItem = styled.a<{ isSelected: boolean }>`
  color: ${theme.colors[8]};
  font-family: 'Pretendard Bold';
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: -0.48px;
  display: block;
  padding-bottom: 8px;
  border-bottom: ${props => props.isSelected && `3px solid ${theme.colors[8]}`};
`;
