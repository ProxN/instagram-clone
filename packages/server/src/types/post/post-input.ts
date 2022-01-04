import { Field, InputType } from 'type-graphql';

@InputType()
export class AddPostInput {
  @Field(() => String, { nullable: true })
  caption?: string;
}
