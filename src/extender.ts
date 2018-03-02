import { update, unset } from 'lodash';
import { ExtenderInterface, jsonObject, JSON } from './types';

export class Extender implements ExtenderInterface {
  update(path: string, newValue: JSON) {
    return (body: jsonObject) => update(body, path, () => newValue);
  }
  delete(path: string) {
    return (body: jsonObject) => { unset(body, path); };
  }
}
