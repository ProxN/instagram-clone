import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { SignupInputs, useSignupMutation, MeQuery } from '@lib/graphql';
import { client } from '@lib/utility/graphqlClient';
import { WithNoUser } from '@lib/utility/withNoUser';
import { Button } from '@components/elements/Button';
import { TextInput } from '@components/elements/TextInput';
import { AuthForm } from '@components/templates/AuthForm';

const SignupSchema = yup
  .object({
    email: yup
      .string()
      .email('You have entered an invalid email address. Please try again.')
      .required(),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required(),
    name: yup.string().required(),
    username: yup.string().required(),
  })
  .required();

const SignUp = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { control, handleSubmit, formState } = useForm<SignupInputs>({
    resolver: yupResolver(SignupSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      username: '',
      name: '',
    },
  });

  const { mutate, isLoading } = useSignupMutation(client, {
    onSuccess: (data) => {
      if (data.signup.error) {
        toast.error(data.signup.error.message);
      }
      if (data.signup.user) {
        queryClient.setQueryData<MeQuery>(['Me'], {
          me: data.signup.user,
        });
        router.push('/home');
      }
    },
  });

  const onSubmit = (data: SignupInputs) => {
    mutate(data);
  };

  return (
    <AuthForm onSubmit={handleSubmit(onSubmit)} page='signup' title='Sign up.'>
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
            placeholder='Enter your fullname'
            label='Fullname'
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
        Sign Up
      </Button>
    </AuthForm>
  );
};

export default WithNoUser(SignUp);
