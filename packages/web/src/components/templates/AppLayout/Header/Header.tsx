import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Icon } from '@components/elements/Icon';
import { Box } from '@components/layout/Box';
import { Flex } from '@components/layout/Flex';
import { TextInput } from '@components/elements/TextInput';
import { Space } from '@components/layout/Space';
import { IconButton } from '@components/elements/IconButton';
import { Notification } from '@components/templates/Notification';
import { useGetUnreadMessagesCountQuery } from '@lib/graphql';
import { client } from '@lib/utility/graphqlClient';
import { useUnreadMessages } from '@lib/hooks/useUnReadMessages';
import { useDisclosure } from '@lib/hooks/useDisclosure';
import { AvatarPopover } from './AvatarDropdown';
import { AddPost } from '../../AddPost';

export interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { onClose, isOpen, onToggle } = useDisclosure();
  const router = useRouter();
  const { data } = useGetUnreadMessagesCountQuery(client, undefined, {
    refetchOnWindowFocus: false,
  });
  useUnreadMessages();

  useEffect(() => {
    const handleRouteChange = () => {
      onClose();
      setShowMenu(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [onClose, router]);

  return (
    <>
      <Box h='6rem' borderBottom='1px solid' borderColor='blackAlpha.3'>
        <Flex
          padding={{ xs: '0 1.5rem', md: '0 2.5rem' }}
          h='100%'
          justifyContent='space-between'
          alignItems='center'
        >
          <Box display={{ xs: 'flex', md: 'none' }}>
            <IconButton
              onClick={() => setShowMenu(!showMenu)}
              size='md'
              ariaLabel='menu'
              icon={<Icon name='menu' />}
              variant='link'
            />
          </Box>
          <NextLink href='/'>
            <Box fontSize='xx-large' cursor='pointer' as='a'>
              <Icon name='logo' />
            </Box>
          </NextLink>
          <Box
            zIndex={999}
            as='nav'
            fontSize='2rem'
            position={{ xs: 'absolute', md: 'unset' }}
            top={{ xs: '6rem', md: '0' }}
            left='0'
            w='100%'
            backgroundColor={{ xs: 'white', md: 'transparent' }}
            display={{ xs: showMenu ? 'flex' : 'none', md: 'flex' }}
            flexDirection={{ xs: 'column-reverse', md: 'row' }}
            padding={{ xs: '1rem 1.5rem', md: '0' }}
            borderBottom={{ xs: '1px solid', md: 'unset' }}
            borderColor='blackAlpha.3'
            justifyContent={{ md: 'flex-end' }}
            alignItems='center'
          >
            {/* <Box
              mt={{ xs: '1rem', md: '0' }}
              as='form'
              w={{ xs: '100%', md: '25rem' }}
              position={{ md: 'absolute' }}
              left={{ md: '50%' }}
              transform={{ md: 'translateX(-50%)' }}
            >
              <TextInput
                placeholder='Search'
                icon={<Icon name='search' />}
                defaultValue=''
              />
            </Box> */}
            {/* Links */}
            <Space
              justifyContent={{ xs: 'space-between', md: 'flex-end' }}
              alignItems='center'
              as='ul'
              size='md'
            >
              <NextLink href='/' prefetch={false}>
                <li>
                  <IconButton
                    size='sm'
                    ariaLabel='home link'
                    color='blackAlpha'
                    variant='link'
                    icon={
                      <Icon
                        name={router.pathname === '/' ? 'home-sharp' : 'home'}
                      />
                    }
                  />
                </li>
              </NextLink>
              <NextLink href='/inbox'>
                <li>
                  <Box position='relative'>
                    <IconButton
                      size='sm'
                      ariaLabel='home link'
                      color='blackAlpha'
                      variant='link'
                      icon={
                        <Icon
                          name={
                            router.pathname.includes('inbox')
                              ? 'paper-plane-sharp'
                              : 'paper-plane'
                          }
                        />
                      }
                    />
                    {data && data.getUnreadMessagesCount.length > 0 ? (
                      <Flex
                        position='absolute'
                        w='1.8rem'
                        h='1.8rem'
                        backgroundColor='red.6'
                        fontSize='sm'
                        justifyContent='center'
                        color='#fff'
                        borderRadius='50%'
                        alignItems='center'
                        right='-.8rem'
                        top='-.8rem'
                      >
                        {data.getUnreadMessagesCount.length}
                      </Flex>
                    ) : null}
                  </Box>
                </li>
              </NextLink>
              <NextLink
                href={{
                  pathname: router.pathname,
                  query: { ...router.query, createPost: 'select' },
                }}
                as='/create/select'
              >
                <li>
                  <IconButton
                    size='sm'
                    ariaLabel='home link'
                    color='blackAlpha'
                    variant='link'
                    icon={<Icon name='plus' />}
                  />
                </li>
              </NextLink>
              {/* <NextLink href='/explore'>
                <li>
                  <IconButton
                    size='sm'
                    ariaLabel='home link'
                    color='blackAlpha'
                    variant='link'
                    icon={<Icon name='compass' />}
                  />
                </li>
              </NextLink> */}
              <Notification />
            </Space>
          </Box>

          <Box ml={{ md: '1.6rem' }}>
            <AvatarPopover
              isOpen={isOpen}
              onClose={onClose}
              onToggle={onToggle}
            />
          </Box>
        </Flex>
      </Box>

      {!!router.query.createPost && <AddPost />}
    </>
  );
};
