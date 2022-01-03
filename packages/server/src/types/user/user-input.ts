import { Field, InputType } from 'type-graphql';
import User from '../../api/user/user-entity';

@InputType()
export class UpdateUserInput implements Partial<User> {
  @Field(() => String, { nullable: true })
  name?: string;
}
