import { Box } from '@components/layout/Box';
import { Feed } from '@components/templates/Feed';
import { PostModal } from '@components/templates/PostModal';
import Stories from '@components/templates/Stories/Stories';
import { Suggestions } from '@components/templates/Suggestions';
import { useShow } from '@lib/hooks/useShow';
import { withUser } from '@lib/utility/withUser';
import { useRouter } from 'next/router';

const Home = () => {
  const { show } = useShow(['lg', 'xl']);
  const router = useRouter();

  return (
    <Box
      as='section'
      padding={{ sm: '3rem 0' }}
      mx='auto'
      maxW={{ xs: '64.6rem', lg: '94rem' }}
    >
      <Box display='flex'>
        <Box flex='1' mr={{ lg: '2rem' }} maxW={{ md: '100%', lg: '64.6rem' }}>
          <Stories />
          <Feed />
        </Box>
        {show && <Suggestions />}
      </Box>
      {!!router.query.postId && <PostModal />}
    </Box>
  );
};

export default withUser(Home);
