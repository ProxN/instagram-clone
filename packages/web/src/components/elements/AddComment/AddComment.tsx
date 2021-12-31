import { Box } from '@components/layout/Box';
import { Flex } from '@components/layout/Flex';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { TextArea } from '../TextArea';

const AddComment = () => {
  return (
    <Box
      borderTop='1px solid'
      borderColor='blackAlpha.3'
      padding='.6rem 1.6rem'
    >
      <Flex alignItems='center'>
        <IconButton
          variant='light'
          color='#fff'
          size='md'
          ariaLabel='select emoji'
          icon={<Icon name='happy-face' />}
        />
        <TextArea h='2rem' border='none' w='100%' placeholder='Add a comment' />
        <Button variant='link' isPrimary>
          Post
        </Button>
      </Flex>
    </Box>
  );
};

export default AddComment;
