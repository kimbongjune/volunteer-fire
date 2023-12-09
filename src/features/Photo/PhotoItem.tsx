import React,{useEffect, useState} from 'react';
import theme from '@/theme/colors';
import styled from '@emotion/styled';
import Image from 'next/image';

import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import axios from '@/common/components/api/axios';

export type PhotoItemTyep = {
  icon: string;
  text: string;
};

const PhotoItem = (props: PhotoItemTyep) => {

  const disasterNumber = useSelector((state: RootState) => state.disaster.disasterNumber);
  const userInfo = useSelector((state: RootState) => state.userReducer.userInformation);

  useEffect(() =>{
    const sendClickStream = async () =>{
      if(userInfo){
        const clickStreamResponse = await axios.post("/api/menu_log/enter",{
          menuId : "2120",
          userId : userInfo.appUserId
        })
        console.log(clickStreamResponse.data)
      }
    }
    sendClickStream()
  }, [userInfo])

  console.log(disasterNumber)

  window.handleFileData = async (mimeType:string, base64EncoedFile:string) => {

    const extension = mimeType.split('/')[1];
    const fileName = `file.${extension}`; 
    
    const blob = convertBase64ToBlob(base64EncoedFile, mimeType);

    const formData = new FormData();
    formData.append('file', blob, fileName);
    const fileSendResponse = await axios.post(`https://view2.gnfire.go.kr:8887/chat/${disasterNumber}/${userInfo.userTel}/1/file?gubun=2`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    console.log(fileSendResponse.data)
  };

  function convertBase64ToBlob(base64:string, mimeType:string) {
    // Base64 문자열을 바이트 배열로 변환합니다.
    const byteCharacters = window.atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
  
    // 바이트 배열을 사용하여 Blob 객체를 생성합니다.
    const blob = new Blob([byteArray], { type: mimeType });
    return blob;
  }

  const handleClick = () => {

    if (window.fireAgency) {
      if (props.text === '사진찍기') {
        if (window.fireAgency && window.fireAgency.runCamera) {
          console.log("runCamera")
          window.fireAgency.runCamera();
        }
      } else if (props.text === '동영상 찍기') {
        if (window.fireAgency && window.fireAgency.runVideoCamera) {
          console.log("runVideoCamera")
          window.fireAgency.runVideoCamera();
        }
      } else if (props.text === '갤러리 첨부') {
        if (window.fireAgency && window.fireAgency.runGallery) {
          console.log("runGallery")
          window.fireAgency.runGallery();
        }
      }
    }
  }
  return (
    <Container onClick={handleClick}>
      <Image width={56} height={56} src={props.icon} alt={props.text} />
      <Text>{props.text}</Text>
    </Container>
  );
};

export default PhotoItem;

const Container = styled.button`
  padding: 24px 36px;
  border-radius: 8px;
  border: 1px solid ${theme.colors[2]};
  background-color: ${theme.colors.white};
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

const Text = styled.div`
  color: ${theme.colors[7]};
  font-family: 'Pretendard Bold';
  font-size: 28px;
  font-style: normal;
  font-weight: normal;
  line-height: 32px;
  letter-spacing: -0.56px;
`;
