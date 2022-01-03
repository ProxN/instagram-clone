import Router from 'next/router';
import Head from 'next/head';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { Controller, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { WithNoUser } from '@lib/utility/withNoUser';
import { client } from '@lib/utility/graphqlClient';
import { LoginInputs, useSigninMutation, MeQuery } from '@lib/graphql';
import { Button } from '@components/elements/Button';
import { TextInput } from '@components/elements/TextInput';
import { AuthForm } from '@components/templates/AuthForm';

const LoginSchema = yup
  .object({
    email: yup
      .string()
      .email('You have entered an invalid email address. Please try again.')
      .required(),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required(),
  })
  .required();

const Login = () => {
  const queryClient = useQueryClient();
  const { control, handleSubmit, formState } = useForm<LoginInputs>({
    resolver: yupResolver(LoginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { mutate, isLoading } = useSigninMutation(client, {
    onSuccess: (data) => {
      if (data.signin.error) {
        toast.error(data.signin.error.message);
      }
      if (data.signin.user) {
        queryClient.setQueryData<MeQuery>(['Me'], {
          me: data.signin.user,
        });
        Router.push('/home');
      }
    },
  });

  const onSubmit = (inputs: LoginInputs) => {
    mutate(inputs);
  };

  return (
    <AuthForm onSubmit={handleSubmit(onSubmit)} title='Log in.'>
      <Head>
        <title>Fullstack boilerplate - Login</title>
      </Head>
      <Controller
        render={({ field, fieldState: { error, invalid } }) => (
          <TextInput
            placeholder='Enter your email'
            label='Email'
            id='email'
            isInvalid={invalid}
            error={error?.message}
            {...field}
          />
        )}
        name='email'
        control={control}
      />
      <Controller
        render={({ field, fieldState: { error, invalid } }) => (
          <TextInput
            placeholder='Enter your password'
            type='password'
            label='Password'
            id='password'
            error={error?.message}
            isInvalid={invalid}
            {...field}
          />
        )}
        name='password'
        control={control}
      />

      <Button
        isDisabled={!formState.isValid || isLoading}
        isLoading={isLoading}
        type='submit'
        radius='sm'
        isPrimary
      >
        login
      </Button>
    </AuthForm>
  );
};

export default WithNoUser(Login);
