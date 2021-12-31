import { Card } from '@components/elements/Card';
import { Box } from '@components/layout/Box';

const Feed = () => {
  return (
    <Box mt={{ sm: '2rem' }}>
      <Box display='grid' gridTemplateColumns='1fr' rowGap={{ sm: 4 }}>
        <Card />
        <Card />
      </Box>
    </Box>
  );
};

export default Feed;
