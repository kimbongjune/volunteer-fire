import React,{useState} from 'react';
import theme from '@/theme/colors';
import styled from '@emotion/styled';
import Image from 'next/image';

export type PhotoItemTyep = {
  icon: string;
  text: string;
};

const PhotoItem = (props: PhotoItemTyep) => {

  const [previewSource, setPreviewSource] = useState('');
  const [mimeType, setMimeType] = useState('');

  window.handleFileData = (mimeType:string, base64EncoedFile:string) => {
    
    const previewDataUri = `data:${mimeType};base64,${base64EncoedFile}`;
    setMimeType(mimeType)
    setPreviewSource(previewDataUri);

    const extension = mimeType.split('/')[1];
    const fileName = `file.${extension}`; 
    
    const blob = convertBase64ToBlob(base64EncoedFile, mimeType);
    console.log(`blob is ${blob}`)

    const formData = new FormData();
    formData.append('file', blob, fileName);
    console.log(`formData is ${formData}`)
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
      {previewSource && (
        mimeType === 'image/jpeg' ? (
          <img src={previewSource} alt="Preview" />
        ) : (
          <video src={previewSource} controls />
        )
      )}
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
