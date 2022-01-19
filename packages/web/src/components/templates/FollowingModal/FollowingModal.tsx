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
import { Flex } from '@components/layout/Flex';
import { Icon } from '@components/elements/Icon';
import { Suggestions } from '@components/elements/Suggestions';

const FollowingModal: React.FC<{ user_id: string }> = ({ user_id }) => {
  const router = useRouter();
  const { data, isLoading } = useGetUserFollowingQuery(client, { user_id });

  const handleClose = () => {
    const { ['following']: _, ...rest } = router.query;
    router.push({ pathname: router.pathname, query: rest });
  };

  return (
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
              {data &&
              data.getUserFollowing &&
              data.getUserFollowing.length > 0 ? (
                data.getUserFollowing.map((el) => (
                  <Follow
                    id={el.id}
                    buttonText={!el.has_followed ? 'follow' : 'following'}
                    name={el.name}
                    avatar={el.avatar}
                    username={el.username}
                    key={el.id}
                  />
                ))
              ) : (
                <Flex p='1.5rem 0' flexDirection='column' alignItems='center'>
                  <Box
                    mb={4}
                    padding='1.5rem'
                    fontSize='4rem'
                    borderRadius='50%'
                    border='1px solid'
                    borderColor='blackAlpha.9'
                  >
                    <Icon name='user-plust' />
                  </Box>
                  <Text size='lg' as='h2' color='gray'>
                    People you follow
                  </Text>
                  <Text mt={2} as='span'>
                    When you follow people, you&apos;ll see them here.
                  </Text>
                </Flex>
              )}
              <Box mt={4}>
                <Suggestions limit={30} hideSeeAll maxW='100%' />
              </Box>
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FollowingModal;
