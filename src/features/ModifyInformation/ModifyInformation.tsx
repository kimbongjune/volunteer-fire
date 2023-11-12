import React from 'react';
import { VStack } from '@chakra-ui/react';
import MobilizationRequestHistory from './MobilizationRequestHistory';
import ModifyInformationItem, { ModifyInformationItemType } from './ModifyInformationItem';
import Call from '../../../public/images/icons/call.svg';
import House from '../../../public/images/icons/house.svg';
import Bag from '../../../public/images/icons/bag.svg';
import { useQueryParam, withDefault, StringParam } from 'use-query-params';

interface Props {
  datas: ModifyInformationItemType[];
}

const ModifyInformation = (props: Props) => {
  const [query, setQuery] = useQueryParam('menu', withDefault(StringParam, undefined));

  const onClickMenu = (query?: string) => {
    setQuery(query);
  };

  return (
    <>
      <MobilizationRequestHistory />
      <VStack gap="8px" marginTop="8px" width="100%">
        {props?.datas?.map((data, index) => {
          return <ModifyInformationItem key={index} onClick={onClickMenu} icon={data.icon} text={data.text} description={data.description} query={data.query} />;
        })}
      </VStack>
    </>
  );
};

ModifyInformation.defaultProps = {
  datas: [
    { icon: <Call />, text: '010-1234-5678', description: '휴대전화 번호 변경하기', query: 'phoneNumber' },
    { icon: <House />, text: '장유시 율하 도로명 123-456', description: '실제 살고 있는 주소 변경하기', query: 'address' },
    { icon: <Bag />, text: '장유시 율하 도로명 123-456', description: '근무하고 있는 주소 변경하기', query: 'workAddress' },
  ],
};

export default ModifyInformation;
