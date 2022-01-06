import { Box } from '@components/layout/Box';
import Header from './Header/Header';
import { useMeQuery } from '@lib/graphql';
import { client } from '@lib/utility/graphqlClient';
import { AddPost } from '../AddPost';

const AppLayout: React.FC = ({ children }) => {
  const { data: user } = useMeQuery(client, undefined, {
    staleTime: 1000 * 60 * 60 * 24,
  });

  return (
    <>
      {user?.me && (
        <Header avatar={user.me.avatar} username={user.me.username} />
      )}
      <Box as='main' minH='100%' backgroundColor='gray.0'>
        {children}
      </Box>
      {/* Create new Post */}
      <AddPost />
    </>
  );
};

export default AppLayout;
