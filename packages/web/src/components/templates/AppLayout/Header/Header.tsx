import NextLink from 'next/link';
import { Icon } from '@components/elements/Icon';
import { Box } from '@components/layout/Box';
import { Flex } from '@components/layout/Flex';
import { TextInput } from '@components/elements/TextInput';
import { Space } from '@components/layout/Space';
import { IconButton } from '@components/elements/IconButton';
import { Avatar } from '@components/elements/Avatar';
import { useState } from 'react';
import { useRouter } from 'next/router';

const links = [
  {
    name: 'home',
    icon: 'home',
    href: '/home',
  },
  {
    name: 'inbox',
    icon: 'paper-plane',
    href: '/inbox',
  },
  {
    name: 'create',
    icon: 'plus',
    href: '/home?createPost=select',
    as: '/create/select',
  },
  {
    name: 'explore',
    icon: 'compass',
    href: '/explore',
  },
];

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  return (
    <>
      <Box h='6rem' borderBottom='1px solid' borderColor='blackAlpha.3'>
        <Flex
          padding={{ xs: '0 1.5rem', md: '0 2.5rem' }}
          h='100%'
          justifyContent='space-between'
          onClick={() => setShowMenu(!showMenu)}
          alignItems='center'
        >
          <Box display={{ xs: 'flex', md: 'none' }}>
            <IconButton
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
              <TextInput placeholder='Search' icon={<Icon name='search' />} />
            </Box>
            <Space
              justifyContent={{ xs: 'space-between', md: 'flex-end' }}
              alignItems='center'
              as='ul'
              size='md'
            >
              {links.map((el) => (
                <NextLink
                  href={el.href}
                  key={el.name}
                  as={el.as ? el.as : el.href}
                >
                  <li>
                    <IconButton
                      ariaLabel={el.name}
                      color='blackAlpha'
                      variant='link'
                      icon={
                        <Icon
                          name={
                            el.href === router.pathname
                              ? `${el.icon}-sharp`
                              : el.icon
                          }
                        />
                      }
                    />
                  </li>
                </NextLink>
              ))}
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
            <Avatar name='Ayoub Kan' />
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Header;
