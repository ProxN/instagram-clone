import { Button } from '@components/elements/Button';
import { Icon } from '@components/elements/Icon';
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
import { Flex } from '@components/layout/Flex';
import { useMeQuery } from '@lib/graphql';
import { client } from '@lib/utility/graphqlClient';
import { useRouter } from 'next/router';
import Header from './Header/Header';

const AppLayout: React.FC = ({ children }) => {
  const router = useRouter();
  const { data: user } = useMeQuery(client, undefined, {
    staleTime: 1000 * 60 * 60 * 24,
  });

  return (
    <>
      {user?.me && <Header avatar={user.me.avatar} />}
      <Box as='main' h='100%' backgroundColor='gray.0'>
        {children}
      </Box>
      {/* Create new Post */}
      <Modal
        isOpen={!!router.query.createPost}
        onClose={() => router.push('/home')}
      >
        <ModalOverylay />
        <ModalContent>
          <ModalHeading>Create new post</ModalHeading>
          <CloseModalButton />
          <ModalBody>
            <Flex
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
              minH='40rem'
            >
              <Box mb='1rem' fontSize='8rem' color='gray.7'>
                <Icon name='image' />
              </Box>
              <Text mb='1rem' color='gray'>
                Drag photos and videos here
              </Text>
              <Button size='sm' isPrimary>
                Select from computer
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AppLayout;
