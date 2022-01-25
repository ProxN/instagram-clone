import { Box } from '@components/layout/Box';
import Header from './Header/Header';
import { useMeQuery } from '@lib/graphql';
import { client } from '@lib/utility/graphqlClient';
import { AddPost } from '../AddPost';
import { Loader } from '@components/elements/Loader';

const AppLayout: React.FC = ({ children }) => {
  const { data: user, isLoading } = useMeQuery(client, undefined, {
    staleTime: 1000 * 60 * 60 * 24,
  });

  if (isLoading)
    return (
      <Box
        h='100vh'
        w='100%'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <Loader />
      </Box>
    );

  return (
    <>
      {user?.me && (
        <Header avatar={user.me.avatar} username={user.me.username} />
      )}
      <Box as='main' minH='calc(100vh - 6rem)' backgroundColor='gray.0'>
        {children}
      </Box>
      {/* Create new Post */}
      <AddPost />
    </>
  );
};

export default AppLayout;
