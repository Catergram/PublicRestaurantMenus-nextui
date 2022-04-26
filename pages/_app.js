import Layout from '@components/Layout';
import { NextUIProvider } from '@nextui-org/react';

import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
      <NextUIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NextUIProvider>
  );
}

export default MyApp;