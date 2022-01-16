import { Field, ObjectType } from 'type-graphql';
import Post from '../../api/post/post-entity';
import { ErrorResponse } from '../shared';

@ObjectType()
export class AddPostResponse extends ErrorResponse {
  @Field(() => Post, { nullable: true })
  post?: Post;
}

@ObjectType()
export class PostsResponse {
  @Field(() => [Post])
  posts!: Post[];

  @Field()
  hasMore!: boolean;
}
