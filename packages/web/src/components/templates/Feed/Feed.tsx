import { Card } from '@components/elements/Card';
import { CardLoader } from '@components/elements/CardLoader';
import { Box } from '@components/layout/Box';
import { useInfiniteUserFeedsQuery } from '@lib/graphql';
import { client } from '@lib/utility/graphqlClient';
import { Fragment } from 'react';

const Feed = () => {
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

  return (
    <Box mt={{ sm: '2rem' }}>
      <Box display='grid' gridTemplateColumns='1fr' rowGap={{ xs: 3, sm: 4 }}>
        {isLoading
          ? Array.from({ length: 10 }, (v, i) => `loader-${i}`).map((el) => (
              <CardLoader key={el} />
            ))
          : data?.pages.map((page, i) => (
              <Fragment key={i}>
                {page.userFeeds.posts.map(({ user, ...rest }) => (
                  <Card
                    key={rest.id}
                    post={{
                      ...rest,
                    }}
                    user={user}
                  />
                ))}
              </Fragment>
            ))}
      </Box>
    </Box>
  );
};

export default Feed;
