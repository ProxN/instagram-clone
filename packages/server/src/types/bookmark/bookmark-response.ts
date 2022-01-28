import { ObjectType, Field } from 'type-graphql';
import { ErrorResponse } from '../shared';
import Post from '../../api/post/post-entity';

@ObjectType()
export class UpdatePassResponse extends ErrorResponse {
  @Field(() => Boolean, { nullable: true, defaultValue: false })
  post?: Post;
}
