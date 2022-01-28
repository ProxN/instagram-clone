import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  QueryFunctionContext,
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

export type Comment = {
  __typename?: 'Comment';
  createdAt: Scalars['String'];
  id: Scalars['String'];
  post_id: Scalars['String'];
  text: Scalars['String'];
  updatedAt: Scalars['String'];
  user: User;
  user_id: Scalars['String'];
};

export type CommentsResponse = {
  __typename?: 'CommentsResponse';
  comments: Array<Comment>;
  hasMore: Scalars['Boolean'];
};

export type DeletePostResponse = {
  __typename?: 'DeletePostResponse';
  deleted?: Maybe<Scalars['Boolean']>;
  error?: Maybe<FieldError>;
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

export type FollowSuggestionResponse = {
  __typename?: 'FollowSuggestionResponse';
  hasMore: Scalars['Boolean'];
  users: Array<User>;
};

export type ForgotPassResponse = {
  __typename?: 'ForgotPassResponse';
  emailSent?: Maybe<Scalars['Boolean']>;
  error?: Maybe<FieldError>;
};

export type InboxResult = {
  __typename?: 'InboxResult';
  createdAt: Scalars['String'];
  id: Scalars['String'];
  receiver_id: Scalars['String'];
  seen?: Maybe<Scalars['Boolean']>;
  text: Scalars['String'];
  time?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  user_id: Scalars['String'];
};

export type LoginInputs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  seen: Scalars['Boolean'];
  text: Scalars['String'];
  updatedAt: Scalars['String'];
  user?: Maybe<User>;
  user_id: Scalars['String'];
};

export type MessageResponse = {
  __typename?: 'MessageResponse';
  hasMore: Scalars['Boolean'];
  messages: Array<InboxResult>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addPost: AddPostResponse;
  bookmarkPost: Scalars['Boolean'];
  deletePost: DeletePostResponse;
  follow: FollowResponse;
  forgotPassword: ForgotPassResponse;
  likePost: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  newComment: NewCommentResponse;
  resetPassword: UserResponse;
  seenMessages: Scalars['Boolean'];
  sendMessage: SendMessageResponse;
  signin: UserResponse;
  signup: UserResponse;
  unBookmarkPost: Scalars['Boolean'];
  unFollow: FollowResponse;
  updateAvatar: UserResponse;
  updatePassword: UpdatePassResponse;
  updateProfile: UserResponse;
};

export type MutationAddPostArgs = {
  data: AddPostInput;
  file: Scalars['Upload'];
};

export type MutationBookmarkPostArgs = {
  post_id: Scalars['String'];
};

export type MutationDeletePostArgs = {
  post_id: Scalars['String'];
};

export type MutationFollowArgs = {
  follower_id: Scalars['String'];
};

export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};

export type MutationLikePostArgs = {
  post_id: Scalars['String'];
};

export type MutationNewCommentArgs = {
  comment_body: NewCommentInput;
};

export type MutationResetPasswordArgs = {
  newPassword: Scalars['String'];
  resetToken: Scalars['String'];
};

export type MutationSeenMessagesArgs = {
  lastMessageDate: Scalars['String'];
  user_id: Scalars['String'];
};

export type MutationSendMessageArgs = {
  receiver_id: Scalars['String'];
  text: Scalars['String'];
};

export type MutationSigninArgs = {
  data: LoginInputs;
};

export type MutationSignupArgs = {
  data: SignupInputs;
};

export type MutationUnBookmarkPostArgs = {
  post_id: Scalars['String'];
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

export type NewCommentInput = {
  post_id: Scalars['String'];
  text: Scalars['String'];
};

export type NewCommentResponse = {
  __typename?: 'NewCommentResponse';
  comment?: Maybe<Comment>;
  error?: Maybe<FieldError>;
};

export type NofiticationResponse = {
  __typename?: 'NofiticationResponse';
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  has_avatar: Scalars['Boolean'];
  has_followed?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  posts: Array<Post>;
  since: Scalars['String'];
  stats: StatsResponse;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  website?: Maybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  caption?: Maybe<Scalars['String']>;
  comments: Scalars['Float'];
  createdAt: Scalars['String'];
  has_bookmark?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  is_liked: Scalars['Boolean'];
  likes: Scalars['Float'];
  post_url: Scalars['String'];
  updatedAt: Scalars['String'];
  user: User;
  user_id: Scalars['String'];
};

export type PostsResponse = {
  __typename?: 'PostsResponse';
  hasMore: Scalars['Boolean'];
  posts: Array<Post>;
};

export type Query = {
  __typename?: 'Query';
  followerSuggestion: FollowSuggestionResponse;
  followersNotification: Array<NofiticationResponse>;
  getComments: CommentsResponse;
  getPost?: Maybe<Post>;
  getPosts: PostsResponse;
  getSavedPosts: Array<Post>;
  getUnreadMessagesCount: Array<UnReadMressagesResponse>;
  getUserConversation: MessageResponse;
  getUserFollowers?: Maybe<Array<User>>;
  getUserFollowing?: Maybe<Array<User>>;
  getUserInbox: Array<InboxResult>;
  getUserProfile?: Maybe<User>;
  me?: Maybe<User>;
  searchUsers?: Maybe<Array<User>>;
  userFeeds: PostsResponse;
};

export type QueryFollowerSuggestionArgs = {
  cursor?: InputMaybe<Array<Scalars['String']>>;
  limit: Scalars['Int'];
};

export type QueryGetCommentsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
  post_id: Scalars['String'];
};

export type QueryGetPostArgs = {
  post_id: Scalars['String'];
};

export type QueryGetPostsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
  user_id: Scalars['String'];
};

export type QueryGetUserConversationArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
  receiver_id: Scalars['String'];
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

export type QuerySearchUsersArgs = {
  query: Scalars['String'];
};

export type QueryUserFeedsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type SendMessageResponse = {
  __typename?: 'SendMessageResponse';
  error?: Maybe<FieldError>;
  message?: Maybe<Message>;
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

export type Subscription = {
  __typename?: 'Subscription';
  messages: InboxResult;
  unReadMessages: UnReadMressagesResponse;
};

export type UnReadMressagesResponse = {
  __typename?: 'UnReadMressagesResponse';
  count: Scalars['Float'];
  user_id: Scalars['String'];
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

export type BookmarkPostMutationVariables = Exact<{
  post_id: Scalars['String'];
}>;

export type BookmarkPostMutation = {
  __typename?: 'Mutation';
  bookmarkPost: boolean;
};

export type DeletePostMutationVariables = Exact<{
  post_id: Scalars['String'];
}>;

export type DeletePostMutation = {
  __typename?: 'Mutation';
  deletePost: {
    __typename?: 'DeletePostResponse';
    deleted?: boolean | null | undefined;
    error?:
      | { __typename?: 'FieldError'; field: string; message: string }
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

export type LikePostMutationVariables = Exact<{
  post_id: Scalars['String'];
}>;

export type LikePostMutation = { __typename?: 'Mutation'; likePost: boolean };

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

export type NewCommentMutationVariables = Exact<{
  post_id: Scalars['String'];
  text: Scalars['String'];
}>;

export type NewCommentMutation = {
  __typename?: 'Mutation';
  newComment: {
    __typename?: 'NewCommentResponse';
    error?:
      | { __typename?: 'FieldError'; field: string; message: string }
      | null
      | undefined;
    comment?:
      | {
          __typename?: 'Comment';
          id: string;
          text: string;
          createdAt: string;
          user: {
            __typename?: 'User';
            username: string;
            avatar?: string | null | undefined;
          };
        }
      | null
      | undefined;
  };
};

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

export type SeenMessagesMutationVariables = Exact<{
  user_id: Scalars['String'];
  lastMessageDate: Scalars['String'];
}>;

export type SeenMessagesMutation = {
  __typename?: 'Mutation';
  seenMessages: boolean;
};

export type SendMessageMutationVariables = Exact<{
  text: Scalars['String'];
  receiver_id: Scalars['String'];
}>;

export type SendMessageMutation = {
  __typename?: 'Mutation';
  sendMessage: {
    __typename?: 'SendMessageResponse';
    message?:
      | { __typename?: 'Message'; id: string; text: string; createdAt: string }
      | null
      | undefined;
    error?:
      | { __typename?: 'FieldError'; field: string; message: string }
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

export type UnBookmarkPostMutationVariables = Exact<{
  post_id: Scalars['String'];
}>;

export type UnBookmarkPostMutation = {
  __typename?: 'Mutation';
  unBookmarkPost: boolean;
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

export type FollowerSuggestionQueryVariables = Exact<{
  cursor?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  limit: Scalars['Int'];
}>;

export type FollowerSuggestionQuery = {
  __typename?: 'Query';
  followerSuggestion: {
    __typename?: 'FollowSuggestionResponse';
    hasMore: boolean;
    users: Array<{
      __typename?: 'User';
      id: string;
      name: string;
      username: string;
      avatar?: string | null | undefined;
      has_followed?: boolean | null | undefined;
      createdAt: string;
    }>;
  };
};

export type FollowersNotificationQueryVariables = Exact<{
  [key: string]: never;
}>;

export type FollowersNotificationQuery = {
  __typename?: 'Query';
  followersNotification: Array<{
    __typename?: 'NofiticationResponse';
    id: string;
    username: string;
    name: string;
    since: string;
    has_followed?: boolean | null | undefined;
  }>;
};

export type GetCommentsQueryVariables = Exact<{
  post_id: Scalars['String'];
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
}>;

export type GetCommentsQuery = {
  __typename?: 'Query';
  getComments: {
    __typename?: 'CommentsResponse';
    hasMore: boolean;
    comments: Array<{
      __typename?: 'Comment';
      id: string;
      text: string;
      createdAt: string;
      user: {
        __typename?: 'User';
        avatar?: string | null | undefined;
        username: string;
      };
    }>;
  };
};

export type GetPostQueryVariables = Exact<{
  post_id: Scalars['String'];
}>;

export type GetPostQuery = {
  __typename?: 'Query';
  getPost?:
    | {
        __typename?: 'Post';
        id: string;
        post_url: string;
        caption?: string | null | undefined;
        is_liked: boolean;
        createdAt: string;
        likes: number;
        has_bookmark?: boolean | null | undefined;
        user: {
          __typename?: 'User';
          id: string;
          username: string;
          has_followed?: boolean | null | undefined;
          avatar?: string | null | undefined;
        };
      }
    | null
    | undefined;
};

export type GetUnreadMessagesCountQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetUnreadMessagesCountQuery = {
  __typename?: 'Query';
  getUnreadMessagesCount: Array<{
    __typename?: 'UnReadMressagesResponse';
    user_id: string;
    count: number;
  }>;
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

export type GetSavedPostsQueryVariables = Exact<{ [key: string]: never }>;

export type GetSavedPostsQuery = {
  __typename?: 'Query';
  getSavedPosts: Array<{
    __typename?: 'Post';
    id: string;
    post_url: string;
    caption?: string | null | undefined;
    likes: number;
    comments: number;
    createdAt: string;
    has_bookmark?: boolean | null | undefined;
  }>;
};

export type SearchUsersQueryVariables = Exact<{
  query: Scalars['String'];
}>;

export type SearchUsersQuery = {
  __typename?: 'Query';
  searchUsers?:
    | Array<{
        __typename?: 'User';
        id: string;
        username: string;
        name: string;
        avatar?: string | null | undefined;
        createdAt: string;
      }>
    | null
    | undefined;
};

export type GetUserConversationQueryVariables = Exact<{
  receiver_id: Scalars['String'];
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;

export type GetUserConversationQuery = {
  __typename?: 'Query';
  getUserConversation: {
    __typename?: 'MessageResponse';
    hasMore: boolean;
    messages: Array<{
      __typename?: 'InboxResult';
      id: string;
      text: string;
      createdAt: string;
      user_id: string;
      time?: string | null | undefined;
      receiver_id: string;
      seen?: boolean | null | undefined;
      user?:
        | { __typename?: 'User'; id: string; username: string }
        | null
        | undefined;
    }>;
  };
};

export type UserFeedsQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
}>;

export type UserFeedsQuery = {
  __typename?: 'Query';
  userFeeds: {
    __typename?: 'PostsResponse';
    hasMore: boolean;
    posts: Array<{
      __typename?: 'Post';
      id: string;
      post_url: string;
      caption?: string | null | undefined;
      likes: number;
      comments: number;
      createdAt: string;
      is_liked: boolean;
      has_bookmark?: boolean | null | undefined;
      user: {
        __typename?: 'User';
        id: string;
        username: string;
        avatar?: string | null | undefined;
        has_followed?: boolean | null | undefined;
      };
    }>;
  };
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

export type GetUserInboxQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserInboxQuery = {
  __typename?: 'Query';
  getUserInbox: Array<{
    __typename?: 'InboxResult';
    id: string;
    text: string;
    createdAt: string;
    seen?: boolean | null | undefined;
    user_id: string;
    user?:
      | {
          __typename?: 'User';
          id: string;
          username: string;
          avatar?: string | null | undefined;
        }
      | null
      | undefined;
  }>;
};

export type GetUserPostsQueryVariables = Exact<{
  user_id: Scalars['String'];
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;

export type GetUserPostsQuery = {
  __typename?: 'Query';
  getPosts: {
    __typename?: 'PostsResponse';
    hasMore: boolean;
    posts: Array<{
      __typename?: 'Post';
      id: string;
      post_url: string;
      caption?: string | null | undefined;
      likes: number;
      comments: number;
      createdAt: string;
      has_bookmark?: boolean | null | undefined;
    }>;
  };
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

export type MessagesSubscriptionVariables = Exact<{ [key: string]: never }>;

export type MessagesSubscription = {
  __typename?: 'Subscription';
  messages: {
    __typename?: 'InboxResult';
    id: string;
    text: string;
    user_id: string;
    time?: string | null | undefined;
    seen?: boolean | null | undefined;
    receiver_id: string;
    createdAt: string;
    user?:
      | {
          __typename?: 'User';
          id: string;
          username: string;
          avatar?: string | null | undefined;
        }
      | null
      | undefined;
  };
};

export type UnReadMessagesSubscriptionVariables = Exact<{
  [key: string]: never;
}>;

export type UnReadMessagesSubscription = {
  __typename?: 'Subscription';
  unReadMessages: {
    __typename?: 'UnReadMressagesResponse';
    user_id: string;
    count: number;
  };
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
export const BookmarkPostDocument = `
    mutation BookmarkPost($post_id: String!) {
  bookmarkPost(post_id: $post_id)
}
    `;
export const useBookmarkPostMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    BookmarkPostMutation,
    TError,
    BookmarkPostMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    BookmarkPostMutation,
    TError,
    BookmarkPostMutationVariables,
    TContext
  >(
    'BookmarkPost',
    (variables?: BookmarkPostMutationVariables) =>
      fetcher<BookmarkPostMutation, BookmarkPostMutationVariables>(
        client,
        BookmarkPostDocument,
        variables,
        headers
      )(),
    options
  );
useBookmarkPostMutation.fetcher = (
  client: GraphQLClient,
  variables: BookmarkPostMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<BookmarkPostMutation, BookmarkPostMutationVariables>(
    client,
    BookmarkPostDocument,
    variables,
    headers
  );
export const DeletePostDocument = `
    mutation DeletePost($post_id: String!) {
  deletePost(post_id: $post_id) {
    error {
      ...Error
    }
    deleted
  }
}
    ${ErrorFragmentDoc}`;
export const useDeletePostMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    DeletePostMutation,
    TError,
    DeletePostMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    DeletePostMutation,
    TError,
    DeletePostMutationVariables,
    TContext
  >(
    'DeletePost',
    (variables?: DeletePostMutationVariables) =>
      fetcher<DeletePostMutation, DeletePostMutationVariables>(
        client,
        DeletePostDocument,
        variables,
        headers
      )(),
    options
  );
useDeletePostMutation.fetcher = (
  client: GraphQLClient,
  variables: DeletePostMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<DeletePostMutation, DeletePostMutationVariables>(
    client,
    DeletePostDocument,
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
export const LikePostDocument = `
    mutation LikePost($post_id: String!) {
  likePost(post_id: $post_id)
}
    `;
export const useLikePostMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    LikePostMutation,
    TError,
    LikePostMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<LikePostMutation, TError, LikePostMutationVariables, TContext>(
    'LikePost',
    (variables?: LikePostMutationVariables) =>
      fetcher<LikePostMutation, LikePostMutationVariables>(
        client,
        LikePostDocument,
        variables,
        headers
      )(),
    options
  );
useLikePostMutation.fetcher = (
  client: GraphQLClient,
  variables: LikePostMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<LikePostMutation, LikePostMutationVariables>(
    client,
    LikePostDocument,
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
export const NewCommentDocument = `
    mutation NewComment($post_id: String!, $text: String!) {
  newComment(comment_body: {post_id: $post_id, text: $text}) {
    error {
      ...Error
    }
    comment {
      id
      text
      createdAt
      user {
        username
        avatar
      }
    }
  }
}
    ${ErrorFragmentDoc}`;
export const useNewCommentMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    NewCommentMutation,
    TError,
    NewCommentMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    NewCommentMutation,
    TError,
    NewCommentMutationVariables,
    TContext
  >(
    'NewComment',
    (variables?: NewCommentMutationVariables) =>
      fetcher<NewCommentMutation, NewCommentMutationVariables>(
        client,
        NewCommentDocument,
        variables,
        headers
      )(),
    options
  );
useNewCommentMutation.fetcher = (
  client: GraphQLClient,
  variables: NewCommentMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<NewCommentMutation, NewCommentMutationVariables>(
    client,
    NewCommentDocument,
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
export const SeenMessagesDocument = `
    mutation SeenMessages($user_id: String!, $lastMessageDate: String!) {
  seenMessages(user_id: $user_id, lastMessageDate: $lastMessageDate)
}
    `;
export const useSeenMessagesMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    SeenMessagesMutation,
    TError,
    SeenMessagesMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    SeenMessagesMutation,
    TError,
    SeenMessagesMutationVariables,
    TContext
  >(
    'SeenMessages',
    (variables?: SeenMessagesMutationVariables) =>
      fetcher<SeenMessagesMutation, SeenMessagesMutationVariables>(
        client,
        SeenMessagesDocument,
        variables,
        headers
      )(),
    options
  );
useSeenMessagesMutation.fetcher = (
  client: GraphQLClient,
  variables: SeenMessagesMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<SeenMessagesMutation, SeenMessagesMutationVariables>(
    client,
    SeenMessagesDocument,
    variables,
    headers
  );
export const SendMessageDocument = `
    mutation SendMessage($text: String!, $receiver_id: String!) {
  sendMessage(text: $text, receiver_id: $receiver_id) {
    message {
      id
      text
      createdAt
    }
    error {
      ...Error
    }
  }
}
    ${ErrorFragmentDoc}`;
export const useSendMessageMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    SendMessageMutation,
    TError,
    SendMessageMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    SendMessageMutation,
    TError,
    SendMessageMutationVariables,
    TContext
  >(
    'SendMessage',
    (variables?: SendMessageMutationVariables) =>
      fetcher<SendMessageMutation, SendMessageMutationVariables>(
        client,
        SendMessageDocument,
        variables,
        headers
      )(),
    options
  );
useSendMessageMutation.fetcher = (
  client: GraphQLClient,
  variables: SendMessageMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<SendMessageMutation, SendMessageMutationVariables>(
    client,
    SendMessageDocument,
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
export const UnBookmarkPostDocument = `
    mutation UnBookmarkPost($post_id: String!) {
  unBookmarkPost(post_id: $post_id)
}
    `;
export const useUnBookmarkPostMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    UnBookmarkPostMutation,
    TError,
    UnBookmarkPostMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    UnBookmarkPostMutation,
    TError,
    UnBookmarkPostMutationVariables,
    TContext
  >(
    'UnBookmarkPost',
    (variables?: UnBookmarkPostMutationVariables) =>
      fetcher<UnBookmarkPostMutation, UnBookmarkPostMutationVariables>(
        client,
        UnBookmarkPostDocument,
        variables,
        headers
      )(),
    options
  );
useUnBookmarkPostMutation.fetcher = (
  client: GraphQLClient,
  variables: UnBookmarkPostMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<UnBookmarkPostMutation, UnBookmarkPostMutationVariables>(
    client,
    UnBookmarkPostDocument,
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
export const FollowerSuggestionDocument = `
    query FollowerSuggestion($cursor: [String!], $limit: Int!) {
  followerSuggestion(cursor: $cursor, limit: $limit) {
    hasMore
    users {
      id
      name
      username
      avatar
      has_followed
      createdAt
    }
  }
}
    `;
export const useFollowerSuggestionQuery = <
  TData = FollowerSuggestionQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: FollowerSuggestionQueryVariables,
  options?: UseQueryOptions<FollowerSuggestionQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<FollowerSuggestionQuery, TError, TData>(
    ['FollowerSuggestion', variables],
    fetcher<FollowerSuggestionQuery, FollowerSuggestionQueryVariables>(
      client,
      FollowerSuggestionDocument,
      variables,
      headers
    ),
    options
  );

useFollowerSuggestionQuery.getKey = (
  variables: FollowerSuggestionQueryVariables
) => ['FollowerSuggestion', variables];
export const useInfiniteFollowerSuggestionQuery = <
  TData = FollowerSuggestionQuery,
  TError = unknown
>(
  pageParamKey: keyof FollowerSuggestionQueryVariables,
  client: GraphQLClient,
  variables: FollowerSuggestionQueryVariables,
  options?: UseInfiniteQueryOptions<FollowerSuggestionQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useInfiniteQuery<FollowerSuggestionQuery, TError, TData>(
    ['FollowerSuggestion.infinite', variables],
    (metaData) =>
      fetcher<FollowerSuggestionQuery, FollowerSuggestionQueryVariables>(
        client,
        FollowerSuggestionDocument,
        { ...variables, ...(metaData.pageParam ?? {}) },
        headers
      )(),
    options
  );

useFollowerSuggestionQuery.fetcher = (
  client: GraphQLClient,
  variables: FollowerSuggestionQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<FollowerSuggestionQuery, FollowerSuggestionQueryVariables>(
    client,
    FollowerSuggestionDocument,
    variables,
    headers
  );
export const FollowersNotificationDocument = `
    query FollowersNotification {
  followersNotification {
    id
    username
    name
    since
    has_followed
  }
}
    `;
export const useFollowersNotificationQuery = <
  TData = FollowersNotificationQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables?: FollowersNotificationQueryVariables,
  options?: UseQueryOptions<FollowersNotificationQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<FollowersNotificationQuery, TError, TData>(
    variables === undefined
      ? ['FollowersNotification']
      : ['FollowersNotification', variables],
    fetcher<FollowersNotificationQuery, FollowersNotificationQueryVariables>(
      client,
      FollowersNotificationDocument,
      variables,
      headers
    ),
    options
  );

useFollowersNotificationQuery.getKey = (
  variables?: FollowersNotificationQueryVariables
) =>
  variables === undefined
    ? ['FollowersNotification']
    : ['FollowersNotification', variables];
export const useInfiniteFollowersNotificationQuery = <
  TData = FollowersNotificationQuery,
  TError = unknown
>(
  pageParamKey: keyof FollowersNotificationQueryVariables,
  client: GraphQLClient,
  variables?: FollowersNotificationQueryVariables,
  options?: UseInfiniteQueryOptions<FollowersNotificationQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useInfiniteQuery<FollowersNotificationQuery, TError, TData>(
    variables === undefined
      ? ['FollowersNotification.infinite']
      : ['FollowersNotification.infinite', variables],
    (metaData) =>
      fetcher<FollowersNotificationQuery, FollowersNotificationQueryVariables>(
        client,
        FollowersNotificationDocument,
        { ...variables, ...(metaData.pageParam ?? {}) },
        headers
      )(),
    options
  );

useFollowersNotificationQuery.fetcher = (
  client: GraphQLClient,
  variables?: FollowersNotificationQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<FollowersNotificationQuery, FollowersNotificationQueryVariables>(
    client,
    FollowersNotificationDocument,
    variables,
    headers
  );
export const GetCommentsDocument = `
    query GetComments($post_id: String!, $cursor: String, $limit: Int!) {
  getComments(post_id: $post_id, cursor: $cursor, limit: $limit) {
    comments {
      id
      text
      createdAt
      user {
        avatar
        username
      }
    }
    hasMore
  }
}
    `;
export const useGetCommentsQuery = <TData = GetCommentsQuery, TError = unknown>(
  client: GraphQLClient,
  variables: GetCommentsQueryVariables,
  options?: UseQueryOptions<GetCommentsQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<GetCommentsQuery, TError, TData>(
    ['GetComments', variables],
    fetcher<GetCommentsQuery, GetCommentsQueryVariables>(
      client,
      GetCommentsDocument,
      variables,
      headers
    ),
    options
  );

useGetCommentsQuery.getKey = (variables: GetCommentsQueryVariables) => [
  'GetComments',
  variables,
];
export const useInfiniteGetCommentsQuery = <
  TData = GetCommentsQuery,
  TError = unknown
>(
  pageParamKey: keyof GetCommentsQueryVariables,
  client: GraphQLClient,
  variables: GetCommentsQueryVariables,
  options?: UseInfiniteQueryOptions<GetCommentsQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useInfiniteQuery<GetCommentsQuery, TError, TData>(
    ['GetComments.infinite', variables],
    (metaData) =>
      fetcher<GetCommentsQuery, GetCommentsQueryVariables>(
        client,
        GetCommentsDocument,
        { ...variables, ...(metaData.pageParam ?? {}) },
        headers
      )(),
    options
  );

useGetCommentsQuery.fetcher = (
  client: GraphQLClient,
  variables: GetCommentsQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<GetCommentsQuery, GetCommentsQueryVariables>(
    client,
    GetCommentsDocument,
    variables,
    headers
  );
export const GetPostDocument = `
    query GetPost($post_id: String!) {
  getPost(post_id: $post_id) {
    id
    post_url
    caption
    is_liked
    createdAt
    likes
    has_bookmark
    user {
      id
      username
      has_followed
      avatar
    }
  }
}
    `;
export const useGetPostQuery = <TData = GetPostQuery, TError = unknown>(
  client: GraphQLClient,
  variables: GetPostQueryVariables,
  options?: UseQueryOptions<GetPostQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<GetPostQuery, TError, TData>(
    ['GetPost', variables],
    fetcher<GetPostQuery, GetPostQueryVariables>(
      client,
      GetPostDocument,
      variables,
      headers
    ),
    options
  );

useGetPostQuery.getKey = (variables: GetPostQueryVariables) => [
  'GetPost',
  variables,
];
export const useInfiniteGetPostQuery = <TData = GetPostQuery, TError = unknown>(
  pageParamKey: keyof GetPostQueryVariables,
  client: GraphQLClient,
  variables: GetPostQueryVariables,
  options?: UseInfiniteQueryOptions<GetPostQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useInfiniteQuery<GetPostQuery, TError, TData>(
    ['GetPost.infinite', variables],
    (metaData) =>
      fetcher<GetPostQuery, GetPostQueryVariables>(
        client,
        GetPostDocument,
        { ...variables, ...(metaData.pageParam ?? {}) },
        headers
      )(),
    options
  );

useGetPostQuery.fetcher = (
  client: GraphQLClient,
  variables: GetPostQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<GetPostQuery, GetPostQueryVariables>(
    client,
    GetPostDocument,
    variables,
    headers
  );
export const GetUnreadMessagesCountDocument = `
    query GetUnreadMessagesCount {
  getUnreadMessagesCount {
    user_id
    count
  }
}
    `;
export const useGetUnreadMessagesCountQuery = <
  TData = GetUnreadMessagesCountQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables?: GetUnreadMessagesCountQueryVariables,
  options?: UseQueryOptions<GetUnreadMessagesCountQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<GetUnreadMessagesCountQuery, TError, TData>(
    variables === undefined
      ? ['GetUnreadMessagesCount']
      : ['GetUnreadMessagesCount', variables],
    fetcher<GetUnreadMessagesCountQuery, GetUnreadMessagesCountQueryVariables>(
      client,
      GetUnreadMessagesCountDocument,
      variables,
      headers
    ),
    options
  );

useGetUnreadMessagesCountQuery.getKey = (
  variables?: GetUnreadMessagesCountQueryVariables
) =>
  variables === undefined
    ? ['GetUnreadMessagesCount']
    : ['GetUnreadMessagesCount', variables];
export const useInfiniteGetUnreadMessagesCountQuery = <
  TData = GetUnreadMessagesCountQuery,
  TError = unknown
>(
  pageParamKey: keyof GetUnreadMessagesCountQueryVariables,
  client: GraphQLClient,
  variables?: GetUnreadMessagesCountQueryVariables,
  options?: UseInfiniteQueryOptions<GetUnreadMessagesCountQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useInfiniteQuery<GetUnreadMessagesCountQuery, TError, TData>(
    variables === undefined
      ? ['GetUnreadMessagesCount.infinite']
      : ['GetUnreadMessagesCount.infinite', variables],
    (metaData) =>
      fetcher<
        GetUnreadMessagesCountQuery,
        GetUnreadMessagesCountQueryVariables
      >(
        client,
        GetUnreadMessagesCountDocument,
        { ...variables, ...(metaData.pageParam ?? {}) },
        headers
      )(),
    options
  );

useGetUnreadMessagesCountQuery.fetcher = (
  client: GraphQLClient,
  variables?: GetUnreadMessagesCountQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<GetUnreadMessagesCountQuery, GetUnreadMessagesCountQueryVariables>(
    client,
    GetUnreadMessagesCountDocument,
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
export const useInfiniteMeQuery = <TData = MeQuery, TError = unknown>(
  pageParamKey: keyof MeQueryVariables,
  client: GraphQLClient,
  variables?: MeQueryVariables,
  options?: UseInfiniteQueryOptions<MeQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useInfiniteQuery<MeQuery, TError, TData>(
    variables === undefined ? ['Me.infinite'] : ['Me.infinite', variables],
    (metaData) =>
      fetcher<MeQuery, MeQueryVariables>(
        client,
        MeDocument,
        { ...variables, ...(metaData.pageParam ?? {}) },
        headers
      )(),
    options
  );

useMeQuery.fetcher = (
  client: GraphQLClient,
  variables?: MeQueryVariables,
  headers?: RequestInit['headers']
) => fetcher<MeQuery, MeQueryVariables>(client, MeDocument, variables, headers);
export const GetSavedPostsDocument = `
    query GetSavedPosts {
  getSavedPosts {
    id
    post_url
    caption
    likes
    comments
    createdAt
    has_bookmark
  }
}
    `;
export const useGetSavedPostsQuery = <
  TData = GetSavedPostsQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables?: GetSavedPostsQueryVariables,
  options?: UseQueryOptions<GetSavedPostsQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<GetSavedPostsQuery, TError, TData>(
    variables === undefined ? ['GetSavedPosts'] : ['GetSavedPosts', variables],
    fetcher<GetSavedPostsQuery, GetSavedPostsQueryVariables>(
      client,
      GetSavedPostsDocument,
      variables,
      headers
    ),
    options
  );

useGetSavedPostsQuery.getKey = (variables?: GetSavedPostsQueryVariables) =>
  variables === undefined ? ['GetSavedPosts'] : ['GetSavedPosts', variables];
export const useInfiniteGetSavedPostsQuery = <
  TData = GetSavedPostsQuery,
  TError = unknown
>(
  pageParamKey: keyof GetSavedPostsQueryVariables,
  client: GraphQLClient,
  variables?: GetSavedPostsQueryVariables,
  options?: UseInfiniteQueryOptions<GetSavedPostsQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useInfiniteQuery<GetSavedPostsQuery, TError, TData>(
    variables === undefined
      ? ['GetSavedPosts.infinite']
      : ['GetSavedPosts.infinite', variables],
    (metaData) =>
      fetcher<GetSavedPostsQuery, GetSavedPostsQueryVariables>(
        client,
        GetSavedPostsDocument,
        { ...variables, ...(metaData.pageParam ?? {}) },
        headers
      )(),
    options
  );

useGetSavedPostsQuery.fetcher = (
  client: GraphQLClient,
  variables?: GetSavedPostsQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<GetSavedPostsQuery, GetSavedPostsQueryVariables>(
    client,
    GetSavedPostsDocument,
    variables,
    headers
  );
export const SearchUsersDocument = `
    query SearchUsers($query: String!) {
  searchUsers(query: $query) {
    id
    username
    name
    avatar
    createdAt
  }
}
    `;
export const useSearchUsersQuery = <TData = SearchUsersQuery, TError = unknown>(
  client: GraphQLClient,
  variables: SearchUsersQueryVariables,
  options?: UseQueryOptions<SearchUsersQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<SearchUsersQuery, TError, TData>(
    ['SearchUsers', variables],
    fetcher<SearchUsersQuery, SearchUsersQueryVariables>(
      client,
      SearchUsersDocument,
      variables,
      headers
    ),
    options
  );

useSearchUsersQuery.getKey = (variables: SearchUsersQueryVariables) => [
  'SearchUsers',
  variables,
];
export const useInfiniteSearchUsersQuery = <
  TData = SearchUsersQuery,
  TError = unknown
>(
  pageParamKey: keyof SearchUsersQueryVariables,
  client: GraphQLClient,
  variables: SearchUsersQueryVariables,
  options?: UseInfiniteQueryOptions<SearchUsersQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useInfiniteQuery<SearchUsersQuery, TError, TData>(
    ['SearchUsers.infinite', variables],
    (metaData) =>
      fetcher<SearchUsersQuery, SearchUsersQueryVariables>(
        client,
        SearchUsersDocument,
        { ...variables, ...(metaData.pageParam ?? {}) },
        headers
      )(),
    options
  );

useSearchUsersQuery.fetcher = (
  client: GraphQLClient,
  variables: SearchUsersQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<SearchUsersQuery, SearchUsersQueryVariables>(
    client,
    SearchUsersDocument,
    variables,
    headers
  );
export const GetUserConversationDocument = `
    query GetUserConversation($receiver_id: String!, $limit: Int!, $cursor: String) {
  getUserConversation(receiver_id: $receiver_id, limit: $limit, cursor: $cursor) {
    messages {
      id
      text
      createdAt
      user_id
      time
      receiver_id
      seen
      user {
        id
        username
      }
    }
    hasMore
  }
}
    `;
export const useGetUserConversationQuery = <
  TData = GetUserConversationQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: GetUserConversationQueryVariables,
  options?: UseQueryOptions<GetUserConversationQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<GetUserConversationQuery, TError, TData>(
    ['GetUserConversation', variables],
    fetcher<GetUserConversationQuery, GetUserConversationQueryVariables>(
      client,
      GetUserConversationDocument,
      variables,
      headers
    ),
    options
  );

useGetUserConversationQuery.getKey = (
  variables: GetUserConversationQueryVariables
) => ['GetUserConversation', variables];
export const useInfiniteGetUserConversationQuery = <
  TData = GetUserConversationQuery,
  TError = unknown
>(
  pageParamKey: keyof GetUserConversationQueryVariables,
  client: GraphQLClient,
  variables: GetUserConversationQueryVariables,
  options?: UseInfiniteQueryOptions<GetUserConversationQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useInfiniteQuery<GetUserConversationQuery, TError, TData>(
    ['GetUserConversation.infinite', variables],
    (metaData) =>
      fetcher<GetUserConversationQuery, GetUserConversationQueryVariables>(
        client,
        GetUserConversationDocument,
        { ...variables, ...(metaData.pageParam ?? {}) },
        headers
      )(),
    options
  );

useGetUserConversationQuery.fetcher = (
  client: GraphQLClient,
  variables: GetUserConversationQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<GetUserConversationQuery, GetUserConversationQueryVariables>(
    client,
    GetUserConversationDocument,
    variables,
    headers
  );
export const UserFeedsDocument = `
    query UserFeeds($cursor: String, $limit: Int!) {
  userFeeds(cursor: $cursor, limit: $limit) {
    hasMore
    posts {
      id
      post_url
      caption
      likes
      comments
      createdAt
      is_liked
      has_bookmark
      user {
        id
        username
        avatar
        has_followed
      }
    }
  }
}
    `;
export const useUserFeedsQuery = <TData = UserFeedsQuery, TError = unknown>(
  client: GraphQLClient,
  variables: UserFeedsQueryVariables,
  options?: UseQueryOptions<UserFeedsQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<UserFeedsQuery, TError, TData>(
    ['UserFeeds', variables],
    fetcher<UserFeedsQuery, UserFeedsQueryVariables>(
      client,
      UserFeedsDocument,
      variables,
      headers
    ),
    options
  );

useUserFeedsQuery.getKey = (variables: UserFeedsQueryVariables) => [
  'UserFeeds',
  variables,
];
export const useInfiniteUserFeedsQuery = <
  TData = UserFeedsQuery,
  TError = unknown
>(
  pageParamKey: keyof UserFeedsQueryVariables,
  client: GraphQLClient,
  variables: UserFeedsQueryVariables,
  options?: UseInfiniteQueryOptions<UserFeedsQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useInfiniteQuery<UserFeedsQuery, TError, TData>(
    ['UserFeeds.infinite', variables],
    (metaData) =>
      fetcher<UserFeedsQuery, UserFeedsQueryVariables>(
        client,
        UserFeedsDocument,
        { ...variables, ...(metaData.pageParam ?? {}) },
        headers
      )(),
    options
  );

useUserFeedsQuery.fetcher = (
  client: GraphQLClient,
  variables: UserFeedsQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<UserFeedsQuery, UserFeedsQueryVariables>(
    client,
    UserFeedsDocument,
    variables,
    headers
  );
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
export const useInfiniteGetUserFollowersQuery = <
  TData = GetUserFollowersQuery,
  TError = unknown
>(
  pageParamKey: keyof GetUserFollowersQueryVariables,
  client: GraphQLClient,
  variables: GetUserFollowersQueryVariables,
  options?: UseInfiniteQueryOptions<GetUserFollowersQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useInfiniteQuery<GetUserFollowersQuery, TError, TData>(
    ['GetUserFollowers.infinite', variables],
    (metaData) =>
      fetcher<GetUserFollowersQuery, GetUserFollowersQueryVariables>(
        client,
        GetUserFollowersDocument,
        { ...variables, ...(metaData.pageParam ?? {}) },
        headers
      )(),
    options
  );

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
export const useInfiniteGetUserFollowingQuery = <
  TData = GetUserFollowingQuery,
  TError = unknown
>(
  pageParamKey: keyof GetUserFollowingQueryVariables,
  client: GraphQLClient,
  variables: GetUserFollowingQueryVariables,
  options?: UseInfiniteQueryOptions<GetUserFollowingQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useInfiniteQuery<GetUserFollowingQuery, TError, TData>(
    ['GetUserFollowing.infinite', variables],
    (metaData) =>
      fetcher<GetUserFollowingQuery, GetUserFollowingQueryVariables>(
        client,
        GetUserFollowingDocument,
        { ...variables, ...(metaData.pageParam ?? {}) },
        headers
      )(),
    options
  );

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
export const GetUserInboxDocument = `
    query GetUserInbox {
  getUserInbox {
    id
    text
    createdAt
    seen
    user_id
    user {
      id
      username
      avatar
    }
  }
}
    `;
export const useGetUserInboxQuery = <
  TData = GetUserInboxQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables?: GetUserInboxQueryVariables,
  options?: UseQueryOptions<GetUserInboxQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<GetUserInboxQuery, TError, TData>(
    variables === undefined ? ['GetUserInbox'] : ['GetUserInbox', variables],
    fetcher<GetUserInboxQuery, GetUserInboxQueryVariables>(
      client,
      GetUserInboxDocument,
      variables,
      headers
    ),
    options
  );

useGetUserInboxQuery.getKey = (variables?: GetUserInboxQueryVariables) =>
  variables === undefined ? ['GetUserInbox'] : ['GetUserInbox', variables];
export const useInfiniteGetUserInboxQuery = <
  TData = GetUserInboxQuery,
  TError = unknown
>(
  pageParamKey: keyof GetUserInboxQueryVariables,
  client: GraphQLClient,
  variables?: GetUserInboxQueryVariables,
  options?: UseInfiniteQueryOptions<GetUserInboxQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useInfiniteQuery<GetUserInboxQuery, TError, TData>(
    variables === undefined
      ? ['GetUserInbox.infinite']
      : ['GetUserInbox.infinite', variables],
    (metaData) =>
      fetcher<GetUserInboxQuery, GetUserInboxQueryVariables>(
        client,
        GetUserInboxDocument,
        { ...variables, ...(metaData.pageParam ?? {}) },
        headers
      )(),
    options
  );

useGetUserInboxQuery.fetcher = (
  client: GraphQLClient,
  variables?: GetUserInboxQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<GetUserInboxQuery, GetUserInboxQueryVariables>(
    client,
    GetUserInboxDocument,
    variables,
    headers
  );
export const GetUserPostsDocument = `
    query GetUserPosts($user_id: String!, $limit: Int!, $cursor: String) {
  getPosts(user_id: $user_id, limit: $limit, cursor: $cursor) {
    posts {
      id
      post_url
      caption
      likes
      comments
      createdAt
      has_bookmark
    }
    hasMore
  }
}
    `;
export const useGetUserPostsQuery = <
  TData = GetUserPostsQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: GetUserPostsQueryVariables,
  options?: UseQueryOptions<GetUserPostsQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<GetUserPostsQuery, TError, TData>(
    ['GetUserPosts', variables],
    fetcher<GetUserPostsQuery, GetUserPostsQueryVariables>(
      client,
      GetUserPostsDocument,
      variables,
      headers
    ),
    options
  );

useGetUserPostsQuery.getKey = (variables: GetUserPostsQueryVariables) => [
  'GetUserPosts',
  variables,
];
export const useInfiniteGetUserPostsQuery = <
  TData = GetUserPostsQuery,
  TError = unknown
>(
  pageParamKey: keyof GetUserPostsQueryVariables,
  client: GraphQLClient,
  variables: GetUserPostsQueryVariables,
  options?: UseInfiniteQueryOptions<GetUserPostsQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useInfiniteQuery<GetUserPostsQuery, TError, TData>(
    ['GetUserPosts.infinite', variables],
    (metaData) =>
      fetcher<GetUserPostsQuery, GetUserPostsQueryVariables>(
        client,
        GetUserPostsDocument,
        { ...variables, ...(metaData.pageParam ?? {}) },
        headers
      )(),
    options
  );

useGetUserPostsQuery.fetcher = (
  client: GraphQLClient,
  variables: GetUserPostsQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<GetUserPostsQuery, GetUserPostsQueryVariables>(
    client,
    GetUserPostsDocument,
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
export const useInfiniteGetUserProfileQuery = <
  TData = GetUserProfileQuery,
  TError = unknown
>(
  pageParamKey: keyof GetUserProfileQueryVariables,
  client: GraphQLClient,
  variables: GetUserProfileQueryVariables,
  options?: UseInfiniteQueryOptions<GetUserProfileQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useInfiniteQuery<GetUserProfileQuery, TError, TData>(
    ['GetUserProfile.infinite', variables],
    (metaData) =>
      fetcher<GetUserProfileQuery, GetUserProfileQueryVariables>(
        client,
        GetUserProfileDocument,
        { ...variables, ...(metaData.pageParam ?? {}) },
        headers
      )(),
    options
  );

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
export const MessagesDocument = `
    subscription Messages {
  messages {
    id
    text
    user_id
    time
    seen
    receiver_id
    createdAt
    user {
      id
      username
      avatar
    }
  }
}
    `;
export const UnReadMessagesDocument = `
    subscription UnReadMessages {
  unReadMessages {
    user_id
    count
  }
}
    `;
