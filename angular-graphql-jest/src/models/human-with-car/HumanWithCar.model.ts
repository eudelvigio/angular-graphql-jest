import { ObjectType, Field, ID } from 'type-graphql';
@ObjectType()
export class HumanWithCarModel {
  @Field(type => ID)
  id: number;

  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field()
  email: string;

  @Field()
  gender: string;

  @Field()
  ip_address: string;

  @Field()
  app_name: string;

  @Field()
  caryear: number;

  @Field()
  carmodel: string;
}
