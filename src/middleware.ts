import * as mung from 'express-mung';
import { extendable } from './types';

export function extenderMiddleware(modifiers: extendable[]) {
  function redact(body: object, req: Request) {
    console.log(req.originalUrl);
    return modifiers[0].apply(body);
  }
  console.log(mung);
  return mung.json(redact);
}
