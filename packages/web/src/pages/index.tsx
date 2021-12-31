import Link from 'next/link';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { useMeQuery, useLogoutMutation } from '@lib/graphql';
import { client } from '@lib/utility/graphqlClient';
import { Button } from '@components/elements/Button';
import { Heading } from '@components/elements/Heading';
import { Box } from '@components/layout/Box';
import { Center } from '@components/layout/Center';
import { Space } from '@components/layout/Space';
import { Loader } from '@components/elements/Loader';

const Index = () => {
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useMeQuery(client, undefined, {
    staleTime: 1000 * 60 * 60 * 24,
  });

  const { mutate, isLoading: logoutLoading } = useLogoutMutation(client, {
    onSuccess: (data) => {
      if (data.logout) {
        queryClient.invalidateQueries('Me');
        toast.success('Successfully logged out!');
      }
    },
  });

  return (
    <Box>
      <Center minH='100vh'>
        {isLoading ? (
          <Loader />
        ) : user?.me ? (
          <Box>
            <Heading mb={2} as='h1' size={{ xs: '2xl', md: '3xl' }}>
              Hello, {user?.me.name}!
            </Heading>
            <Center>
              <Button
                isLoading={logoutLoading}
                onClick={() => mutate({})}
                variant='outline'
              >
                logout
              </Button>
            </Center>
          </Box>
        ) : (
          <Box>
            <Heading as='h1' size={{ xs: '3xl', md: '4xl' }}>
              Welcome to the Fullstack boilerplate
            </Heading>
            <Space mt='1rem' justifyContent='center'>
              <Link passHref href='/login'>
                <Button as='a' variant='ghost'>
                  Log in
                </Button>
              </Link>
              <Link passHref href='/signup'>
                <Button as='a' color='violet'>
                  Sign up
                </Button>
              </Link>
            </Space>
          </Box>
        )}
      </Center>
    </Box>
  );
};

export default Index;
