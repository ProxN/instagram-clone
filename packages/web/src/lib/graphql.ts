import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  variables?: TVariables,
  headers?: RequestInit['headers']
) {
  return async (): Promise<TData> =>
    client.request<TData, TVariables>(query, variables, headers);
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

export type AddPostInput = {
  caption?: InputMaybe<Scalars['String']>;
};

export type AddPostResponse = {
  __typename?: 'AddPostResponse';
  error?: Maybe<FieldError>;
  post?: Maybe<Post>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FollowResponse = {
  __typename?: 'FollowResponse';
  error?: Maybe<FieldError>;
  result?: Maybe<Scalars['Boolean']>;
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
  addPost: AddPostResponse;
  follow: FollowResponse;
  forgotPassword: ForgotPassResponse;
  logout: Scalars['Boolean'];
  resetPassword: UserResponse;
  signin: UserResponse;
  signup: UserResponse;
  unFollow: FollowResponse;
  updateAvatar: UserResponse;
  updatePassword: UpdatePassResponse;
  updateProfile: UserResponse;
};

export type MutationAddPostArgs = {
  data: AddPostInput;
  file: Scalars['Upload'];
};

export type MutationFollowArgs = {
  follower_id: Scalars['String'];
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

export type MutationUnFollowArgs = {
  follower_id: Scalars['String'];
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

export type Post = {
  __typename?: 'Post';
  caption?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  post_url: Scalars['String'];
  updatedAt: Scalars['String'];
  user: User;
  user_id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getPosts?: Maybe<Array<Post>>;
  getUserFollowers?: Maybe<Array<User>>;
  getUserFollowing?: Maybe<Array<User>>;
  getUserProfile?: Maybe<User>;
  me?: Maybe<User>;
};

export type QueryGetPostsArgs = {
  user_id: Scalars['String'];
};

export type QueryGetUserFollowersArgs = {
  user_id: Scalars['String'];
};

export type QueryGetUserFollowingArgs = {
  user_id: Scalars['String'];
};

export type QueryGetUserProfileArgs = {
  username: Scalars['String'];
};

export type SignupInputs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type StatsResponse = {
  __typename?: 'StatsResponse';
  followers?: Maybe<Scalars['Float']>;
  following?: Maybe<Scalars['Float']>;
  posts?: Maybe<Scalars['Float']>;
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
  has_followed?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  posts: Array<Post>;
  stats: StatsResponse;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  website?: Maybe<Scalars['String']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  error?: Maybe<FieldError>;
  user?: Maybe<User>;
};

export type AddPostResponseFragment = {
  __typename?: 'AddPostResponse';
  error?:
    | { __typename?: 'FieldError'; field: string; message: string }
    | null
    | undefined;
  post?:
    | {
        __typename?: 'Post';
        id: string;
        post_url: string;
        caption?: string | null | undefined;
        user_id: string;
        createdAt: string;
        updatedAt: string;
      }
    | null
    | undefined;
};

export type UserResponseFragment = {
  __typename?: 'UserResponse';
  error?:
    | { __typename?: 'FieldError'; field: string; message: string }
    | null
    | undefined;
  user?:
    | {
        __typename?: 'User';
        id: string;
        email: string;
        name: string;
        username: string;
        avatar?: string | null | undefined;
        website?: string | null | undefined;
        bio?: string | null | undefined;
      }
    | null
    | undefined;
};

export type ErrorFragment = {
  __typename?: 'FieldError';
  field: string;
  message: string;
};

export type PostFragment = {
  __typename?: 'Post';
  id: string;
  post_url: string;
  caption?: string | null | undefined;
  user_id: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdatePassResponseFragment = {
  __typename?: 'UpdatePassResponse';
  updated?: boolean | null | undefined;
  error?:
    | { __typename?: 'FieldError'; field: string; message: string }
    | null
    | undefined;
};

export type UserFragment = {
  __typename?: 'User';
  id: string;
  email: string;
  name: string;
  username: string;
  avatar?: string | null | undefined;
  website?: string | null | undefined;
  bio?: string | null | undefined;
};

export type AddPostMutationVariables = Exact<{
  file: Scalars['Upload'];
  caption?: InputMaybe<Scalars['String']>;
}>;

export type AddPostMutation = {
  __typename?: 'Mutation';
  addPost: {
    __typename?: 'AddPostResponse';
    error?:
      | { __typename?: 'FieldError'; field: string; message: string }
      | null
      | undefined;
    post?:
      | {
          __typename?: 'Post';
          id: string;
          post_url: string;
          caption?: string | null | undefined;
          user_id: string;
          createdAt: string;
          updatedAt: string;
        }
      | null
      | undefined;
  };
};

export type FollowMutationVariables = Exact<{
  follower_id: Scalars['String'];
}>;

export type FollowMutation = {
  __typename?: 'Mutation';
  follow: {
    __typename?: 'FollowResponse';
    result?: boolean | null | undefined;
    error?:
      | { __typename?: 'FieldError'; field: string; message: string }
      | null
      | undefined;
  };
};

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;

export type ForgotPasswordMutation = {
  __typename?: 'Mutation';
  forgotPassword: {
    __typename?: 'ForgotPassResponse';
    emailSent?: boolean | null | undefined;
    error?:
      | { __typename?: 'FieldError'; field: string; message: string }
      | null
      | undefined;
  };
};

export type SigninMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type SigninMutation = {
  __typename?: 'Mutation';
  signin: {
    __typename?: 'UserResponse';
    error?:
      | { __typename?: 'FieldError'; field: string; message: string }
      | null
      | undefined;
    user?:
      | {
          __typename?: 'User';
          id: string;
          email: string;
          name: string;
          username: string;
          avatar?: string | null | undefined;
          website?: string | null | undefined;
          bio?: string | null | undefined;
        }
      | null
      | undefined;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation'; logout: boolean };

export type ResetPasswordMutationVariables = Exact<{
  resetToken: Scalars['String'];
  newPassword: Scalars['String'];
}>;

export type ResetPasswordMutation = {
  __typename?: 'Mutation';
  resetPassword: {
    __typename?: 'UserResponse';
    error?:
      | { __typename?: 'FieldError'; field: string; message: string }
      | null
      | undefined;
    user?:
      | {
          __typename?: 'User';
          id: string;
          email: string;
          name: string;
          username: string;
          avatar?: string | null | undefined;
          website?: string | null | undefined;
          bio?: string | null | undefined;
        }
      | null
      | undefined;
  };
};

export type SignupMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
  username: Scalars['String'];
}>;

export type SignupMutation = {
  __typename?: 'Mutation';
  signup: {
    __typename?: 'UserResponse';
    error?:
      | { __typename?: 'FieldError'; field: string; message: string }
      | null
      | undefined;
    user?:
      | {
          __typename?: 'User';
          id: string;
          email: string;
          name: string;
          username: string;
          avatar?: string | null | undefined;
          website?: string | null | undefined;
          bio?: string | null | undefined;
        }
      | null
      | undefined;
  };
};

export type UnFollowMutationVariables = Exact<{
  follower_id: Scalars['String'];
}>;

export type UnFollowMutation = {
  __typename?: 'Mutation';
  unFollow: {
    __typename?: 'FollowResponse';
    result?: boolean | null | undefined;
    error?:
      | { __typename?: 'FieldError'; field: string; message: string }
      | null
      | undefined;
  };
};

export type UpdateAvatarMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;

export type UpdateAvatarMutation = {
  __typename?: 'Mutation';
  updateAvatar: {
    __typename?: 'UserResponse';
    error?:
      | { __typename?: 'FieldError'; field: string; message: string }
      | null
      | undefined;
    user?:
      | {
          __typename?: 'User';
          id: string;
          email: string;
          name: string;
          username: string;
          avatar?: string | null | undefined;
          website?: string | null | undefined;
          bio?: string | null | undefined;
        }
      | null
      | undefined;
  };
};

export type UpdatePasswordMutationVariables = Exact<{
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
}>;

export type UpdatePasswordMutation = {
  __typename?: 'Mutation';
  updatePassword: {
    __typename?: 'UpdatePassResponse';
    updated?: boolean | null | undefined;
    error?:
      | { __typename?: 'FieldError'; field: string; message: string }
      | null
      | undefined;
  };
};

export type UpdateProfileMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
}>;

export type UpdateProfileMutation = {
  __typename?: 'Mutation';
  updateProfile: {
    __typename?: 'UserResponse';
    error?:
      | { __typename?: 'FieldError'; field: string; message: string }
      | null
      | undefined;
    user?:
      | {
          __typename?: 'User';
          id: string;
          email: string;
          name: string;
          username: string;
          avatar?: string | null | undefined;
          website?: string | null | undefined;
          bio?: string | null | undefined;
        }
      | null
      | undefined;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me?:
    | {
        __typename?: 'User';
        id: string;
        email: string;
        name: string;
        username: string;
        avatar?: string | null | undefined;
        website?: string | null | undefined;
        bio?: string | null | undefined;
      }
    | null
    | undefined;
};

export type GetUserFollowersQueryVariables = Exact<{
  user_id: Scalars['String'];
}>;

export type GetUserFollowersQuery = {
  __typename?: 'Query';
  getUserFollowers?:
    | Array<{
        __typename?: 'User';
        id: string;
        avatar?: string | null | undefined;
        username: string;
        name: string;
        has_followed?: boolean | null | undefined;
      }>
    | null
    | undefined;
};

export type GetUserFollowingQueryVariables = Exact<{
  user_id: Scalars['String'];
}>;

export type GetUserFollowingQuery = {
  __typename?: 'Query';
  getUserFollowing?:
    | Array<{
        __typename?: 'User';
        id: string;
        avatar?: string | null | undefined;
        username: string;
        name: string;
        has_followed?: boolean | null | undefined;
      }>
    | null
    | undefined;
};

export type GetUserProfileQueryVariables = Exact<{
  username: Scalars['String'];
}>;

export type GetUserProfileQuery = {
  __typename?: 'Query';
  getUserProfile?:
    | {
        __typename?: 'User';
        id: string;
        name: string;
        username: string;
        bio?: string | null | undefined;
        website?: string | null | undefined;
        avatar?: string | null | undefined;
        has_followed?: boolean | null | undefined;
        stats: {
          __typename?: 'StatsResponse';
          followers?: number | null | undefined;
          following?: number | null | undefined;
          posts?: number | null | undefined;
        };
      }
    | null
    | undefined;
};

export const ErrorFragmentDoc = `
    fragment Error on FieldError {
  field
  message
}
    `;
export const PostFragmentDoc = `
    fragment Post on Post {
  id
  post_url
  caption
  user_id
  createdAt
  updatedAt
}
    `;
export const AddPostResponseFragmentDoc = `
    fragment AddPostResponse on AddPostResponse {
  error {
    ...Error
  }
  post {
    ...Post
  }
}
    ${ErrorFragmentDoc}
${PostFragmentDoc}`;
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
export const AddPostDocument = `
    mutation AddPost($file: Upload!, $caption: String) {
  addPost(file: $file, data: {caption: $caption}) {
    ...AddPostResponse
  }
}
    ${AddPostResponseFragmentDoc}`;
export const useAddPostMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    AddPostMutation,
    TError,
    AddPostMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<AddPostMutation, TError, AddPostMutationVariables, TContext>(
    'AddPost',
    (variables?: AddPostMutationVariables) =>
      fetcher<AddPostMutation, AddPostMutationVariables>(
        client,
        AddPostDocument,
        variables,
        headers
      )(),
    options
  );
useAddPostMutation.fetcher = (
  client: GraphQLClient,
  variables: AddPostMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<AddPostMutation, AddPostMutationVariables>(
    client,
    AddPostDocument,
    variables,
    headers
  );
export const FollowDocument = `
    mutation Follow($follower_id: String!) {
  follow(follower_id: $follower_id) {
    error {
      ...Error
    }
    result
  }
}
    ${ErrorFragmentDoc}`;
export const useFollowMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    FollowMutation,
    TError,
    FollowMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<FollowMutation, TError, FollowMutationVariables, TContext>(
    'Follow',
    (variables?: FollowMutationVariables) =>
      fetcher<FollowMutation, FollowMutationVariables>(
        client,
        FollowDocument,
        variables,
        headers
      )(),
    options
  );
useFollowMutation.fetcher = (
  client: GraphQLClient,
  variables: FollowMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<FollowMutation, FollowMutationVariables>(
    client,
    FollowDocument,
    variables,
    headers
  );
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
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    ForgotPasswordMutation,
    TError,
    ForgotPasswordMutationVariables,
    TContext
  >(
    'ForgotPassword',
    (variables?: ForgotPasswordMutationVariables) =>
      fetcher<ForgotPasswordMutation, ForgotPasswordMutationVariables>(
        client,
        ForgotPasswordDocument,
        variables,
        headers
      )(),
    options
  );
useForgotPasswordMutation.fetcher = (
  client: GraphQLClient,
  variables: ForgotPasswordMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<ForgotPasswordMutation, ForgotPasswordMutationVariables>(
    client,
    ForgotPasswordDocument,
    variables,
    headers
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
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<SigninMutation, TError, SigninMutationVariables, TContext>(
    'Signin',
    (variables?: SigninMutationVariables) =>
      fetcher<SigninMutation, SigninMutationVariables>(
        client,
        SigninDocument,
        variables,
        headers
      )(),
    options
  );
useSigninMutation.fetcher = (
  client: GraphQLClient,
  variables: SigninMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<SigninMutation, SigninMutationVariables>(
    client,
    SigninDocument,
    variables,
    headers
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
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<LogoutMutation, TError, LogoutMutationVariables, TContext>(
    'Logout',
    (variables?: LogoutMutationVariables) =>
      fetcher<LogoutMutation, LogoutMutationVariables>(
        client,
        LogoutDocument,
        variables,
        headers
      )(),
    options
  );
useLogoutMutation.fetcher = (
  client: GraphQLClient,
  variables?: LogoutMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<LogoutMutation, LogoutMutationVariables>(
    client,
    LogoutDocument,
    variables,
    headers
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
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    ResetPasswordMutation,
    TError,
    ResetPasswordMutationVariables,
    TContext
  >(
    'ResetPassword',
    (variables?: ResetPasswordMutationVariables) =>
      fetcher<ResetPasswordMutation, ResetPasswordMutationVariables>(
        client,
        ResetPasswordDocument,
        variables,
        headers
      )(),
    options
  );
useResetPasswordMutation.fetcher = (
  client: GraphQLClient,
  variables: ResetPasswordMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<ResetPasswordMutation, ResetPasswordMutationVariables>(
    client,
    ResetPasswordDocument,
    variables,
    headers
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
export const useSignupMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    SignupMutation,
    TError,
    SignupMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<SignupMutation, TError, SignupMutationVariables, TContext>(
    'Signup',
    (variables?: SignupMutationVariables) =>
      fetcher<SignupMutation, SignupMutationVariables>(
        client,
        SignupDocument,
        variables,
        headers
      )(),
    options
  );
useSignupMutation.fetcher = (
  client: GraphQLClient,
  variables: SignupMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<SignupMutation, SignupMutationVariables>(
    client,
    SignupDocument,
    variables,
    headers
  );
export const UnFollowDocument = `
    mutation UnFollow($follower_id: String!) {
  unFollow(follower_id: $follower_id) {
    error {
      ...Error
    }
    result
  }
}
    ${ErrorFragmentDoc}`;
export const useUnFollowMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    UnFollowMutation,
    TError,
    UnFollowMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<UnFollowMutation, TError, UnFollowMutationVariables, TContext>(
    'UnFollow',
    (variables?: UnFollowMutationVariables) =>
      fetcher<UnFollowMutation, UnFollowMutationVariables>(
        client,
        UnFollowDocument,
        variables,
        headers
      )(),
    options
  );
useUnFollowMutation.fetcher = (
  client: GraphQLClient,
  variables: UnFollowMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<UnFollowMutation, UnFollowMutationVariables>(
    client,
    UnFollowDocument,
    variables,
    headers
  );
export const UpdateAvatarDocument = `
    mutation UpdateAvatar($file: Upload!) {
  updateAvatar(file: $file) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;
export const useUpdateAvatarMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    UpdateAvatarMutation,
    TError,
    UpdateAvatarMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    UpdateAvatarMutation,
    TError,
    UpdateAvatarMutationVariables,
    TContext
  >(
    'UpdateAvatar',
    (variables?: UpdateAvatarMutationVariables) =>
      fetcher<UpdateAvatarMutation, UpdateAvatarMutationVariables>(
        client,
        UpdateAvatarDocument,
        variables,
        headers
      )(),
    options
  );
useUpdateAvatarMutation.fetcher = (
  client: GraphQLClient,
  variables: UpdateAvatarMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<UpdateAvatarMutation, UpdateAvatarMutationVariables>(
    client,
    UpdateAvatarDocument,
    variables,
    headers
  );
export const UpdatePasswordDocument = `
    mutation UpdatePassword($oldPassword: String!, $newPassword: String!) {
  updatePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
    ...UpdatePassResponse
  }
}
    ${UpdatePassResponseFragmentDoc}`;
export const useUpdatePasswordMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    UpdatePasswordMutation,
    TError,
    UpdatePasswordMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    UpdatePasswordMutation,
    TError,
    UpdatePasswordMutationVariables,
    TContext
  >(
    'UpdatePassword',
    (variables?: UpdatePasswordMutationVariables) =>
      fetcher<UpdatePasswordMutation, UpdatePasswordMutationVariables>(
        client,
        UpdatePasswordDocument,
        variables,
        headers
      )(),
    options
  );
useUpdatePasswordMutation.fetcher = (
  client: GraphQLClient,
  variables: UpdatePasswordMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<UpdatePasswordMutation, UpdatePasswordMutationVariables>(
    client,
    UpdatePasswordDocument,
    variables,
    headers
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
export const useUpdateProfileMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    UpdateProfileMutation,
    TError,
    UpdateProfileMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    UpdateProfileMutation,
    TError,
    UpdateProfileMutationVariables,
    TContext
  >(
    'UpdateProfile',
    (variables?: UpdateProfileMutationVariables) =>
      fetcher<UpdateProfileMutation, UpdateProfileMutationVariables>(
        client,
        UpdateProfileDocument,
        variables,
        headers
      )(),
    options
  );
useUpdateProfileMutation.fetcher = (
  client: GraphQLClient,
  variables?: UpdateProfileMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<UpdateProfileMutation, UpdateProfileMutationVariables>(
    client,
    UpdateProfileDocument,
    variables,
    headers
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
  options?: UseQueryOptions<MeQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<MeQuery, TError, TData>(
    variables === undefined ? ['Me'] : ['Me', variables],
    fetcher<MeQuery, MeQueryVariables>(client, MeDocument, variables, headers),
    options
  );

useMeQuery.getKey = (variables?: MeQueryVariables) =>
  variables === undefined ? ['Me'] : ['Me', variables];
useMeQuery.fetcher = (
  client: GraphQLClient,
  variables?: MeQueryVariables,
  headers?: RequestInit['headers']
) => fetcher<MeQuery, MeQueryVariables>(client, MeDocument, variables, headers);
export const GetUserFollowersDocument = `
    query GetUserFollowers($user_id: String!) {
  getUserFollowers(user_id: $user_id) {
    id
    avatar
    username
    name
    has_followed
  }
}
    `;
export const useGetUserFollowersQuery = <
  TData = GetUserFollowersQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: GetUserFollowersQueryVariables,
  options?: UseQueryOptions<GetUserFollowersQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<GetUserFollowersQuery, TError, TData>(
    ['GetUserFollowers', variables],
    fetcher<GetUserFollowersQuery, GetUserFollowersQueryVariables>(
      client,
      GetUserFollowersDocument,
      variables,
      headers
    ),
    options
  );

useGetUserFollowersQuery.getKey = (
  variables: GetUserFollowersQueryVariables
) => ['GetUserFollowers', variables];
useGetUserFollowersQuery.fetcher = (
  client: GraphQLClient,
  variables: GetUserFollowersQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<GetUserFollowersQuery, GetUserFollowersQueryVariables>(
    client,
    GetUserFollowersDocument,
    variables,
    headers
  );
export const GetUserFollowingDocument = `
    query GetUserFollowing($user_id: String!) {
  getUserFollowing(user_id: $user_id) {
    id
    avatar
    username
    name
    has_followed
  }
}
    `;
export const useGetUserFollowingQuery = <
  TData = GetUserFollowingQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: GetUserFollowingQueryVariables,
  options?: UseQueryOptions<GetUserFollowingQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<GetUserFollowingQuery, TError, TData>(
    ['GetUserFollowing', variables],
    fetcher<GetUserFollowingQuery, GetUserFollowingQueryVariables>(
      client,
      GetUserFollowingDocument,
      variables,
      headers
    ),
    options
  );

useGetUserFollowingQuery.getKey = (
  variables: GetUserFollowingQueryVariables
) => ['GetUserFollowing', variables];
useGetUserFollowingQuery.fetcher = (
  client: GraphQLClient,
  variables: GetUserFollowingQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<GetUserFollowingQuery, GetUserFollowingQueryVariables>(
    client,
    GetUserFollowingDocument,
    variables,
    headers
  );
export const GetUserProfileDocument = `
    query GetUserProfile($username: String!) {
  getUserProfile(username: $username) {
    id
    name
    username
    bio
    website
    avatar
    has_followed
    stats {
      followers
      following
      posts
    }
  }
}
    `;
export const useGetUserProfileQuery = <
  TData = GetUserProfileQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: GetUserProfileQueryVariables,
  options?: UseQueryOptions<GetUserProfileQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<GetUserProfileQuery, TError, TData>(
    ['GetUserProfile', variables],
    fetcher<GetUserProfileQuery, GetUserProfileQueryVariables>(
      client,
      GetUserProfileDocument,
      variables,
      headers
    ),
    options
  );

useGetUserProfileQuery.getKey = (variables: GetUserProfileQueryVariables) => [
  'GetUserProfile',
  variables,
];
useGetUserProfileQuery.fetcher = (
  client: GraphQLClient,
  variables: GetUserProfileQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<GetUserProfileQuery, GetUserProfileQueryVariables>(
    client,
    GetUserProfileDocument,
    variables,
    headers
  );
