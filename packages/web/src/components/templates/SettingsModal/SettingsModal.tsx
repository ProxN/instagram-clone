import NextLink from 'next/link';
import { Modal, ModalContent, ModalOverylay } from '@components/elements/Modal';
import { Box } from '@components/layout/Box';
import { useLogout } from '@lib/hooks/useLogout';

interface SettingsModal {
  onClose: () => void;
  isOpen: boolean;
}

const SettingsModal: React.FC<SettingsModal> = ({ isOpen, onClose }) => {
  const { handleLogout } = useLogout();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xs'>
      <ModalOverylay />
      <ModalContent>
        <NextLink href='/accounts/change_password'>
          <Box
            borderBottom='1px solid'
            borderColor='blackAlpha.2'
            cursor='pointer'
            textAlign='center'
            padding='1rem 0rem'
          >
            Change Password
          </Box>
        </NextLink>
        <Box
          borderBottom='1px solid'
          borderColor='blackAlpha.2'
          cursor='pointer'
          textAlign='center'
          padding='1rem 0rem'
        >
          Report a problem
        </Box>
        <Box
          onClick={handleLogout}
          borderBottom='1px solid'
          borderColor='blackAlpha.2'
          cursor='pointer'
          textAlign='center'
          padding='1rem 0rem'
        >
          Log out
        </Box>
        <Box
          onClick={onClose}
          cursor='pointer'
          textAlign='center'
          padding='1rem 0rem'
        >
          Cancel
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default SettingsModal;
