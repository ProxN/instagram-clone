import { Field, ObjectType } from 'type-graphql';
import User from '../../api/user/user-entity';
import { ErrorResponse } from '../shared';

@ObjectType()
export class FollowResponse extends ErrorResponse {
  @Field(() => Boolean, { nullable: true, defaultValue: false })
  result?: boolean;
}

@ObjectType()
export class FollowSuggestionResponse {
  @Field(() => [User])
  users!: User[];
  @Field(() => Boolean)
  hasMore!: boolean;
}

@ObjectType()
export class NofiticationResponse extends User {
  @Field(() => String)
  since?: Date;
}
