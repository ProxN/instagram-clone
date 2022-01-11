import { useState } from 'react';
import { useQueryClient } from 'react-query';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
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
import {
  MeQuery,
  UpdateUserInput,
  useUpdateAvatarMutation,
  useUpdateProfileMutation,
} from '@lib/graphql';
import { client } from '@lib/utility/graphqlClient';
import toast from 'react-hot-toast';

const EditSchema = yup
  .object({
    name: yup.string().required(),
    username: yup.string().required(),
    website: yup.string().url('Please provide a valid url'),
    bio: yup.string(),
  })
  .required();

const Edit = () => {
  const [avatar, setAvatar] = useState('');
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData(['Me']) as MeQuery;
  const { control, handleSubmit, formState } = useForm<UpdateUserInput>({
    resolver: yupResolver(EditSchema),
    mode: 'onChange',
    defaultValues: {
      name: userData.me?.name || '',
      website: userData.me?.website || '',
      username: userData.me?.username || '',
      bio: userData.me?.bio || '',
    },
  });

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

  const { mutate: updateProfile, isLoading: profileLoading } =
    useUpdateProfileMutation(client, {
      onSuccess: (data) => {
        if (data.updateProfile.error) {
          toast.error(data.updateProfile.error.message);
        }
        if (data.updateProfile.user) {
          queryClient.setQueryData<MeQuery>(['Me'], {
            me: data.updateProfile.user,
          });

          toast.success('Profile saved.');
        }
      },
    });

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

  const onSubmit = (data: UpdateUserInput) => {
    updateProfile(data);
  };

  return (
    <AccountLayout>
      <Box padding='1.5rem 1rem' flex='1' mx='auto' maxW='50rem'>
        <Flex mb={6} alignItems='center'>
          <label htmlFor='avatar'>
            <Avatar
              isLoading={isLoading}
              size='md'
              src={avatar || '/default.jpg' || userData.me?.avatar}
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
        <Space
          onSubmit={handleSubmit(onSubmit)}
          flexDirection='column'
          as='form'
        >
          <Controller
            render={({ field, fieldState: { error, invalid } }) => (
              <TextInput
                placeholder='Enter your name'
                label='Name'
                id='name'
                error={error?.message}
                isInvalid={invalid}
                {...field}
              />
            )}
            name='name'
            control={control}
          />
          <Controller
            render={({ field, fieldState: { error, invalid } }) => (
              <TextInput
                placeholder='Enter your username'
                label='Username'
                id='username'
                error={error?.message}
                isInvalid={invalid}
                {...field}
              />
            )}
            name='username'
            control={control}
          />
          <Controller
            render={({ field, fieldState: { error, invalid } }) => (
              <TextInput
                placeholder='Enter your website'
                label='Website'
                id='website'
                error={error?.message}
                isInvalid={invalid}
                {...field}
              />
            )}
            name='website'
            control={control}
          />{' '}
          <Controller
            render={({ field, fieldState: { error, invalid } }) => (
              <TextArea
                placeholder='Enter your bio'
                label='Bio'
                id='bio'
                h='8rem'
                error={error?.message}
                isInvalid={invalid}
                {...field}
              />
            )}
            name='bio'
            control={control}
          />
          <TextInput
            label='Email'
            value={userData.me?.email}
            isDisabled
            placeholder='Email'
          />
          <Box mt={4}>
            <Button
              isDisabled={!formState.isValid || profileLoading}
              isLoading={profileLoading}
              isPrimary
            >
              Save
            </Button>
          </Box>
        </Space>
      </Box>
    </AccountLayout>
  );
};

export default withUser(Edit);
