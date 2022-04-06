import Layout from '@components/Layout';
import { NextUIProvider } from '@nextui-org/react';

export default function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NextUIProvider>
  );
}
