import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { NewCommentInput, useNewCommentMutation } from '@lib/graphql';
import { Box } from '@components/layout/Box';
import { Flex } from '@components/layout/Flex';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { TextArea } from '../TextArea';
import { Loader } from '../Loader';
import { client } from '@lib/utility/graphqlClient';
import { useQueryClient } from 'react-query';
import { RefObject } from 'react';

const NewCommentSchema = yup
  .object({
    text: yup.string().required(),
  })
  .required();

const AddComment: React.FC<{
  post_id: string;
  inputRef: RefObject<HTMLTextAreaElement>;
}> = ({ post_id, inputRef }) => {
  const queryClient = useQueryClient();
  const { control, handleSubmit, formState, reset } = useForm<NewCommentInput>({
    resolver: yupResolver(NewCommentSchema),
    mode: 'onChange',
    defaultValues: {
      post_id,
      text: '',
    },
  });
  const { mutate, isLoading } = useNewCommentMutation(client, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(
        [
          'GetComments.infinite',
          {
            post_id,
            limit: 30,
          },
        ],
        {
          refetchPage: (_, index) => {
            return index === 0;
          },
        }
      );
      reset();
    },
  });

  const onSubmit = (data: NewCommentInput) => {
    mutate(data);
  };
  return (
    <Box
      borderTop='1px solid'
      borderColor='blackAlpha.2'
      position='relative'
      padding='.6rem 1.6rem'
    >
      <Flex alignItems='center' as='form' onSubmit={handleSubmit(onSubmit)}>
        <IconButton
          variant='light'
          color='#fff'
          size='md'
          ariaLabel='select emoji'
          icon={<Icon name='happy-face' />}
        />
        <Controller
          render={({ field }) => (
            <TextArea
              placeholder='Add a comment'
              h='3rem'
              w='100%'
              border='none'
              {...field}
              ref={inputRef}
            />
          )}
          name='text'
          control={control}
        />
        <Button
          isDisabled={!formState.isValid || isLoading}
          variant='link'
          isPrimary
        >
          Post
        </Button>
      </Flex>
      {isLoading && (
        <Box
          position='absolute'
          top='0'
          left='0'
          right='0'
          bottom='0'
          display='flex'
          alignItems='center'
          justifyContent='center'
          color='blackAlpha.9'
        >
          <Loader size='small' />
        </Box>
      )}
    </Box>
  );
};

export default AddComment;
