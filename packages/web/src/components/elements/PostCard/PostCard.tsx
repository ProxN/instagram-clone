import { Fragment, useMemo } from 'react';
import Image from 'next/image';
import {
  FetchNextPageOptions,
  InfiniteData,
  useQueryClient,
} from 'react-query';
import toast from 'react-hot-toast';
import { useUp } from '@xstyled/styled-components';
import { Box } from '@components/layout/Box';
import { Flex } from '@components/layout/Flex';
import { Avatar } from '../Avatar';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { Text } from '../Text';
import { AddComment } from '../AddComment';
import { Comment } from '../Comment';
import {
  GetCommentsQuery,
  GetPostQuery,
  useDeletePostMutation,
  useGetPostQuery,
  useLikePostMutation,
} from '@lib/graphql';
import { dayjs } from '@lib/utility/dayjs';
import { client } from '@lib/utility/graphqlClient';
import { useDisclosure } from '@lib/hooks/useDisclosure';
import { useRouter } from 'next/router';
import { CardFooter } from '../CardFooter';
import { useInputFocus } from '@lib/hooks/useInputFocus';
import { PostOption } from '../PostOption';
import { DeletePostModal } from '../DeletePostModal';

interface PostCardProps {
  post_url: string;
  post_id: string;
  caption?: string | null;
  createdAt: string;
  likes: number;
  is_liked?: boolean;
  has_bookmark?: boolean | null;
  user: {
    id: string;
    username: string;
    avatar?: string | null;
    has_followed?: boolean | null;
  };
  comments?: InfiniteData<GetCommentsQuery>;
  hasMoreComments?: boolean;
  hideGoToPostLink?: boolean;
  fetchMoreComments?: (options?: FetchNextPageOptions) => void;
}

const PostCard: React.FC<PostCardProps> = (props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: deleteIsOpen,
    onClose: deleteOnClose,
    onOpen: deleteOnOpen,
  } = useDisclosure();
  const isDesktop = useUp('md');
  const { inputRef, handleFocusInput, inputFocus } = useInputFocus();
  const {
    post_url,
    user,
    caption,
    post_id,
    comments,
    is_liked,
    createdAt,
    likes,
    has_bookmark,
    hasMoreComments,
    fetchMoreComments,
    hideGoToPostLink,
  } = props;

  const { mutate, data } = useLikePostMutation(client, {
    onSuccess: (data) => {
      let addOrSub = 0;
      if (data.likePost) addOrSub = +1;
      else addOrSub = -1;

      queryClient.setQueryData<GetPostQuery>(
        useGetPostQuery.getKey({ post_id }),
        (old: any) => {
          return {
            ...old,
            getPost: { ...old.getPost, likes: old.getPost.likes + addOrSub },
          };
        }
      );
    },
  });

  const { mutate: deletePost, isLoading: deletePostLoading } =
    useDeletePostMutation(client, {
      onSuccess: (data) => {
        if (data.deletePost.deleted) {
          router.push(`/home/${user.username}`);
          queryClient.invalidateQueries([
            'GetUserPosts.infinite',
            { limit: 30, user_id: user.id },
          ]);
          toast.success('Post deleted.');
        }
      },
    });

  const post_time = useMemo(() => {
    return dayjs(+createdAt).fromNow();
  }, [createdAt]);

  const handleLikeClick = () => {
    mutate({ post_id });
  };

  const handleDeleteClick = () => {
    deletePost({ post_id });
  };

  return (
    <>
      <Box
        display='grid'
        gridTemplateRows='6rem 1fr auto'
        gridTemplateColumns='1fr 20% 1fr'
      >
        <Box
          gridRow='1 / -1'
          gridColumn='1 / 3'
          position='relative'
          display={{ xs: 'none', md: 'block' }}
        >
          <Image
            alt='test'
            src={post_url}
            layout='responsive'
            objectFit='cover'
            width='100%'
            height='100%'
          />
        </Box>
        {/* Header */}
        <Box
          display={{ md: 'flex' }}
          flexDirection={{ md: 'column' }}
          gridRow='1 / -1'
          gridColumn={{ xs: '1/-1', md: '3 / -1' }}
        >
          <Flex
            p='1rem 1.5rem'
            w='100%'
            alignItems='center'
            justifyContent='space-between'
          >
            <Flex alignItems='center'>
              <Avatar src={user.avatar || '/default.jpg'} />
              <Text fontWeight='semibold' ml={4}>
                {user.username}
                {user.has_followed && (
                  <Text as='span' fontWeight='semibold'>
                    &nbsp;• Following
                  </Text>
                )}
              </Text>
            </Flex>
            <IconButton
              onClick={onOpen}
              variant='ghost'
              ariaLabel='More'
              icon={<Icon name='ellipsis' />}
            />
          </Flex>
          {/* Content */}
          <Box position='relative' display={{ xs: 'block', md: 'none' }}>
            <Image
              alt='test'
              src={post_url}
              layout='responsive'
              objectFit='cover'
              width='100%'
              height='100%'
            />
          </Box>
          {/* Comments */}
          <Box
            borderTop='1px solid'
            borderColor='blackAlpha.2'
            display={{ xs: 'none', md: 'block' }}
            flex={{ md: '1 0 1px' }}
            overflow='hidden auto'
            padding='1rem 1.5rem'
          >
            {caption && (
              <Comment
                username={user.username}
                avatar={user.avatar}
                time={createdAt}
                comment={caption}
              />
            )}
            {comments?.pages.map((page, i) => (
              <Fragment key={i}>
                {page.getComments.comments.map((el) => (
                  <Comment
                    key={el.id}
                    time={el.createdAt}
                    comment={el.text}
                    username={el.user.username}
                    avatar={el.user.avatar}
                  />
                ))}
              </Fragment>
            ))}
            {hasMoreComments && (
              <Flex justifyContent='center'>
                <IconButton
                  onClick={fetchMoreComments}
                  variant='ghost'
                  ariaLabel='More comments'
                  icon={<Icon name='plus' />}
                />
              </Flex>
            )}
          </Box>
          {/* Footer */}
          <Box
            p='1rem 1.5rem'
            mt='.6rem'
            borderTop={{ md: '1px solid' }}
            borderColor={{ md: 'blackAlpha.2' }}
          >
            <CardFooter
              id={post_id}
              has_bookmark={has_bookmark}
              likes={likes}
              data={data}
              is_liked={is_liked}
              handleLikeClick={handleLikeClick}
              handleFocusComment={handleFocusInput}
            />
            <Text
              display='block'
              mt='.6rem'
              size={10}
              textTransform='uppercase'
              color='gray'
            >
              {post_time}
            </Text>
          </Box>
          {(isDesktop || inputFocus) && (
            <AddComment inputRef={inputRef} post_id={post_id} />
          )}
        </Box>
      </Box>
      {/* More Options*/}
      <PostOption
        post_id={post_id}
        user_id={user.id}
        isOpen={isOpen}
        onClose={onClose}
        has_followed={user.has_followed}
        hideGoToPostLink={hideGoToPostLink}
        handleDeleteOpen={deleteOnOpen}
      />
      {/* Delete Post Modal */}
      <DeletePostModal
        isOpen={deleteIsOpen}
        onClose={deleteOnClose}
        handleDeleteClick={handleDeleteClick}
        isLoading={deletePostLoading}
      />
    </>
  );
};

export default PostCard;
