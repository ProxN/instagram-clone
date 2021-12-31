import { Box } from '@components/layout/Box';
import { Feed } from '@components/templates/Feed';
import Stories from '@components/templates/Stories/Stories';
import { Suggestions } from '@components/templates/Suggestions';
import { useShow } from '@lib/hooks/useShow';

const Home = () => {
  const { showSuggestions } = useShow(['lg', 'xl']);

  return (
    <Box
      as='section'
      padding={{ sm: '3rem 0' }}
      mx='auto'
      maxW={{ xs: '64.6rem', lg: '94rem' }}
    >
      <Box display='flex'>
        <Box mr={{ lg: '2rem' }} maxW={{ md: '100%', lg: '64.6rem' }}>
          <Stories />
          <Feed />
        </Box>
        {showSuggestions && <Suggestions />}
      </Box>
    </Box>
  );
};

export default Home;
