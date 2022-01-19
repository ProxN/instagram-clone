import NextLink from 'next/link';
import { Flex } from '@components/layout/Flex';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { Text } from '../Text';
import { useFollowMutation, useUnFollowMutation } from '@lib/graphql';
import { client } from '@lib/utility/graphqlClient';
import { useState } from 'react';
import { useDisclosure } from '@lib/hooks/useDisclosure';
import { UnFollowModal } from '@components/elements/UnFollowModal';

interface FollowProps {
  id: string;
  name: string;
  username: string;
  avatar?: string | null;
  has_followed?: boolean | null;
  buttonText: 'follow' | 'following' | 'remove';
  onClick?: () => void;
}

const Follow: React.FC<FollowProps> = ({
  name,
  id,
  username,
  avatar,
  buttonText,
  has_followed,
}) => {
  const [buttonLabel, setButtonLabel] = useState(buttonText);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { mutate, isLoading, data } = useFollowMutation(client, {
    onSuccess: (res) => {
      if (res?.follow && buttonText !== 'remove') {
        setButtonLabel('following');
      }
    },
  });
  const { mutate: unFollowMutation, isLoading: unFollowLoading } =
    useUnFollowMutation(client, {
      onSuccess: (res) => {
        if (res.unFollow) {
          setButtonLabel('follow');
          onClose();
        }
      },
    });

  const handleFollow = () => {
    mutate({ follower_id: id });
  };

  const handleUnFollow = () => {
    unFollowMutation({ follower_id: id });
  };

  return (
    <>
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

        <Button
          size='sm'
          isLoading={buttonText !== 'remove' && isLoading}
          isDisabled={isLoading}
          variant={buttonLabel === 'follow' ? 'solid' : 'outline'}
          isPrimary={buttonLabel === 'follow'}
          onClick={buttonLabel === 'follow' ? handleFollow : onOpen}
        >
          {buttonLabel}
        </Button>
      </Flex>
      <UnFollowModal
        isLoading={unFollowLoading}
        handleUnFollow={handleUnFollow}
        onClose={onClose}
        isOpen={isOpen}
        username={username}
        id={id}
      />
    </>
  );
};

export default Follow;
