import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { QueryParamProvider } from 'use-query-params';
import NextAdapterPages from 'next-query-params/pages';
import { theme } from '../theme';
import { Provider } from 'react-redux';
import store from '../app/store';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    console.log('_app.tsx useEffect');
    //전역 JavaScript 함수를 window 객체에 바인딩
    (window as any).fireAgency = {
      //TODO 네이티브 앱으로부터 메시지를 받는 로직 구현
      // postMessage: (message: any) => {
      //   console.log('Received message:', message);
        
      // },
    };
  }, []);
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme} resetCSS>
        <QueryParamProvider adapter={NextAdapterPages}>
          <Component {...pageProps} />
        </QueryParamProvider>
      </ChakraProvider>
    </Provider>
  );
}
