import { Field, ObjectType } from 'type-graphql';
import { ErrorResponse } from './error-response';
import User from '../../api/user/user-entity';

@ObjectType()
export class UserResponse extends ErrorResponse {
  @Field(() => User, { nullable: true })
  user?: User;
}
