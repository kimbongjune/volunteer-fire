import React from 'react';
import MobilizationListItem from './MobilizationListItem';

interface Props {
  mobilizationStatus: boolean;
  isApproved:boolean
  onMobilizationStatusChange: (isApproved:React.SetStateAction<boolean>) => void;
  onApprovalChange: (isApproved:React.SetStateAction<boolean>) => void;
  title: string;
  address: string;
  time: string;
}

const MobilizationList = (props: Props) => {
  return <MobilizationListItem time={props.time} address={props.address} title={props.title} mobilizationStatus={props.mobilizationStatus} onMobilizationStatusChange={props.onMobilizationStatusChange} isApproved={props.isApproved} onApprovalChange={props.onApprovalChange}/>;
};

export default MobilizationList;
