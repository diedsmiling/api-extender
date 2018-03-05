import { update, unset } from 'lodash';
import { ExtenderInterface, jsonObject, JSON } from './types';

export class Extender implements ExtenderInterface {
  set(path: string, newValue: JSON) {
    return (body: jsonObject) => update(body, path, () => newValue);
  }

  delete(path: string) {
    return (body: jsonObject) => { unset(body, path); };
  }

  push(path: string, element: JSON) {
    return (body: jsonObject) => update(body, path, (e) => {
      if (Array.isArray(e)) {
        e.push(element);
      } else {
        console.warn('WARNING: Target element is not array.');
      }
      return e;
    });
  }

  unshift(path: string, element: JSON) {
    return (body: jsonObject) => update(body, path, (e) => {
      if (Array.isArray(e)) {
        e.unshift(element);
      } else {
        console.warn('WARNING: Target element is not array.');
      }
      return e;
    });
  }
}
