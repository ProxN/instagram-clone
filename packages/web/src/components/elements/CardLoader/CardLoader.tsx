import ContentLoader from 'react-content-loader';
import { Box } from '@components/layout/Box';
import { FollowLoader } from '../FollowLoader';

const CardLoader = () => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      border={{ sm: '1px solid' }}
      borderColor={{ sm: 'blackAlpha.3' }}
      overflow='hidden'
    >
      <Box p='1rem 1.5rem'>
        <FollowLoader />
      </Box>
      <Box h='50rem' overflow='hidden' ml='-6px'>
        <ContentLoader
          speed={2}
          viewBox='0 0 600 600'
          backgroundColor='#f3f3f3'
          foregroundColor='#ecebeb'
        >
          <rect x='5' y='3' rx='2' ry='2' width='100%' height='100%' />
        </ContentLoader>
      </Box>
      <Box
        flex='1'
        borderTop='1px solid'
        borderBottom='1px solid'
        borderColor='blackAlpha.2'
      />
      <Box padding='1rem 0 2rem 0'>
        <ContentLoader
          speed={2}
          width={200}
          height={100}
          viewBox='0 0 200 100'
          backgroundColor='#f3f3f3'
          foregroundColor='#ecebeb'
        >
          <rect x='12' y='16' rx='3' ry='3' width='178' height='15' />
          <rect x='12' y='45' rx='3' ry='3' width='128' height='15' />
          <rect x='12' y='73' rx='3' ry='3' width='69' height='15' />
        </ContentLoader>
      </Box>
    </Box>
  );
};

export default CardLoader;
