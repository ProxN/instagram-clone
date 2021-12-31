import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useResetPasswordMutation, MeQuery } from '@lib/graphql';
import { client } from '@lib/utility/graphqlClient';
import { Button } from '@components/elements/Button';
import { TextInput } from '@components/elements/TextInput';
import { AuthForm } from '@components/templates/AuthForm';

interface ResetPasswordData {
  password: string;
  confirmPassword: string;
}

const resetPasswordSchema = yup
  .object({
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required(),
  })
  .required();

const ResetPassword = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm<ResetPasswordData>({
    resolver: yupResolver(resetPasswordSchema),
  });

  const { mutate, isLoading } = useResetPasswordMutation(client, {
    onSuccess: (data) => {
      if (data.resetPassword.error) {
        toast.error(data.resetPassword.error.message);
      }
      if (data.resetPassword.user) {
        queryClient.setQueryData<MeQuery>(['Me', null], {
          me: data.resetPassword.user,
        });
        router.push('/');
      }
    },
  });

  const onSubmit = (inputs: { password: string; confirmPassword: string }) => {
    mutate({
      newPassword: inputs.password,
      resetToken: router.query.token as string,
    });
  };

  return (
    <AuthForm
      onSubmit={handleSubmit(onSubmit)}
      hideLinks
      title='Set new password.'
    >
      <Controller
        render={({ field, fieldState: { error, invalid } }) => (
          <TextInput
            placeholder='New password'
            type='password'
            label='Password'
            id='password'
            isInvalid={invalid}
            error={error?.message}
            {...field}
          />
        )}
        name='password'
        control={control}
      />
      <Controller
        render={({ field, fieldState: { error, invalid } }) => (
          <TextInput
            placeholder='Confirm new password'
            type='password'
            label='Confirm password'
            id='confirmPassword'
            isInvalid={invalid}
            error={error?.message}
            {...field}
          />
        )}
        name='confirmPassword'
        control={control}
      />
      <Button type='submit' isLoading={isLoading} isPrimary>
        Set new password
      </Button>
    </AuthForm>
  );
};

export default ResetPassword;
