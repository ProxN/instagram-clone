import { Field, ObjectType } from 'type-graphql';
import { ErrorResponse } from '../shared';

@ObjectType()
export class ForgotPassResponse extends ErrorResponse {
  @Field(() => Boolean, { defaultValue: true, nullable: true })
  emailSent?: boolean;
}
