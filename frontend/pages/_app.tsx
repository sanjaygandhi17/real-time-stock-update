import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store';
import React from 'react';
import './styles.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
