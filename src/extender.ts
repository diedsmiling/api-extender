import { update } from 'lodash';
import { ExtenderInterface, jsonObject } from './types';

export class Extender implements ExtenderInterface {
  update(path: string, newValue: jsonObject) {
    return (body: jsonObject) => update(body, path, () => newValue);
  }
}
