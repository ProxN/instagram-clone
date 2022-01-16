import { useInfiniteGetCommentsQuery } from '@lib/graphql';
import { client } from '@lib/utility/graphqlClient';

export const useGetComments = (post_id: string) => {
  const query = useInfiniteGetCommentsQuery(
    'cursor',
    client,
    {
      post_id,
      limit: 30,
      cursor: undefined,
    },
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.getComments.hasMore) return undefined;
        const commentsLength = lastPage.getComments.comments.length;
        return {
          cursor: lastPage.getComments.comments[commentsLength - 1].createdAt,
        };
      },
    }
  );
  return query;
};
