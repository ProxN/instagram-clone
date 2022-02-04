import { Field, ObjectType, Query, Resolver } from 'type-graphql';

@ObjectType()
class Status {
  @Field()
  value!: 'online' | 'maintenance';
}

@Resolver()
class ServerStatus {
  @Query(() => Status)
  async status(): Promise<Status> {
    return { value: 'online' };
  }
}

export default ServerStatus;
