import { Fragment } from 'react';
import { InfiniteData } from 'react-query';
import { Card } from '@components/elements/Card';
// import { CardLoader } from '@components/elements/CardLoader';
import { Box } from '@components/layout/Box';
import { UserFeedsQuery } from '@lib/graphql';

interface FeedProps {
  data?: InfiniteData<UserFeedsQuery>;
}

const Feed: React.FC<FeedProps> = ({ data }) => {
  return (
    <Box>
      <Box display='grid' gridTemplateColumns='1fr' rowGap={{ xs: 3, sm: 4 }}>
        {data?.pages.map((page, i) => (
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
