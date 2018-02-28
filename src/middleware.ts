import * as mung from 'express-mung';
import { extendable } from './types';

export function extenderMiddleware(modifiers: extendable[]) {
  function redact(body: object) {
    return body;
  }
  console.log(mung);
  return mung.json(redact);
}
