import { Field, ObjectType } from 'type-graphql';
import { ErrorResponse } from '../../shared/errorResponse';

@ObjectType()
export class ForgotPassResponse extends ErrorResponse {
  @Field(() => Boolean, { defaultValue: true, nullable: true })
  emailSent?: boolean;
}
