import { Box } from '@components/layout/Box';
import { Flex } from '@components/layout/Flex';
import { Space } from '@components/layout/Space';
import { LikePostMutation } from '@lib/graphql';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { Text } from '../Text';

interface CardFooterProps {
  likes: number;
  is_liked?: boolean;
  data?: LikePostMutation;
  handleFocusComment?: () => void;
  handleLikeClick?: () => void;
}

const CardFooter: React.FC<CardFooterProps> = ({
  handleLikeClick,
  handleFocusComment,
  is_liked,
  data,
  likes,
}) => {
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
    </Box>
  );
};

export default CardFooter;
