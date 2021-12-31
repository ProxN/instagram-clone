import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForgotPasswordMutation } from '@lib/graphql';
import { client } from '@lib/utility/graphqlClient';
import { WithNoUser } from '@lib/utility/withNoUser';
import { AuthForm } from '@components/templates/AuthForm';
import { TextInput } from '@components/elements/TextInput';
import { Button } from '@components/elements/Button';
import { Text } from '@components/elements/Text';

interface ForgotPasswordForm {
  email: string;
}

const PasswordSchema = yup
  .object({
    email: yup
      .string()
      .email('You have entered an invalid email address. Please try again.')
      .required(),
  })
  .required();

const ForgotPassword = () => {
  const { control, handleSubmit } = useForm<ForgotPasswordForm>({
    resolver: yupResolver(PasswordSchema),
  });

  const { mutate, data, isLoading } = useForgotPasswordMutation(client, {
    onSuccess: (newData) => {
      if (newData.forgotPassword.error) {
        toast.error(newData.forgotPassword.error.message);
      }
    },
  });

  const onSubmit = (inputs: { email: string }) => {
    mutate(inputs);
  };

  return (
    <AuthForm
      onSubmit={handleSubmit(onSubmit)}
      page='forgot_password'
      title='Forgot your password?'
    >
      {data?.forgotPassword.emailSent ? (
        <Text>
          Check your email for a link to reset your password. If it doesn’t
          appear within a few minutes, check your spam folder.
        </Text>
      ) : (
        <>
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
          <Button type='submit' isLoading={isLoading} isPrimary>
            Send me instructions
          </Button>
        </>
      )}
    </AuthForm>
  );
};

export default WithNoUser(ForgotPassword);
