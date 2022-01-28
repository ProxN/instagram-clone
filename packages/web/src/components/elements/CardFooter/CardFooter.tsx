import { Box } from '@components/layout/Box';
import { Flex } from '@components/layout/Flex';
import { Space } from '@components/layout/Space';
import {
  LikePostMutation,
  useBookmarkPostMutation,
  useUnBookmarkPostMutation,
} from '@lib/graphql';
import { client } from '@lib/utility/graphqlClient';
import { useState } from 'react';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { Text } from '../Text';

interface CardFooterProps {
  likes: number;
  is_liked?: boolean;
  has_bookmark?: boolean | null;
  id: string;
  data?: LikePostMutation;
  handleFocusComment?: () => void;
  handleLikeClick?: () => void;
}

const CardFooter: React.FC<CardFooterProps> = ({
  handleLikeClick,
  handleFocusComment,
  is_liked,
  has_bookmark,
  data,
  likes,
  id,
}) => {
  const [bookmark, setBookmark] = useState(has_bookmark);
  const { mutate: bookmarkMutation } = useBookmarkPostMutation(client, {
    onSuccess: (data) => {
      if (data.bookmarkPost) {
        setBookmark(true);
      }
    },
  });
  const { mutate: unBookmarkMutation } = useUnBookmarkPostMutation(client, {
    onSuccess: (data) => {
      if (data.unBookmarkPost) {
        setBookmark(false);
      }
    },
  });

  const handleSaveClick = () => {
    bookmarkMutation({ post_id: id });
  };

  const handleUnSaveClick = () => {
    unBookmarkMutation({ post_id: id });
  };
  return (
    <Box>
      <Flex>
        <Space alignItems='center'>
          <IconButton
            onClick={handleLikeClick}
            ariaLabel='Post likes'
            variant='link'
            color={data?.likePost ?? is_liked ? 'red' : ''}
            icon={
              <Icon
                name={data?.likePost ?? is_liked ? 'heart-sharp' : 'heart'}
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
          onClick={bookmark ? handleUnSaveClick : handleSaveClick}
          ariaLabel='Bookmark'
          variant='ghost'
          icon={<Icon name={bookmark ? 'bookmark-sharp' : 'bookmark'} />}
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
    </Box>
  );
};

export default CardFooter;
