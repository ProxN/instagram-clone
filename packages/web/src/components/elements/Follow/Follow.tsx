import NextLink from 'next/link';
import { Flex } from '@components/layout/Flex';
import { Avatar } from '../Avatar';
import { Button, ButtonProps } from '../Button';
import { Text } from '../Text';

interface FollowProps {
  name: string;
  username: string;
  avatar?: string | null;
  has_followed?: boolean | null;
  buttonText: string;
  buttonProps?: ButtonProps;
}

const Follow: React.FC<FollowProps> = ({
  name,
  username,
  avatar,
  buttonText,
  buttonProps,
  has_followed,
}) => {
  return (
    <Flex alignItems='center' mb={{ xs: 3, last: 0 }}>
      <Avatar src={avatar || '/default.jpg'} />
      <Flex flexDirection='column' ml={3} flex='1'>
        <Text>
          <NextLink href={`/home/${username}`}>
            <Text
              cursor='pointer'
              textDecoration={{ hover: 'underline' }}
              fontWeight='semibold'
              as='a'
            >
              {username}
            </Text>
          </NextLink>

          {typeof has_followed === 'boolean' && !has_followed && (
            <>
              &nbsp;·&nbsp;
              <Text size='xs' as='span' isLink>
                Follow
              </Text>
            </>
          )}
        </Text>
        <Text size='xs' color='gray'>
          {name}
        </Text>
      </Flex>
      <Button {...buttonProps} size='sm'>
        {buttonText}
      </Button>
    </Flex>
  );
};

export default Follow;
