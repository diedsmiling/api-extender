import * as mung from 'express-mung';
import { Request, Response } from 'express';

interface jsonObject {
  [key: string]: any;
}

export function extenderMiddelware() {
  function redact(body: jsonObject, req: Request, res: Response) {
    body.secret = '****';
    return body;
  }
  console.log(mung);
  return mung.json(redact);
}