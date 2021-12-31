import { Avatar } from '@components/elements/Avatar';
import { Text } from '@components/elements/Text';
import { Box } from '@components/layout/Box';
import { Flex } from '@components/layout/Flex';

const Suggestions = () => {
  return (
    <Box w='100%' maxW='29.4rem'>
      <Flex mb='1rem' justifyContent='space-between'>
        <Text color='gray' fontWeight='bold'>
          Suggestions for you
        </Text>
        <Text fontWeight='semibold'>See all</Text>
      </Flex>
      <Box>
        <Flex mb='1rem' alignItems='center'>
          <Box mr='1rem'>
            <Avatar src='https://avatars.githubusercontent.com/u/46717240?v=4' />
          </Box>
          <Flex flex='1' flexDirection='column'>
            <Text fontWeight='semibold'>Ayoub</Text>
            <Text color='gray' size='xs' fontWeight='semibold'>
              Followed by *** + 1 more
            </Text>
          </Flex>
          <Text ml='.6rem' as='button' color='blue'>
            Follow
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default Suggestions;
