import { AnimatePresence, motion } from 'framer-motion';
import { Popover } from 'react-tiny-popover';
import { Avatar } from '@components/elements/Avatar';
import { Button } from '@components/elements/Button';
import { Icon } from '@components/elements/Icon';
import { IconButton } from '@components/elements/IconButton';
import { Text } from '@components/elements/Text';
import { Box } from '@components/layout/Box';
import { Flex } from '@components/layout/Flex';
import { useDisclosure } from '@lib/hooks/useDisclosure';
import {
  useFollowersNotificationQuery,
  useFollowMutation,
  useUnFollowMutation,
} from '@lib/graphql';
import { client } from '@lib/utility/graphqlClient';
import { dayjs } from '@lib/utility/dayjs';
import { UnFollowModal } from '@components/elements/UnFollowModal';
import { useState } from 'react';
import { Loader } from '@components/elements/Loader';
import { useQueryClient } from 'react-query';

const FadeConfig = {
  enter: {
    opacity: 1,
    translateY: '-3px',
    transition: { duration: 0.2, ease: [0, 0, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    translateY: '5px',
    transition: { duration: 0.1, ease: [0.4, 0, 1, 1] },
  },
};

type SelectedOptions = {
  username: string;
  id: string;
  has_followed?: boolean;
};

const Notification = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const [selected, SetSelected] = useState<SelectedOptions | null>(null);
  const {
    isOpen: unFollowIsOpen,
    onOpen: unFollowOpen,
    onClose: unFollowClose,
  } = useDisclosure();
  const { data, isLoading } = useFollowersNotificationQuery(client, undefined, {
    refetchOnMount: true,
  });
  const { mutate, isLoading: unFollowLoading } = useUnFollowMutation(client, {
    onSuccess: (data) => {
      if (data.unFollow) {
        queryClient.invalidateQueries(useFollowersNotificationQuery.getKey());
      }
    },
  });
  const { mutate: followMutation, isLoading: followIsLoading } =
    useFollowMutation(client, {
      onSuccess: (data) => {
        if (data.follow) {
          queryClient.invalidateQueries(useFollowersNotificationQuery.getKey());
        }
      },
    });

  const handleSelectedItem = (values: SelectedOptions) => {
    SetSelected(values);
    unFollowOpen();
    onClose();
  };

  const handleUnFollow = () => {
    if (selected) {
      mutate({ follower_id: selected.id });
      unFollowClose();
    }
  };

  const handleFollow = (id: string) => {
    if (id) {
      followMutation({ follower_id: id });
      unFollowClose();
    }
  };

  return (
    <>
      <Popover
        isOpen={isOpen}
        positions={['bottom', 'left']}
        align='end'
        reposition={false}
        onClickOutside={onClose}
        padding={14}
        containerStyle={{ zIndex: '9999' }}
        content={() => (
          <AnimatePresence>
            <motion.div
              variants={FadeConfig}
              initial='exit'
              animate='enter'
              exit='exit'
            >
              <Box
                backgroundColor='white'
                borderRadius='sm'
                boxShadow='sm'
                minW='40rem'
                minH='26rem'
                overflow='hidden auto'
                border='1px solid'
                borderColor='blackAlpha.1'
                padding='1rem 1.4rem'
              >
                {isLoading ? (
                  <Flex justifyContent='center' pt='2rem'>
                    <Loader />
                  </Flex>
                ) : (
                  <>
                    <Text fontWeight='semibold'>This month</Text>
                    <Flex flexDirection='column' mt={2}>
                      {data?.followersNotification.map((el) => (
                        <Flex alignItems='center' key={el.id}>
                          <Avatar src='/default.jpg' size='md' />
                          <Flex flex={1}>
                            <Text ml={2} fontWeight='semibold'>
                              {el.username}&nbsp;
                            </Text>
                            <Text as='span'>
                              Started following you.&nbsp;
                              <Text color='gray'>
                                {dayjs(+el.since, {
                                  locale: 'otherlocale',
                                }).fromNow(true)}
                              </Text>
                            </Text>
                          </Flex>
                          <Button
                            onClick={() =>
                              !el.has_followed
                                ? handleFollow(el.id)
                                : handleSelectedItem({
                                    username: el.username,
                                    id: el.id,
                                  })
                            }
                            size='sm'
                            isPrimary={!el.has_followed}
                            isLoading={!el.has_followed && followIsLoading}
                            variant={!el.has_followed ? 'solid' : 'outline'}
                          >
                            {el.has_followed ? 'Following' : 'Follow'}
                          </Button>
                        </Flex>
                      ))}
                    </Flex>
                  </>
                )}
              </Box>
            </motion.div>
          </AnimatePresence>
        )}
      >
        <li>
          <IconButton
            onClick={onToggle}
            size='sm'
            ariaLabel='home link'
            color='blackAlpha'
            variant='link'
            icon={<Icon name='heart' />}
          />
        </li>
      </Popover>
      {selected && (
        <UnFollowModal
          isOpen={unFollowIsOpen}
          onClose={unFollowClose}
          username={selected.username}
          id={selected.id}
          handleUnFollow={handleUnFollow}
          isLoading={unFollowLoading}
        />
      )}
    </>
  );
};

export default Notification;
