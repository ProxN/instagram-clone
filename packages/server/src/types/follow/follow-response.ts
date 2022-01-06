import { Field, ObjectType } from 'type-graphql';
import { ErrorResponse } from '../shared';

@ObjectType()
export class FollowResponse extends ErrorResponse {
  @Field(() => Boolean, { nullable: true, defaultValue: false })
  result?: boolean;
}
