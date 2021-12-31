import { Box, BoxProps } from '../Box';

const Center: React.FC<BoxProps> = (props) => {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      {...props}
    />
  );
};

export default Center;
