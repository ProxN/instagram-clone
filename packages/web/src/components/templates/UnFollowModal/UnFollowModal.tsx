import { useQueryClient } from 'react-query';
import { Avatar } from '@components/elements/Avatar';
import { Button } from '@components/elements/Button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverylay,
} from '@components/elements/Modal';
import { Text } from '@components/elements/Text';
import { Box } from '@components/layout/Box';
import { Flex } from '@components/layout/Flex';
import {
  GetUserProfileQuery,
  useGetUserProfileQuery,
  useUnFollowMutation,
} from '@lib/graphql';
import { client } from '@lib/utility/graphqlClient';
import { useCallback } from 'react';

interface UnFollowModalProps {
  username: string;
  id: string;
  isOpen: boolean;
  onClose: () => void;
  avatar?: string | null;
}

const UnFollowModal: React.FC<UnFollowModalProps> = ({
  username,
  id,
  isOpen,
  onClose,
  avatar,
}) => {
  const queryClient = useQueryClient();
  const { mutate: unFollowMutation, isLoading } = useUnFollowMutation(client, {
    onSuccess: (data) => {
      if (data.unFollow.result) {
        queryClient.setQueryData<GetUserProfileQuery>(
          useGetUserProfileQuery.getKey({ username }),
          (old: any) => {
            return {
              ...old,
              getUserProfile: { ...old?.getUserProfile, has_followed: false },
            };
          }
        );
        onClose();
      }
    },
  });

  const unFollowHandler = useCallback(() => {
    unFollowMutation({ follower_id: id });
  }, [id, unFollowMutation]);

  return (
    <Modal size='sm' isOpen={isOpen}>
      <ModalOverylay />
      <ModalContent>
        <ModalBody padding='0'>
          <Flex padding='2rem 0' flexDirection='column' alignItems='center'>
            <Avatar size='xl' src={avatar || '/default.jpg'} />
            <Text mt={5}>Unfollow @{username}?</Text>
          </Flex>
          <Box>
            <Box borderTop='1px solid' borderColor='blackAlpha.3'>
              <Button
                onClick={unFollowHandler}
                fullWidth
                variant='ghost'
                isLoading={isLoading}
                isDisabled={isLoading}
                color='red'
              >
                Unfollow
              </Button>
            </Box>
            <Box borderTop='1px solid' borderColor='blackAlpha.3'>
              <Button onClick={onClose} fullWidth variant='ghost'>
                Cancal
              </Button>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UnFollowModal;
