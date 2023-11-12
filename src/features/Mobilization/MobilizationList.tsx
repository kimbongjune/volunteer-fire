import React from 'react';
import MobilizationListItem from './MobilizationListItem';

interface Props {
  mobilizationStatus: boolean;
  isApproved:Boolean
  onMobilizationStatusChange: (isApproved:React.SetStateAction<boolean>) => void;
  onApprovalChange: (isApproved:React.SetStateAction<boolean>) => void;
}

const MobilizationList = (props: Props) => {
  return <MobilizationListItem mobilizationStatus={props.mobilizationStatus} onMobilizationStatusChange={props.onMobilizationStatusChange} isApproved={props.isApproved} onApprovalChange={props.onApprovalChange}/>;
};

export default MobilizationList;
