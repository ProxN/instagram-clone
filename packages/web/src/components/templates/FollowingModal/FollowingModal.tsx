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
              {data?.getUserFollowing?.map((el) => (
                <Follow
                  buttonProps={{
                    variant: 'outline',
                  }}
                  buttonText='Followig'
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
  );
};

export default FollowingModal;
