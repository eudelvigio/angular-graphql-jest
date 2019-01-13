import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import {Api} from './src/api/api';

const api = new Api();
api.start();
