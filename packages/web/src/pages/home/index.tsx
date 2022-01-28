import { useRouter } from 'next/router';
import { Box } from '@components/layout/Box';
import { Feed } from '@components/templates/Feed';
import { PostModal } from '@components/elements/PostModal';
import Stories from '@components/templates/Stories/Stories';
import { Suggestions } from '@components/elements/Suggestions';
import {
  useInfiniteFollowerSuggestionQuery,
  useInfiniteUserFeedsQuery,
} from '@lib/graphql';
import { useShow } from '@lib/hooks/useShow';
import { withUser } from '@lib/utility/withUser';
import { client } from '@lib/utility/graphqlClient';
import { Loader } from '@components/elements/Loader';
import { Flex } from '@components/layout/Flex';
import { Text } from '@components/elements/Text';
import { Follow } from '@components/elements/Follow';

const Home = () => {
  const { show } = useShow(['lg', 'xl']);
  const router = useRouter();

  const { data, isLoading } = useInfiniteUserFeedsQuery(
    'cursor',
    client,
    {
      limit: 30,
      cursor: undefined,
    },
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.userFeeds.hasMore) return undefined;
        const postsLength = lastPage.userFeeds.posts.length;
        return { cursor: lastPage.userFeeds.posts[postsLength - 1].createdAt };
      },
    }
  );

  const { data: suggestions, isLoading: suggestionsLoading } =
    useInfiniteFollowerSuggestionQuery('cursor', client, { limit: 30 });

  if (data && data.pages[0].userFeeds.posts.length === 0)
    return (
      <Box as='section' padding='3rem'>
        <Box mx='auto' maxW='54rem'>
          <Text
            as='h2'
            size='md'
            fontWeight='semibold'
            mb={2}
            display='inline-block'
          >
            Suggestions for you
          </Text>
          <Flex
            background='#fff'
            border='1px solid'
            borderColor='blackAlpha.3'
            padding='1rem 1.5rem'
            flexDirection='column'
          >
            {suggestionsLoading ? (
              <Flex h='4rem' justifyContent='center'>
                <Loader />
              </Flex>
            ) : (
              suggestions?.pages[0].followerSuggestion.users.map((el) => (
                <Follow
                  key={el.id}
                  username={el.username}
                  avatar={el.avatar}
                  id={el.id}
                  name={el.name}
                  buttonText='follow'
                />
              ))
            )}
          </Flex>
        </Box>
      </Box>
    );

  return (
    <Box
      as='section'
      padding={{ sm: '3rem 0' }}
      mx='auto'
      maxW={{ xs: '64.6rem', lg: '94rem' }}
    >
      <Box display='flex'>
        <Box flex='1' mr={{ lg: '2rem' }} maxW={{ md: '100%', lg: '64.6rem' }}>
          {isLoading ? (
            <Flex paddingTop={20} alignItems='center' justifyContent='center'>
              <Loader />
            </Flex>
          ) : (
            <>
              {/* <Stories /> */}
              <Feed data={data} />
            </>
          )}
        </Box>
        {show && <Suggestions />}
      </Box>
      {!!router.query.postId && <PostModal />}
    </Box>
  );
};

export default withUser(Home);
