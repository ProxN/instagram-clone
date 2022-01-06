import { Field, ObjectType } from 'type-graphql';
import { ErrorResponse } from '../shared';

@ObjectType()
export class UpdatePassResponse extends ErrorResponse {
  @Field(() => Boolean, { nullable: true, defaultValue: false })
  updated?: boolean;
}

@ObjectType()
export class StatsResponse {
  @Field({ defaultValue: 0 })
  followers!: number;

  @Field({ defaultValue: 0 })
  following!: number;

  @Field({ defaultValue: 0 })
  posts!: number;
}
