import userEntity from './user/user-entity';
import postEntity from './post/post-entity';
import followEntity from './follow/follow-entity';
import commentEntity from './comment/comment-entity';
import likeEntity from './like/like-entity';
import messageEntity from './message/message-entity';
import conversationEntity from './conversation/conversation-entity';
import bookmarkEntity from './bookmark/bookmark-entity';
import authResolver from './auth/auth-resolver';
import userResolver from './user/user-resolver';
import postResolver from './post/post-resolver';
import followResolver from './follow/follow-resolver';
import commentResolver from './comment/comment-resolver';
import likeResolver from './like/like-resolver';
import messageResolver from './message/message-resolver';
import bookMarkResolver from './bookmark/bookmark-resolver';

export const entities = [
  userEntity,
  postEntity,
  followEntity,
  commentEntity,
  likeEntity,
  messageEntity,
  conversationEntity,
  bookmarkEntity,
];
export const resolvers = [
  authResolver,
  userResolver,
  postResolver,
  followResolver,
  commentResolver,
  likeResolver,
  messageResolver,
  bookMarkResolver,
] as const;
