import dynamic from 'next/dynamic';
import { Box } from '@components/layout/Box';
import { useMeQuery } from '@lib/graphql';
import { client } from '@lib/utility/graphqlClient';
import type { HeaderProps } from './Header/Header';

const DynamicHeader = dynamic<HeaderProps>(() =>
  import('./Header/Header').then((mod) => mod.Header)
);

const AppLayout: React.FC = ({ children }) => {
  const { data: user } = useMeQuery(client, undefined, {
    staleTime: 1000 * 60 * 60 * 24,
    retry: false,
  });

  return (
    <>
      {user && user.me && <DynamicHeader />}
      <Box as='main' minH='calc(100vh - 6rem)' backgroundColor='gray.0'>
        {children}
      </Box>
    </>
  );
};

export default AppLayout;
