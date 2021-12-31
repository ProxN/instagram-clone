import { Box } from '@components/layout/Box';
import { Flex } from '@components/layout/Flex';
import { Space } from '@components/layout/Space';
import { useShow } from '@lib/hooks/useShow';
import Image from 'next/image';
import { AddComment } from '../AddComment';
import { Avatar } from '../Avatar';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { Text } from '../Text';

const Card = () => {
  const { showSuggestions } = useShow(['md', 'lg', 'xl']);
  return (
    <Box
      backgroundColor='#fff'
      border={{ sm: '1px solid' }}
      borderColor={{ sm: 'blackAlpha.3' }}
    >
      <Flex
        padding='1.2rem 1.5em'
        justifyContent='space-between'
        alignItems='center'
      >
        <Flex alignItems='center'>
          <Avatar
            addBorder
            src='https://avatars.githubusercontent.com/u/46717240?v=4'
            size='md'
          />
          <Text ml={3}>Ayoub</Text>
        </Flex>
        <Box>
          <IconButton
            variant='link'
            ariaLabel='more options'
            icon={<Icon name='ellipsis' />}
          />
        </Box>
      </Flex>
      <Box position='relative'>
        <Image
          alt='Image hespress'
          layout='responsive'
          height='100%'
          width='100%'
          src='https://instagram.fcmn2-2.fna.fbcdn.net/v/t51.2885-15/fr/e15/s1080x1080/270244080_331344332087842_8513844143642737405_n.jpg?_nc_ht=instagram.fcmn2-2.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WY3dD-rFbqQAX-igFcA&tn=9emwV6O__xdg_-Sd&edm=AJ9x6zYBAAAA&ccb=7-4&ig_cache_key=MjczODU3OTU0NDczNjM2MTAxMg%3D%3D.2-ccb7-4&oh=00_AT9AjFyXGDwgO2d90VPcmfPlPbOr3shqpRUXbOQQp4wx1Q&oe=61D0FAD4&_nc_sid=cff2a4'
        />
      </Box>
      <Flex
        padding='1.4rem 1.5rem'
        justifyContent='space-between'
        alignItems='center'
      >
        <Space size={4}>
          <IconButton
            variant='link'
            ariaLabel='like'
            icon={<Icon name='heart' />}
          />
          <IconButton
            variant='link'
            ariaLabel='comment'
            icon={<Icon name='chat' />}
          />
          <IconButton
            variant='link'
            ariaLabel='like post'
            icon={<Icon name='paper-plane' />}
          />
        </Space>
        <Box>
          <IconButton
            variant='link'
            ariaLabel='save'
            icon={<Icon name='bookmark' />}
          />
        </Box>
      </Flex>
      <Box padding='0 1.5rem 1.5rem 1.5rem'>
        <Box mb='.6rem'>
          <Text as='a' fontWeight='semibold'>
            560 likes
          </Text>
        </Box>
        <Box mb='.4rem'>
          <Text fontWeight='semibold' as='a'>
            hespress&nbsp;
          </Text>
          <Text>
            this is a long long long long long long long long postThis is a long
            long long long post
            <Text color='gray'>... more</Text>
          </Text>
        </Box>
        <Flex flexDirection='column'>
          <Text color='gray'>View all 13 comments</Text>
          <Text mt='.6rem' size={10} color='gray' textTransform='uppercase'>
            1 day ago
          </Text>
        </Flex>
      </Box>
      {showSuggestions && <AddComment />}
    </Box>
  );
};

export default Card;
