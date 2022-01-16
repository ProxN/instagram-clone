import { useQueryClient } from 'react-query';
import NextLink from 'next/link';
import { Flex } from '@components/layout/Flex';
import { Avatar } from '../Avatar';
import { Button, ButtonProps } from '../Button';
import { Text } from '../Text';
import { useMeQuery, MeQuery, useFollowMutation } from '@lib/graphql';
import { client } from '@lib/utility/graphqlClient';

interface FollowProps {
  id: string;
  name: string;
  username: string;
  avatar?: string | null;
  has_followed?: boolean | null;
  buttonText: string;
  buttonProps?: ButtonProps;
  currentUser?: string;
  onClick?: () => void;
}

const Follow: React.FC<FollowProps> = ({
  name,
  id,
  username,
  avatar,
  buttonText,
  buttonProps,
  has_followed,
  onClick,
}) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, data } = useFollowMutation(client);
  const currentUser = queryClient.getQueryData<MeQuery>(useMeQuery.getKey());

  const handleFollow = () => {
    mutate({ follower_id: id });
  };

  return (
    <Flex alignItems='center' mb={{ xs: 3, last: 0 }}>
      <Avatar src={avatar || '/default.jpg'} />
      <Flex flexDirection='column' ml={3} flex='1'>
        <Text style={{ alignItems: 'center' }}>
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

          {typeof has_followed === 'boolean' &&
          !has_followed &&
          !data?.follow.result ? (
            <>
              &nbsp;·&nbsp;
              <Text onClick={handleFollow} size='xs' isLink>
                {isLoading ? 'loading...' : 'Follow'}
              </Text>
            </>
          ) : null}
        </Text>
        <Text size='xs' color='gray'>
          {name}
        </Text>
      </Flex>
      {currentUser?.me?.username !== username ? (
        <Button {...buttonProps} size='sm' onClick={onClick}>
          {buttonText}
        </Button>
      ) : null}
    </Flex>
  );
};

export default Follow;
