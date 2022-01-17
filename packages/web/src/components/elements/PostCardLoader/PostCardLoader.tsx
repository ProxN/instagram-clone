import ContentLoader from 'react-content-loader';
import { useUp } from '@xstyled/styled-components';
import { Box } from '@components/layout/Box';
import { FollowLoader } from '../FollowLoader';
import { Loader } from '../Loader';
import { Flex } from '@components/layout/Flex';

const PostCardLoader: React.FC = (props) => {
  const breakPoint = useUp('md');

  if (!breakPoint) {
    return (
      <Flex color='#fff' justifyContent='center' w='100%'>
        <Loader />
      </Flex>
    );
  }
  return (
    <Box
      display='grid'
      gridTemplateColumns='1fr 20% 1fr'
      gridTemplateRows='6rem 1fr auto'
    >
      <Box gridColumn='1 / 3' gridRow='1 / -1'>
        <ContentLoader
          speed={2}
          viewBox='0 0 512 512'
          backgroundColor='#f3f3f3'
          foregroundColor='#ecebeb'
          {...props}
        >
          <rect x='5' y='3' rx='2' ry='2' width='100%' height='100%' />
        </ContentLoader>
      </Box>
      <Box display='flex' flexDirection='column' gridRow='1 / -1'>
        <Box padding='1rem 1.5rem'>
          <FollowLoader />
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
            {...props}
          >
            <rect x='12' y='16' rx='3' ry='3' width='178' height='15' />
            <rect x='12' y='45' rx='3' ry='3' width='128' height='15' />
            <rect x='12' y='73' rx='3' ry='3' width='69' height='15' />
          </ContentLoader>
        </Box>
      </Box>
    </Box>
  );
};

export default PostCardLoader;
