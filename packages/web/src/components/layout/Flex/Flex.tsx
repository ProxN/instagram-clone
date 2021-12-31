import { Box, BoxProps } from '../Box';
import { forwardRef } from '@lib/utility/forwardRef';

const Flex = forwardRef<BoxProps, 'div'>((props, ref) => {
  return <Box display='flex' ref={ref} {...props} />;
});

export default Flex;
