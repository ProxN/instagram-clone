import { Field, InputType } from 'type-graphql';

@InputType()
export class NewCommentInput {
  @Field()
  text!: string;

  @Field()
  post_id!: string;
}
