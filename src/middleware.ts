import * as mung from 'express-mung';
import { extendable } from './types';
import * as express from 'express';
import { find } from 'lodash';

export function apiExtenderMiddleware(modifiers: extendable[]) {
  function redact(body: object, req: express.Request) {
    const suitableModifier = find(modifiers, (o) => { return o.url === req.originalUrl; });
    if (suitableModifier) {
      return suitableModifier.apply(body);
    }
  }

  return mung.json(redact);
}
