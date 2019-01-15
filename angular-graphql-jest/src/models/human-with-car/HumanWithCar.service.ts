const axios = require('axios');
import { Service } from 'typedi';
import { HumanWithCarModel } from './HumanWithCar.model';
@Service()
export class HumanWithCarService {
    findAll(): Promise<HumanWithCarModel[]> {
        console.log('servicio findall');

        return axios.get('http://localhost:4000/mockeo').then(res => res.data);

    }
    findById(id): Promise<HumanWithCarModel> {
        console.log('servicio findById ' + id);

        return axios.get(`http://localhost:4000/mockeoespecifico?id=${id}`).then(res => res.data);

    }
}
