import Layout from '@components/Layout';
import { NextUIProvider } from '@nextui-org/react';

import { wrapper, store } from "../store/store";
import { Provider } from "react-redux";

import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <NextUIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NextUIProvider>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);