import { useRouter } from 'next/router';
import Image from 'next/image';
import { Avatar } from '@components/elements/Avatar';
import { Button } from '@components/elements/Button';
import { Icon } from '@components/elements/Icon';
import { IconButton } from '@components/elements/IconButton';
import { Text } from '@components/elements/Text';
import { Box } from '@components/layout/Box';
import { Flex } from '@components/layout/Flex';
import { useGetUserProfileQuery } from '@lib/graphql';
import { client } from '@lib/utility/graphqlClient';
import { Loader } from '@components/elements/Loader';
import { NextPageContext } from 'next';
import { QueryClient, dehydrate } from 'react-query';

export async function getServerSideProps(context: NextPageContext) {
  const queryClient = new QueryClient();
  const username = context.query.profile as string;

  await queryClient.prefetchQuery(
    useGetUserProfileQuery.getKey({ username }),
    useGetUserProfileQuery.fetcher(client, { username })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const Profile = () => {
  const router = useRouter();
  const username = (router.query.profile as string) || '';
  const { data, isLoading } = useGetUserProfileQuery(client, {
    username,
  });

  if (isLoading)
    return (
      <Flex h='calc(100vh - 6rem)' justifyContent='center' alignItems='center'>
        <Loader />
      </Flex>
    );

  return (
    <Box as='section' padding='3rem 0'>
      <Box mx='auto' maxW='94rem' padding={{ sm: '0 2em' }}>
        {/* Top profile */}
        <Flex padding='0 1.5rem' alignItems='center'>
          <Box mr={8}>
            <Avatar size='xl' src={data?.getUserProfile?.avatar} />
          </Box>
          <Flex flexDirection={{ md: 'column' }}>
            <Flex
              flexDirection={{ xs: 'column', md: 'row' }}
              maxW={{ xs: 'sm', md: 'xl' }}
              w='100%'
            >
              <Flex alignItems='center' mb={3} mr={{ md: 4 }}>
                <Text size='2xl' mr={3}>
                  {data?.getUserProfile?.username}
                </Text>
                <IconButton
                  variant='ghost'
                  ariaLabel='settings'
                  icon={<Icon name='settings' />}
                />
              </Flex>
              <Button variant='outline'>Edit profile</Button>
            </Flex>
            <Flex as='ul' mt={1} display={{ xs: 'none', md: 'flex' }}>
              <li>
                <Box cursor='pointer' mr={8}>
                  <Text as='span' fontWeight='semibold'>
                    {data?.getUserProfile?.stats.posts}
                  </Text>
                  <Text as='span'>&nbsp;Posts</Text>
                </Box>
              </li>
              <li>
                <Box cursor='pointer' mr={8}>
                  <Text as='span' fontWeight='semibold'>
                    {data?.getUserProfile?.stats.followers}
                  </Text>
                  <Text as='span'>&nbsp;Follower</Text>
                </Box>
              </li>
              <li>
                <Box cursor='pointer'>
                  <Text as='span' fontWeight='semibold'>
                    {data?.getUserProfile?.stats.following}
                  </Text>
                  <Text as='span'>&nbsp;Following</Text>
                </Box>
              </li>
            </Flex>
          </Flex>
        </Flex>
        {/* Profile Info */}
        <Flex padding='0 1.5rem' mt={8} flexDirection={'column'}>
          <Text fontWeight='semibold'>{data?.getUserProfile?.name}</Text>
          <Text>{data?.getUserProfile?.bio}</Text>
          {data?.getUserProfile?.website && (
            <Text
              as='a'
              isLink
              fontWeight='semibold'
              href={data?.getUserProfile?.website || '#'}
            >
              {data?.getUserProfile?.website}
            </Text>
          )}
        </Flex>
        {/* Stats */}
        <Flex
          display={{ xs: 'flex', md: 'none' }}
          as='ul'
          mt={4}
          borderTop='1px solid'
          borderBottom='1px solid'
          borderColor='blackAlpha.3'
          padding='1rem 0'
        >
          <li style={{ flex: '1' }}>
            <Flex flex='1' flexDirection='column' alignItems='center'>
              <Text fontWeight='semibold'>10</Text>
              <Text color='gray'>posts</Text>
            </Flex>
          </li>
          <li style={{ flex: '1' }}>
            <Flex
              flex='1'
              cursor='pointer'
              flexDirection='column'
              alignItems='center'
            >
              <Text fontWeight='semibold'>10</Text>
              <Text color='gray'>follower</Text>
            </Flex>
          </li>
          <li style={{ flex: '1' }}>
            <Flex cursor='pointer' flexDirection='column' alignItems='center'>
              <Text fontWeight='semibold'>10</Text>
              <Text color='gray'>following</Text>
            </Flex>
          </li>
        </Flex>
        <Flex
          mt={{ md: 8 }}
          justifyContent={{ md: 'center' }}
          h='5rem'
          borderBottom={{ xs: '1px solid', md: 'none' }}
          borderTop={{ md: '1px solid' }}
          borderColor={{ xs: 'blackAlpha.3', md: 'blackAlpha.3' }}
        >
          <Flex
            flex={{ xs: 1, md: 'none' }}
            justifyContent='center'
            cursor='pointer'
            alignItems='center'
            mr={{ md: '4rem' }}
            borderTop='2px solid '
            borderColor='blackAlpha.7'
          >
            <Box fontSize='1.2rem' mr={{ md: '.6rem' }}>
              <Icon name='film' />
            </Box>
            <Text fontWeight='semibold' textTransform='uppercase'>
              Posts
            </Text>
          </Flex>
          <Flex
            flex={{ xs: 1, md: 'none' }}
            justifyContent='center'
            cursor='pointer'
            alignItems='center'
            mr={{ md: '4rem' }}
            color='gray.6'
          >
            <Box fontSize='1.2rem' mr={{ md: '.6rem' }}>
              <Icon name='bookmark' />
            </Box>
            <Text fontWeight='semibold' textTransform='uppercase'>
              Bookmark
            </Text>
          </Flex>
          <Flex
            flex={{ xs: 1, md: 'none' }}
            justifyContent='center'
            alignItems='center'
            cursor='pointer'
            color='gray.6'
          >
            <Box fontSize='1.2rem' mr={{ md: '.6rem' }}>
              <Icon name='people' />
            </Box>
            <Text fontWeight='semibold' textTransform='uppercase'>
              Tagged
            </Text>
          </Flex>
        </Flex>
        {/* Profile Posts */}
        <Flex
          backgroundColor='#fff'
          flexDirection={{ xs: 'column', md: 'row-reverse' }}
          alignItems={{ md: 'center' }}
        >
          <Flex padding='4rem 0' justifyContent='center' w='100%'>
            <Text fontWeight='semibold'>
              Start capturing and sharing your moments.
            </Text>
          </Flex>
          <Box flex={{ md: '70%' }}>
            <Image
              alt='default picture'
              src='/pic.jpg'
              layout='responsive'
              width='100%'
              height='100%'
            />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Profile;
