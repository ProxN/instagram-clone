import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
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
import { Space } from '@components/layout/Space';
import { AddComment } from '../AddComment';
import { Comment } from '../Comment';
import {
  GetCommentsQuery,
  GetPostQuery,
  MeQuery,
  useDeletePostMutation,
  useGetPostQuery,
  useLikePostMutation,
  useMeQuery,
} from '@lib/graphql';
import { dayjs } from '@lib/utility/dayjs';
import { client } from '@lib/utility/graphqlClient';
import { Modal, ModalBody, ModalContent, ModalOverylay } from '../Modal';
import { Button } from '../Button';
import { useDisclosure } from '@lib/hooks/useDisclosure';
import { useRouter } from 'next/router';

interface PostCardProps {
  post_url: string;
  post_id: string;
  caption?: string | null;
  createdAt: string;
  likes: number;
  is_liked?: boolean;
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
  const [showCommentInput, setShowCommentInput] = useState(false);
  const isDesktop = useUp('md');
  const {
    post_url,
    user,
    caption,
    post_id,
    comments,
    is_liked,
    createdAt,
    likes,
    hasMoreComments,
    fetchMoreComments,
    hideGoToPostLink,
  } = props;
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const currentUser = queryClient.getQueryData<MeQuery>(useMeQuery.getKey());

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

  const handleFocusComment = () => {
    setShowCommentInput(true);
  };

  const handleCopyToClipBoard = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/home/p/${post_id}`
    );
    toast.success('Link copied to clipboard.');
    onClose();
  };

  const handleLikeClick = () => {
    mutate({ post_id });
  };

  const handleDeleteClick = () => {
    deletePost({ post_id });
  };

  useEffect(() => {
    if (showCommentInput) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [showCommentInput]);

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
            <Flex>
              <Space alignItems='center'>
                <IconButton
                  onClick={handleLikeClick}
                  ariaLabel='Post likes'
                  variant='link'
                  color={data?.likePost ?? is_liked ? 'red' : ''}
                  icon={
                    <Icon
                      name={
                        data?.likePost ?? is_liked ? 'heart-sharp' : 'heart'
                      }
                    />
                  }
                />
                <IconButton
                  onClick={handleFocusComment}
                  ariaLabel='Post comments'
                  variant='ghost'
                  icon={<Icon name='chat' />}
                />
                <IconButton
                  ariaLabel='Share'
                  variant='ghost'
                  icon={<Icon name='paper-plane' />}
                />
              </Space>
              <IconButton
                ariaLabel='Bookmark'
                variant='ghost'
                icon={<Icon name='bookmark' />}
              />
            </Flex>
            <Box mt={2}>
              <Text fontWeight='semibold' display='block'>
                {likes === 1 ? (
                  `1 like`
                ) : likes === 0 ? (
                  <Text>
                    Be the first to{' '}
                    <Text
                      onClick={handleLikeClick}
                      cursor='pointer'
                      fontWeight='bold'
                    >
                      Like this
                    </Text>
                  </Text>
                ) : (
                  `${likes} likes`
                )}
              </Text>
            </Box>
            <Text
              display='block'
              mt={2}
              size={10}
              textTransform='uppercase'
              color='gray'
            >
              {post_time}
            </Text>
          </Box>
          {(isDesktop || showCommentInput) && (
            <AddComment inputRef={inputRef} post_id={post_id} />
          )}
        </Box>
      </Box>
      {/* More Options*/}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverylay rgba={6} />
        <ModalContent>
          <ModalBody padding='0'>
            {currentUser?.me?.id === user.id && (
              <Box borderBottom='1px solid' borderColor='blackAlpha.2'>
                <Button
                  onClick={deleteOnOpen}
                  fullWidth
                  variant='ghost'
                  color='red'
                >
                  Delete
                </Button>
              </Box>
            )}

            <Box borderBottom='1px solid' borderColor='blackAlpha.2'>
              <Button fullWidth variant='ghost' color='red'>
                Report
              </Button>
            </Box>
            {user.has_followed && (
              <Box borderBottom='1px solid' borderColor='blackAlpha.2'>
                <Button fullWidth variant='ghost' color='red'>
                  Unfollow
                </Button>
              </Box>
            )}
            {!hideGoToPostLink && (
              <Box borderBottom='1px solid' borderColor='blackAlpha.2'>
                <NextLink href={`/home/p/${post_id}`}>
                  <Button fullWidth variant='ghost'>
                    Go to post
                  </Button>
                </NextLink>
              </Box>
            )}

            <Box borderBottom='1px solid' borderColor='blackAlpha.2'>
              <Button fullWidth variant='ghost'>
                Share to
              </Button>
            </Box>
            <Box borderBottom='1px solid' borderColor='blackAlpha.2'>
              <Button onClick={handleCopyToClipBoard} fullWidth variant='ghost'>
                Copy link
              </Button>
            </Box>
            <Box>
              <Button onClick={onClose} fullWidth variant='ghost'>
                Cancal
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* Delete Post Modal */}
      <Modal size='sm' isOpen={deleteIsOpen} onClose={deleteOnClose}>
        <ModalOverylay rgba={5} />
        <ModalContent>
          <ModalBody p='0'>
            <Flex
              padding='1.5rem 0'
              flexDirection='column'
              alignItems='center'
              borderBottom='1px solid'
              borderColor='blackAlpha.3'
            >
              <Text mb={2} as='h2' size='lg' fontWeight='semibold'>
                Delete Post?
              </Text>
              <Text as='span' color='gray'>
                Are you sure you want to delete this post?
              </Text>
            </Flex>
            <Box borderBottom='1px solid' borderColor='blackAlpha.3'>
              <Button
                onClick={handleDeleteClick}
                isDisabled={deletePostLoading}
                fullWidth
                variant='ghost'
                color='red'
              >
                {deletePostLoading ? 'Deleting' : 'delete'}
              </Button>
            </Box>
            <Box>
              <Button onClick={deleteOnClose} fullWidth variant='ghost'>
                Cancal
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PostCard;
