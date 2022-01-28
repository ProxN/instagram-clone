import { useRouter } from 'next/router';
import { Button } from '@components/elements/Button';
import { Icon } from '@components/elements/Icon';
import { Text } from '@components/elements/Text';
import { Box } from '@components/layout/Box';
import { Flex } from '@components/layout/Flex';
import ChatBox from '@components/templates/ChatBox/ChatBox';
import { InboxLayout } from '@components/templates/InboxLayout';
import { SendMessageModal } from '@components/templates/SendMessageModal';
import { useDisclosure } from '@lib/hooks/useDisclosure';

const Inbox = () => {
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box as='section' h='calc(100vh - 6rem)' p='2rem 0'>
      <InboxLayout>
        {!router.query.userId ? (
          <Flex
            justifyContent='center'
            alignItems='center'
            flexDirection='column'
            display={{ xs: 'none', md: 'flex' }}
          >
            <Box
              fontSize='6xl'
              border='1px solid '
              borderColor='blackAlpha.9'
              padding='2rem'
              borderRadius='50%'
            >
              <Icon name='paper-plane' />
            </Box>
            <Text size='xl' mt={2} color='gray'>
              Your messages
            </Text>
            <Text mt={1} color='gray'>
              Send private photos and messages to a friend or group.
            </Text>
            <Button onClick={onOpen} mt={4} isPrimary>
              Send message
            </Button>
          </Flex>
        ) : (
          <ChatBox user_id={router.query.userId as string} />
        )}
      </InboxLayout>
      <SendMessageModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Inbox;
