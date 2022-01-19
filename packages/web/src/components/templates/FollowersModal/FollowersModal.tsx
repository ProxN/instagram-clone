import { useRouter } from 'next/router';
import { Follow } from '@components/elements/Follow';
import { FollowLoader } from '@components/elements/FollowLoader';
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
import { useGetUserFollowersQuery } from '@lib/graphql';
import { client } from '@lib/utility/graphqlClient';
import { Suggestions } from '@components/elements/Suggestions';

const FollowersModal: React.FC<{ user_id: string; currentUser: boolean }> = ({
  user_id,
  currentUser,
}) => {
  const router = useRouter();
  if (!router.query.followers) return null;
  const { data, isLoading } = useGetUserFollowersQuery(client, { user_id });

  const handleClose = () => {
    const { ['followers']: _, ...rest } = router.query;
    router.push({ pathname: router.pathname, query: rest }, undefined, {
      scroll: false,
    });
  };

  return (
    <Modal size='sm' isOpen={!!router.query.followers} onClose={handleClose}>
      <ModalOverylay />
      <ModalContent>
        <ModalHeading>
          <Text
            size='md'
            fontWeight='semibold'
            display='block'
            textAlign='center'
          >
            Followers
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
              {data?.getUserFollowers?.map((el) => (
                <Follow
                  id={el.id}
                  buttonText='remove'
                  name={el.name}
                  avatar={el.avatar}
                  has_followed={currentUser ? el.has_followed : undefined}
                  username={el.username}
                  key={el.id}
                />
              ))}
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

export default FollowersModal;
