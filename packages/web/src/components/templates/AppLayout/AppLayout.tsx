import { useQueryClient } from 'react-query';
import { Box } from '@components/layout/Box';
import Header from './Header/Header';
import { AddPost } from '../AddPost';
import { useMeQuery } from '@lib/graphql';
import { client } from '@lib/utility/graphqlClient';

const AppLayout: React.FC = ({ children }) => {
  const { data: user } = useMeQuery(client, undefined, {
    staleTime: 1000 * 60 * 60 * 24,
    retry: false,
  });

  return (
    <>
      {user && user.me && <Header />}
      <Box as='main' minH='calc(100vh - 6rem)' backgroundColor='gray.0'>
        {children}
      </Box>
      {/* Create new Post */}
      <AddPost />
    </>
  );
};

export default AppLayout;
