import { useRouter } from 'next/router';
import {
  CloseModalButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeading,
  ModalOverylay,
} from '@components/elements/Modal';
import { Text } from '@components/elements/Text';
import { Box } from '@components/layout/Box';
import { useGetUserFollowingQuery } from '@lib/graphql';
import { client } from '@lib/utility/graphqlClient';
import { Follow } from '@components/elements/Follow';
import { FollowLoader } from '@components/elements/FollowLoader';
import { UnFollowModal } from '../UnFollowModal';
import { useState } from 'react';
import { useDisclosure } from '@lib/hooks/useDisclosure';

const FollowingModal: React.FC<{ user_id: string }> = ({ user_id }) => {
  const [selected, setSelected] = useState<{
    avatar?: string | null;
    username: string;
    id: string;
  }>({
    username: '',
    id: '',
  });
  const router = useRouter();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { data, isLoading } = useGetUserFollowingQuery(client, { user_id });

  const handleClose = () => {
    const { ['following']: _, ...rest } = router.query;
    router.push({ pathname: router.pathname, query: rest });
  };

  const handleUnFollowClick = (id: string) => {
    const user = data?.getUserFollowing?.find((el) => el.id === id);
    if (user) {
      setSelected({
        username: user.username,
        avatar: user.avatar,
        id,
      });
      onOpen();
    }
  };

  return (
    <>
      <Modal size='sm' isOpen={!!router.query.following} onClose={handleClose}>
        <ModalOverylay />
        <ModalContent>
          <ModalHeading>
            <Text
              size='md'
              fontWeight='semibold'
              display='block'
              textAlign='center'
            >
              Following
            </Text>
          </ModalHeading>
          <Box borderBottom='1px solid' borderColor='blackAlpha.3' />
          <CloseModalButton />
          <ModalBody maxH='md' overflow='hidden auto'>
            {isLoading ? (
              Array.from({ length: 10 }, (v, i) => `loader-${i}`).map((el) => (
                <FollowLoader key={el} />
              ))
            ) : (
              <Box>
                {data?.getUserFollowing?.map((el) => (
                  <Follow
                    buttonProps={{
                      variant: 'outline',
                    }}
                    onClick={() => handleUnFollowClick(el.id)}
                    buttonText='Following'
                    name={el.name}
                    avatar={el.avatar}
                    username={el.username}
                    key={el.id}
                  />
                ))}
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
      <UnFollowModal
        onClose={onClose}
        isOpen={isOpen}
        username={selected?.username}
        id={selected?.id}
      />
    </>
  );
};

export default FollowingModal;
