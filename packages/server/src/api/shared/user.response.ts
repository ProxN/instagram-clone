import { Field, ObjectType } from 'type-graphql';
import { ErrorResponse } from './errorResponse';
import User from '../user/user.entity';

@ObjectType()
export class UserResponse extends ErrorResponse {
  @Field(() => User, { nullable: true })
  user?: User;
}
