import Layout from '@components/Layout';
import { NextUIProvider } from '@nextui-org/react';
// import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NextUIProvider>
  );
}
