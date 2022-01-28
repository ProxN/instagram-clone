import {
  CloseModalButton,
  Modal,
  ModalContent,
  ModalOverylay,
} from '@components/elements/Modal';
import { PostCard } from '@components/elements/PostCard';
import { PostCardLoader } from '@components/elements/PostCardLoader';
import { useGetPostQuery } from '@lib/graphql';
import { useGetComments } from '@lib/hooks/useGetComments';
import { client } from '@lib/utility/graphqlClient';
import { useUp } from '@xstyled/styled-components';
import { useRouter } from 'next/router';

const PostModal = () => {
  const desktopScreen = useUp('md');
  const router = useRouter();
  const post_id = router.query.postId as string;

  const { data, isLoading } = useGetPostQuery(client, {
    post_id,
  });
  const {
    data: comments,
    hasNextPage,
    fetchNextPage,
  } = useGetComments(post_id);

  const handlePostClose = () => {
    const { ['postId']: _, ...rest } = router.query;
    router.push({ pathname: router.pathname, query: rest }, undefined, {
      scroll: false,
    });
  };

  if (!(data && data.getPost)) return null;

  return (
    <Modal
      onClose={handlePostClose}
      size={desktopScreen ? 'xl' : 'lg'}
      isOpen={!!router.query.postId}
    >
      <ModalOverylay rgba={8} />
      <ModalContent>
        <CloseModalButton isFixed />
        {isLoading ? (
          <PostCardLoader />
        ) : (
          <PostCard
            hasMoreComments={hasNextPage}
            fetchMoreComments={fetchNextPage}
            createdAt={data.getPost.createdAt}
            comments={comments}
            has_bookmark={data.getPost.has_bookmark}
            likes={data.getPost.likes}
            post_id={data.getPost.id}
            is_liked={data.getPost.is_liked}
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
      </ModalContent>
    </Modal>
  );
};

export default PostModal;
