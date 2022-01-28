import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import { useUp } from '@xstyled/styled-components';
import { Box } from '@components/layout/Box';
import { Flex } from '@components/layout/Flex';
import {
  useDeletePostMutation,
  useLikePostMutation,
  UserFeedsQuery,
} from '@lib/graphql';
import { client } from '@lib/utility/graphqlClient';
import { AddComment } from '../AddComment';
import { Avatar } from '../Avatar';
import { CardFooter } from '../CardFooter';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { Text } from '../Text';
import { useInputFocus } from '@lib/hooks/useInputFocus';
import { dayjs } from '@lib/utility/dayjs';
import { PostOption } from '../PostOption';
import { useDisclosure } from '@lib/hooks/useDisclosure';
import { DeletePostModal } from '../DeletePostModal';
import { InfiniteData, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';

interface CardProps {
  post: {
    id: string;
    post_url: string;
    createdAt: string;
    likes: number;
    comments: number;
    is_liked: boolean;
    caption?: string | null;
    has_bookmark?: boolean | null;
  };
  user: {
    id: string;
    username: string;
    avatar?: string | null;
    has_followed?: boolean | null;
  };
}

const Card: React.FC<CardProps> = ({ post, user }) => {
  const isDesktop = useUp('md');
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: deleteIsOpen,
    onClose: deleteOnClose,
    onOpen: deleteOnOpen,
  } = useDisclosure();
  const [showMoreText, setShowMoreText] = useState(false);
  const { inputFocus, handleFocusInput, inputRef } = useInputFocus();
  const { mutate, data } = useLikePostMutation(client, {
    onSuccess: (data) => {
      let addOrSub = 0;
      if (data.likePost) addOrSub = +1;
      else addOrSub = -1;
      queryClient.setQueryData<InfiniteData<UserFeedsQuery>>(
        ['UserFeeds.infinite', { limit: 30 }],
        (old) => {
          const newData = old?.pages.map((page) => ({
            ...page,
            userFeeds: {
              ...page.userFeeds,
              posts: page.userFeeds.posts.map((el) =>
                el.id === post.id
                  ? {
                      ...el,
                      likes: el.likes + addOrSub,
                      is_liked: data.likePost,
                    }
                  : el
              ),
            },
          }));
          return { ...old, pages: newData } as InfiniteData<UserFeedsQuery>;
        }
      );
    },
  });

  const { mutate: deletePost, isLoading: deleteLoading } =
    useDeletePostMutation(client, {
      onSuccess: (data) => {
        if (data.deletePost.deleted) {
          queryClient.setQueriesData<InfiniteData<UserFeedsQuery>>(
            ['UserFeeds.infinite', { limit: 30 }],
            (old) => {
              const newData = old?.pages.map((page) => ({
                ...page,
                userFeeds: {
                  ...page.userFeeds,
                  posts: page.userFeeds.posts.filter((el) => el.id !== post.id),
                },
              }));
              return { ...old, pages: newData } as InfiniteData<UserFeedsQuery>;
            }
          );
          toast.success('Post deleted.');
        }
      },
    });

  const handleLikeClick = () => {
    mutate({ post_id: post.id });
  };

  const handleDeleteClick = () => {
    deletePost({ post_id: post.id });
  };

  const post_time = useMemo(() => {
    return dayjs(+post.createdAt).fromNow();
  }, [post.createdAt]);

  return (
    <>
      <Box
        backgroundColor='#fff'
        border={{ sm: '1px solid' }}
        borderColor={{ sm: 'blackAlpha.3' }}
      >
        <Flex
          padding='1.4rem 1.5rem'
          justifyContent='space-between'
          alignItems='center'
        >
          <Flex alignItems='center'>
            <Avatar addBorder src={user.avatar || '/default.jpg'} size='md' />
            <NextLink href={`/home/${user.username}`}>
              <Text cursor='pointer' as='a' ml={3}>
                {user.username}
              </Text>
            </NextLink>
          </Flex>
          <Box>
            <IconButton
              onClick={onOpen}
              variant='link'
              ariaLabel='more options'
              icon={<Icon name='ellipsis' />}
            />
          </Box>
        </Flex>
        <Box position='relative'>
          <Image
            alt='Image hespress'
            layout='responsive'
            objectFit='cover'
            height='100%'
            width='100%'
            src={post.post_url}
            priority
          />
        </Box>
        <Box p='1.2rem 1.5rem'>
          <CardFooter
            id={post.id}
            has_bookmark={post.has_bookmark}
            handleFocusComment={handleFocusInput}
            is_liked={post.is_liked}
            likes={post.likes}
            data={data}
            handleLikeClick={handleLikeClick}
          />
        </Box>
        <Box padding='0 1.5rem 1.5rem 1.5rem'>
          <Box mb='.4rem'>
            <NextLink href={`/home/${user.username}`}>
              <Text fontWeight='semibold' as='a' cursor='pointer'>
                {user.username}&nbsp;
              </Text>
            </NextLink>
            <Text>
              {post.caption && post.caption.length >= 100 && !showMoreText ? (
                <>
                  {post.caption.slice(0, 100)}
                  <Text
                    cursor='pointer'
                    onClick={() => setShowMoreText(true)}
                    color='gray'
                  >
                    ... more
                  </Text>
                </>
              ) : (
                post.caption
              )}
            </Text>
          </Box>
          <Flex flexDirection='column'>
            <NextLink
              href={{
                pathname: router.pathname,
                query: { ...router.query, postId: post.id },
              }}
              as={`/home/p/${post.id}`}
              scroll={false}
            >
              <Text cursor='pointer' color='gray'>
                View all {post.comments} comments
              </Text>
            </NextLink>
            <Text mt='.6rem' size={10} color='gray' textTransform='uppercase'>
              {post_time}
            </Text>
          </Flex>
        </Box>
        {(isDesktop || inputFocus) && (
          <AddComment inputRef={inputRef} post_id={post.id} />
        )}
      </Box>
      {/* More Options*/}
      <PostOption
        post_id={post.id}
        user_id={user.id}
        isOpen={isOpen}
        onClose={onClose}
        handleDeleteOpen={deleteOnOpen}
        has_followed={user.has_followed}
      />
      <DeletePostModal
        isOpen={deleteIsOpen}
        onClose={deleteOnClose}
        handleDeleteClick={handleDeleteClick}
        isLoading={deleteLoading}
      />
    </>
  );
};

export default Card;
