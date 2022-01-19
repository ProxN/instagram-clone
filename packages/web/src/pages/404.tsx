import NextLink from 'next/link';
import { Text } from '@components/elements/Text';
import { Box } from '@components/layout/Box';
import { Flex } from '@components/layout/Flex';

const Custom404 = () => {
  return (
    <Box as='section' p='5rem 0'>
      <Flex flexDirection='column' alignItems='center'>
        <Text as='h2' fontWeight='semibold' size='lg'>
          Sorry, this page isn&apos;t available.
        </Text>
        <Text size='md' mt={6}>
          The link you followed may be broken, or the page may have been
          removed. <NextLink href='/home'>Go back</NextLink>
        </Text>
      </Flex>
    </Box>
  );
};

export default Custom404;
