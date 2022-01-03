import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Text } from '@components/elements/Text';
import { Box } from '@components/layout/Box';
import { Flex } from '@components/layout/Flex';
import { AccountNavItem } from './AccountLayout.styles';

const accountLinks = [
  {
    text: 'Edit Profile',
    href: '/accounts/edit',
  },
  {
    text: 'Change Password',
    href: '/accounts/change_password',
  },
];

const AccountLayout: React.FC = ({ children }) => {
  const router = useRouter();
  return (
    <Box as='section' padding={{ sm: '3rem 0' }}>
      <Flex
        maxW='94rem'
        mx='auto'
        backgroundColor='#fff'
        border={{ sm: '1px solid' }}
        borderColor={{ sm: 'blackAlpha.3' }}
        minH='60rem'
      >
        {/* Sidebar */}
        <Box
          maxW='25rem'
          w='100%'
          borderRight='1px solid'
          borderColor='blackAlpha.3'
          display={{ xs: 'none', md: 'block' }}
        >
          {accountLinks.map((el) => (
            <NextLink href={el.href} key={el.href}>
              <AccountNavItem active={router.pathname === el.href}>
                <Text
                  fontWeight={
                    router.pathname === el.href ? 'semibold' : 'normal'
                  }
                >
                  {el.text}
                </Text>
              </AccountNavItem>
            </NextLink>
          ))}
        </Box>
        {/* Content */}
        {children}
      </Flex>
    </Box>
  );
};

export default AccountLayout;
