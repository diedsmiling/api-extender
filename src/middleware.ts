import * as mung from 'express-mung';
import { jsonObject, extendable } from './types';

export function extenderMiddleware(modifiers: [extendable]) {
  function redact(body: jsonObject) {
    body.secret = '****';
    return body;
  }
  console.log(mung);
  return mung.json(redact);
}