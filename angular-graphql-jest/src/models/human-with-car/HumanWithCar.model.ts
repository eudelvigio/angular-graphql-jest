import { ObjectType, Field, ID } from 'type-graphql';
@ObjectType()
export class HumanWithCarModel {
  @Field(type => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  creationDate: Date;

  @Field(type => [String])
  ingredients: string[];
}
