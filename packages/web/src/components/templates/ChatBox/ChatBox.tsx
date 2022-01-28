import { Fragment, useEffect, useMemo, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Avatar } from '@components/elements/Avatar';
import { Button } from '@components/elements/Button';
import { Icon } from '@components/elements/Icon';
import { IconButton } from '@components/elements/IconButton';
import { Text } from '@components/elements/Text';
import { TextArea } from '@components/elements/TextArea';
import { Box } from '@components/layout/Box';
import { Flex } from '@components/layout/Flex';
import { Loader } from '@components/elements/Loader';
import {
  MeQuery,
  useGetUnreadMessagesCountQuery,
  useGetUserInboxQuery,
  useInfiniteGetUserConversationQuery,
  useMeQuery,
  useSeenMessagesMutation,
  useSendMessageMutation,
} from '@lib/graphql';
import { dayjs } from '@lib/utility/dayjs';
import { groupMessages } from '@lib/utility/groupBy';
import { client } from '@lib/utility/graphqlClient';
import { useInterSectionObserver } from '@lib/hooks/useInterSectionObserver';
import { useMessagesSubscription } from '@lib/hooks/useMessagesSubscription';
import { useRouter } from 'next/router';

const SendMessageSchema = yup
  .object({
    text: yup.string().required(),
  })
  .required();

const formateMessageDate = (date: number) => {
  const dayDate = dayjs(date, { locale: 'en' });

  const isToday = dayjs().isSame(dayjs(date), 'day');
  if (isToday) return dayDate.format('LT');

  const isYesterday = dayjs().isSame(dayDate.subtract(1, 'day'), 'day');
  if (isYesterday) return `Yesterday ${dayDate.format('LT')}`;

  return dayDate.format('LLL');
};

const ChatBox: React.FC<{ user_id: string }> = ({ user_id }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  useMessagesSubscription(user_id);
  const { control, handleSubmit, formState, reset } = useForm<{ text: string }>(
    {
      resolver: yupResolver(SendMessageSchema),
      mode: 'onChange',
      defaultValues: {
        text: '',
      },
    }
  );
  const { mutate, isLoading: sendMessageLoading } =
    useSendMessageMutation(client);
  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    dataUpdatedAt,
  } = useInfiniteGetUserConversationQuery(
    'cursor',
    client,
    {
      receiver_id: user_id,
      limit: 50,
      cursor: undefined,
    },
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.getUserConversation.hasMore) return undefined;
        const messagesLength = lastPage.getUserConversation.messages.length;
        return {
          cursor:
            lastPage.getUserConversation.messages[messagesLength - 1].createdAt,
        };
      },
    }
  );
  const { mutate: markMessage } = useSeenMessagesMutation(client, {
    onSuccess: (data) => {
      if (data.seenMessages) {
        queryClient.invalidateQueries(useGetUserInboxQuery.getKey());
        queryClient.invalidateQueries(useGetUnreadMessagesCountQuery.getKey());
      }
    },
  });

  const rootElement = useRef<HTMLDivElement | null>(null);
  const lastElement = useRef<HTMLDivElement | null>(null);
  const currentUser = queryClient.getQueryData<MeQuery>(useMeQuery.getKey());

  useInterSectionObserver({
    target: lastElement,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
    threshold: 1,
  });

  useEffect(() => {
    if (!isLoading && currentUser && currentUser.me) {
      const firstElemntIndex =
        data?.pages[0].getUserConversation.messages.findIndex(
          (el) => el.receiver_id === currentUser?.me?.id && !el.seen
        );
      if (typeof firstElemntIndex === 'undefined') return;
      const message =
        data?.pages[0].getUserConversation.messages[firstElemntIndex];
      if (!message) return;
      markMessage({
        lastMessageDate: message.createdAt as string,
        user_id: message.user_id,
      });
    }
  }, [currentUser, data, isLoading, markMessage, dataUpdatedAt]);

  const sortedMessages = useMemo(() => {
    if (!isLoading) {
      return groupMessages(data);
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading, dataUpdatedAt]);

  const handleMessageSend = (values: { text: string }) => {
    mutate({
      receiver_id: user_id,
      text: values.text,
    });
    reset();
  };

  return (
    <Flex flexDirection='column' overflow='hidden' position='relative'>
      <Flex
        w='100%'
        h='6rem'
        borderBottom='1px solid'
        borderColor='blackAlpha.3'
        alignItems='center'
        p='0 3rem'
      >
        <Avatar size='sm' src='/default.jpg' />
        <Text fontWeight='semibold' ml={2}>
          {router.query.username}
        </Text>
      </Flex>
      {(isFetchingNextPage || isLoading) && (
        <Flex
          alignItems='center'
          position='absolute'
          right='0'
          left='0'
          top='10rem'
          justifyContent='center'
        >
          <Loader />
        </Flex>
      )}
      <Flex
        flex='1'
        p='0 1.4rem'
        flexDirection='column-reverse'
        overflow='hidden auto'
        ref={rootElement}
      >
        {sortedMessages?.pages.map((page, i) => (
          <Fragment key={i}>
            {Object.keys(page.getUserConversation).map((key) => {
              return (
                <Fragment key={key}>
                  {page.getUserConversation[+key].map((el, elementIndex) => (
                    <Flex
                      key={el.id}
                      mb={{ xs: 2, last: 'none' }}
                      ref={
                        sortedMessages.pages.length === i + 1 &&
                        page.getUserConversation[
                          +Object.keys(page.getUserConversation)[0]
                        ].length ===
                          elementIndex + 1
                          ? lastElement
                          : null
                      }
                      justifyContent={
                        el.user_id === currentUser?.me?.id
                          ? 'flex-end'
                          : 'flex-start'
                      }
                    >
                      <Box
                        backgroundColor={
                          el.user_id === currentUser?.me?.id
                            ? 'blackAlpha.3'
                            : 'white'
                        }
                        border='1px solid transparent'
                        borderColor={
                          el.user_id !== currentUser?.me?.id
                            ? 'blackAlpha.3'
                            : 'transparent'
                        }
                        p='1rem'
                        borderRadius='sm'
                      >
                        <Text>{el.text}</Text>
                      </Box>
                    </Flex>
                  ))}
                  <Box
                    p='1.4rem 0'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                  >
                    <Box>
                      {formateMessageDate(
                        +page.getUserConversation[+key][
                          page.getUserConversation[+key].length - 1
                        ].createdAt
                      )}
                    </Box>
                  </Box>
                </Fragment>
              );
            })}
          </Fragment>
        ))}
      </Flex>

      <Box p='1.4rem'>
        <Flex
          alignItems='center'
          border='1px solid'
          borderColor='blackAlpha.2'
          p='.4rem 1.4rem'
          as='form'
          onSubmit={handleSubmit(handleMessageSend)}
        >
          <IconButton
            variant='light'
            color='#fff'
            size='md'
            ariaLabel='select emoji'
            icon={<Icon name='happy-face' />}
          />

          <Controller
            render={({ field }) => (
              <TextArea
                placeholder='Message...'
                h='3rem'
                w='100%'
                border='none'
                {...field}
              />
            )}
            name='text'
            control={control}
          />
          <Button
            isDisabled={!formState.isValid || sendMessageLoading}
            variant='link'
            isPrimary
          >
            Send
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ChatBox;
