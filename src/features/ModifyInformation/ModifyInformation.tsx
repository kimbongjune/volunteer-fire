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

  const userInfo = useSelector((state: RootState) => state.userReducer.userInformation);

  const datas = [
    { icon: <Call />, text: userInfo.userTel, description: '휴대전화 번호 변경하기', query: 'phoneNumber', param: userInfo.userTel},
    { icon: <House />, text: userInfo.liveBunjiAdress, description: '실제 살고 있는 주소 변경하기', query: 'address', param: userInfo.liveBunjiAdress },
    ...(userInfo.type == '3' ? [{ icon: <Bag />, text: userInfo.workBunjiAdress, description: '근무하고 있는 주소 변경하기', query: 'workAddress', param: userInfo.workBunjiAdress }] : []),
  ];
  

  const onClickMenu = (menuItemQuery: string, paramValue: string) => {
    // 모든 관련 쿼리 파라미터를 함께 설정
    setQueryParams({ menu: menuItemQuery, param: paramValue });
  };

  return (
    <>
      <MobilizationRequestHistory mobilizationTotalCount={userInfo.reqTsTime} mobilizationAcceptCount={userInfo.accTsTime} mobilizationDenyCount={userInfo.dnyTsTime}/>
      <VStack gap="8px" marginTop="8px" width="100%">
        {datas?.map((data, index) => {
          return <ModifyInformationItem key={index} onClick={() => onClickMenu(data.query, data.param)} icon={data.icon} text={data.text} description={data.description} query={data.query} />;
        })}
      </VStack>
    </>
  );
};

export default ModifyInformation;
