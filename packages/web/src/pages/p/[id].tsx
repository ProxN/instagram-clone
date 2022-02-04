import Error from 'next/error';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Box } from '@components/layout/Box';
import { useGetPostQuery } from '@lib/graphql';
import { client } from '@lib/utility/graphqlClient';
import { useGetComments } from '@lib/hooks/useGetComments';
import { PostCardLoader } from '@components/elements/PostCardLoader';
import { withUser } from '@lib/utility/withUser';
import type { PostCardProps } from '@components/elements/PostCard';

const DynamicPostCard = dynamic<PostCardProps>(() =>
  import('@components/elements/PostCard').then((mod) => mod.PostCard)
);

const Post = () => {
  const router = useRouter();
  const post_id = router.query.id as string;
  const { data, isLoading, status } = useGetPostQuery(client, {
    post_id,
  });
  const {
    data: comments,
    hasNextPage,
    fetchNextPage,
  } = useGetComments(post_id);

  if (status === 'success' && (!data || !data.getPost))
    return <Error statusCode={404} />;

  return (
    <Box as='section' padding='5rem 0'>
      <Box
        mx='auto'
        maxW='94rem'
        background='#fff'
        border='1px solid'
        borderColor='blackAlpha.3'
      >
        {isLoading ? (
          <PostCardLoader />
        ) : (
          data &&
          data.getPost && (
            <DynamicPostCard
              hideGoToPostLink={true}
              hasMoreComments={hasNextPage}
              fetchMoreComments={fetchNextPage}
              createdAt={data.getPost.createdAt}
              comments={comments}
              likes={data.getPost.likes}
              post_id={data.getPost.id}
              post_url={data.getPost.post_url}
              caption={data.getPost.caption}
              user={{
                id: data.getPost.user.id,
                username: data.getPost.user.username,
                avatar: data.getPost.user.avatar,
                has_followed: data.getPost.user.has_followed,
              }}
            />
          )
        )}
      </Box>
    </Box>
  );
};

export default withUser(Post);
