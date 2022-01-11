import { Box } from '@components/layout/Box';
import React from 'react';
import ContentLoader from 'react-content-loader';

const FollowLoader: React.FC = (props) => (
  <Box mb={{ xs: 3, last: '0' }}>
    <ContentLoader
      speed={2}
      viewBox='0 0 200 40'
      width={200}
      height={40}
      backgroundColor='#f3f3f3'
      foregroundColor='#ecebeb'
      {...props}
    >
      <rect x='48' y='8' rx='3' ry='3' width='89' height='6' />
      <rect x='48' y='26' rx='3' ry='3' width='52' height='6' />
      <circle cx='20' cy='20' r='20' />
    </ContentLoader>
  </Box>
);

export default FollowLoader;
