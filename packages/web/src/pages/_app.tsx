import { useState } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Preflight, ThemeProvider } from '@xstyled/styled-components';
import { Theme } from '@lib/theme';
import { GlobalStyles } from '@lib/styles';
import { Toaster } from '@components/elements/Toaster';
import AppLayout from '@components/templates/AppLayout/AppLayout';

const authLinks = [
  '/',
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
      <Toaster />
    </ThemeProvider>
  );
};

export default App;
