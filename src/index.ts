import * as mung from 'express-mung';

export function middelware(options) {
  function redact(body, req, res) {
    body.secret = '****';
    return body;
  }
  console.log(mung);
  return mung.json(redact);
}
