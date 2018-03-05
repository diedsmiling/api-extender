import * as express from 'express';
import { Extender, extenderMiddleware } from './src/index';
import { jsonObject, JSON } from './src/types';
const app = express();

const extender = new Extender();

extender.set('a.b.c', 'a')

app.use(extenderMiddleware([
  {
    url: '/foo',
    apply: extender.delete('a.b')
  },
  {
    url: '/baz',
    apply: extender.set('a.b.c', true)
  },
  {
    url: '/baz',
    apply: extender.unshift('foo.bar', 4)
  }
]));

app.get('/foo', (req, res) => {
  res.json({ a: { b: 'dd', c: 'cc' } });
});
app.get('/bar', (req, res) => {
  res.json({ a: { b: 'dd', c: 'cc' } });
});

app.get('/baz', (req, res) => {
  res.json({ foo: { baz: true, bar: [0, 1, 2, 3] } });
});


app.listen(3000);
