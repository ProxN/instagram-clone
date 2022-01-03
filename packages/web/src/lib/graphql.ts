import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ForgotPassResponse = {
  __typename?: 'ForgotPassResponse';
  emailSent?: Maybe<Scalars['Boolean']>;
  error?: Maybe<FieldError>;
};

export type LoginInputs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  forgotPassword: ForgotPassResponse;
  logout: Scalars['Boolean'];
  resetPassword: UserResponse;
  signin: UserResponse;
  signup: UserResponse;
  updateAvatar: UserResponse;
  updatePassword: UpdatePassResponse;
  updateProfile: UserResponse;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String'];
  resetToken: Scalars['String'];
};


export type MutationSigninArgs = {
  data: LoginInputs;
};


export type MutationSignupArgs = {
  data: SignupInputs;
};


export type MutationUpdateAvatarArgs = {
  file: Scalars['Upload'];
};


export type MutationUpdatePasswordArgs = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};


export type MutationUpdateProfileArgs = {
  newUser: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
};

export type SignupInputs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UpdatePassResponse = {
  __typename?: 'UpdatePassResponse';
  error?: Maybe<FieldError>;
  updated?: Maybe<Scalars['Boolean']>;
};

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  has_avatar: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  website?: Maybe<Scalars['String']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  error?: Maybe<FieldError>;
  user?: Maybe<User>;
};

export type UserResponseFragment = { __typename?: 'UserResponse', error?: { __typename?: 'FieldError', field: string, message: string } | null | undefined, user?: { __typename?: 'User', id: string, email: string, name: string, username: string, avatar?: string | null | undefined, website?: string | null | undefined, bio?: string | null | undefined } | null | undefined };

export type ErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type UpdatePassResponseFragment = { __typename?: 'UpdatePassResponse', updated?: boolean | null | undefined, error?: { __typename?: 'FieldError', field: string, message: string } | null | undefined };

export type UserFragment = { __typename?: 'User', id: string, email: string, name: string, username: string, avatar?: string | null | undefined, website?: string | null | undefined, bio?: string | null | undefined };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'ForgotPassResponse', emailSent?: boolean | null | undefined, error?: { __typename?: 'FieldError', field: string, message: string } | null | undefined } };

export type SigninMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SigninMutation = { __typename?: 'Mutation', signin: { __typename?: 'UserResponse', error?: { __typename?: 'FieldError', field: string, message: string } | null | undefined, user?: { __typename?: 'User', id: string, email: string, name: string, username: string, avatar?: string | null | undefined, website?: string | null | undefined, bio?: string | null | undefined } | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type ResetPasswordMutationVariables = Exact<{
  resetToken: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'UserResponse', error?: { __typename?: 'FieldError', field: string, message: string } | null | undefined, user?: { __typename?: 'User', id: string, email: string, name: string, username: string, avatar?: string | null | undefined, website?: string | null | undefined, bio?: string | null | undefined } | null | undefined } };

export type SignupMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
  username: Scalars['String'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'UserResponse', error?: { __typename?: 'FieldError', field: string, message: string } | null | undefined, user?: { __typename?: 'User', id: string, email: string, name: string, username: string, avatar?: string | null | undefined, website?: string | null | undefined, bio?: string | null | undefined } | null | undefined } };

export type UpdateAvatarMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type UpdateAvatarMutation = { __typename?: 'Mutation', updateAvatar: { __typename?: 'UserResponse', error?: { __typename?: 'FieldError', field: string, message: string } | null | undefined, user?: { __typename?: 'User', id: string, email: string, name: string, username: string, avatar?: string | null | undefined, website?: string | null | undefined, bio?: string | null | undefined } | null | undefined } };

export type UpdatePasswordMutationVariables = Exact<{
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', updatePassword: { __typename?: 'UpdatePassResponse', updated?: boolean | null | undefined, error?: { __typename?: 'FieldError', field: string, message: string } | null | undefined } };

export type UpdateProfileMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'UserResponse', error?: { __typename?: 'FieldError', field: string, message: string } | null | undefined, user?: { __typename?: 'User', id: string, email: string, name: string, username: string, avatar?: string | null | undefined, website?: string | null | undefined, bio?: string | null | undefined } | null | undefined } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, email: string, name: string, username: string, avatar?: string | null | undefined, website?: string | null | undefined, bio?: string | null | undefined } | null | undefined };

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
  username
  avatar
  website
  bio
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
export const UpdatePassResponseFragmentDoc = `
    fragment UpdatePassResponse on UpdatePassResponse {
  error {
    ...Error
  }
  updated
}
    ${ErrorFragmentDoc}`;
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
export const useForgotPasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ForgotPasswordMutation, TError, ForgotPasswordMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<ForgotPasswordMutation, TError, ForgotPasswordMutationVariables, TContext>(
      'ForgotPassword',
      (variables?: ForgotPasswordMutationVariables) => fetcher<ForgotPasswordMutation, ForgotPasswordMutationVariables>(client, ForgotPasswordDocument, variables, headers)(),
      options
    );
export const SigninDocument = `
    mutation Signin($email: String!, $password: String!) {
  signin(data: {email: $email, password: $password}) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;
export const useSigninMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SigninMutation, TError, SigninMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SigninMutation, TError, SigninMutationVariables, TContext>(
      'Signin',
      (variables?: SigninMutationVariables) => fetcher<SigninMutation, SigninMutationVariables>(client, SigninDocument, variables, headers)(),
      options
    );
export const LogoutDocument = `
    mutation Logout {
  logout
}
    `;
export const useLogoutMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LogoutMutation, TError, LogoutMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LogoutMutation, TError, LogoutMutationVariables, TContext>(
      'Logout',
      (variables?: LogoutMutationVariables) => fetcher<LogoutMutation, LogoutMutationVariables>(client, LogoutDocument, variables, headers)(),
      options
    );
export const ResetPasswordDocument = `
    mutation ResetPassword($resetToken: String!, $newPassword: String!) {
  resetPassword(resetToken: $resetToken, newPassword: $newPassword) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;
export const useResetPasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ResetPasswordMutation, TError, ResetPasswordMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<ResetPasswordMutation, TError, ResetPasswordMutationVariables, TContext>(
      'ResetPassword',
      (variables?: ResetPasswordMutationVariables) => fetcher<ResetPasswordMutation, ResetPasswordMutationVariables>(client, ResetPasswordDocument, variables, headers)(),
      options
    );
export const SignupDocument = `
    mutation Signup($email: String!, $password: String!, $name: String!, $username: String!) {
  signup(
    data: {email: $email, password: $password, name: $name, username: $username}
  ) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;
export const useSignupMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SignupMutation, TError, SignupMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SignupMutation, TError, SignupMutationVariables, TContext>(
      'Signup',
      (variables?: SignupMutationVariables) => fetcher<SignupMutation, SignupMutationVariables>(client, SignupDocument, variables, headers)(),
      options
    );
export const UpdateAvatarDocument = `
    mutation UpdateAvatar($file: Upload!) {
  updateAvatar(file: $file) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;
export const useUpdateAvatarMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateAvatarMutation, TError, UpdateAvatarMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateAvatarMutation, TError, UpdateAvatarMutationVariables, TContext>(
      'UpdateAvatar',
      (variables?: UpdateAvatarMutationVariables) => fetcher<UpdateAvatarMutation, UpdateAvatarMutationVariables>(client, UpdateAvatarDocument, variables, headers)(),
      options
    );
export const UpdatePasswordDocument = `
    mutation UpdatePassword($oldPassword: String!, $newPassword: String!) {
  updatePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
    ...UpdatePassResponse
  }
}
    ${UpdatePassResponseFragmentDoc}`;
export const useUpdatePasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdatePasswordMutation, TError, UpdatePasswordMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdatePasswordMutation, TError, UpdatePasswordMutationVariables, TContext>(
      'UpdatePassword',
      (variables?: UpdatePasswordMutationVariables) => fetcher<UpdatePasswordMutation, UpdatePasswordMutationVariables>(client, UpdatePasswordDocument, variables, headers)(),
      options
    );
export const UpdateProfileDocument = `
    mutation UpdateProfile($name: String, $username: String, $website: String, $bio: String) {
  updateProfile(
    newUser: {name: $name, username: $username, website: $website, bio: $bio}
  ) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;
export const useUpdateProfileMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateProfileMutation, TError, UpdateProfileMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateProfileMutation, TError, UpdateProfileMutationVariables, TContext>(
      'UpdateProfile',
      (variables?: UpdateProfileMutationVariables) => fetcher<UpdateProfileMutation, UpdateProfileMutationVariables>(client, UpdateProfileDocument, variables, headers)(),
      options
    );
export const MeDocument = `
    query Me {
  me {
    ...User
  }
}
    ${UserFragmentDoc}`;
export const useMeQuery = <
      TData = MeQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: MeQueryVariables,
      options?: UseQueryOptions<MeQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<MeQuery, TError, TData>(
      variables === undefined ? ['Me'] : ['Me', variables],
      fetcher<MeQuery, MeQueryVariables>(client, MeDocument, variables, headers),
      options
    );