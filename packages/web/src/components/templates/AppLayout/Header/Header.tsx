import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Popover } from 'react-tiny-popover';
import { Icon } from '@components/elements/Icon';
import { Box } from '@components/layout/Box';
import { Flex } from '@components/layout/Flex';
import { TextInput } from '@components/elements/TextInput';
import { Space } from '@components/layout/Space';
import { IconButton } from '@components/elements/IconButton';
import { Avatar } from '@components/elements/Avatar';
import { Text } from '@components/elements/Text';
import { useLogout } from '@lib/hooks/useLogout';

interface HeaderProps {
  avatar?: string | null;
  username: string;
}

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

const Header: React.FC<HeaderProps> = ({ avatar, username }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const router = useRouter();
  const { handleLogout } = useLogout();

  useEffect(() => {
    const handleRouteChange = () => {
      setShowAvatarMenu(false);
      setShowMenu(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

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
          <NextLink href='/home'>
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
            <Box
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
            </Box>
            {/* Links */}
            <Space
              justifyContent={{ xs: 'space-between', md: 'flex-end' }}
              alignItems='center'
              as='ul'
              size='md'
            >
              <NextLink href='/home'>
                <li>
                  <IconButton
                    size='sm'
                    ariaLabel='home link'
                    color='blackAlpha'
                    variant='link'
                    icon={<Icon name='home' />}
                  />
                </li>
              </NextLink>
              <NextLink href='/inbox'>
                <li>
                  <IconButton
                    size='sm'
                    ariaLabel='home link'
                    color='blackAlpha'
                    variant='link'
                    icon={<Icon name='paper-plane' />}
                  />
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
              <NextLink href='/explore'>
                <li>
                  <IconButton
                    size='sm'
                    ariaLabel='home link'
                    color='blackAlpha'
                    variant='link'
                    icon={<Icon name='compass' />}
                  />
                </li>
              </NextLink>
              <li>
                <IconButton
                  size='sm'
                  ariaLabel='home link'
                  color='blackAlpha'
                  variant='link'
                  icon={<Icon name='heart' />}
                />
              </li>
            </Space>
          </Box>

          <Box ml={{ md: '1.6rem' }}>
            <Popover
              isOpen={showAvatarMenu}
              positions={['bottom', 'left']}
              align='end'
              reposition={false}
              onClickOutside={() => setShowAvatarMenu(false)}
              padding={10}
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
                      minW='20rem'
                      border='1px solid'
                      borderColor='blackAlpha.1'
                    >
                      <Flex flexDirection='column' fontSize='1.6rem'>
                        <NextLink href={`/home/${username}`}>
                          <Flex
                            backgroundColor={{ hover: 'gray.0' }}
                            cursor='pointer'
                            alignItems='center'
                            fontWeight='semibold'
                            padding='.8rem 1.5rem'
                          >
                            <Box>
                              <Icon name='user' />
                            </Box>
                            <Text ml='1rem'>Profile</Text>
                          </Flex>
                        </NextLink>
                        <Flex
                          cursor='pointer'
                          backgroundColor={{ hover: 'gray.0' }}
                          alignItems='center'
                          fontWeight='semibold'
                          padding='.8rem 1.5rem'
                        >
                          <Box>
                            <Icon name='bookmark' />
                          </Box>
                          <Text ml='1rem'>Saved</Text>
                        </Flex>
                        <NextLink href='/accounts/edit'>
                          <Flex
                            cursor='pointer'
                            backgroundColor={{ hover: 'gray.0' }}
                            alignItems='center'
                            fontWeight='semibold'
                            padding='.8rem 1.5rem'
                          >
                            <Box>
                              <Icon name='settings' />
                            </Box>
                            <Text ml='1rem'>Settings</Text>
                          </Flex>
                        </NextLink>
                        <Flex
                          onClick={handleLogout}
                          cursor='pointer'
                          alignItems='center'
                          backgroundColor={{ hover: 'gray.0' }}
                          fontWeight='semibold'
                          padding='.8rem .6rem'
                          borderTop='1px solid transparent'
                          borderColor='blackAlpha.3'
                        >
                          <Text ml='1rem'>Log out</Text>
                        </Flex>
                      </Flex>
                    </Box>
                  </motion.div>
                </AnimatePresence>
              )}
            >
              <div>
                <Avatar
                  src={avatar}
                  onClick={() => setShowAvatarMenu(!showAvatarMenu)}
                />
              </div>
            </Popover>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Header;
