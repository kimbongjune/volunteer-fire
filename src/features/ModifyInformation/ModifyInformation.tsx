import React from 'react';
import { VStack } from '@chakra-ui/react';
import MobilizationRequestHistory from './MobilizationRequestHistory';
import ModifyInformationItem, { ModifyInformationItemType } from './ModifyInformationItem';
import Call from '../../../public/images/icons/call.svg';
import House from '../../../public/images/icons/house.svg';
import Bag from '../../../public/images/icons/bag.svg';
import { useQueryParams, withDefault, StringParam } from 'use-query-params';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';


const ModifyInformation = () => {
  const [queryParams, setQueryParams] = useQueryParams({
    menu: StringParam,
    param: StringParam,
  });

  const mobilizationTotalCount = useSelector((state: RootState) => state.userReducer.mobilizationTotalCount);
  const mobilizationAcceptCount = useSelector((state: RootState) => state.userReducer.mobilizationAcceptCount);
  const mobilizationDenyCount = useSelector((state: RootState) => state.userReducer.mobilizationDenyCount);
  const phone = useSelector((state: RootState) => state.userReducer.phone);
  const address = useSelector((state: RootState) => state.userReducer.address);
  const workAddress = useSelector((state: RootState) => state.userReducer.workAddress);

  const datas = [
    { icon: <Call />, text: phone, description: '휴대전화 번호 변경하기', query: 'phoneNumber', param: phone},
    { icon: <House />, text: address, description: '실제 살고 있는 주소 변경하기', query: 'address', param: address },
    { icon: <Bag />, text: workAddress, description: '근무하고 있는 주소 변경하기', query: 'workAddress', param: workAddress },
  ];

  const onClickMenu = (menuItemQuery: string, paramValue: string) => {
    // 모든 관련 쿼리 파라미터를 함께 설정
    setQueryParams({ menu: menuItemQuery, param: paramValue });
  };

  return (
    <>
      <MobilizationRequestHistory mobilizationTotalCount={mobilizationTotalCount} mobilizationAcceptCount={mobilizationAcceptCount} mobilizationDenyCount={mobilizationDenyCount}/>
      <VStack gap="8px" marginTop="8px" width="100%">
        {datas?.map((data, index) => {
          return <ModifyInformationItem key={index} onClick={() => onClickMenu(data.query, data.param)} icon={data.icon} text={data.text} description={data.description} query={data.query} />;
        })}
      </VStack>
    </>
  );
};

export default ModifyInformation;
