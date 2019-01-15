const cachios = require('cachios');
import { Service } from 'typedi';
import { HumanWithCarModel } from './HumanWithCar.model';
@Service()
export class HumanWithCarService {
    findAll(): Promise<HumanWithCarModel[]> {
        console.log('servicio findall');

        return cachios.get('http://localhost:4000/mockeo', {ttl: 2000}).then(res => res.data);

    }
    findById(id): Promise<HumanWithCarModel> {
        console.log('servicio findById ' + id);

        return cachios.get(`http://localhost:4000/mockeoespecifico?id=${id}`, {ttl: 2000}).then(res => res.data);

    }
}
