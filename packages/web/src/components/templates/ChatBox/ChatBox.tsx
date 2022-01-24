import { Avatar } from '@components/elements/Avatar';
import { Button } from '@components/elements/Button';
import { Icon } from '@components/elements/Icon';
import { IconButton } from '@components/elements/IconButton';
import { Text } from '@components/elements/Text';
import { TextArea } from '@components/elements/TextArea';
import { Box } from '@components/layout/Box';
import { Flex } from '@components/layout/Flex';
import {
  MeQuery,
  useInfiniteGetUserConversationQuery,
  useMeQuery,
} from '@lib/graphql';
import { client } from '@lib/utility/graphqlClient';
import { groupMessages } from '@lib/utility/groupBy';
import { Fragment, useMemo, useRef } from 'react';
import { useQueryClient } from 'react-query';
import { dayjs } from '@lib/utility/dayjs';
import { useInterSectionObserver } from '@lib/hooks/useInterSectionObserver';
import { Loader } from '@components/elements/Loader';

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
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteGetUserConversationQuery(
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
              lastPage.getUserConversation.messages[messagesLength - 1]
                .createdAt,
          };
        },
      }
    );
  const rootElement = useRef<HTMLDivElement | null>(null);
  const lastElement = useRef<HTMLDivElement | null>(null);
  const currentUser = queryClient.getQueryData<MeQuery>(useMeQuery.getKey());

  useInterSectionObserver({
    target: lastElement,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
    threshold: 1,
  });

  const sortedMessages = useMemo(() => {
    if (!isLoading) {
      return groupMessages(data);
    }
    return null;
  }, [data, isLoading]);

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
          Test5349w5
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
        >
          <IconButton
            variant='light'
            color='#fff'
            size='md'
            ariaLabel='select emoji'
            icon={<Icon name='happy-face' />}
          />
          <TextArea placeholder='Message...' h='3rem' w='100%' border='none' />
          <Button variant='link' isPrimary>
            Send
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ChatBox;
