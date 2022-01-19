import Error from 'next/error';
import { useRouter } from 'next/router';
import { PostCard } from '@components/elements/PostCard';
import { Box } from '@components/layout/Box';
import { useGetPostQuery } from '@lib/graphql';
import { client } from '@lib/utility/graphqlClient';
import { useGetComments } from '@lib/hooks/useGetComments';
import { PostCardLoader } from '@components/elements/PostCardLoader';

const Post = () => {
  const router = useRouter();
  const post_id = router.query.id as string;
  const { data, isLoading } = useGetPostQuery(client, {
    post_id,
  });
  const {
    data: comments,
    hasNextPage,
    fetchNextPage,
  } = useGetComments(post_id);

  if (!data || !data.getPost) return <Error statusCode={404} />;

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
          <PostCard
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
        )}
      </Box>
    </Box>
  );
};

export default Post;
