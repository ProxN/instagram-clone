import { useQueryClient } from 'react-query';
import NextLink from 'next/link';
import { Box } from '@components/layout/Box';
import { MeQuery, useMeQuery } from '@lib/graphql';
import { Button } from '../Button';
import { Modal, ModalBody, ModalContent, ModalOverylay } from '../Modal';
import toast from 'react-hot-toast';

interface PostOptionProps {
  post_id: string;
  isOpen: boolean;
  user_id?: string;
  has_followed?: boolean | null;
  hideGoToPostLink?: boolean;
  onClose: () => void;
  handleDeleteOpen?: () => void;
}

const PostOption: React.FC<PostOptionProps> = ({
  isOpen,
  onClose,
  user_id,
  post_id,
  has_followed,
  hideGoToPostLink,
  handleDeleteOpen,
}) => {
  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<MeQuery>(useMeQuery.getKey());

  const handleCopyToClipBoard = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/home/p/${post_id}`
    );
    toast.success('Link copied to clipboard.');
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverylay rgba={6} />
      <ModalContent>
        <ModalBody padding='0'>
          {currentUser?.me?.id === user_id && (
            <Box borderBottom='1px solid' borderColor='blackAlpha.2'>
              <Button
                onClick={handleDeleteOpen}
                fullWidth
                variant='ghost'
                color='red'
              >
                Delete
              </Button>
            </Box>
          )}
          <Box borderBottom='1px solid' borderColor='blackAlpha.2'>
            <Button fullWidth variant='ghost' color='red'>
              Report
            </Button>
          </Box>
          {has_followed && (
            <Box borderBottom='1px solid' borderColor='blackAlpha.2'>
              <Button fullWidth variant='ghost' color='red'>
                Unfollow
              </Button>
            </Box>
          )}
          {!hideGoToPostLink && (
            <Box borderBottom='1px solid' borderColor='blackAlpha.2'>
              <NextLink href={`/home/p/${post_id}`}>
                <Button fullWidth variant='ghost'>
                  Go to post
                </Button>
              </NextLink>
            </Box>
          )}
          <Box borderBottom='1px solid' borderColor='blackAlpha.2'>
            <Button fullWidth variant='ghost'>
              Share to
            </Button>
          </Box>
          <Box borderBottom='1px solid' borderColor='blackAlpha.2'>
            <Button onClick={handleCopyToClipBoard} fullWidth variant='ghost'>
              Copy link
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

export default PostOption;
