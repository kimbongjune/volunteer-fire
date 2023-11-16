import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { QueryParamProvider } from 'use-query-params';
import NextAdapterPages from 'next-query-params/pages';
import { theme } from '../theme';
import { Provider } from 'react-redux';
import { store, persistor } from '../app/store'; // `store`와 `persistor`를 불러옵니다
import { PersistGate } from 'redux-persist/integration/react'; // PersistGate를 불러옵니다
import GlobalFunctionHandler from '../features/global/GlobalFunctionHandler';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={theme} resetCSS>
          <QueryParamProvider adapter={NextAdapterPages}>
            <GlobalFunctionHandler />
            <Component {...pageProps} />
          </QueryParamProvider>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
}
