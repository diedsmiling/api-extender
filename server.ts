import * as express from 'express';
import { Extender, apiExtenderMiddleware } from './src/index';
const app = express();

const extender = new Extender();

const customModdifier = () => ({ foo: 'bar' })

app.use(apiExtenderMiddleware([
  {
    url: '/foo',
    apply: extender.delete('a.b')
  },
  {
    url: '/baz',
    apply: customModdifier
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
