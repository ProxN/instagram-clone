import Link from 'next/link';
import { Center } from '@components/layout/Center';
import { Box } from '@components/layout/Box';
import { Space } from '@components/layout/Space';
import { Heading } from '@components/elements/Heading';
import { Text } from '@components/elements/Text';

const info = {
  login: {
    text: 'Don’t have an account yet?',
    href: '/signup',
    linkText: 'Sign up',
  },
  signup: {
    text: 'Adready have an account?',
    href: '/',
    linkText: 'Log in',
  },
};

interface AuthFormProps {
  title?: string;
  page?: 'login' | 'signup' | 'forgot_password';
  onSubmit?: () => void;
  hideLinks?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({
  children,
  page = 'login',
  hideLinks = false,
  title,
  onSubmit,
}) => {
  return (
    <Center minH='100vh' backgroundColor='gray.0'>
      <Box
        w={{ xs: '100%', sm: '35rem' }}
        backgroundColor='#fff'
        border='1px solid'
        borderColor='blackAlpha.3'
        padding='2rem 3rem'
      >
        <Heading as='h1' size='3xl'>
          {title}
        </Heading>
        <Box as='form' mt={3} w='100%' onSubmit={onSubmit}>
          <Space size={2} flexDirection='column'>
            {children}

            {hideLinks ? (
              ''
            ) : page === 'forgot_password' ? (
              <Link passHref href='/'>
                <Text as='a' isLink>
                  Back to Login
                </Text>
              </Link>
            ) : (
              <Center flexDirection='column'>
                <Text>
                  {info[page].text}
                  <Link passHref href={info[page].href}>
                    <Text as='a' isLink>
                      {' '}
                      {info[page].linkText}
                    </Text>
                  </Link>
                </Text>
                {page === 'login' && (
                  <Link passHref href='/forgot_password'>
                    <Text as='a' isLink>
                      Forgot Password?
                    </Text>
                  </Link>
                )}
              </Center>
            )}
          </Space>
        </Box>
      </Box>
    </Center>
  );
};

export default AuthForm;
