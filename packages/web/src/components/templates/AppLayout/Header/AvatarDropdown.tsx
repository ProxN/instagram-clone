import { Popover } from 'react-tiny-popover';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import NextLink from 'next/link';
import { Box } from '@components/layout/Box';
import { Flex } from '@components/layout/Flex';
import { Text } from '@components/elements/Text';
import { Icon } from '@components/elements/Icon';
import { Avatar } from '@components/elements/Avatar';
import { useLogout } from '@lib/hooks/useLogout';
import { useQueryClient } from 'react-query';
import { MeQuery, useMeQuery } from '@lib/graphql';

export interface AvatarPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
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

export const AvatarPopover: React.FC<AvatarPopoverProps> = ({
  isOpen,
  onClose,
  onToggle,
}) => {
  const { handleLogout } = useLogout();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<MeQuery>(useMeQuery.getKey());

  return (
    <Popover
      isOpen={isOpen}
      positions={['bottom', 'left']}
      align='end'
      reposition={false}
      onClickOutside={onClose}
      padding={10}
      containerStyle={{ zIndex: '9999' }}
      content={() => (
        <LazyMotion features={domAnimation}>
          <m.div
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
                <NextLink href={`/${user?.me?.username}`}>
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
          </m.div>
        </LazyMotion>
      )}
    >
      <div>
        <Avatar src={user?.me?.avatar || '/default.jpg'} onClick={onToggle} />
      </div>
    </Popover>
  );
};
