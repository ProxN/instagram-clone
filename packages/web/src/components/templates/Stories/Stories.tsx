import { Avatar } from '@components/elements/Avatar';
import { Text } from '@components/elements/Text';
import { Box } from '@components/layout/Box';
import { Flex } from '@components/layout/Flex';
import { StoriesContainer } from './Stories.styles';

const Stories = () => {
  return (
    <Box overflow='hidden'>
      <StoriesContainer size='lg'>
        <Flex flexDirection='column' alignItems='center'>
          <Avatar
            addBorder
            src='https://avatars.githubusercontent.com/u/46717240?v=4'
            size='lg'
          />
          <Text mt={2} size='xs'>
            Ayoub
          </Text>
        </Flex>
        <Flex flexDirection='column' alignItems='center'>
          <Avatar
            addBorder
            src='https://avatars.githubusercontent.com/u/48840164?s=100&v=4'
            size='lg'
          />
          <Text mt={2} size='xs'>
            Rabbitou
          </Text>
        </Flex>
        <Flex flexDirection='column' alignItems='center'>
          <Avatar
            addBorder
            src='https://avatars.githubusercontent.com/u/44057801?s=100&v=4'
            size='lg'
          />
          <Text mt={2} size='xs'>
            driwand
          </Text>
        </Flex>
        <Flex flexDirection='column' alignItems='center'>
          <Avatar addBorder size='lg' />
          <Text mt={2} size='xs'>
            Albator
          </Text>
        </Flex>
      </StoriesContainer>
    </Box>
  );
};

export default Stories;
