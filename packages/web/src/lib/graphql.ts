import { GraphQLClient } from 'graphql-request';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from 'react-query';

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};

function fetcher<TData, TVariables>(
  client: GraphQLClient,
  query: string,
  variables?: TVariables
) {
  return async (): Promise<TData> =>
    client.request<TData, TVariables>(query, variables);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ForgotPassResponse = {
  __typename?: 'ForgotPassResponse';
  error?: Maybe<FieldError>;
  emailSent?: Maybe<Scalars['Boolean']>;
};

export type LoginInputs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  signup: UserResponse;
  signin: UserResponse;
  forgotPassword: ForgotPassResponse;
  resetPassword: UserResponse;
  logout: Scalars['Boolean'];
  updateUser: UserResponse;
  updatePassword: UpdatePassResponse;
};

export type MutationSignupArgs = {
  data: SignupInputs;
};

export type MutationSigninArgs = {
  data: LoginInputs;
};

export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};

export type MutationResetPasswordArgs = {
  newPassword: Scalars['String'];
  resetToken: Scalars['String'];
};

export type MutationUpdateUserArgs = {
  newUser: UpdateUserInput;
};

export type MutationUpdatePasswordArgs = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
};

export type SignupInputs = {
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
};

export type UpdatePassResponse = {
  __typename?: 'UpdatePassResponse';
  error?: Maybe<FieldError>;
  updated?: Maybe<Scalars['Boolean']>;
};

export type UpdateUserInput = {
  name?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  error?: Maybe<FieldError>;
  user?: Maybe<User>;
};

export type UserResponseFragment = { __typename?: 'UserResponse' } & {
  error?: Maybe<{ __typename?: 'FieldError' } & ErrorFragment>;
  user?: Maybe<{ __typename?: 'User' } & UserFragment>;
};

export type ErrorFragment = { __typename?: 'FieldError' } & Pick<
  FieldError,
  'field' | 'message'
>;

export type UserFragment = { __typename?: 'User' } & Pick<
  User,
  'id' | 'email' | 'name'
>;

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;

export type ForgotPasswordMutation = { __typename?: 'Mutation' } & {
  forgotPassword: { __typename?: 'ForgotPassResponse' } & Pick<
    ForgotPassResponse,
    'emailSent'
  > & { error?: Maybe<{ __typename?: 'FieldError' } & ErrorFragment> };
};

export type SigninMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type SigninMutation = { __typename?: 'Mutation' } & {
  signin: { __typename?: 'UserResponse' } & UserResponseFragment;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'logout'
>;

export type ResetPasswordMutationVariables = Exact<{
  resetToken: Scalars['String'];
  newPassword: Scalars['String'];
}>;

export type ResetPasswordMutation = { __typename?: 'Mutation' } & {
  resetPassword: { __typename?: 'UserResponse' } & UserResponseFragment;
};

export type SignupMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
}>;

export type SignupMutation = { __typename?: 'Mutation' } & {
  signup: { __typename?: 'UserResponse' } & UserResponseFragment;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: 'Query' } & {
  me?: Maybe<{ __typename?: 'User' } & UserFragment>;
};

export const ErrorFragmentDoc = `
    fragment Error on FieldError {
  field
  message
}
    `;
export const UserFragmentDoc = `
    fragment User on User {
  id
  email
  name
}
    `;
export const UserResponseFragmentDoc = `
    fragment UserResponse on UserResponse {
  error {
    ...Error
  }
  user {
    ...User
  }
}
    ${ErrorFragmentDoc}
${UserFragmentDoc}`;
export const ForgotPasswordDocument = `
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    error {
      ...Error
    }
    emailSent
  }
}
    ${ErrorFragmentDoc}`;
export const useForgotPasswordMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    ForgotPasswordMutation,
    TError,
    ForgotPasswordMutationVariables,
    TContext
  >
) =>
  useMutation<
    ForgotPasswordMutation,
    TError,
    ForgotPasswordMutationVariables,
    TContext
  >(
    (variables?: ForgotPasswordMutationVariables) =>
      fetcher<ForgotPasswordMutation, ForgotPasswordMutationVariables>(
        client,
        ForgotPasswordDocument,
        variables
      )(),
    options
  );
export const SigninDocument = `
    mutation Signin($email: String!, $password: String!) {
  signin(data: {email: $email, password: $password}) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;
export const useSigninMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    SigninMutation,
    TError,
    SigninMutationVariables,
    TContext
  >
) =>
  useMutation<SigninMutation, TError, SigninMutationVariables, TContext>(
    (variables?: SigninMutationVariables) =>
      fetcher<SigninMutation, SigninMutationVariables>(
        client,
        SigninDocument,
        variables
      )(),
    options
  );
export const LogoutDocument = `
    mutation Logout {
  logout
}
    `;
export const useLogoutMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    LogoutMutation,
    TError,
    LogoutMutationVariables,
    TContext
  >
) =>
  useMutation<LogoutMutation, TError, LogoutMutationVariables, TContext>(
    (variables?: LogoutMutationVariables) =>
      fetcher<LogoutMutation, LogoutMutationVariables>(
        client,
        LogoutDocument,
        variables
      )(),
    options
  );
export const ResetPasswordDocument = `
    mutation ResetPassword($resetToken: String!, $newPassword: String!) {
  resetPassword(resetToken: $resetToken, newPassword: $newPassword) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;
export const useResetPasswordMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    ResetPasswordMutation,
    TError,
    ResetPasswordMutationVariables,
    TContext
  >
) =>
  useMutation<
    ResetPasswordMutation,
    TError,
    ResetPasswordMutationVariables,
    TContext
  >(
    (variables?: ResetPasswordMutationVariables) =>
      fetcher<ResetPasswordMutation, ResetPasswordMutationVariables>(
        client,
        ResetPasswordDocument,
        variables
      )(),
    options
  );
export const SignupDocument = `
    mutation Signup($email: String!, $password: String!, $name: String!) {
  signup(data: {email: $email, password: $password, name: $name}) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;
export const useSignupMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    SignupMutation,
    TError,
    SignupMutationVariables,
    TContext
  >
) =>
  useMutation<SignupMutation, TError, SignupMutationVariables, TContext>(
    (variables?: SignupMutationVariables) =>
      fetcher<SignupMutation, SignupMutationVariables>(
        client,
        SignupDocument,
        variables
      )(),
    options
  );
export const MeDocument = `
    query Me {
  me {
    ...User
  }
}
    ${UserFragmentDoc}`;
export const useMeQuery = <TData = MeQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: MeQueryVariables,
  options?: UseQueryOptions<MeQuery, TError, TData>
) =>
  useQuery<MeQuery, TError, TData>(
    ['Me', variables],
    fetcher<MeQuery, MeQueryVariables>(client, MeDocument, variables),
    options
  );
