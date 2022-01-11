import Image from 'next/image';
import { Text } from '@components/elements/Text';
import { Box } from '@components/layout/Box';
import { Flex } from '@components/layout/Flex';

const UserPosts = () => {
  return (
    <Flex
      backgroundColor='#fff'
      flexDirection={{ xs: 'column', md: 'row-reverse' }}
      alignItems={{ md: 'center' }}
    >
      <Flex padding='4rem 0' justifyContent='center' w='100%'>
        <Text fontWeight='semibold'>
          Start capturing and sharing your moments.
        </Text>
      </Flex>
      <Box flex={{ md: '70%' }}>
        <Image
          alt='default picture'
          src='/pic.jpg'
          layout='responsive'
          width='100%'
          height='100%'
          priority
        />
      </Box>
    </Flex>
  );

  {
    /* <Box
  display='grid'
  gridTemplateColumns='repeat(auto-fit,33%)'
  gap={{ xs: '1rem', md: '2rem' }}
>
  <Box>
    <Image
      alt={data.getUserProfile.posts[0].caption || 'post image'}
      src={data.getUserProfile.posts[0].post_url}
      layout='responsive'
      height='100%'
      width='100%'
    />
  </Box>
</Box> */
  }
};

export default UserPosts;
