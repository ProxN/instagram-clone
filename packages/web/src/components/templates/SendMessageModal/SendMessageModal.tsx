import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Avatar } from '@components/elements/Avatar';
import { Button } from '@components/elements/Button';
import { Icon } from '@components/elements/Icon';
import { IconButton } from '@components/elements/IconButton';
import { Input } from '@components/elements/Input';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeading,
  ModalOverylay,
} from '@components/elements/Modal';
import { Text } from '@components/elements/Text';
import { Box } from '@components/layout/Box';
import { Flex } from '@components/layout/Flex';
import {
  GetUserInboxQuery,
  QuerySearchUsersArgs,
  useGetUserInboxQuery,
  useSearchUsersQuery,
} from '@lib/graphql';
import { client } from '@lib/utility/graphqlClient';
import { useEffect, useState } from 'react';
import { TextInput } from '@components/elements/TextInput';
import { useDebounce } from '@lib/hooks/useDebounce';
import { FollowLoader } from '@components/elements/FollowLoader';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';

interface SendMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchUserSchema = yup
  .object({
    query: yup.string().required(),
  })
  .required();

type SelectUser = {
  username?: string;
  id?: string;
};

const SendMessageModal: React.FC<SendMessageModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectUser, setSelectUser] = useState<SelectUser | null>(null);
  const { control, watch } = useForm<QuerySearchUsersArgs>({
    resolver: yupResolver(SearchUserSchema),
    mode: 'all',
    defaultValues: {
      query: '',
    },
  });
  const queryClient = useQueryClient();
  const router = useRouter();
  const debounceValue = useDebounce({ value: watch('query'), delay: 150 });
  const { data, isLoading } = useSearchUsersQuery(
    client,
    { query: debounceValue },
    { enabled: Boolean(debounceValue) }
  );

  const userInbox = queryClient.getQueryData<GetUserInboxQuery>(
    useGetUserInboxQuery.getKey()
  );

  const handleSelectClick = (values: SelectUser | null) => {
    setSelectUser(values);
  };

  const handleNextClick = () => {
    if (selectUser) {
      router.push(
        `/home/inbox?userId=${selectUser.id}&username=${selectUser.username}`,
        `/home/inbox/${selectUser.id}`
      );
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} size='sm' onClose={onClose}>
      <ModalOverylay />
      <ModalContent>
        <ModalHeading>
          <Flex justifyContent='space-between' alignItems='center'>
            <IconButton
              onClick={onClose}
              ariaLabel='Close modal'
              variant='ghost'
              icon={<Icon name='close' />}
            />
            <Text fontWeight='semibold' size='md'>
              New message
            </Text>
            <Button
              onClick={handleNextClick}
              variant='link'
              isPrimary
              isDisabled={!selectUser}
              size='sm'
            >
              Next
            </Button>
          </Flex>
        </ModalHeading>
        <ModalBody p='0'>
          <Flex
            alignItems={selectUser ? 'flex-start' : 'center'}
            flexDirection={selectUser ? 'column' : 'row'}
            p='1rem 1.4rem'
            as='form'
            borderTop='1px solid'
            borderBottom='1px solid'
            borderColor='blackAlpha.3'
          >
            <Flex>
              <Text fontWeight='semibold' size='md'>
                To:
              </Text>
              {selectUser && (
                <Flex ml={2}>
                  <Button
                    rightIcon={<Icon name='close' />}
                    onClick={() => handleSelectClick(null)}
                    variant='light'
                    isPrimary
                  >
                    {selectUser.username}
                  </Button>
                </Flex>
              )}
            </Flex>

            <Controller
              render={({ field }) => (
                <TextInput border='0' placeholder='Search...' {...field} />
              )}
              name='query'
              control={control}
            />
          </Flex>
          <Flex
            flexDirection='column'
            overflow='hidden auto'
            maxH='40rem'
            minH='30rem'
          >
            {data && data.searchUsers?.length === 0 ? (
              <Box>No result found</Box>
            ) : null}

            {isLoading ? (
              <Box padding='1rem 1.4rem'>
                {Array.from({ length: 4 }, (v, i) => (
                  <FollowLoader key={i} />
                ))}
              </Box>
            ) : (
              data?.searchUsers?.map((el) => (
                <Flex
                  key={el.id}
                  alignItems='center'
                  p='1rem 1.2rem'
                  cursor='pointer'
                  backgroundColor={{ hover: 'gray.0' }}
                  onClick={() =>
                    handleSelectClick({
                      username: el.username,
                      id: el.id,
                    })
                  }
                >
                  <Avatar src={el.avatar || '/default.jpg'} size='md' />
                  <Text size='md' ml={3} fontWeight='semibold'>
                    {el.username}
                  </Text>
                </Flex>
              ))
            )}

            {!data && userInbox && userInbox.getUserInbox.length > 0 ? (
              <>
                <Box p='1rem 1.4rem'>
                  <Text fontWeight='semibold'>Suggested</Text>
                </Box>
                {userInbox.getUserInbox.map((el) => (
                  <Flex
                    key={el.user?.id}
                    alignItems='center'
                    p='1rem 1.4rem'
                    cursor='pointer'
                    backgroundColor={{ hover: 'gray.0' }}
                    onClick={() =>
                      handleSelectClick({
                        username: el.user?.username,
                        id: el.user?.id,
                      })
                    }
                  >
                    <Avatar src={el.user?.avatar || '/default.jpg'} size='md' />
                    <Text size='md' ml={3} fontWeight='semibold'>
                      {el.user?.username}
                    </Text>
                  </Flex>
                ))}
              </>
            ) : (
              !data && userInbox && <Box p='1rem 1.4rem'>No account found.</Box>
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SendMessageModal;
