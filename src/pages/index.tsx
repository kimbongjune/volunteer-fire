import { useEffect } from 'react';
import Loading from './loading';
import { useRouter } from 'next/router';
import axios, {setAuthToken} from "../common/components/api/axios"

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      //TODO 앱의 roomdb에 자동로그인 정보가 저장되어있는지 확인.
      const isAutoLogin = false;
      if(!isAutoLogin){
        try {
          const token = "";
          //있다면 axios 인스턴스에 토큰 할당
          setAuthToken(token)
          //TODO axios를 사용하여 토큰 검증 요청 및 네이티브의 vpn 로그인 같이 진행
          await axios.get('/verify-token');
          // 성공하면 자동으로 홈 페이지로 리디렉션
          router.replace('/home?menu=mobilization');
        } catch (error) {
          // 토큰 검증에 실패하면 로그인 페이지로 리디렉션
          router.replace('/logIn');
        }
      }else{
        router.replace('/logIn');
      }
    };

    verifyToken();
  }, [router]);

  return <Loading />;
};

export default Index;