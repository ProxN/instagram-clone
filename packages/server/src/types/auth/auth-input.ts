import { Field, InputType } from 'type-graphql';

@InputType()
export class LoginInputs {
  @Field()
  email!: string;

  @Field()
  password!: string;
}

@InputType()
export class SignupInputs extends LoginInputs {
  @Field()
  name!: string;
  @Field()
  username!: string;
}
