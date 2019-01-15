import { Resolver, Query, Arg, Args } from 'type-graphql';
import {HumanWithCarModel} from './HumanWithCar.model';
import { HumanWithCarService } from './HumanWithCar.service';
@Resolver(HumanWithCarModel)
export class HumanWithCarResolver {
  constructor(private service: HumanWithCarService) {}

  @Query(returns => HumanWithCarModel)
  async humanWithCar(@Arg('id') id: number): Promise<HumanWithCarModel> {
    console.log('Resolver humanWithCar ' + id);
    const hwc: HumanWithCarModel = await this.service.findById(id);
    if (hwc === undefined) {
      throw new Error(id.toString());
    }
    return hwc;
  }

  @Query(returns => [HumanWithCarModel])
  async humansWithCars(): Promise<HumanWithCarModel[]> {
    console.log('Resolver humansWithCars');
    const list: HumanWithCarModel[] = await this.service.findAll();
    return list;
  }
}
