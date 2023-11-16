import React, { useState, useEffect } from 'react';
import MobilizationList from './MobilizationList';
import NoMobilization from './NoMobilization';
import RequestModal from '@/common/components/Modal/RequestModal';

interface Props {
  isRequest?: boolean; //동원 요청 알림 여부
  mobilizationStatus?: boolean;
  hasRead: boolean;
  onModalClose: () => void;
  isApproved:boolean
  onMobilizationStatusChange: (isApproved:React.SetStateAction<boolean>) => void;
  onApprovalChange: (isApproved:React.SetStateAction<boolean>) => void;
  title: string;
  address: string;
  time: string;
}

const Mobilization = (props: Props) => {  
  return (
    <>
      {/* 동원(소집) 요청이 있고, 사용자가 아직 알림을 읽지 않았을 경우 모달을 보여줌. */}
      {props.isRequest && !props.hasRead && (
        <RequestModal title={props.title} onClickButton={props.onModalClose} />
      )}
      {/* 동원(소집) 요청이 있고, 사용자가 알림을 읽었으면, 동원 목록을 보여줌. */}
      {props.isRequest && props.hasRead && (!props.mobilizationStatus || props.isApproved) &&(
        <MobilizationList time={props.time} address={props.address} title={props.title} mobilizationStatus={props.mobilizationStatus!!} onMobilizationStatusChange={props.onMobilizationStatusChange} isApproved={props.isApproved} onApprovalChange={props.onApprovalChange} />
      )}
      {/* 동원(소집) 요청이 없을 경우, 'NoMobilization' 컴포넌트를 보여줌. */}
      {props.isRequest && props.mobilizationStatus && !props.isApproved &&(
        <NoMobilization />
      )}
      {/* 동원(소집) 요청이 없을 경우, 'NoMobilization' 컴포넌트를 보여줌. */}
      {!props.isRequest && (
        <NoMobilization />
      )}
    </>
  );
};

Mobilization.defaultProps = {
  isRequest: true,
};
export default Mobilization;
