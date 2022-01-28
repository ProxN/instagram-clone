import Error from 'next/error';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';
import NextLink from 'next/link';
import { QueryClient, dehydrate, useQueryClient } from 'react-query';
import { Avatar } from '@components/elements/Avatar';
import { Button } from '@components/elements/Button';
import { Icon } from '@components/elements/Icon';
import { IconButton } from '@components/elements/IconButton';
import { Text } from '@components/elements/Text';
import { Box } from '@components/layout/Box';
import { Flex } from '@components/layout/Flex';
import {
  GetUserProfileQuery,
  MeQuery,
  useFollowMutation,
  useGetUserProfileQuery,
  useMeQuery,
  useUnFollowMutation,
} from '@lib/graphql';
import { client } from '@lib/utility/graphqlClient';
import { Loader } from '@components/elements/Loader';
import { SettingsModal } from '@components/templates/SettingsModal';
import { useDisclosure } from '@lib/hooks/useDisclosure';
import { UserPosts } from '@components/templates/UserPosts';
import { FollowersModal } from '@components/templates/FollowersModal';
import FollowingModal from '@components/templates/FollowingModal/FollowingModal';
import { UnFollowModal } from '@components/elements/UnFollowModal';
import { useState } from 'react';
import { SavedPosts } from '@components/templates/SavedPosts';

type Tabs = 'posts' | 'saved';

const Profile = ({ username }: { username: string }) => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<Tabs>('posts');
  const queryClient = useQueryClient();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const {
    isOpen: settingsOpen,
    onClose: onCloseSettings,
    onOpen: onSettingsOpen,
  } = useDisclosure();
  const { data, isLoading } = useGetUserProfileQuery(client, {
    username,
  });

  const { mutate: followMutation, isLoading: followIsLoading } =
    useFollowMutation(client, {
      onSuccess: (data) => {
        if (data.follow.result) {
          queryClient.setQueryData<GetUserProfileQuery>(
            useGetUserProfileQuery.getKey({ username }),
            (old: any) => {
              return {
                ...old,
                getUserProfile: { ...old?.getUserProfile, has_followed: true },
              };
            }
          );
        }
      },
    });
  const { mutate: unFollowMutation, isLoading: unFollowLoading } =
    useUnFollowMutation(client, {
      onSuccess: (data) => {
        if (data.unFollow.result) {
          queryClient.setQueryData<GetUserProfileQuery>(
            useGetUserProfileQuery.getKey({ username }),
            (old: any) => {
              return {
                ...old,
                getUserProfile: { ...old?.getUserProfile, has_followed: false },
              };
            }
          );
        }
        onClose();
      },
    });

  const currentUser = queryClient.getQueryData<MeQuery>(useMeQuery.getKey());

  if (isLoading)
    return (
      <Flex h='calc(100vh - 6rem)' justifyContent='center' alignItems='center'>
        <Loader />
      </Flex>
    );

  if (!data || !data.getUserProfile) return <Error statusCode={404} />;

  const followHandler = () => {
    if (!data.getUserProfile?.id) return;
    followMutation({ follower_id: data.getUserProfile.id });
  };

  const unFollowHandler = () => {
    if (!data.getUserProfile?.id) return;
    unFollowMutation({ follower_id: data.getUserProfile.id });
  };

  const handleTabClick = (tab: Tabs) => {
    setCurrentTab(tab);
  };

  return (
    <>
      <Box as='section' padding='3rem 0'>
        <Box mx='auto' maxW='94rem' padding={{ sm: '0 2em' }}>
          {/* Top profile */}
          <Flex padding='0 1.5rem' alignItems='center'>
            <Box mr={{ xs: 8, md: 14 }}>
              <Avatar
                size='2xl'
                src={data.getUserProfile.avatar || '/default.jpg'}
              />
            </Box>
            <Flex w='100%' flexDirection={{ md: 'column' }}>
              <Flex
                flexDirection={{ xs: 'column', md: 'row' }}
                alignItems={{ xs: 'flex-start', md: 'center' }}
                maxW={{ xs: 'sm', md: 'xl' }}
                w='100%'
              >
                <Flex alignItems='center' mb={{ xs: 3, md: 0 }}>
                  <Text size={{ xs: 'lg', md: '2xl' }} mr={{ xs: 3, md: 0 }}>
                    {data.getUserProfile.username}
                  </Text>
                  {currentUser?.me?.id === data.getUserProfile.id ? (
                    <Box display={{ xs: 'inline', md: 'none' }}>
                      <IconButton
                        onClick={onSettingsOpen}
                        variant='ghost'
                        ariaLabel='settings'
                        icon={<Icon name='settings' />}
                      />
                    </Box>
                  ) : null}
                </Flex>
                {/* Actions Links */}
                <Flex ml={{ md: 3 }}>
                  {currentUser?.me?.id === data.getUserProfile.id ? (
                    <NextLink href='/accounts/edit'>
                      <Button size='sm' variant='outline' as='a'>
                        Edit profile
                      </Button>
                    </NextLink>
                  ) : data.getUserProfile.has_followed ? (
                    <>
                      <NextLink
                        href={`/home/inbox?userId=${data.getUserProfile.id}&username=${data.getUserProfile.username}`}
                        as={`/home/inbox/${data.getUserProfile.id}`}
                      >
                        <Button mr={2} size='sm' variant='outline'>
                          Message
                        </Button>
                      </NextLink>
                      <Button onClick={onOpen} size='sm' variant='outline'>
                        Unfollow
                      </Button>
                    </>
                  ) : (
                    currentUser?.me && (
                      <Button
                        onClick={followHandler}
                        isLoading={followIsLoading}
                        disabled={isLoading}
                        size='sm'
                        isPrimary
                      >
                        Follow
                      </Button>
                    )
                  )}
                </Flex>
                {currentUser?.me?.id === data.getUserProfile.id && (
                  <Box display={{ xs: 'none', md: 'inline' }} ml={{ md: 3 }}>
                    <IconButton
                      onClick={onSettingsOpen}
                      variant='ghost'
                      ariaLabel='settings'
                      icon={<Icon name='settings' />}
                    />
                  </Box>
                )}
              </Flex>
              {/* stats */}
              <Flex as='ul' mt={3} display={{ xs: 'none', md: 'flex' }}>
                <li>
                  <Box mr={8}>
                    <Text
                      size={{ xs: 'sm', md: 'md' }}
                      as='span'
                      fontWeight='semibold'
                    >
                      {data?.getUserProfile?.stats.posts}
                    </Text>
                    <Text size={{ xs: 'sm', md: 'md' }} as='span'>
                      &nbsp;Posts
                    </Text>
                  </Box>
                </li>

                <li>
                  <NextLink
                    href={{
                      pathname: router.pathname,
                      query: { ...router.query, followers: 'list' },
                    }}
                    as={`${router.asPath}/followers`}
                    scroll={false}
                  >
                    <Box cursor='pointer' mr={8}>
                      <Text
                        size={{ xs: 'sm', md: 'md' }}
                        as='span'
                        fontWeight='semibold'
                      >
                        {data?.getUserProfile?.stats.followers}
                      </Text>
                      <Text size={{ xs: 'sm', md: 'md' }} as='span'>
                        &nbsp;
                        {data && (data.getUserProfile.stats.followers || 0) > 1
                          ? 'Followers'
                          : 'Follower'}
                      </Text>
                    </Box>
                  </NextLink>
                </li>
                <li>
                  <NextLink
                    href={{
                      pathname: router.pathname,
                      query: { ...router.query, following: 'list' },
                    }}
                    as={`${router.asPath}/following`}
                    scroll={false}
                  >
                    <Box cursor='pointer'>
                      <Text
                        size={{ xs: 'sm', md: 'md' }}
                        as='span'
                        fontWeight='semibold'
                      >
                        {data?.getUserProfile?.stats.following}
                      </Text>
                      <Text size={{ xs: 'sm', md: 'md' }} as='span'>
                        &nbsp;Following
                      </Text>
                    </Box>
                  </NextLink>
                </li>
              </Flex>
            </Flex>
          </Flex>
          {/* Profile Info */}
          <Flex padding='0 1.5rem' mt={8} flexDirection={'column'}>
            <Text size={{ xs: 'sm', md: 'md' }} fontWeight='semibold'>
              {data?.getUserProfile?.name}
            </Text>
            <Text size={{ xs: 'sm', md: 'md' }}>
              {data?.getUserProfile?.bio}
            </Text>
            {data?.getUserProfile?.website && (
              <Text
                size={{ xs: 'sm', md: 'md' }}
                as='a'
                isLink
                fontWeight='semibold'
                href={data?.getUserProfile?.website || '#'}
              >
                {data?.getUserProfile?.website}
              </Text>
            )}
          </Flex>
          {/* Stats Mobile */}
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
                <Text fontWeight='semibold'>
                  {data.getUserProfile.stats.posts}
                </Text>
                <Text color='gray'>posts</Text>
              </Flex>
            </li>
            <NextLink
              href={{
                pathname: router.pathname,
                query: { ...router.query, followers: 'list' },
              }}
              as={`${router.asPath}/followers`}
            >
              <li style={{ flex: '1' }}>
                <Flex
                  flex='1'
                  cursor='pointer'
                  flexDirection='column'
                  alignItems='center'
                >
                  <Text fontWeight='semibold'>
                    {data.getUserProfile.stats.followers}
                  </Text>
                  <Text color='gray'>followers</Text>
                </Flex>
              </li>
            </NextLink>
            <NextLink
              href={{
                pathname: router.pathname,
                query: { ...router.query, following: 'list' },
              }}
              as={`${router.asPath}/following`}
            >
              <li style={{ flex: '1' }}>
                <Flex
                  cursor='pointer'
                  flexDirection='column'
                  alignItems='center'
                >
                  <Text fontWeight='semibold'>
                    {data.getUserProfile.stats.following}
                  </Text>
                  <Text color='gray'>following</Text>
                </Flex>
              </li>
            </NextLink>
          </Flex>
          {/* Tabs */}
          <Flex
            mt={{ md: 8 }}
            justifyContent={{ md: 'center' }}
            h='5.4rem'
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
              borderTop={{
                xs: 'none',
                md: currentTab === 'posts' ? '2px solid transparent' : 'none',
              }}
              borderColor={{ md: 'blackAlpha.7' }}
              onClick={() => handleTabClick('posts')}
              color={currentTab === 'posts' ? 'inherit' : 'gray.6'}
            >
              <Box
                fontSize={{ xs: '2.4rem', md: '1.2rem' }}
                mr={{ md: '.6rem' }}
              >
                <Icon name='film' />
              </Box>
              <Text
                display={{ xs: 'none', md: 'inline' }}
                fontWeight='semibold'
                textTransform='uppercase'
              >
                Posts
              </Text>
            </Flex>
            <Flex
              flex={{ xs: 1, md: 'none' }}
              justifyContent='center'
              cursor='pointer'
              alignItems='center'
              mr={{ md: '4rem' }}
              color={currentTab === 'saved' ? 'inherit' : 'gray.6'}
              borderTop={{
                xs: 'none',
                md: currentTab === 'saved' ? '2px solid transparent' : 'none',
              }}
              borderColor={{ md: 'blackAlpha.7' }}
              onClick={() => handleTabClick('saved')}
            >
              <Box
                fontSize={{ xs: '2.4rem', md: '1.2rem' }}
                mr={{ md: '.6rem' }}
              >
                <Icon name='bookmark' />
              </Box>
              <Text
                display={{ xs: 'none', md: 'inline' }}
                fontWeight='semibold'
                textTransform='uppercase'
              >
                saved
              </Text>
            </Flex>
            <Flex
              flex={{ xs: 1, md: 'none' }}
              justifyContent='center'
              alignItems='center'
              cursor='pointer'
              color='gray.6'
            >
              <Box
                fontSize={{ xs: '2.4rem', md: '1.2rem' }}
                mr={{ md: '.6rem' }}
              >
                <Icon name='people' />
              </Box>
              <Text
                display={{ xs: 'none', md: 'inline' }}
                fontWeight='semibold'
                textTransform='uppercase'
              >
                Tagged
              </Text>
            </Flex>
          </Flex>
          {/* Profile Posts */}
          {currentTab === 'posts' ? (
            <UserPosts user_id={data.getUserProfile.id} />
          ) : currentTab === 'saved' ? (
            <SavedPosts />
          ) : (
            'hasTgas'
          )}
        </Box>
      </Box>
      {/* Modal */}
      <SettingsModal isOpen={settingsOpen} onClose={onCloseSettings} />
      <UnFollowModal
        isLoading={unFollowLoading}
        handleUnFollow={unFollowHandler}
        id={data.getUserProfile.id}
        username={username}
        isOpen={isOpen}
        onClose={onClose}
        avatar={data.getUserProfile.avatar}
      />
      {!!router.query.followers && (
        <FollowersModal
          currentUser={currentUser?.me?.id === data.getUserProfile.id}
          user_id={data.getUserProfile.id}
        />
      )}
      {!!router.query.following && (
        <FollowingModal user_id={data.getUserProfile.id} />
      )}
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const queryClient = new QueryClient();
  const headers: HeadersInit = new Headers();
  const cookie =
    context.req?.headers['cookie'] && context.req?.headers['cookie'];
  const username = context.query.profile as string;

  if (cookie) {
    headers.set('cookie', cookie);
  }
  await queryClient.prefetchQuery(
    useGetUserProfileQuery.getKey({ username }),
    useGetUserProfileQuery.fetcher(client, { username }, headers)
  );

  return {
    props: {
      username,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Profile;
