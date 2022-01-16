import { Field, ObjectType } from 'type-graphql';
import Comment from '../../api/comment/comment-entity';
import { ErrorResponse } from '../shared';

@ObjectType()
export class NewCommentResponse extends ErrorResponse {
  @Field(() => Comment, { nullable: true })
  comment?: Comment;
}

@ObjectType()
export class CommentsResponse {
  @Field(() => [Comment])
  comments!: Comment[];

  @Field()
  hasMore!: boolean;
}
