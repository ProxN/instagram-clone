import { useState } from 'react';
import { useQueryClient } from 'react-query';
// import * as yup from 'yup';
// import { Controller, useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Avatar } from '@components/elements/Avatar';
import { Button } from '@components/elements/Button';
import { Input } from '@components/elements/Input';
import { Text } from '@components/elements/Text';
import { TextArea } from '@components/elements/TextArea';
import { TextInput } from '@components/elements/TextInput';
import { Box } from '@components/layout/Box';
import { Flex } from '@components/layout/Flex';
import { Space } from '@components/layout/Space';
import { AccountLayout } from '@components/templates/AccountLayout';
import { withUser } from '@lib/utility/withUser';
import { MeQuery, User, useUpdateAvatarMutation } from '@lib/graphql';
import { client } from '@lib/utility/graphqlClient';

// const EditSchema = yup
//   .object({
//     email: yup
//       .string()
//       .email('You have entered an invalid email address. Please try again.'),
//     name: yup.string().required(),
//     username: yup.string().required(),
//   })
//   .required();

const Edit = () => {
  const [avatar, setAvatar] = useState('');
  const queryClient = useQueryClient();
  const { mutate: updateAvatar, isLoading } = useUpdateAvatarMutation(client, {
    onSuccess: (data) => {
      if (data.updateAvatar.error) return;
      if (data.updateAvatar.user) {
        queryClient.setQueryData<MeQuery>(['Me'], {
          me: data.updateAvatar.user,
        });
      }
    },
  });
  const userData = queryClient.getQueryData(['Me']) as MeQuery;

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      updateAvatar({
        file: e.target.files[0],
      });
    }
  };

  return (
    <AccountLayout>
      <Box padding='1.5rem 1rem' flex='1' mx='auto' maxW='50rem'>
        <Flex mb={6} alignItems='center'>
          <label htmlFor='avatar'>
            <Avatar
              isLoading={isLoading}
              size='md'
              src={avatar || userData.me?.avatar}
            />
            <Box display='none'>
              <Input
                onChange={handleAvatarChange}
                type='file'
                name='avatar'
                id='avatar'
              />
            </Box>
          </label>
          <Text ml='1rem' size='md' fontWeight='semibold'>
            ayou.39
          </Text>
        </Flex>
        <Space flexDirection='column'>
          <TextInput label='Name' placeholder='Name' />
          <TextInput label='Username' placeholder='Username' />
          <TextInput label='Website' placeholder='Website' />
          <TextArea placeholder='Bio' label='Bio' h='8rem' />
          <TextInput label='Email' placeholder='Email' />
          <Box mt={4}>
            <Button isPrimary>Save</Button>
          </Box>
        </Space>
      </Box>
    </AccountLayout>
  );
};

export default withUser(Edit);
