import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Button } from '@components/elements/Button';
import { Heading } from '@components/elements/Heading';
import { TextInput } from '@components/elements/TextInput';
import { Box } from '@components/layout/Box';
import { Flex } from '@components/layout/Flex';
import { Space } from '@components/layout/Space';
import { AccountLayout } from '@components/templates/AccountLayout';
import { withUser } from '@lib/utility/withUser';
import { useUpdatePasswordMutation } from '@lib/graphql';
import { client } from '@lib/utility/graphqlClient';
import toast from 'react-hot-toast';

type ChangePasswordInput = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ChangePassSchema = yup
  .object({
    oldPassword: yup.string().required(),
    newPassword: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .notOneOf(
        [yup.ref('oldPassword'), null],
        'New password is the same as old password'
      )
      .required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], 'Password must match.'),
  })
  .required();

const ChangePassword = () => {
  const { control, handleSubmit, formState } = useForm<ChangePasswordInput>({
    resolver: yupResolver(ChangePassSchema),
    mode: 'onChange',
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });
  const { mutate, isLoading } = useUpdatePasswordMutation(client, {
    onSuccess: (data) => {
      if (data.updatePassword.error) {
        toast.error(data.updatePassword.error.message);
      }
      if (data.updatePassword.updated) {
        toast.success('Password changed.');
      }
    },
  });

  const onSubmit = (data: ChangePasswordInput) => {
    mutate({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    });
  };
  return (
    <AccountLayout>
      <Box padding='1.5rem 1rem' flex='1' mx='auto' maxW='50rem'>
        <Heading size='2xl'>Change your password</Heading>
        <Space
          onSubmit={handleSubmit(onSubmit)}
          as='form'
          mt={4}
          flexDirection='column'
        >
          <Controller
            render={({ field, fieldState: { error, invalid } }) => (
              <TextInput
                placeholder='Enter your old password'
                label='Old password'
                id='oldPassword'
                type='password'
                error={error?.message}
                isInvalid={invalid}
                {...field}
              />
            )}
            name='oldPassword'
            control={control}
          />
          <Controller
            render={({ field, fieldState: { error, invalid } }) => (
              <TextInput
                placeholder='Enter your new password'
                label='New password'
                id='newPassword'
                type='password'
                error={error?.message}
                isInvalid={invalid}
                {...field}
              />
            )}
            name='newPassword'
            control={control}
          />
          <Controller
            render={({ field, fieldState: { error, invalid } }) => (
              <TextInput
                placeholder='Confirm new password'
                label='Confirm password'
                id='confirmPassword'
                type='password'
                error={error?.message}
                isInvalid={invalid}
                {...field}
              />
            )}
            name='confirmPassword'
            control={control}
          />
          <Flex>
            <Button
              isDisabled={!formState.isValid || isLoading}
              isLoading={isLoading}
              isPrimary
            >
              Change password
            </Button>
          </Flex>
        </Space>
      </Box>
    </AccountLayout>
  );
};

export default withUser(ChangePassword);
