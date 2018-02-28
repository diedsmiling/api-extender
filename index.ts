import * as express from 'express';
import { Extender, extenderMiddleware } from './src/index';
import { jsonObject } from './lib/src/types';
const app = express();

const list: jsonObject = { a: 'b' }

const extender = new Extender();

extender.update('a.b.c', list)


console.log(Extender);
app.use(extenderMiddleware([{
  url: '/foo',
  apply: extender.update('a.b.c', list)
}]));

app.get('/foo', (req, res) => {
  res.json({ a: 'a' });
});

app.listen(3000);
