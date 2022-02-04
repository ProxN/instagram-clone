import { useState } from 'react';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Preflight, ThemeProvider } from '@xstyled/styled-components';
import { Theme } from '@lib/theme';
import { GlobalStyles } from '@lib/styles';
import AppLayout from '@components/templates/AppLayout/AppLayout';
import type { ToasterProps } from '@components/elements/Toaster';

const DynamicToaster = dynamic<ToasterProps>(() =>
  import('@components/elements/Toaster').then((mod) => mod.Toaster)
);

const authLinks = [
  '/signin',
  '/login',
  '/signup',
  '/forgot_password',
  '/reset_password',
];

const App = (props: AppProps) => {
  const { Component, pageProps } = props;
  const router = useRouter();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      })
  );

  return (
    <ThemeProvider theme={{ ...Theme, colorMode: 'light' }}>
      <Preflight />
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        {!authLinks.includes(router.pathname) ? (
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        ) : (
          <Component {...pageProps} />
        )}
        <ReactQueryDevtools />
      </QueryClientProvider>
      <DynamicToaster />
    </ThemeProvider>
  );
};

export default App;
