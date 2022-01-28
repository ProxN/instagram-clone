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

interface UnFollowModalProps {
  username: string;
  id: string;
  isOpen: boolean;
  avatar?: string | null;
  onClose: () => void;
  handleUnFollow: () => void;
  isLoading?: boolean;
}

const UnFollowModal: React.FC<UnFollowModalProps> = ({
  username,
  isOpen,
  onClose,
  avatar,
  handleUnFollow,
  isLoading,
}) => {
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
                onClick={handleUnFollow}
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
                Cancel
              </Button>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UnFollowModal;
