import NextLink from 'next/link';
import { Avatar } from '@components/elements/Avatar';
import { FollowLoader } from '@components/elements/FollowLoader';
import { Icon } from '@components/elements/Icon';
import { IconButton } from '@components/elements/IconButton';
import { Loader } from '@components/elements/Loader';
import { Text } from '@components/elements/Text';
import { Box } from '@components/layout/Box';
import { Flex } from '@components/layout/Flex';
import { useGetUserInboxQuery } from '@lib/graphql';
import { client } from '@lib/utility/graphqlClient';
import { dayjs } from '@lib/utility/dayjs';

const InboxLayout: React.FC = ({ children }) => {
  const { data, isLoading, isFetching } = useGetUserInboxQuery(client);

  return (
    <Box
      h='100%'
      backgroundColor='#fff'
      maxW='94rem'
      mx='auto'
      border='1px solid'
      borderColor='blackAlpha.3'
      display='grid'
      gridTemplateColumns={{ xs: '1fr', md: '35% 1fr' }}
    >
      {/* Aside  */}
      <Box borderRight='1px solid' borderColor='blackAlpha.3' overflow='hidden'>
        {/* Aside header */}
        <Flex
          h='6rem'
          alignItems='center'
          justifyContent='center'
          position='relative'
          borderBottom='1px solid'
          borderColor='blackAlpha.3'
        >
          <Text fontWeight='semibold' size='md'>
            ayo.23923
          </Text>
          <Box
            cursor='pointer'
            fontSize='3rem'
            position='absolute'
            right='10px'
          >
            <IconButton
              variant='link'
              ariaLabel='send message'
              icon={<Icon name='create' />}
            />
          </Box>
        </Flex>
        {/* Messages */}
        <Flex
          flexDirection='column'
          h='calc(100% - 6rem)'
          overflow='hidden auto'
        >
          <Box p='1rem 1.5rem'>
            <Text size='md' fontWeight='semibold'>
              Messages
            </Text>
          </Box>
          {!isLoading && data && data.getUserInbox.length === 0 ? (
            <Box p='1rem 1.5rem'>
              {Array.from({ length: 4 }, (v, i) => `loader-${i}`).map((el) => (
                <FollowLoader key={el} />
              ))}
            </Box>
          ) : null}
          {isLoading ? (
            <Box p='1rem 1.5rem'>
              {Array.from({ length: 15 }, (v, i) => `loader-${i}`).map((el) => (
                <FollowLoader key={el} />
              ))}
            </Box>
          ) : (
            <>
              {data?.getUserInbox.map((el) => (
                <NextLink
                  href={`/inbox?userId=${el.user?.id}`}
                  as={`/inbox/${el.id}`}
                  key={el.id}
                >
                  <Box
                    p='1rem 1.5rem'
                    alignItems='center'
                    cursor='pointer'
                    backgroundColor={{ hover: 'gray.0' }}
                    display='grid'
                    gridTemplateColumns='5.6rem 1fr'
                  >
                    <Avatar size='lg' src={el.user?.avatar || '/default.jpg'} />
                    <Flex ml={3} flexDirection='column' flex={1}>
                      <Text fontWeight='semibold'>{el.user?.username}</Text>
                      <Box overflow='hidden' display='flex'>
                        <Text
                          color='gray'
                          maxW='65%'
                          overflow='hidden'
                          textOverflow='ellipsis'
                          whiteSpace='nowrap'
                        >
                          {el.text}
                        </Text>
                        <Text as='span' color='gray'>
                          &nbsp;
                          {dayjs(+el.createdAt, {
                            locale: 'otherlocale',
                          }).fromNow(true)}
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                </NextLink>
              ))}
              {isFetching && (
                <Flex justifyContent='center' p='1.5rem 0'>
                  <Loader size='middle' />
                </Flex>
              )}
            </>
          )}
        </Flex>
      </Box>
      {children}
    </Box>
  );
};

export default InboxLayout;
