import { Box } from '@components/layout/Box';
import { Flex } from '@components/layout/Flex';
import { SettingsModal } from '@components/templates/SettingsModal';
import { Button } from '../Button';
import { Modal, ModalBody, ModalContent, ModalOverylay } from '../Modal';
import { Text } from '../Text';

interface DeletePostProps {
  isOpen: boolean;
  handleDeleteClick?: () => void;
  onClose?: () => void;
  isLoading?: boolean;
}

const DeletePostModal: React.FC<DeletePostProps> = ({
  onClose,
  handleDeleteClick,
  isOpen,
  isLoading,
}) => {
  return (
    <Modal size='sm' isOpen={isOpen} onClose={onClose}>
      <ModalOverylay rgba={5} />
      <ModalContent>
        <ModalBody p='0'>
          <Flex
            padding='1.5rem 0'
            flexDirection='column'
            alignItems='center'
            borderBottom='1px solid'
            borderColor='blackAlpha.3'
          >
            <Text mb={2} as='h2' size='lg' fontWeight='semibold'>
              Delete Post?
            </Text>
            <Text as='span' color='gray'>
              Are you sure you want to delete this post?
            </Text>
          </Flex>
          <Box borderBottom='1px solid' borderColor='blackAlpha.3'>
            <Button
              onClick={handleDeleteClick}
              isDisabled={isLoading}
              fullWidth
              variant='ghost'
              color='red'
            >
              {isLoading ? 'Deleting' : 'delete'}
            </Button>
          </Box>
          <Box>
            <Button onClick={onClose} fullWidth variant='ghost'>
              Cancel
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DeletePostModal;
