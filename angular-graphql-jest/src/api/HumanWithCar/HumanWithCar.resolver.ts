import { Resolver, Query, PubSub, Arg, Args, Mutation, Subscription, Root } from 'type-graphql';
import {HumanWithCarModel} from '../../models/human-with-car/HumanWithCar.model';
import { HumanWithCarService } from './HumanWithCar.service';
import { PubSubEngine } from 'graphql-subscriptions';

@Resolver(HumanWithCarModel)
export class HumanWithCarResolver {
  constructor(private service: HumanWithCarService) {}

  list: HumanWithCarModel[];

  @Query(returns => HumanWithCarModel)
  async humanWithCar( @PubSub() pubSub: PubSubEngine, @Arg('id') id: number): Promise<HumanWithCarModel> {
    console.log('Resolver humanWithCar ' + id);
    if (!this.list) {
      this.list = await this.service.findAll();
    }
    pubSub.publish('FEATUREDCARWITHHUMAN', this.list[Math.floor(Math.random() * this.list.length)]);
    pubSub.publish('CARYEAR', this.list.map(o => o.caryear).reduce((acc, elem) => elem > acc ? acc = elem : acc = acc));
    const hwc: HumanWithCarModel = this.list.find((o) => o.id === id);
    if (hwc === undefined) {
      throw new Error(id.toString());
    }
    return hwc;
  }

  @Query(returns => [HumanWithCarModel])
  async humansWithCars( @PubSub() pubSub: PubSubEngine ): Promise<HumanWithCarModel[]> {
    console.log('Resolver humansWithCars');
    if (!this.list) {
      this.list = await this.service.findAll();
    }
    pubSub.publish('FEATUREDCARWITHHUMAN', this.list[Math.floor(Math.random() * this.list.length)]);
    pubSub.publish('CARYEAR', this.list.map(o => o.caryear).reduce((acc, elem) => elem > acc ? acc = elem : acc = acc));
    return this.list;
  }

  @Mutation(returns => HumanWithCarModel)
  async incrementYearOfCar( @PubSub() pubSub: PubSubEngine, @Arg('id') id: number): Promise<HumanWithCarModel> {
    await this.service.incrementYearOfCar(id);
    this.list.find((o) => o.id === id).caryear++;
    pubSub.publish('CARYEAR', this.list.map(o => o.caryear).reduce((acc, elem) => elem > acc ? acc = elem : acc = acc));
    pubSub.publish('FEATUREDCARWITHHUMAN', this.list[Math.floor(Math.random() * this.list.length)]);
    return this.list.find((o) => o.id === id);
  }

  @Subscription({ topics: 'CARYEAR' })
  maxCarYearSubscription(@Root() maxYear: Number): Number {
    return maxYear;
  }

  @Subscription(returns => HumanWithCarModel, { topics: 'FEATUREDCARWITHHUMAN' })
  featuredManSubscription(@Root() humanWithCarModel: HumanWithCarModel): HumanWithCarModel {
    return humanWithCarModel;
  }
}
