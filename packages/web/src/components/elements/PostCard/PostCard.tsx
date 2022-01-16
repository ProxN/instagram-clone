import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { FetchNextPageOptions, InfiniteData } from 'react-query';
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
import { GetCommentsQuery } from '@lib/graphql';
import { dayjs } from '@lib/utility/dayjs';

interface PostCardProps {
  post_url: string;
  post_id: string;
  caption?: string | null;
  createdAt: string;
  user: {
    username: string;
    avatar?: string | null;
    has_followed?: boolean | null;
  };
  comments?: InfiniteData<GetCommentsQuery>;
  hasMoreComments?: boolean;
  fetchMoreComments?: (options?: FetchNextPageOptions) => void;
}

const PostCard: React.FC<PostCardProps> = (props) => {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const isDesktop = useUp('md');
  const {
    post_url,
    user,
    caption,
    post_id,
    comments,
    createdAt,
    hasMoreComments,
    fetchMoreComments,
  } = props;

  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const post_time = useMemo(() => {
    return dayjs(+createdAt).fromNow();
  }, [createdAt]);

  const handleFocusComment = () => {
    setShowCommentInput(true);
  };

  useEffect(() => {
    if (showCommentInput) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [showCommentInput]);

  return (
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
                ariaLabel='Post likes'
                variant='ghost'
                icon={<Icon name='heart' />}
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
              4,428 likes
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
  );
};

export default PostCard;
