import { Resolver, Query, Arg, Args } from 'type-graphql';
import {HumanWithCarModel} from './HumanWithCar.model';
import { HumanWithCarService } from './HumanWithCar.service';
@Resolver(HumanWithCarModel)
export class HumanWithCarResolver {
  constructor(private service: HumanWithCarService) {}

  @Query(returns => HumanWithCarModel)
  async recipe(@Arg('id') id: string) {
    const hwc = await this.service.findById(id);
    if (hwc === undefined) {
      throw new Error(id);
    }
    return hwc;
  }

  @Query(returns => [HumanWithCarModel])
  recipes() {
    return this.service.findAll();
  }
}