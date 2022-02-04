import { useQueryClient } from 'react-query';
import { Box } from '@components/layout/Box';
import Header from './Header/Header';
import { AddPost } from '../AddPost';
import { MeQuery, useMeQuery } from '@lib/graphql';

const AppLayout: React.FC = ({ children }) => {
  const queryClient = useQueryClient();

  const user = queryClient.getQueryData<MeQuery>(useMeQuery.getKey());
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
