/// <reference path="./src/index.ts" />

import * as express from 'express'
import { Extender, extenderMiddelware } from './src/index'
const app = express()

const extender = new Extender()
app.use(extenderMiddelware([{
  url: '/foo',
  apply: extender.update()
}]));

app.get('/foo', (req, res) => {
  res.json({ a: 'a' });
});

app.listen(3000)
