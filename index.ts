/// <reference path="./src/index.ts" />

import * as express from 'express'
import { extender, middelware } from './src/index'
const app = express()

console.log(extender)
app.use(extender([
    {
        url: '/foo',
        apply: extender.update(['b, c'], {})
    }
]));

app.get('/foo', function (req, res) {
    res.json({a: 'a'})
})

app.listen(3000)
